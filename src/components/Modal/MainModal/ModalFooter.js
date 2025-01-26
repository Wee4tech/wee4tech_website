import React from "react";
import { Button, Col } from "antd";
import "./modalfooter.css";
export const ModalFooter = (props) => {
  const {
    handleCancel = () => {},
    handleSave = () => {},
    cancelText,
    saveText,
    saveButtonCss,
  } = props;
  return (
    <>
      <Col className="footer-main-container">
        <Button onClick={handleCancel} className="footer-cancel-button">
          {cancelText}
        </Button>
        <Button
          className={saveButtonCss || "footer-save-button"}
          onClick={handleSave}
        >
          {saveText}
        </Button>
      </Col>
    </>
  );
};
