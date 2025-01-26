import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Modal, Tooltip, Typography } from "antd";
import { dateFormat } from "../../../commonFuntions/CommonUtilFunctions";
import "./ConvertedOrderModal.css";
import {
  demandRupifiUrl,
  showDemandRupifiUrl,
} from "../../../commonUtils/commonUtils";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../NotificationToast/NotificationToast";
import { ReactComponent as FileIcon } from "../../../assets/icons/file-copy.svg";

const { Title, Text } = Typography;

const ConvertedOrderModal = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    editQuoteData,
    dataSource,
    // bmpPrice,
    grandPrice,
    handleConvertOrder,
    loading,
    isMobPro,
  } = props;

  const [checkboxState, setCheckboxState] = useState({
    email: false,
    phone_number: false,
  });

  // setCheckboxState({ email: false, phone_number: false });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let quoteTotalPrice = grandPrice?.total;
  let quoteItems = 0;
  dataSource?.map((table, index) => {
    quoteItems += table?.length;
    return null;
  });

  const handleCheckboxChange = (e, type) => {
    const targetValue = e.target.checked;
    setCheckboxState({ ...checkboxState, [type]: targetValue });
  };

  const handleSave = () => {
    handleConvertOrder(checkboxState, editQuoteData?.id);
    // setIsModalOpen(false);
    // setCheckboxState({ email: false, phone_number: false });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCheckboxState({ email: false, phone_number: false });
  };

  const email = editQuoteData?.rfq_order?.rfq_created_by?.email;
  const phone_number = editQuoteData?.rfq_order?.rfq_created_by?.phone_number;
  const handleNavigateDemand = (url) => {
    // const id = item?.order?.id;
    // to={`${demandRupifiUrl}${item?.checkout_url}`}
    window.open(`${url}`, "_blank");

    // window.open(`${"uate/"}${demandRupifiUrl}${item}`, "_blank");
  };
  const copyLinkToClipboard = async (linkText) => {
    // const linkText = paymentLinkRef.current.textContent;

    try {
      await navigator.clipboard.writeText(`${linkText}`);
      showSuccessToast("Link copied to clipboard successfully");
    } catch (err) {
      showErrorToast("Failed to copy link to clipboard", err);
    }
  };
  useEffect(() => {
    if (isMobPro) {
      setCheckboxState({ ...checkboxState, phone_number: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);
  const handleCopyLinkDontConvert = () => {
    copyLinkToClipboard(`${demandRupifiUrl}${editQuoteData?.checkout_url}`);
    handleCancel();
  };
  return (
    <>
      <Modal
        onCancel={handleCancel}
        title={"Are you sure?"}
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
              // padding: "20px",
            }}
          >
            <Button
              onClick={() => (isMobPro ? handleSave() : handleCancel())}
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                // maxWidth: "120px",
                width: "fit-content",
              }}
            >
              {isMobPro ? "YES, CREATE ORDER" : "CANCEL"}
            </Button>
            <Button
              loading={loading}
              onClick={() =>
                isMobPro ? handleCopyLinkDontConvert() : handleSave()
              }
              style={{
                height: "48px",
                // maxWidth: "200px",
                width: "fit-content",
                fontWeight: 500,
                fontSize: "14px",
                color: "white",
                backgroundColor: "#0354a3",
                border: "none",
              }}
            >
              {isMobPro ? "COPY LINK & DON’T CONVERT" : "YES, CREATE ORDER"}
            </Button>
          </Col>,
        ]}
      >
        <Col
          style={{
            display: "flex",
            minHeight: "400px",
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
              marginBottom: "10px",
              fontWeight: 500,
            }}
          >
            {isMobPro
              ? "Are you sure that you want to convert this quote to order? It is recommended that the customer accepts the order via this link."
              : "Are you sure that you want to convert this quote to order? please make sure that all the deatils mentioned are okay"}
          </Title>
          {isMobPro && (
            <>
              <Col
                style={{ borderTop: "1px solid #dedede", padding: "24px 0px" }}
              >
                <Col
                  className="payment-link"
                  style={{
                    border: "solid 1px rgba(0, 0, 0, 0)",
                    backgroundColor: "#e8f6c6",
                    padding: "12px",
                  }}
                >
                  <Col className="link-wrapper">
                    {/* <Text>Customer checkout link:</Text> */}
                    <Col
                      // ref={paymentLinkRef}
                      // to={`${demandRupifiUrl}${item?.checkout_url}`}
                      onClick={() =>
                        handleNavigateDemand(
                          `${demandRupifiUrl}${editQuoteData?.checkout_url}`
                        )
                      }
                      target="_blank"
                      // rel="noopener noreferrer"
                      className="payment-links"
                      style={{ cursor: "pointer" }}
                    >
                      {showDemandRupifiUrl || "N/A"}
                    </Col>
                  </Col>
                  <Tooltip title="Copy url" color={"#fff"} key={"#2973f0"}>
                    <Col
                      className="link-wrapperI"
                      onClick={() =>
                        copyLinkToClipboard(
                          `${demandRupifiUrl}${editQuoteData?.checkout_url}`
                        )
                      }
                    >
                      <FileIcon />
                      <Text>Copy link</Text>
                    </Col>
                  </Tooltip>
                </Col>
              </Col>
            </>
          )}
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100px",
              padding: "24px 20px",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
              color: "#2973f0",
              marginBottom: "30px",
            }}
          >
            <Col
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#0a243f", fontWeight: 500 }}>
                {`Quote ${editQuoteData?.index}`}
              </Text>
              <Text style={{ color: "#6c7c8c" }}>
                {editQuoteData?.created_at &&
                  dateFormat(editQuoteData?.created_at)}
              </Text>
            </Col>
            <Col
              style={{
                display: "flex",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <Col style={{ display: "flex", gap: "10px" }}>
                <Text style={{ color: "#6c7c8c" }}>Items: </Text>
                <Text style={{ color: "#0a243f", fontWeight: 500 }}>
                  {quoteItems || 0}
                </Text>
              </Col>
              <Col style={{ display: "flex", gap: "10px" }}>
                <Text style={{ color: "#6c7c8c" }}>Total: </Text>
                <Text style={{ color: "#0a243f", fontWeight: 500 }}>
                  ₹ {quoteTotalPrice ? Number(quoteTotalPrice)?.toFixed(2) : 0}
                </Text>
              </Col>
            </Col>
          </Col>

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
              {email && (
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
              )}

              {phone_number && (
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
              )}
            </Col>
          </Col>
        </Col>
      </Modal>
    </>
  );
};

export default React.memo(ConvertedOrderModal);
