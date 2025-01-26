import React, { useEffect, useState } from "react";
import "./CustomTimePicker.css"; // Create a CSS file for your custom styles if needed
import { TimePicker } from "antd"; // Import TimePicker from antd
// import { ClockCircleOutlined } from "@ant-design/icons"; // You can use an appropriate icon for time
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const CustomTimePicker = (props) => {
  dayjs.extend(customParseFormat);

  const {
    placeholder,
    customStyle,
    name,
    handleChildFieldChange = () => {},
    item,
    format = "HH:mm A", // Set the format for time
  } = props;

  const [inputTime, setInputTime] = useState(null);

  const handleTimeChange = (time, timeString) => {
    setInputTime(time);
    const inputValues = {
      [name]: timeString,
    };
    handleChildFieldChange(inputValues);
  };

  useEffect(() => {
    if (item?.value) {
      const newTimeValue = dayjs(item?.value, format);
      handleTimeChange(newTimeValue, item?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.value]);

  return (
    <>
      {/* <ClockCircleOutlined /> Use an appropriate time icon */}
      <TimePicker
        format={format}
        className={customStyle || "time-picker-style"} // Apply custom styles if needed
        use12Hours={true}
        placeholder={placeholder}
        value={inputTime}
        onChange={handleTimeChange}
        name={name}
        disabled={item?.disabled}
      />
    </>
  );
};

export default CustomTimePicker;
