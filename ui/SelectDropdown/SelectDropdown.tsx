import React, { Dispatch, SetStateAction, useState } from "react";

export interface SelectOption {
  name: string;
  value: any;
}

interface SelectProps {
  labelValue: string;
  options: SelectOption[];
  onChange: Dispatch<SetStateAction<any>>;
}

const SelectDropdown: React.FC<SelectProps> = ({
  options,
  onChange,
  labelValue,
}) => {
  const [selectedOption, setSelectedOption] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    onChange(e.target.value);
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <label htmlFor={labelValue}>{labelValue}</label>
      <select name={labelValue} value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectDropdown;
