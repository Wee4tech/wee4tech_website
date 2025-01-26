import React from "react";
import "./CancelCreateQuoteModal.css";
import { Button, Col, Modal, Typography } from "antd";
const CancelCreateQuoteModal = (props) => {
  const { Text } = Typography;
  const {
    open,
    handleOk,
    handleSave = () => {},
    // data = ""
  } = props;

  return (
    <>
      <Modal
        className="Cancel-Create-QuoteModal"
        title={"You have unsaved changes"}
        onCancel={handleOk}
        open={open}
        footer={[
          <Col className="cancel-footer-container">
            <Button onClick={handleOk} className="cancel-button">
              CANCEL
            </Button>
            <Button
              onClick={() => handleSave()}
              className="cancel-delete-button"
            >
              Leave without saving
            </Button>
          </Col>,
        ]}
      >
        <Col className="container-modal">
          <Text className="outer-text">
            Unsaved changes to the quote will be lost. Are you sure you want to
            leave this screen?
            {/* <Text className="inner-text"> {data}</Text>? Once deleted it can’t
            be undone */}
          </Text>
        </Col>
      </Modal>
    </>
  );
};

export default CancelCreateQuoteModal;
