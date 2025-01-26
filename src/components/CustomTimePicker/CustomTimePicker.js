import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TimePicker } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const format = "hh:mm";
const customStyle = {
  height: "46px",
  width: "220px",
  borderColor: "#bac7d5",
};
const CustomTimePicker = ({
  name,
  value,
  handleChildChange = () => {},
  datePikerEmpty,
}) => {
  const [inputDate, setInputDate] = useState("");
  const onChange = (date, timeString) => {
    setInputDate(date);
    const inputValues = {
      [name]: timeString,
    };
    handleChildChange(inputValues);
  };

  useEffect(() => {
    if (datePikerEmpty) {
      setInputDate("");
    }
    if (value) {
      const newDateValue = dayjs(value, format);
      onChange(newDateValue, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TimePicker
      style={customStyle}
      name={name}
      value={inputDate ? inputDate : null}
      onChange={onChange}
      format={format}
      suffixIcon={<ClockCircleOutlined style={{ color: "#000000" }} />}
    />
  );
};
export default CustomTimePicker;
