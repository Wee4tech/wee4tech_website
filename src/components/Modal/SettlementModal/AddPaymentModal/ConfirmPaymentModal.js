import React from "react";
import {
  Button,
  Col,
  Modal,
  // List,
  Typography,
} from "antd";
import { FileOutlined } from "@ant-design/icons";
const { Text } = Typography;

const ConfirmPaymentModal = (props) => {
  const { data, handleOk, onBack, open, handleSave } = props;

  return (
    <Modal
      title="Are you sure?"
      open={open}
      onOk={handleOk}
      onCancel={handleOk}
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
            ADD PAYMENT{" "}
          </Button>
        </Col>,
      ]}
    >
      <Col style={{ padding: "24px" }}>
        <Text
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "normal",
            color: "#0a243f",
            marginBottom: "10px",
          }}
        >
          Settlement amount
        </Text>
        <Text
          style={{
            display: "block",
            fontSize: "24px",
            fontWeight: 500,
            color: "#0a243f",
            marginBottom: "10px",
          }}
        >
          ₹ {data?.settlement_amount}
        </Text>
        <Text
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "normal",
            color: "#0a243f",
            marginBottom: "10px",
          }}
        >
          Payment mode
        </Text>
        <Text
          style={{
            display: "block",
            fontSize: "24px",
            fontWeight: 500,
            color: "#0a243f",
            marginBottom: "10px",
          }}
        >
          {data?.payment_mode}
        </Text>
        <Text
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "normal",
            color: "#0a243f",
            marginBottom: "10px",
          }}
        >
          Payment ref no.
        </Text>
        <Text
          style={{
            display: "block",
            fontSize: "24px",
            fontWeight: 500,
            color: "#0a243f",
            marginBottom: "10px",
          }}
        >
          {data?.ref_no}
        </Text>
        <Text
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "normal",
            color: "#0a243f",
            marginBottom: "10px",
          }}
        >
          Reciept
        </Text>
        {data?.upload_receipt?.map((item, index) => {
          return (
            <>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "52px",
                  padding: " 14px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                  color: " #2973f0",
                  marginBottom: "10px",
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <FileOutlined />
                  <Text style={{ color: " #2973f0" }}>{item?.name}</Text>
                </Col>
                <Text style={{ color: " #2973f0", cursor: "pointer" }}>
                  View
                </Text>
              </Col>
            </>
          );
        })}
      </Col>
    </Modal>
  );
};

export default ConfirmPaymentModal;
