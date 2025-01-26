import React from "react";
import "./DateRangePicker.css";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
const DateRangePicker = (props) => {
  const { onChange, format } = props;
  return (
    <>
      <RangePicker
        className="date-range-picker"
        // defaultValue={[
        //   dayjs("2015/01/01", dateFormat),
        //   dayjs("2015/01/01", dateFormat),
        // ]}
        onChange={onChange}
        format={format}
      />
    </>
  );
};

export default DateRangePicker;
