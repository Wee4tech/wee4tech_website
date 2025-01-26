import React from "react";
import { Col, Typography } from "antd";
import { ReactComponent as Document } from "../../assets/icons/documents.svg";

const { Text } = Typography;

const EmptyCatalougeTable = () => {
  return (
    <>
      <Col
        style={{
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // gap: "16px",
        }}
      >
        <Document style={{ marginBottom: "24px" }} />
        <Text
          style={{
            display: "block",
            color: "#0a243f",
            fontSize: "20px",
            fontWeight: 500,
            marginBottom: "10px",
          }}
        >
          No Data Available!
        </Text>
      </Col>
    </>
  );
};

export default EmptyCatalougeTable;
