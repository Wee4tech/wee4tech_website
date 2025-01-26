import React from "react";
import { Col, Skeleton } from "antd";
import "./CardSkeleton.css";
const cssStyle = {
  height: "30px",
  marginBottom: "20px",
  marginTop: "10px",
};
const SellerCardSkeleton = ({ length = 7 }) => {
  return (
    <>
      <Col className="card-skeleton-container width-100">
        {Array.from({ length }).map((_, index) => (
          <Skeleton.Button key={index} block style={cssStyle} active={true} />
        ))}
      </Col>
    </>
  );
};

export default SellerCardSkeleton;
