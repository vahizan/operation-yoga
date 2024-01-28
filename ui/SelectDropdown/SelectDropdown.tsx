import React, {
  Dispatch,
  SelectHTMLAttributes,
  SetStateAction,
  useState,
} from "react";

export interface SelectOption {
  name: string;
  value: any;
}

interface SelectProps extends SelectHTMLAttributes<any> {
  labelValue: string;
  options: SelectOption[];
  onChange: Dispatch<SetStateAction<any>>;
}

const SelectDropdown: React.FC<SelectProps> = (props) => {
  const [selectedOption, setSelectedOption] = useState<any>();
  const { options, onChange, labelValue } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <label htmlFor={labelValue}>{labelValue}</label>
      <select
        {...props}
        name={labelValue}
        value={selectedOption}
        onChange={handleChange}
      >
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
