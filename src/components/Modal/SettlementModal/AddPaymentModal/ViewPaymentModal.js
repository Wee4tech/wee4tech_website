import React from "react";
import {
  Button,
  Col,
  Form,
  List,
  Modal,
  // Radio,
  // Select,
  // Tag,
  Typography,

} from "antd";
import "./AddPaymentModal.css";

import { handlePdfDownload } from "../../../../commonFuntions/CommonUtilFunctions";

const AddPaymentModal = ({
  openModal,
  onCancleModel,
  formData,
  setFormData,
  setDatePickerEmpty,
  fileList,
  setFileList,
  setPaymentMode,
  seller_name,
  editPayment,
}) => {
  const { Text } = Typography;

  const handleCancel = () => {
    onCancleModel(false);
    setFormData({ seller_name });
    setPaymentMode("");
    setFileList([]);
  };

  const customFileListRender = (fileList) => {
  
    if (!fileList || fileList.length === 0 || (fileList.length === 1 && fileList[0] === null)) {
        return null;
      }
    return (
      <List
        dataSource={fileList}
        style={{
          marginTop: "10px",
        }}
        renderItem={(item) => {
          return (
            <>
              <Col
                style={{
                  height: "60px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <Col
                  style={{ display: "flex", gap: "30px", alignItems: "center" }}
                >
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Text
                      style={{
                        color: "#0a243f",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {new URL(item).pathname.split('/').pop()}
                    </Text>
                  </Col>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  
                  <Button
                    style={{
                      background: "#f5f5f5",
                      color: "#0a243f",
                      fontWeight: 500,
                      fontSize: "14px",
                      border: "none",
                    }}
                    onClick={() => handlePdfDownload(item)}
                  >
                    View
                  </Button>
                </Col>
              </Col>
            </>
          );
        }}
      />
    );
  };
  return (
    <>
      <Modal
        title={"View summary"}
        open={openModal}
        onCancel={handleCancel}
        onOk={handleCancel}
        footer={[
          // <Col
          //   style={{
          //     display: "flex",
          //     justifyContent: "center",
          //     padding: "28px",
          //   }}
          // >
          //   <Button
          //     onClick={handleCancel}
          //     style={{
          //       height: "48px",
          //       fontWeight: 500,
          //       fontSize: "14px",
          //       maxWidth: "120px",
          //       width: "100%",
          //     }}
          //   >
          //     CANCEL
          //   </Button>
          // </Col>,
        ]}
      >
        <Form
          name="delivery_address"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            height: "360px",
            width: "100%",
            overflow: "auto",
          }}
          autoComplete="off"
        >
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2px 18px 18px 18px",
              gap: 12,
            }}
          >
             <Form.Item className="label-head-size" label={<Col className="label-head-size">{formData?.date}</Col>} style={{ margin: 0 }}></Form.Item>
             <Form.Item className="label-head-size" label={<Col className="label-size">Settlement amount</Col>} style={{ margin: 0 }}>₹ {formData?.settlement_amount}</Form.Item>
            
             <Form.Item className="label-head-size" label={<Col className="label-size">Payment mode</Col>} style={{ margin: 0 }}>{formData?.payment_mode}</Form.Item>
             <Form.Item className="label-head-size" label={<Col className="label-size">Payment Ref#</Col>} style={{ margin: 0 }}>{formData?.ref_no}</Form.Item>
  
          {formData?.upload_receipt !== null && (formData?.upload_receipt?.length === 1 && formData?.upload_receipt[0] !== null) && (
             <Form.Item className="label-head-size" label={<Col className="label-size">Reciept</Col>} style={{ margin: 0 }}>
            <Col>
              {formData?.upload_receipt?.length !== 0 && (
                <Col style={{ padding: "0px 0px" }}>
                  {customFileListRender(formData?.upload_receipt)}
                </Col>
              )}
            </Col>
            </Form.Item>
          )}
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default AddPaymentModal;
