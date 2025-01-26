import React from "react";
import { Modal, Typography, Col, Button } from "antd";
import "./UserBillingConfirmModal.css";

const UserBillingConfirmModal = (prop) => {
  const { open, handleCancel, handleSave } = prop;
  const { Text } = Typography;
  return (
    <>
      <Modal
        // title="Basic Modal"
        open={open}
        onCancel={handleCancel}
        footer={[]}
      >
        <Col className="user-billing-confirm-modal-container">
          <Text className="user-billing-confirm-modal-container-main-heading">
            Are you sure you want to remove the tag?
          </Text>
          <Text className="user-billing-confirm-modal-container-main-heading-text">
            Billing address tag will be removed from this address
          </Text>
          <Col className="user-billing-confirm-modal-action-container">
            <Button
              className="user-billing-confirm-modal-action-cancel"
              onClick={handleCancel}
            >
              CANCEL
            </Button>
            <Button
              className="user-billing-confirm-modal-action-save"
              onClick={handleSave}
            >
              YES, REMOVE
            </Button>
          </Col>
        </Col>
      </Modal>
    </>
  );
};

export default UserBillingConfirmModal;
