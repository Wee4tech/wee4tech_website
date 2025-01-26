import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import "./CustomTextArea.css";
const CustomTextArea = (props) => {
  const {
    placeholder,
    customstyle,
    // value,
    name,
    handleChildFieldChange,
    item,
  } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const handleSave = (e) => {
    const value = e.target.value;
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
      <TextArea
        className={customstyle || "text-area-style"}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        onPressEnter={handleSave}
        onBlur={handleSave}
        rows={4}
      />
    </>
  );
};
export default CustomTextArea;
