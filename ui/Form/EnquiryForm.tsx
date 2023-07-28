import { ChangeEvent, useEffect, useState } from "react";
import styles from "./enquiryForm.module.scss";
import { sendEmail } from "../../hooks/api";
import BouncingDotsLoader from "../Loader/BouncingDotsLoader";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneExt?: string;
  phone?: string;
}

const initialState: FormValues = {
  name: "",
  subject: "",
  email: "",
  message: "",
  phoneExt: "",
};
function timeoutFunc<T>(
  callback: (val: T | undefined) => void,
  seconds: number,
  val?: T
) {
  setTimeout(() => callback(val), seconds);
}
const EnquiryForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [errors, setErrors] = useState<FormValues>(initialState);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSendSuccess, setSendSuccess] = useState<boolean>();
  const [sendError, setSendError] = useState<boolean>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateForm();
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors: FormValues = { ...initialState };

    if (!formValues.name) {
      newErrors.name = "Name is required";
    }

    if (!formValues.subject) {
      newErrors.subject = "Subject is required";
    }

    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formValues.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((value) => value === "");
  };

  const handleBlur = () => {
    validateForm();
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
            phoneExt: "",
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
    timeoutFunc(setSendSuccess, 3000);
  }, [isSendSuccess]);

  useEffect(() => {
    timeoutFunc(setSendError, 3000);
  }, [sendError]);

  return (
    <form className={styles.enquiryForm} onSubmit={handleSubmit}>
      <div className={styles.enquiryForm__field}>
        <label htmlFor="name">Name</label>
        <input
          placeholder="Name"
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.name && (
          <div className={errorMessageClassName}>{errors.name}</div>
        )}
      </div>
      <div className={styles.enquiryForm__field}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.email && (
          <div className={errorMessageClassName}>{errors.email}</div>
        )}
      </div>
      <div className={styles.enquiryForm__field}>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
          value={formValues.subject}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.subject && (
          <span className={errorMessageClassName}>{errors.subject}</span>
        )}
      </div>
      <div className={styles.enquiryForm__textAreaField}>
        <label htmlFor="message">Message</label>
        <textarea
          placeholder="Enter your message"
          id="message"
          name="message"
          value={formValues.message}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.message && (
          <span className={errorMessageClassName}>{errors.message}</span>
        )}
      </div>
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
