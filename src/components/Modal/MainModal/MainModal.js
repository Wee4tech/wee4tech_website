import React from "react";
import { Modal } from "antd";
import "./mainmodal.css";
export const MainModal = (props) => {
  const {
    open,
    handleCancel = () => {},
    // handleSave = () => {},
    handleCloseModal = () => {},
    footer = [],
    title,
  } = props;
  return (
    <>
      <Modal
        className="add_image"
        title={title}
        open={open}
        onOk={handleCancel}
        onCancel={() => {
          handleCloseModal();
        }}
        footer={footer}
      >
        {props.children}
      </Modal>
    </>
  );
};
