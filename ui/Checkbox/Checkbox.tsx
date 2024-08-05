import React, { FC } from "react";

interface Props extends HTMLInputElement {
  id: string;
  displayName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

//TODO: ADD unit tests
export const Checkbox: FC<Props> = (props) => {
  const { id, displayName, label, onChange } = props;
  return label ? (
    <>
      <label htmlFor={displayName}>{label}</label>
      <input id={id} onChange={onChange} type="checkbox">
        {displayName}
      </input>
    </>
  ) : (
    <input id={id} onChange={onChange} type="checkbox">
      {displayName}
    </input>
  );
};

export default Checkbox;
