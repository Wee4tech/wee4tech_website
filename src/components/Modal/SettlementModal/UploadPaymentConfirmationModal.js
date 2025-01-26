import React from "react";
import { Button, Col, Modal, List, Typography } from "antd";
import "./UploadPaymentModel.css";
import { bytesToSize } from "../../../commonFuntions/CommonUtilFunctions";

const { Title, Text } = Typography;

const UploadPaymentConfirmationModal = (props) => {
  const { data, handleOk, onBack, open, setFileList, handleSave } = props;

  return (
    <Modal
      title="Are you sure?"
      open={open}
      onOk={() => {
        handleOk();
        setFileList([]);
      }}
      onCancel={onBack}
      className="confirmation-modal"
      footer={[
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            borderRadius: "0px 0px 16px 16px",
            height: "96px",
            backgroundColor: "#fff",
          }}
        >
          <Button
            style={{
              height: "48px",
              fontWeight: 500,
              fontSize: "14px",
              minWidth: "140px",
              width: "100%",
            }}
            onClick={onBack}
          >
            Back
          </Button>
        </Col>,

        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            borderRadius: "0px 0px 16px 16px",
            height: "96px",
          }}
        >
          <Button
            style={{
              height: "48px",
              fontWeight: 500,
              fontSize: "14px",
              minWidth: "250px",
              width: "100%",
              backgroundColor: "#0354a3",
              color: "#fff",
            }}
            onClick={() => handleSave()}
          >
            Upload Payment
          </Button>
        </Col>,
      ]}
    >
      <Title level={5} style={{ padding: "18px", margin: "0px" }}>
        Are you sure you want to upload this {data.length} files?
      </Title>
      <List
        className="uploaded-images-list"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Text>{item?.name}</Text>
            <Text>{bytesToSize(item.size)}</Text>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default UploadPaymentConfirmationModal;
