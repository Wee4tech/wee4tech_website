import React from "react";
import {Button, Col, Modal, Typography, Tooltip} from "antd";
import {ReactComponent as FlagItemImage} from "../../../assets/icons/serviceIcon.svg";
import {ReactComponent as FileIcon} from "../../../assets/icons/file-copy.svg";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../NotificationToast/NotificationToast";

const {Text} = Typography;
const ViewServiceRequestModal = (props) => {
  const {open, handleOk, data, handleOpenDrawer} = props;
  const textMsg = `Hi ${data?.user_data?.full_name}, with a/c number ${data?.user_data?.phone_number}. Your service request have been *SUCCESSFULLY GENERATED*.
Service ID: ${data?.service_request_id}
Sub order no: ${data?.suborder?.suborder_id}`;
  const copyLinkToClipboard = async (linkText, text) => {
    // const linkText = paymentLinkRef.current.textContent;

    try {
      await navigator.clipboard.writeText(`${linkText}`);
      showSuccessToast(`${text} copied to clipboard successfully`);
    } catch (err) {
      showErrorToast(`Failed to copy ${text} to clipboard`, err);
    }
  };
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
        footer={[]}>
        <Col
          style={{
            height: "550px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <Col>
            <Col
              style={{
                padding: "40px 0px 10px 0px",
                display: "flex",
                justifyContent: "center",
              }}>
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
              }}>
              Service request submitted!
            </Text>
            <Text
              style={{
                color: "#0a243f",
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                textAlign: "center",
                marginBottom: "10px",
              }}>
              Request ID: {data?.service_request_id}
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
              }}>
              Please monitor the progress of the service request and ensure the
              ticket status is kept up-to-date. Once resolved, kindly mark it as
              ‘Resolved’ or ‘Redundant’ to effectively close the ticket.
            </Text>
          </Col>
          <Col style={{width: "90%", margin: "0 auto", padding: "10px 0px"}}>
            <Col
              className="payment-link payment-link-container"
              style={{
                border: "solid 1px rgba(0, 0, 0, 0)",
                backgroundColor: "#e8f6c6",
                padding: "12px",
                marginTop: "5px",
                fontWeight: "normal",
              }}>
              <Col>
                <Text>
                  Hi {data?.user_data?.full_name}, with a/c number{" "}
                  {data?.user_data?.phone_number}. Your service request have
                  been <strong> SUCCESSFULLY GENERATED</strong>.
                  <br />
                  Service ID: {data?.service_request_id}
                  <br />
                  Sub order no: {data?.suborder?.suborder_id}
                </Text>
              </Col>
              <Col className="link-wrapper link-wrapper-container">
                <Col className="link-wrapper-sub-container">
                  <Col
                    // ref={paymentLinkRef}
                    // to={`${demandRupifiUrl}${item?.checkout_url}`}
                    // onClick={() =>
                    //   handleNavigateDemand(
                    //     `${demandRupifiUrl}${item?.checkout_url}`
                    //   )
                    // }
                    target="_blank"
                    // rel="noopener noreferrer"
                    className="payment-links"
                    style={{cursor: "pointer"}}>
                    {/* {showDemandRupifiUrl || "N/A"} */}
                  </Col>
                </Col>
                <Tooltip title="Copy Text" color={"#fff"} key={"#2973f0"}>
                  <Col
                    className="link-wrapperI"
                    onClick={() => copyLinkToClipboard(textMsg, "Text")}>
                    <FileIcon />
                    <Text>Copy Text</Text>
                  </Col>
                </Tooltip>
              </Col>
            </Col>
          </Col>
          <Col
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "16px",
            }}>
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
              }}>
              CANCEL
            </Button>
            <Button
              onClick={() => handleOpenDrawer()}
              style={{
                height: "48px",
                // width: "60%",
                fontWeight: 500,
                fontSize: "14px",
                color: "white",
                backgroundColor: "#0354a3",
                border: "none",
              }}>
              VIEW REQUEST DETAILS
            </Button>
          </Col>
        </Col>
      </Modal>
    </>
  );
};

export default ViewServiceRequestModal;
