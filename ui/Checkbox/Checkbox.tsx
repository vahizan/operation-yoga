import React, { FC, HTMLAttributes } from "react";

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  id: string;
  displayName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  displayName,
  label,
  onChange,
  ...otherProps
}) => {
  return (
    <>
      {label && <label htmlFor={displayName}>{label}</label>}
      <input
        {...otherProps}
        id={id}
        data-testid={id}
        onChange={onChange}
        type="checkbox"
        name={displayName}
      />
    </>
  );
};

export default Checkbox;
