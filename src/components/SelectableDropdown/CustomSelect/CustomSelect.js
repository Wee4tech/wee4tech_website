import React from "react";
import "./CustomSelect.css";
import { Select } from "antd";
const CustomSelect = (props) => {
  const {
    customStyle,
    placeholder,
    width,
    options,
    handleChange,
    value,
    height,
    disabled,
    loading
  } = props;

   
  return (
    <>
      <Select
        className={customStyle || `select-default-style`}
        value={value}
       // defaultValue={{ value: value, label: 'Store sale' }}
        // labelInValue
        // defaultValue={{
        //   value: "lucy",
        //   label: "Lucy (101)",
        // }}
        placeholder={placeholder}
        style={{
          width: width,
          height: height || "46px",
        }}
        onChange={handleChange}
        options={options}
        disabled={disabled}
        loading={loading}
      />
    </>
  );
};

export default CustomSelect;
