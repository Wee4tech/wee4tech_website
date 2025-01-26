import React from "react";
import "./AddCatalogueModal.css";
import { Button, Col, Modal, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const AddCatalogueModal = (props) => {
  const { Text } = Typography;
  const {
    open,
    handleOk = () => {},
    // handleSave = () => {},
    // data = "",
    title = "",
    ButtonText = "Ok",
    // CancelText = "Cancel",
  } = props;

  return (
    <>
      <Modal
        className="DeleteModalNotification"
        title={title}
        onCancel={handleOk}
        open={open}
        footer={[]}
      >
        <Col className="cataloge-container-modal">
          <ExclamationCircleOutlined
            style={{ fontSize: "80px", color: "#ebc255" }}
          />
          <Text className="cataloge-outer-text">
            {/* Pending amount should be less then {data} */}
            Selected order value is greater than settelment amount.
          </Text>
          <Col className="cataloge-footer-container">
            <Button
              onClick={() => handleOk()}
              className="modal-cataloge-button"
            >
              {ButtonText}
            </Button>
          </Col>
        </Col>
      </Modal>
    </>
  );
};

export default AddCatalogueModal;
