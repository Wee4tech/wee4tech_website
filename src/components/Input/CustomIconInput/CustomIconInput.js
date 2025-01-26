import React, { useEffect, useState } from "react";
import { Col, Input, Tooltip } from "antd";
import "./CustomIconInput.css";

const CustomIconInput = (props) => {
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
    toolTipText,
    modalOpen,
    // handleOk,
  } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const targetValue = e.target.value;
    const decimalPattern = /^(?:\d+|\d+\.\d{0,2})$/;
    if (decimalPattern.test(targetValue)) {
      setInputValue(targetValue || "");
    }
    if (targetValue === "") {
      setInputValue("");
    }
  };
  const handleSave = () => {
    handleChangeRowData(name, inputValue, record);
  };

  useEffect(() => {
    if (record?.vendor_data) {
      setInputValue((parseFloat(value) || 0).toFixed(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Tooltip
        placement="bottom"
        title={toolTipText}
        color={"#fff"}
        className="tooltip-style"
      >
        <Col className="main-container">
          <Input
            className={`${customStyle || "input-icon"}`}
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
            // addonAfter={addonAfter}
            addonBefore={addonBefore}
            min={minValue}
          />
          {addonAfter && (
            <Col className="icon-tag" onClick={() => modalOpen(record)}>
              {addonAfter}
            </Col>
          )}
        </Col>
      </Tooltip>
    </>
  );
};

export default CustomIconInput;
