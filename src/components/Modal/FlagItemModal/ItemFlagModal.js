import React from "react";
import { Button, Col, Modal, Typography } from "antd";
import { ReactComponent as FlagItemImage } from "../../../assets/icons/flagitemimage.svg";

const { Text } = Typography;
const ItemFlagModal = (props) => {
  const { open, handleOk } = props;
  return (
    <>
      <Modal
        className="add_image"
        // title="Select flagging reason"
        open={open}
        onOk={handleOk}
        onCancel={() => {
          handleOk();
          //     handleCancel();
          //     setFileList(null);
        }}
        footer={[]}
      >
        <Col
          style={{
            height: "550px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "30px",
          }}
        >
          <Col>
            <Col
              style={{
                padding: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FlagItemImage />
            </Col>
            <Text
              style={{
                color: "#0a243f",
                display: "block",
                fontSize: "20px",
                fontWeight: 500,
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Item flagged
            </Text>
            <Text
              style={{
                color: "#0a243f",
                display: "block",
                fontSize: "14px",
                fontWeight: 400,
                textAlign: "center",
                width: "85%",
                margin: "0 auto",
              }}
            >
              This item has been flagged. Our team will look into it and update
              it. If there is any other issue please reach out to mob support.
            </Text>
          </Col>
          <Col
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => {
                handleOk();
                //   handleCancel();
                //   setFileList(null);
              }}
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                maxWidth: "120px",
                width: "100%",
              }}
            >
              GO BACK
            </Button>
          </Col>
        </Col>
      </Modal>
    </>
  );
};

export default ItemFlagModal;
