import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  id: string;
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  errorMessage?: string;
}

const DatepickerWithLabel: FC<Props> = ({
  id,
  label,
  selectedDate,
  onChange,
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="datepicker-container">
      <label htmlFor={id} className="datepicker-label">
        {label}
      </label>
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`datepicker-input ${isFocused ? "focused" : ""}`}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default DatepickerWithLabel;
