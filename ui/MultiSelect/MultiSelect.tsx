import React, {
  Dispatch,
  SelectHTMLAttributes,
  SetStateAction,
  useState,
} from "react";
import Checkbox from "@/ui/Checkbox/Checkbox";

export interface SelectOption {
  name: string;
  value: any;
  checked?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<any> {
  labelValue: string;
  options: SelectOption[];
  onChange: Dispatch<SetStateAction<any>>;
}

const toMap = (options: SelectOption[]) => {
  const optionsMap: Record<string, SelectOption> = {};
  options.forEach((option) => {
    optionsMap[option.name] = option;
  });
  return optionsMap;
};
const MultiSelect: React.FC<SelectProps> = (props) => {
  const { options, onChange, labelValue, ...selectProps } = props;
  const [selectedOptions, setSelectedOptions] = useState(toMap(options));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    const option = selectedOptions[e.target.value];
    const newOption = { ...option, checked: !option.checked };
    setSelectedOptions({ ...selectedOptions, newOption });
  };

  return (
    <>
      <label htmlFor={labelValue}>{labelValue}</label>
      {Object.values(selectedOptions).map((option) => {
        return (
          <Checkbox
            {...selectProps}
            displayName={option.name}
            onChange={handleChange}
            id={`${option.name}-${option.value}`}
          />
        );
      })}
    </>
  );
};

export default MultiSelect;
