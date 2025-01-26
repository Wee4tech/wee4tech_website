import React from "react";
import { Avatar, Col, Modal, Row, Typography } from "antd";
import { ReactComponent as TableShopIcon } from "../../../assets/icons/TableShopicon.svg";
import "./RequestDetailsByCustmerModal.css";
import { ReactComponent as PhoneIcon } from "../../../assets/icons/PhoneIcon.svg";

const RequestDetailsByCustmerModal = ({
  isModalOpen,
  setIsModalOpen,
  listData,
}) => {

  const { Text } = Typography;
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Seller details"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Row style={{ padding: "24px 0", flexDirection: "column" }}>
          <Col className="container-modal">
            <Avatar
              shape="square"
              style={{
                backgroundColor: "#f3f2ef",
                borderRadius: "16px",
              }}
              size={60}
              icon={<TableShopIcon style={{ marginTop: "12px" }} />}
            />
            <Col className="text-container-modal">
              <Text className="text-1">
                {listData?.product_details?.vendor_name}
              </Text>
              <Text className="text-2">
                BMPID: {listData?.product_details?.bmp_id}
              </Text>
            </Col>
          </Col>
          <Col style={{ backgroundColor: "#f1f1f2", height: "12px" }}></Col>
          <Col className="modal-container-2">
            <Text className="text-contact">Contact person</Text>
            <Text className="name-text">
              {listData?.product_details?.vendor_contact_person}
            </Text>
            <Text className="text-contact">Primary number</Text>
            <Col style={{ marginBottom: "10px" }}>
              <PhoneIcon style={{ marginRight: "20px" }} />{" "}
              <Text className="text-phone-number">
                +91 {listData?.product_details?.vendor_phone_number}
              </Text>
            </Col>
            {/* <Text className="text-contact">Secondary number</Text>
            <Col style={{ marginBottom: "10px" }}>
              <PhoneIcon style={{ marginRight: "20px" }} />{" "}
              <Text className="text-phone-number">
                +91 {listData?.rfq_created_by?.phone_number}
              </Text>
            </Col> */}
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default RequestDetailsByCustmerModal;
