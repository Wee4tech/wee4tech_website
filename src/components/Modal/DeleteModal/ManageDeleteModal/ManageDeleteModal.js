import React from "react";
import "./ManageDeleteModal.css";
import { Button, Col, Modal, Typography } from "antd";
const ManageDeleteModal = (props) => {
  const { Text } = Typography;
  const { open, handleOk, handleSave = () => {}, data = "" } = props;

  return (
    <>
      <Modal
        className="LibraryWorkingModal"
        title={"Delete item"}
        onCancel={handleOk}
        open={open}
        footer={[
          <Col className="manage-delete-footer-container">
            <Button onClick={handleOk} className="cancel-button">
              CANCEL
            </Button>
            <Button onClick={() => handleSave()} className="delete-button">
              DELETE ITEM
            </Button>
          </Col>,
        ]}
      >
        <Col className="container-modal">
          <Text className="outer-text">
            Are you sure you want to delete{" "}
            <Text className="inner-text"> {data}</Text>? Once deleted it can’t
            be undone
          </Text>
        </Col>
      </Modal>
    </>
  );
};

export default ManageDeleteModal;
