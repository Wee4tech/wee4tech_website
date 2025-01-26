import React, { useEffect, useState } from "react";
import { Select, Typography } from "antd";
import "./SelectableDropdown.css";
const { Text } = Typography;
const SelectableDropdown = (props) => {
  const {
    customStyle,
    items,
    // dropdownChangeValue,
    placeholder,
    name,
    handleChildFieldChange,
    item,
  } = props;

   
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (value) => {
    let selectedValue = {};
    item?.options?.map((element) => {
      if (element.label === value) {
        selectedValue = element;
      }
      return null;
    });
    setSelectedOption(selectedValue?.label);
    const inputValues = {
      [name]: selectedValue?.value,
    };
    handleChildFieldChange(inputValues);
  };
  useEffect(() => {   
    if (item?.value) {
      let selectedValue = {};
      item?.options?.map((element) => {
        if (element.value === item?.value) {
          selectedValue = element;
        }
        return null;
      });
      setSelectedOption(selectedValue?.label);
      const inputValues = {
        [name]: selectedValue?.value,
      };

      handleChildFieldChange(inputValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.value]);
  return (
    <Select
    showSearch
      className={`${customStyle || "dropdown-style"}`}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      defaultValue={placeholder}
      value={selectedOption}
      disabled={item?.disabled}
    >
      <Select.Option key={name} value="" disabled>
        <Text className="selected-option"> {placeholder}</Text>
      </Select.Option>
      {items?.map((value) => {
        return (
          <Select.Option key={value.key} value={value.label}>
            {value.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default SelectableDropdown;
