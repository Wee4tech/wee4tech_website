import { Col } from "antd";
import React, { useEffect } from "react";

const Toggle = ({ active, setActive, onSelect, editCondition }) => {
  useEffect(() => {
    if (!editCondition) {
      setActive(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Col
        style={{
          backgroundColor: "#e8e8e8",
          display: "flex",
          borderRadius: "4px",
          padding: "4px",
          width: "80px",
          height: "32px",
        }}
      >
        <Col
          onClick={() => onSelect(0)}
          style={{
            width: "36px",
            height: "24px",
            backgroundColor: active === 0 ? "#fff" : "",
            color: active === 0 ? "#015fe5" : "#aeaeae",
            boxShadow: active === 0 ? "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" : "",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          ₹
        </Col>
        <Col
          onClick={() => onSelect(1)}
          style={{
            width: "36px",
            height: "24px",
            cursor: "pointer",
            borderRadius: "4px",
            backgroundColor: active === 1 ? "#fff" : "",
            color: active === 1 ? "#015fe5" : "#aeaeae",
            boxShadow: active === 1 ? "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" : "",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          %
        </Col>
      </Col>
    </>
  );
};

export default React.memo(Toggle);
