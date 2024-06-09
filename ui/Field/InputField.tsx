import React, { FC } from "react";
import style from "./Field.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

export const InputField: FC<Props> = ({
  label,
  value,
  name,
  onBlur,
  errorMessage,
  onChange,
  type,
}) => {
  return (
    <div className={style.inputField}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span className={style.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};
