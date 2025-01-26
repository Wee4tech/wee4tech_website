import React from "react";
import "./createOrderModal.css";
import { MainModal } from "../../MainModal/MainModal";
import { Col, Typography } from "antd";
import { ModalFooter } from "../../MainModal/ModalFooter";

const { Text } = Typography;

export const CreateOrderModal = (props) => {
  const { title, open, handleCloseModal, handleCancel, handleSave } = props;
  const footer = [
    <ModalFooter
      cancelText={"YES, CREATE ORDER"}
      saveText={"SURE, I’LL CREATE RFQ"}
      handleCancel={handleCancel}
      handleSave={handleSave}
    />,
  ];
  return (
    <>
      <MainModal
        title={title}
        open={open}
        handleCloseModal={handleCloseModal}
        footer={footer}
      >
        <Col className="create-modal-container">
          <Col className="create-modal-sub-container">
            <Text className="create-modal-recommed-text">Recommended</Text>
            <Text className="create-modal-recommed-text-2">
              {" "}
              to create RFQ for client to checkout directly.
            </Text>
          </Col>
          <Text className="create-modal-recommed-text-3">
            Continue for prepaid order via bank transfer or UPI.
          </Text>
        </Col>
      </MainModal>
    </>
  );
};
