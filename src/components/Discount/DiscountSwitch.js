import { Col } from "antd";
import React, { useState } from "react";
import { Input, Space } from "antd";
import Toggle from "./Toggle";

const DiscountSwitch = ({
  additionalDiscountValue,
  setAdditionalDiscountValue,
}) => {
  const [active, setActive] = useState(0);

  const onSelect = (value) => {
    setActive(value);
  };

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setAdditionalDiscountValue(value);
  };
  return (
    <Col>
      <Space direction="vertical">
        <Input
          className="toggle_input"
          value={additionalDiscountValue}
          onChange={handleChangeValue}
          prefix={
            <Toggle active={active} setActive={setActive} onSelect={onSelect} />
          }
          style={{ width: "240px", height: "40px" }}
        />
      </Space>
    </Col>
  );
};

export default DiscountSwitch;
