import React, { useEffect } from "react";
import "./CustomSetterDatePicker.css";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const CustomSetterDatePicker = (props) => {
  dayjs.extend(customParseFormat);
  const {
    placeholder,
    customStyle,
    name,
    handleChildFieldChange = () => {},
    item,
    format = "DD-MMM-YYYY",
    disabled,
    inputDate = "",
    setInputDate = () => {},
  } = props;
  //   const [inputDate, setInputDate] = useState("");

  const handleDateChange = (date, dateString) => {
    setInputDate(date);
    const inputValues = {
      [name]: dayjs(dateString).format("YYYY-MM-DD"),
    };
    handleChildFieldChange(inputValues);
  };

  useEffect(() => {
    if (inputDate) {
      const newDateValue = dayjs(inputDate);
      handleDateChange(newDateValue, inputDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CalendarOutlined />
      <DatePicker
        format={format}
        className={customStyle || "date-picker-setter-style-edit"}
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
export default CustomSetterDatePicker;
