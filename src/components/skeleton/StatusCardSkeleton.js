import React from "react";
import "./CardSkeleton.css";
import { Col, Skeleton } from "antd";

export const StatusCardSkeleton = () => {
  return (
    <>
      <Col className={"status-card-main-container"}>
        <Col className="status-card-sub-container">
          <Skeleton.Button
            className="status-card-button-skeleton"
            block
            active={true}
          />
          <Skeleton.Button
            block
            className="status-card-button-skeleton"
            active={true}
          />
          <Skeleton.Button
            block
            className="status-card-button-skeleton"
            active={true}
          />
        </Col>
      </Col>
    </>
  );
};
