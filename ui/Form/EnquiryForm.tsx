import { ChangeEvent, useEffect, useState } from "react";
import styles from "./enquiryForm.module.scss";
import { sendEmail } from "../../hooks/api";

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

  useEffect(() => {
    if (isSubmitted) {
      if (!validateForm()) {
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
        {errors.name && <span className="error">{errors.name}</span>}
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
        {errors.email && <span className="error">{errors.email}</span>}
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
        {errors.subject && <span className="error">{errors.subject}</span>}
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
        {errors.message && <span className="error">{errors.message}</span>}
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
        Submit
      </button>
      {isSendSuccess && (
        <div className={styles.enquiryForm__successMessage}>
          Enquiry sent successfully
        </div>
      )}
      {sendError && (
        <div className={styles.enquiryForm__errorMessage}>
          Failed to send your enquiry. Please try again
        </div>
      )}
    </form>
  );
};

export default EnquiryForm;
