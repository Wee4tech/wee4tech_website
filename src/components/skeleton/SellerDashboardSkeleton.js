import React from "react";
import "./CardSkeleton.css";
import { Col, Skeleton,Row } from "antd";

export const SellerDashboardSkeleton = () => {
  return (
    <>
    <Row>
    <Col xs={24} sm={24} md={24} lg={20} xl={18}>
    <Row>
      <Col span={12} className={"status-card-main-container"}>
        <Col className="status-card-sub-container info-box" style={{marginRight:"10px"}}>
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
      <Col span={12} className={"status-card-main-container "}>
        <Col className="status-card-sub-container info-box">
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
      </Row>
      <Row  className="mt-4">
      <Col span={12} className={"status-card-main-container"}>
        <Col className="status-card-sub-container info-box" style={{marginRight:"10px"}}>
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
      <Col span={12} className={"status-card-main-container "}>
        <Col className="status-card-sub-container info-box">
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
      </Row>
      <Row className="mt-4">
      <Col span={12} className={"status-card-main-container "}>
        <Col className="status-card-sub-container info-box" style={{marginRight:"10px"}}>
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
      <Col span={12} className={"status-card-main-container"}>
        <Col className="status-card-sub-container info-box">
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
      </Row>
    </Col>
    <Col span={6}></Col>
    </Row>
   
    </>
  );
};
