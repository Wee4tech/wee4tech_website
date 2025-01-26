import React from "react";
import "./DeleteModalNotification.css";
import { Button, Col, Modal, Typography } from "antd";
const DeleteModalNotification = (props) => {
  const { Text } = Typography;
  const {
    open,
    handleOk,
    handleSave = () => {},
    data = "",
    title = "Delete item",
    ButtonText = "Delete",
    CancelText = "Cancel",
  } = props;

  return (
    <>
      <Modal
        className="DeleteModalNotification"
        title={title}
        onCancel={handleOk}
        open={open}
        footer={[
          <Col className="delete-footer-container">
            <Button onClick={handleOk} className="delete-cancel-button">
              {CancelText}
            </Button>
            <Button
              onClick={() => handleSave()}
              className="modal-delete-button"
            >
              {ButtonText}
            </Button>
          </Col>,
        ]}
      >
        <Col className="delete-container-modal">
          <Text className="delete-outer-text">
            Are you sure you want to delete{" "}
            <Text className="delete-inner-text"> {data}</Text>? Once deleted it
            can’t be undone
          </Text>
        </Col>
      </Modal>
    </>
  );
};

export default DeleteModalNotification;
