import React from "react";
import "./QuoteLoading.css";
import Lottie from "lottie-react";
import animationData from "../../../assets/animation/quote_loader.json";
import { Col, Modal, Typography } from "antd";

export const QuoteLoading = (props) => {
  const { open } = props;
  const { Text } = Typography;
  return (
    <>
      <Modal className="loading_modal" closable={false} open={open} footer={[]}>
        <Col className="loading_heading">
          <Text className="loading_heading_first">Generating…</Text>
          <Text className="loading_heading_second">
            Hang in there! This may take a few seconds
          </Text>
        </Col>
        <Col className="animation_loading_container">
          <Lottie
            animationData={animationData}
            className="animation_loading"
            loop={true}
            autoplay={true}
          />
        </Col>
      </Modal>
    </>
  );
};
