import React, {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from "react";
import Checkbox from "@/ui/Checkbox/Checkbox";

export interface MultiSelectCheckboxOption {
  name: string;
  value: any;
  checked?: boolean;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
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
    const option = selectedOptions[e.target.name];

    selectedOptions[e.target.name] = {
      ...option,
      checked: e.target.checked,
    };

    setSelectedOptions(selectedOptions);

    const values = Object.values(selectedOptions)
      .filter((option) => option.checked)
      .map((option) => option.value);
    onChange(values);
  };

  return (
    <>
      <label htmlFor={labelValue}>{labelValue}</label>
      {Object.values(options).map((option, i) => {
        return (
          <Checkbox
            {...checkboxProps}
            displayName={option.name}
            label={option.name}
            onChange={handleChange}
            defaultChecked={option?.checked}
            id={`${option.name}-${i}`}
          />
        );
      })}
    </>
  );
};

export default MultiSelectCheckbox;
