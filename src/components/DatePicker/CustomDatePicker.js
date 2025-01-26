import React, { useEffect, useState } from "react";
import "./CustomDatePicker.css";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const CustomDatePicker = (props) => {
  dayjs.extend(customParseFormat);
  const {
    placeholder,
    customStyle,
    name,
    handleChildFieldChange = () => {},
    item,
    format = "DD-MMM-YYYY",
    datePickerEmpty,
    disabled,
  } = props;
  const [inputDate, setInputDate] = useState("");

  const handleDateChange = (date, dateString) => {
    setInputDate(date);
    const inputValues = {
      [name]: dayjs(dateString).format("YYYY-MM-DD"),
    };
    handleChildFieldChange(inputValues);
  };

  useEffect(() => {
    if (item?.value) {
      const newDateValue = dayjs(item?.value);
      handleDateChange(newDateValue, item?.value);
    }
    if (datePickerEmpty) {
      setInputDate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.value]);

  useEffect(() => {
    if (datePickerEmpty) {
      setInputDate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datePickerEmpty]);

  return (
    <>
      <CalendarOutlined />
      <DatePicker
        format={format}
        className={customStyle || "date-picker-style-edit"}
        // className={"date-picker-style-edit"}
        placeholder={placeholder}
        suffixIcon={""}
        value={inputDate}
        onChange={handleDateChange}
        name={name}
        disabled={item?.disabled || disabled}
      />
    </>
  );
};
export default CustomDatePicker;
