import React from "react";
import { Avatar, Button, Col, Input, Modal, Typography } from "antd";
import { useSelector } from "react-redux";
import { sellerCatalogueTableProductSelector } from "../../../redux/slices/sellerCatalogue/selector";
import { ReactComponent as DefaultIcon } from "../../../assets/icons/default.svg";
import "./FlagItemModal.css";
import TextArea from "antd/es/input/TextArea";

const { Title, Text } = Typography;
const FlagItemModal = (props) => {
  const { open, handleOk, handleSave,reason, setReason,comments, setComments,isFlagLoading } = props;
  const rowData = useSelector(sellerCatalogueTableProductSelector);
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };
  return (
    <>
      <Modal
        className="add_image"
        title="Select flagging reason"
        open={open}
        onOk={handleOk}
        onCancel={() => {
          handleOk();
          //     handleCancel();
          //     setFileList(null);
        }}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              borderTop: "1px solid #dedede",
              borderRadius: "0px 0px 16px 16px",
              height: "96px",
              boxShadow: "0 -6px 10px 0 rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              width: "100%",
            }}
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
              CANCEL
            </Button>
            <Button
              onClick={() => handleSave(rowData)}
              loading={isFlagLoading}
              style={{
                height: "48px",
                maxWidth: "200px",
                width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                color: "white",
                backgroundColor: "#bf2600",
                border: "none",
              }}
            >
              FLAG ITEM
            </Button>
          </Col>,
        ]}
      >
        <Col
          style={{
            height: "400px",
            // padding: "20px 30px",
          }}
        >
          <Col
            style={{
              // height: "400px",
              padding: "20px 30px",
            }}
          >
            <Col
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <Avatar
                style={{
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f1f1f2",
                }}
                shape="square"
                src={rowData.image}
                alt="Avatar"
                icon={<DefaultIcon width={20} height={20} />}
              />
              <Col>
                <Title
                  style={{
                    color: "#0a243f",
                    // margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {rowData?.productName}
                </Title>
                <Title
                  style={{
                    color: "#0a243f",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  MOBSKU: {rowData?.mob_sku}
                </Title>
              </Col>
            </Col>
          </Col>
          <Col style={{ height: "16px", backgroundColor: "#f1f1f2" }}></Col>
          <Col style={{ height: "160px", padding: "20px 30px" }}>
            <Text
              style={{ color: "#0a243f", fontSize: "16px", fontWeight: 500 }}
             >
              Reason{" "}
            </Text>
            <Text
              style={{ color: "#bf2600", fontSize: "16px", fontWeight: 500 }}
            >
              *
            </Text>
            <Input   onChange={handleReasonChange}  value={reason} className="reason-input" />
            <Text
              style={{
                color: "#0a243f",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Comments
            </Text>
            <TextArea  onChange={handleCommentsChange}   value={comments} className="comments-textarea" rows={4} />
          </Col>
        </Col>
      </Modal>
    </>
  );
};

export default FlagItemModal;
