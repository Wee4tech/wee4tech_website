import React from "react";
import { Button, Col, Modal, Typography } from "antd";
const { Text } = Typography;

const StatusModal = ({ open, setOpen, handleOk, data }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        title="Are you sure?"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Col className="addFile-wrapper">
            <Button key="back" className="cancel-btn" onClick={handleCancel}>
              CANCEL
            </Button>
            <Button
              key="submit"
              type="primary"
              className="submit-btn"
              onClick={handleOk}
              style={{ backgroundColor: "#bf2600" }}
            >
              {` MARK IT AS ${data?.is_active ? "INACTIVE" : "ACTIVE"}`}
            </Button>
          </Col>
        }
      >
        <Col
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            height: "200px",
          }}
        >
          <Text style={{ fontSize: "20px", fontWeight: 500 }}>
            {`Do you want to mark "${
              data?.vendor_name || data?.productName
            }" as ${data?.is_active ? "inactive" : "active"}?`}
          </Text>
          <Text style={{ fontSize: "16px" }}>
            {data?.is_active
              ? "It will mark it as inactive and customers will not be able to see it in the website"
              : "It will mark it as active and customers will be able to see it in the website"}
          </Text>
        </Col>
      </Modal>
    </>
  );
};
export default StatusModal;
