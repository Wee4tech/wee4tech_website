import React from "react";
import { Button, Col, Modal, Typography } from "antd";
import "./UpdateOrderModal.css";
import { ReactComponent as CashIcon } from "../../../assets/icons/cash-wallet.svg";
const { Text } = Typography;

const UpdateOrderModal = (props) => {
  const { isModalOpen, setIsModalOpen, handleSaveApi, loading } = props;

  const handleSave = () => {
    handleSaveApi();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        onCancel={handleCancel}
        title={"You Want to Update this Order?"}
        // closeIcon={null}
        // open={true}
        onOk={handleCancel}
        open={isModalOpen}
        style={{ color: "#0a243f", padding: "0px" }}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              borderTop: "1px solid #dedede",
              borderRadius: "0px 0px 8px 8px",
              padding: "20px 0px",
              boxShadow: "0 -6px 10px 0 rgba(0, 0, 0, 0.1)",
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
              No
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
              YES, UPDATE ORDER
            </Button>
          </Col>,
        ]}
      >
        <Col
          style={{
            display: "flex",
            height: "150px",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: "#0a243f",
                marginBottom: "20px",
                fontWeight: 500,
                fontSize: "20px",
              }}
            >
              Are you sure you want to edit this order?
            </Text>
            <Text
              style={{
                color: "#0a243f",
                fontWeight: 500,
                fontSize: "12px",
              }}
            >
              Editing order will make order to regenerate
            </Text>
          </Col>
          
        </Col>
        <Col className="payment-link" style={{margin:"0px 20px 20px 20px",background:"#ddfbed"}}>
         <Text>If excess paid - it will be added to mobWALLET {" "}
         <CashIcon  style={{width:"16px",height:"16px"}} />  {" "} after delivery
         </Text>
        </Col>
      </Modal>
    </>
  );
};

export default UpdateOrderModal;
