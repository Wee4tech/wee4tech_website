import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Modal, Typography } from "antd";
import "./PublishedQuoteModal.css";
import { useDispatch, useSelector } from "react-redux";
import { publishQuoteUserSelector } from "../../redux/slices/publishQuote/selector";
import { dateFormat } from "../../commonFuntions/CommonUtilFunctions";
import { usePublishQuoteByIdMutation } from "../../apis/publishQuote";
import { useUpdateRFQQuoteMutation } from "../../apis/createQuote";
import { getRFQListFlag } from "../../redux/slices/rfqList/action";
import { showSuccessToast } from "../../NotificationToast/NotificationToast";

const PublishedQuoteModal = (props) => {
  const {
    token,
    isModalOpen,
    setIsModalOpen,
    modalDetail,
    phone_number,
    email,
  } = props;

  const publishQuoteData = useSelector(publishQuoteUserSelector);
  const [checkboxState, setCheckboxState] = useState({});
  const dispatch = useDispatch();
  const { quoteId, quoteItems, quoteTime, quoteTotalPrice, quote_status } =
    publishQuoteData;
  

  const [publishQuoteById, { isSuccess: publishedQuoteSuccess }] =
    usePublishQuoteByIdMutation();
  const [updateQuoteApi, { isSuccess: updateQuoteSuccess }] =
    useUpdateRFQQuoteMutation();

  useEffect(() => {
    if (publishedQuoteSuccess) {
      dispatch(getRFQListFlag(true));
    }
    if (updateQuoteSuccess) {
      dispatch(getRFQListFlag(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishedQuoteSuccess, updateQuoteSuccess]);
  useEffect(() => {
    if (quote_status === "Unpublished") {
      setCheckboxState({ email: false, phone_number: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote_status]);
  const handleCheckboxChange = (e, type) => {
    const targetValue = e.target.checked;
    setCheckboxState({ ...checkboxState, [type]: targetValue });
  };

  const handleOk = async () => {
    if (quote_status === "Unpublished") {
      const response = await publishQuoteById({
        quote_id: quoteId,
        quote_status: "Published",
        notify_email: checkboxState.email,
        notify_phone: checkboxState.phone_number,
      });
      if (response?.data?.message) {
        showSuccessToast(response?.data?.message);
      }
    } else if (quote_status === "Published" && token === "remove") {
      const response = await updateQuoteApi({
        quote_id: quoteId,
        quote_status: "Unpublished",
      });
      if (response?.data?.message) {
        showSuccessToast(response?.data?.message);
      }
    } else if (quote_status === "Accepted") {
      const response = await updateQuoteApi({
        quote_id: quoteId,
        quote_status: "Published",
      });
      if (response?.data?.message) {
        showSuccessToast(response?.data?.message);
      }
    } else {
      const response = await updateQuoteApi({
        quote_id: quoteId,
        quote_status: "Accepted",
      });
      if (response?.data?.message) {
        showSuccessToast(response?.data?.message);
      }
    }
    setIsModalOpen(false);
    setCheckboxState({ email: false, phone_number: false });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCheckboxState({ email: false, phone_number: false });
  };
  const { Title, Text } = Typography;

  const quoteTimeFormat = quoteTime && dateFormat(quoteTime);

  return (
    <>
      <Modal
        onCancel={handleCancel}
        title={modalDetail?.title}
        open={isModalOpen}
        style={{ color: "#0a243f", padding: "0px" }}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "0px 0px 8px 8px",
              padding: "20px 0px",
              backgroundColor: "#fff",
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
              onClick={handleOk}
              style={{
                height: "48px",
                maxWidth: "200px",
                width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                color: "white",
                backgroundColor:
                  quote_status === "Accepted" ? "#f0483e" : "#0354a3",
                border: "none",
              }}
            >
              {quote_status === "Accepted"
                ? "Remove"
                : quote_status === "Unpublished"
                ? `YES, PUBLISH`
                : token === "remove"
                ? `YES, UNPUBLISH`
                : `YES, SELECT`}
            </Button>
          </Col>,
        ]}
      >
        <Col
          style={{
            display: "flex",
            height: "400px",
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
            {quote_status === "Accepted"
              ? "Are you sure to remove this quote?"
              : quote_status === "Unpublished"
              ? `Do you want to publish quote ${
                  publishQuoteData?.index
                } for ₹ ${Number(quoteTotalPrice || 0)?.toFixed(2)}?`
              : `Do you want to mark quote ${
                  publishQuoteData?.index
                } for ₹ ${Number(quoteTotalPrice || 0)?.toFixed(
                  2
                )} as accepted by customer? `}
          </Title>
          <Text
            level={5}
            style={{
              color: "#0a243f",
              margin: 0,
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {quote_status === "Accepted"
              ? ""
              : quote_status === "Unpublished"
              ? "Once published this quote will be visible to the customer"
              : "Once accepted all other quotes will be rejected."}
          </Text>
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
                {publishQuoteData?.index && `Quote ${publishQuoteData?.index}`}
              </Text>
              <Text style={{ color: "#6c7c8c" }}>
                {quoteTime && quoteTimeFormat}
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
                  {quoteItems}
                </Text>
              </Col>
              <Col style={{ display: "flex", gap: "10px" }}>
                <Text style={{ color: "#6c7c8c" }}>Total: </Text>
                <Text style={{ color: "#0a243f", fontWeight: 500 }}>
                  ₹ {Number(quoteTotalPrice || 0)?.toFixed(2)}
                </Text>
              </Col>
            </Col>
          </Col>
          {quote_status === "Unpublished" && (
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
                {modalDetail?.message ||
                  "It will be shared with the customer through"}
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
                    {email && `Send mail to ${email}`}
                  </Checkbox>
                )}

                <Checkbox
                  onChange={(e) => handleCheckboxChange(e, "phone_number")}
                  checked={checkboxState?.phone_number}
                  style={{
                    color: "#0a243f",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {phone_number && `Send text message to ${phone_number}`}
                </Checkbox>
              </Col>
            </Col>
          )}
        </Col>
      </Modal>
    </>
  );
};

export default React.memo(PublishedQuoteModal);
