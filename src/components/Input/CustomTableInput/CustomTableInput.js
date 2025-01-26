import React, { useEffect, useState } from "react";
import "./CustomTableInput.css";
import { Col, Input, Typography } from "antd";
const CustomTableInput = (props) => {
  const {
    name,
    placeholder,
    customStyle,
    addonAfter,
    prefix,
    suffix,
    disable,
    addonBefore,
    type,
    minValue,
    value,
    handleChangeRowData,
    record,
    check,
    greaterValue,
    errorText,
    endText,
    conditionTest,
    mrpCheck,
  } = props;
    // console.log("🚀 ~ CustomTableInput ~ mrpCheck:", mrpCheck)
  const [inputValue, setInputValue] = useState("");
  const [borderRed, setBorderRed] = useState(false);
  const { Text } = Typography;

  const handleInputChange = (e) => {    
    const targetValue = e.target.value;
    let decimalPattern = "";
    if (conditionTest === "stock") {
      decimalPattern = /^\d+$/;
    } else {
      decimalPattern = /^(?:\d+|\d+\.\d{0,2})$/;
    }
    if (check === "inventory") {
      if(mrpCheck)
      {
      if (!(parseFloat(greaterValue || 0) === 0)) {
        if (
          decimalPattern.test(targetValue) &&
          parseFloat(greaterValue || 0) >= parseFloat(targetValue || 0)
        ) {
          setInputValue(targetValue || "");
          setBorderRed(false);
        } else {
          setBorderRed(true);
        }
      } else {
        if (decimalPattern.test(targetValue)) {
          setInputValue(targetValue || "");
        }
      }
    }else{
      if (decimalPattern.test(targetValue)) {
        setInputValue(targetValue || "");
      }
    }
    } else {
      if (decimalPattern.test(targetValue)) {
        setInputValue(targetValue || "");
      }
    }
    if (targetValue === "") {
      setInputValue("");
      setBorderRed(false);
    }
  };

  const handleSave = () => {
    handleChangeRowData(name, inputValue, record);
    if (parseFloat(greaterValue || 0) >= parseFloat(inputValue || 0)) {
      setBorderRed(false);
    }
    if (inputValue === "") {
      setBorderRed(false);
    }
  };

  useEffect(() => {
    if (record?.vendor_data) {
      if (conditionTest === "stock") {
        setInputValue(value || 0);
      } else {
        setInputValue((parseFloat(value) || 0).toFixed(2));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Col className="custom-table-input-container">
        <Input
          className={`${customStyle || "input-style"} ${
            borderRed ? "border-red-input" : ""
          }`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          name={name}
          type={type}
          onPressEnter={handleSave}
          onBlur={handleSave}
          disabled={disable}
          prefix={prefix}
          suffix={suffix}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          min={minValue}
        />
        {borderRed && (
          <Text className="error-text">
            {errorText} should be less than {endText}
          </Text>
        )}
      </Col>
    </>
  );
};

export default CustomTableInput;
