import React from "react";
import { Col, Modal, Row, Typography } from "antd";
import { ReactComponent as SaveIcon } from "../../assets/icons/save-icon.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow-right.svg";
// import { ReactComponent as RefreshIcon } from "../../assets/icons/Refresh icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/Delete icon.svg";
import { useNavigate } from "react-router-dom";
const UploadItemsModal = ({ isModalOpen, setIsModalOpen, showModal }) => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const uploadSKU = () => {
    navigate("/admin/products/upload-sku");
  };

  // const updateSKU = () => {
  //   navigate("/admin/products/update-sku");
  // };
  const deleteSKU = () => {
    navigate("/admin/products/delete-sku");
  };
  return (
    <>
      <Modal
        title="How do you want to upload?"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Row style={{ padding: "24px 24px 80px 24px", gap: "1rem" }}>
          <Col
            style={{
              width: "100%",
              borderRadius: "1rem",
              border: "solid 1.5px #dedede",
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={uploadSKU}
          >
            <Col style={{ display: "flex", gap: "1rem" }}>
              <Col
                style={{
                  height: "48px",
                  width: "48px",
                  backgroundColor: "#abf5d1",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <SaveIcon />
              </Col>
              <Col style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Upload new/ Update SKU
                </Text>
                <Text>Items will be added or updated to MOB library</Text>
              </Col>
            </Col>
            <Col>
              <ArrowIcon />
            </Col>
          </Col>
          {/* <Col
            style={{
              width: "100%",
              borderRadius: "1rem",
              border: "solid 1.5px #dedede",
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={updateSKU}
          >
            <Col style={{ display: "flex", gap: "1rem" }}>
              <Col
                style={{
                  height: "48px",
                  width: "48px",
                  backgroundColor: "#fde9c8",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <RefreshIcon />
              </Col>
              <Col style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Update existing SKU
                </Text>
                <Text>Existing items will be updated in MOB library</Text>
              </Col>
            </Col>
            <Col>
              <ArrowIcon />
            </Col>
          </Col> */}
          <Col
            style={{
              width: "100%",
              borderRadius: "1rem",
              border: "solid 1.5px #dedede",
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={deleteSKU}
          >
            <Col style={{ display: "flex", gap: "1rem" }}>
              <Col
                style={{
                  height: "48px",
                  width: "48px",
                  backgroundColor: "#ffebe6",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <DeleteIcon />
              </Col>
              <Col style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Delete SKU
                </Text>
                <Text>Uploaded items will be deleted from MOB library</Text>
              </Col>
            </Col>
            <Col>
              <ArrowIcon />
            </Col>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default UploadItemsModal;
