import { ChangeEvent, useEffect, useState } from "react";
import styles from "./enquiryForm.module.scss";
import { sendEmail } from "../../hooks/api";
import BouncingDotsLoader from "../Loader/BouncingDotsLoader";
import { InputField } from "../Field/InputField";
import { AreaField } from "../Field/AreaField";
import { isValidEmail, isValidPhone } from "../Field/validators";

const FIELD_NAMES = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
  phone: "Phone",
};

const FIELD_KEYS = {
  name: "name",
  email: "email",
  subject: "subject",
  message: "message",
  phone: "phone",
};
interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

const initialState = {
  name: "",
  subject: "",
  email: "",
  message: "",
  phone: "",
};
function timeoutFunc<T>(
  callback: (val: T | undefined) => void,
  seconds: number,
  val?: T
) {
  setTimeout(() => callback(val), seconds);
}

const EnquiryForm = () => {
  const [formValues, setFormValues] =
    useState<Record<string, string>>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>(initialState);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSendSuccess, setSendSuccess] = useState<boolean>();
  const [sendError, setSendError] = useState<boolean>();
  const [isUpdateErrorMessages, setUpdateErrorMessages] = useState<boolean>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(value);
  };

  const validateField = (fieldKey: string) => {
    if (!formValues[fieldKey] && fieldKey !== FIELD_KEYS.phone) {
      setErrors({
        ...initialState,
        [fieldKey]: `${FIELD_NAMES[fieldKey as keyof FormValues]} is required`,
      });
      return;
    }

    if (fieldKey === FIELD_KEYS.email && !isValidEmail(formValues[fieldKey])) {
      setErrors({ ...initialState, [fieldKey]: "Email is invalid" });
      return;
    }

    if (
      fieldKey === FIELD_KEYS.phone &&
      formValues[fieldKey] &&
      !isValidPhone(formValues[fieldKey])
    ) {
      setErrors({ ...initialState, [fieldKey]: "Phone number is invalid" });
      return;
    }
  };

  const validateForm = () => {
    const newErrors = { ...initialState };

    if (!formValues.name) {
      newErrors.name = "Name is required";
    }

    if (!formValues.subject) {
      newErrors.subject = "Subject is required";
    }

    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formValues?.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formValues.phone && !isValidPhone(formValues?.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formValues.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((value) => value === "");
  };

  const handleBlur = (fieldKey: string) => () => {
    validateField(fieldKey);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const errorMessageClassName = `${styles.enquiryForm__errorMessage} error`;
  useEffect(() => {
    if (isSubmitted) {
      setSendSuccess(undefined);
      setSendError(undefined);
      if (!validateForm()) {
        setSubmitted(false);
        return;
      }
      sendEmail({
        sender: formValues.email,
        subject: formValues.subject,
        text: formValues.message,
      })
        .then(() => {
          setSendError(false);
          setSendSuccess(true);
          setFormValues({
            subject: "",
            message: "",
            email: "",
            phone: "",
            name: "",
          });
        })
        .catch(() => {
          setSendError(true);
          setSendSuccess(false);
        })
        .finally(() => {
          setSubmitted(false);
        });
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (isUpdateErrorMessages) {
      validateForm();
    }
    setUpdateErrorMessages(false);
  }, [isUpdateErrorMessages]);

  useEffect(() => {
    timeoutFunc(setSendSuccess, 3000);
  }, [isSendSuccess]);

  useEffect(() => {
    timeoutFunc(setSendError, 3000);
  }, [sendError]);

  return (
    <form className={styles.enquiryForm} onSubmit={handleSubmit}>
      <InputField
        name={"name"}
        label={"Name"}
        type="text"
        value={formValues.name}
        onBlur={handleBlur(FIELD_KEYS.name)}
        onChange={handleChange}
        errorMessage={errors.name}
      />

      <InputField
        name={"email"}
        label={"Email"}
        type="email"
        value={formValues.email}
        onBlur={handleBlur(FIELD_KEYS.email)}
        onChange={handleChange}
        validator={isValidEmail}
        errorMessage={errors.email}
      />

      <InputField
        id={"subject"}
        type={"text"}
        name={"subject"}
        label={"Subject"}
        onBlur={handleBlur(FIELD_KEYS.subject)}
        onChange={handleChange}
        placeholder="Subject"
        value={formValues.subject}
        errorMessage={errors.subject}
      />

      <InputField
        id={"phone"}
        type={"text"}
        name={"phone"}
        label={"Phone"}
        onBlur={handleBlur(FIELD_KEYS.phone)}
        onChange={handleChange}
        placeholder="Phone"
        value={formValues.phone}
        errorMessage={errors.phone}
      />
      <AreaField
        label={"Message"}
        placeholder={"Enter your message"}
        id={"message"}
        name={"message"}
        value={formValues.message}
        onBlur={handleBlur(FIELD_KEYS.message)}
        onChange={handleChange}
        errorMessage={errors.message}
      />
      <button
        className={styles.enquiryForm__submit}
        disabled={Boolean(
          isSubmitted ||
            errors.email ||
            errors.name ||
            errors.message ||
            errors.subject
        )}
        type="submit"
      >
        {isSubmitted ? <BouncingDotsLoader /> : <span>Submit</span>}
      </button>
      {isSendSuccess && (
        <div className={styles.enquiryForm__successMessage}>
          Enquiry sent successfully
        </div>
      )}
      {sendError && (
        <div className={styles.enquiryForm__submitErrorMessage}>
          Failed to send your enquiry. Please try again
        </div>
      )}
    </form>
  );
};

export default EnquiryForm;
