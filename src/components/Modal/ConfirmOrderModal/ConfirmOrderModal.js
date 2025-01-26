import React, { useState } from "react";
import { Button, Checkbox, Col, Modal, Typography } from "antd";
import "./ConfirmOrderModal.css";

const { Title } = Typography;

const ConfirmOrderModal = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    editQuoteData,
    handleConfirmOrder,
    phone_number,
    email,
    loading,
  } = props;

  const [checkboxState, setCheckboxState] = useState({
    email: false,
    phone_number: false,
  });

  const handleCheckboxChange = (e, type) => {
    const targetValue = e.target.checked;
    setCheckboxState({ ...checkboxState, [type]: targetValue });
  };

  const handleSave = () => {
    handleConfirmOrder(checkboxState, editQuoteData?.id);
    // setIsModalOpen(false);
    // setCheckboxState({ email: false, phone_number: false });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCheckboxState({ email: false, phone_number: false });
  };

  return (
    <>
      <Modal
        onCancel={handleCancel}
        title={"Are you sure?"}
        // open={true}
        open={isModalOpen}
        style={{ color: "#0a243f", padding: "0px" }}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              // borderTop: "1px solid #dedede",
              borderRadius: "0px 0px 8px 8px",
              padding: "20px 0px",
              // boxShadow: "0 -6px 10px 0 rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              width: "100%",
            }}
          >
            <Button
              onClick={handleCancel}
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                maxWidth: "120px",
                width: "100%",
              }}
            >
              CANCEL
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              onClick={handleSave}
              style={{
                height: "48px",
                maxWidth: "200px",
                width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                color: "white",
                backgroundColor: "#0354a3",
                border: "none",
              }}
            >
              YES, CREATE ORDER
            </Button>
          </Col>,
        ]}
      >
        <Col
          style={{
            display: "flex",
            height: "250px",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "20px",
          }}
        >
          <Title
            level={4}
            style={{
              color: "#0a243f",
              margin: 0,
              marginBottom: "30px",
              fontWeight: 500,
              fontSize: "16px",
            }}
          >
            Are you sure that you want to create a new order? please make sure
            that all the deatils mentioned are okay
          </Title>

          <Col
            style={{ borderBottom: "1px solid #dedede", marginBottom: "20px" }}
          ></Col>
          <Col>
            <Title
              level={5}
              style={{
                color: "#0a243f",
                margin: 0,
                marginBottom: "20px",
                fontWeight: 500,
              }}
            >
              How do you want to share with the customer?
            </Title>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Checkbox
                onChange={(e) => handleCheckboxChange(e, "email")}
                checked={checkboxState?.email}
                style={{
                  color: "#0a243f",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {`Send mail to ${email}`}
              </Checkbox>

              <Checkbox
                onChange={(e) => handleCheckboxChange(e, "phone_number")}
                checked={checkboxState?.phone_number}
                style={{
                  color: "#0a243f",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {`Send text message to ${phone_number}`}
              </Checkbox>
            </Col>
          </Col>
        </Col>
      </Modal>
    </>
  );
};

export default React.memo(ConfirmOrderModal);
