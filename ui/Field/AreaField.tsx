import React, { FC } from "react";
import style from "./Field.module.scss";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorMessage?: string;
}

export const AreaField: FC<Props> = ({
  label,
  value,
  name,
  errorMessage,
  onChange,
  onBlur,
}) => {
  return (
    <div className={style.textAreaField}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {errorMessage && (
        <span className={style.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};
