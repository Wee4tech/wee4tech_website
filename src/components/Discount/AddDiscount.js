import React from "react";
import { Button, Col } from "antd";
import DiscountSwitch from "./DiscountSwitch";
import { CloseOutlined } from "@ant-design/icons";

const AddDiscount = ({
  setAdditionalDiscount,
  additionalDiscountValue,
  setAdditionalDiscountValue,
}) => {
  return (
    <Col
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <DiscountSwitch
        additionalDiscountValue={additionalDiscountValue}
        setAdditionalDiscountValue={setAdditionalDiscountValue}
      />
      <Col
        style={{
          display: "flex",
        }}
      >
        <Button
          style={{
            border: "none",
          }}
          onClick={() => setAdditionalDiscount(false)}
        >
          <CloseOutlined />
        </Button>
      </Col>
    </Col>
  );
};

export default AddDiscount;
