import React, { useEffect } from "react";
import { Button, Col, Modal, Typography } from "antd";

import { ReactComponent as PopDocument } from "../../assets/icons/duplicatedocument.svg";
import { useDuplicateRFQQuoteMutation } from "../../apis/createQuote";
import { useDispatch } from "react-redux";
import { getRFQListFlag } from "../../redux/slices/rfqList/action";
import {
  showErrorToast,
  showSuccessToast,
} from "../../NotificationToast/NotificationToast";

const RFQquoteModal = ({
  handleCancel,
  isModalOpen,
  handleOk,
  currentQuote,
}) => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [duplicateQuoteApi, { isSuccess: duplicateSuccess, isLoading }] =
    useDuplicateRFQQuoteMutation();
  const handleDuplicate = async () => {
    const response = await duplicateQuoteApi({ quote_id: currentQuote.id });
    if (response?.data?.status === true) {
      showSuccessToast(response?.data?.message);
    } else {
      showErrorToast(response?.error?.data?.message);
    }
    handleOk();
  };
  useEffect(() => {
    if (duplicateSuccess) {
      dispatch(getRFQListFlag(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duplicateSuccess]);
  return (
    <>
      <Modal
        onCancel={handleCancel}
        open={isModalOpen}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px 0px",
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
              onClick={() => handleDuplicate()}
              loading={isLoading}
              disabled={isLoading}
              style={{
                height: "48px",
                maxWidth: "200px",
                width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                border: "none",
                color: "white",
                backgroundColor: "#0354a3",
              }}
            >
              YES, DUPLICATE
            </Button>
          </Col>,
        ]}
      >
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            height: "250px",
            alignItems: " center",
            justifyContent: " flex-start",
            padding: "26px 16px 0 16px",
          }}
        >
          <PopDocument />
          <Title level={4} style={{ margin: 0 }}>
            Are you sure you want to duplicate Quote {currentQuote?.index} ?
          </Title>
        </Col>
      </Modal>
    </>
  );
};

export default RFQquoteModal;
