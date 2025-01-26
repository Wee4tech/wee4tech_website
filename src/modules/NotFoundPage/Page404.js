import { Col, Typography } from "antd";
import React from "react";

const Page404 = () => {
  const { Text } = Typography;
  return (
    <>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Text
          style={{ fontSize: "30px", color: "#0a243f", fontWeight: "bolder" }}
        >
          Page not found...
        </Text>
      </Col>
    </>
  );
};
export default Page404;
