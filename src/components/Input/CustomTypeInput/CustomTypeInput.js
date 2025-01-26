import React, { useEffect, useState } from "react";
import { Input } from "antd";
import "./CustomTypeInput.css";

const CustomTypeInput = (props) => {
  const {
    customStyle,
    placeholder,
    // value,
    name,
    handleChildFieldChange,
    item,
    disable,
    prefix,
    // suffix,
  } = props;
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    let value;

    if (item?.reg) {
      value = e.target.value.replace(/[^0-9]/g, "");
      if (item.regNum && value.length > 10) {
        value = value.slice(0, 10);
      }
    } else {
      value = e.target.value;
    }

    setInputValue(value);
  };
  const handleSave = (e) => {
    let value = e.target.value;

    const inputValues = {
      [name]: value,
    };

    handleChildFieldChange(inputValues);
  };

  useEffect(() => {
    if (item?.value) {
      setInputValue(item?.value);
      const inputValues = {
        [name]: item?.value,
      };

      handleChildFieldChange(inputValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.value]);
  return (
    <>
      <Input
        className={`${customStyle || "edit-input-style"}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        onPressEnter={handleSave}
        onBlur={handleSave}
        disabled={disable}
        style={{ borderRadius: 0 }}
        prefix={prefix}
        // suffix={suffix}
      />
    </>
  );
};

export default CustomTypeInput;
