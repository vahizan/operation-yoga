import React, {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useState,
} from "react";
import Checkbox from "@/ui/Checkbox/Checkbox";

export interface MultiSelectCheckboxOption {
  name: string;
  value: any;
  checked?: boolean;
}

interface Props extends HTMLAttributes<HTMLInputElement> {
  labelValue: string;
  options: MultiSelectCheckboxOption[];
  onChange: Dispatch<SetStateAction<any>>;
}

const toMap = (options: MultiSelectCheckboxOption[]) => {
  const optionsMap: Record<string, MultiSelectCheckboxOption> = {};
  options.forEach((option) => {
    optionsMap[option.name] = option;
  });
  return optionsMap;
};
const MultiSelectCheckbox: React.FC<Props> = (props) => {
  const { options, onChange, labelValue, ...checkboxProps } = props;
  const [selectedOptions, setSelectedOptions] = useState(toMap(options));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const option = selectedOptions[e.target.value];

    selectedOptions[e.target.value] = { ...option, checked: !option.checked };

    setSelectedOptions(selectedOptions);
    onChange(selectedOptions);
  };
  console.log("selectedOptions", selectedOptions);

  return (
    <>
      <label htmlFor={labelValue}>{labelValue}</label>
      {Object.values(options).map((option) => {
        return (
          <Checkbox
            {...checkboxProps}
            displayName={option.name}
            label={option.name}
            onChange={handleChange}
            defaultChecked={option.checked}
            id={`${option.name}-${option.value}`}
          />
        );
      })}
    </>
  );
};

export default MultiSelectCheckbox;
