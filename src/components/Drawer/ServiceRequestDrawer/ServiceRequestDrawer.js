import React, {useEffect, useState} from "react";
import {
  Drawer,
  Typography,
  Col,
  Avatar,
  Button,
  Tag,
  Form,
  Tooltip,
  Select,
  Image,
} from "antd";
import {Option} from "antd/es/mentions";
import {ReactComponent as CrossIcon} from "../../../assets/icons/x (3).svg";
import {ReactComponent as FileIcon} from "../../../assets/icons/file-copy.svg";
import {ReactComponent as DocIcon} from "../../../assets/icons/doc.svg";
import {ReactComponent as PdfIcon} from "../../../assets/icons/pdf.svg";
import {ReactComponent as XlsIcon} from "../../../assets/icons/xls.svg";
import "./ServiceRequestDrawer.css";
import {
  
  dateFormat,
  extractFileFormat,
  getNameInitials,
  handlePdfDownload,
  string_dot,
  testFileUrl,
} from "../../../commonFuntions/CommonUtilFunctions";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../NotificationToast/NotificationToast";
import AddCommentModal from "../../Modal/AddCommentModal/AddCommentModal";
import {serviceRequestStatusOption} from "../../../commonUtils/commonUtils";

const {Title, Text} = Typography;

const ServiceRequestDrawer = ({
  drawerVisible,
  setDrawerVisible,
  data,
  updateStatusApi,
  addCommentApi,
  isSuccessAddCommentServiceRequest,
}) => {
  const [openModalCarousel, setOpenModalCarousel] = useState(false);
  const [serviceStatus, setServiceStatus] = useState("");
  const handleChangeStatus = (value) => {
    setServiceStatus(value);
  };
  const handleChangeStatusApi = async () => {
    const param = {
      service_request_id: data?.service_request_id,
      status: serviceStatus,
    };
    const response = await updateStatusApi(param);
    if (response?.data?.status) {
      showSuccessToast(response?.data?.message);
      closeDrawer();
    } else {
      showErrorToast(response?.error?.data?.message);
    }
  };
  const handleCarouselModal = () => {
    setOpenModalCarousel(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
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
  useEffect(() => {
    if (drawerVisible) {
      setServiceStatus(data?.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerVisible]);
  useEffect(() => {
    if (isSuccessAddCommentServiceRequest) {
      handleChangeStatusApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessAddCommentServiceRequest]);
  const statusCheck = ["Registered", "In Progress"].includes(serviceStatus);
  const saveDisabled = ["Registered"].includes(serviceStatus);
  const customerMessageFooterCheck = ["Resolved", "Redundant"].includes(
    data?.status
  );
  const handleViewPdf = (url) => {
    if (testFileUrl(url || "")) {
      handlePdfDownload(url);
    } else {
      showErrorToast("Something went wrong");
    }
  };
  return (
    <>
      <Form labelCol={{span: 24}} wrapperCol={{span: 24}} layout="vertical">
        <Drawer
          className="create-order-drawer service-request-drawer"
          size="large"
          title={
            <>
              <Col>
                <Col className="service-request-drawer-head-container">
                  <Title level={4} style={{margin: 0}}>
                    Service request
                  </Title>
                  <Col
                    className="service-request-drawer-cross-container"
                    onClick={closeDrawer}>
                    <CrossIcon />
                  </Col>
                </Col>
                <Col className="service-request-drawer-service-number-container">
                  <Text className="header-text" style={{margin: 0}}>
                    {data?.service_request_id}
                  </Text>
                  <Tag
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      padding: "6px 12px",
                    }}
                    >
                    {data?.status}
                  </Tag>
                </Col>
                <Col className="service-request-drawer-service-date-container">
                  <Text className="service-request-drawer-service-date">
                    {data?.created_at ? dateFormat(data?.created_at) : "N/A"}
                  </Text>
                </Col>
                {!customerMessageFooterCheck && (
                  <Col style={{marginTop: "20px"}}>
                    <Form.Item
                      label={
                        <Col
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            marginBottom: "5px",
                          }}>
                          <Text className="addVehicle-text-bold">Status</Text>
                        </Col>
                      }
                      style={{margin: 0, width: "100%"}}>
                      <Select
                        onChange={handleChangeStatus}
                        value={serviceStatus}>
                        {serviceRequestStatusOption?.map((option) => (
                          <Option key={option?.key} value={option?.label}>
                            {option?.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                )}
              </Col>
            </>
          }
          footer={
            customerMessageFooterCheck ? (
              []
            ) : (
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
                }}>
                <Button
                  onClick={() => {
                    closeDrawer();
                  }}
                  style={{
                    height: "48px",
                    fontWeight: 500,
                    fontSize: "14px",
                    width: "30%",
                  }}>
                  CANCEL
                </Button>
                <Button
                  onClick={() =>
                    statusCheck
                      ? handleChangeStatusApi()
                      : handleCarouselModal()
                  }
                  disabled={saveDisabled}
                  style={{
                    height: "48px",
                    width: "60%",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "white",
                    backgroundColor: saveDisabled ? "#9da7b2" : "#0354a3",
                    border: "none",
                  }}>
                  {statusCheck ? "SAVE" : "ADD COMMENT TO UPDATE"}
                </Button>
              </Col>
            )
          }
          placement="right"
          closable={false}
          onClose={closeDrawer}
          visible={drawerVisible}>
          <Col className="service-request-drawer-service-body-main-container">
            <Text className="addVehicle-text-bold">Issue type</Text>
            <Col className="service-request-drawer-service-body-main-payment-link">
              <Text className="service-request-drawer-service-body-main-payment-link-text">
                {data?.issue_type}
              </Text>
            </Col>
            {data?.comments && (
              <Col className="service-request-drawer-service-body-main-comment-container">
                <Text className="service-request-drawer-service-body-main-comment-heading">
                  Comments
                </Text>
                <Text className="service-request-drawer-service-body-main-comment-text">
                  {data?.comments}
                </Text>
              </Col>
            )}
          </Col>
          <Col className="drawer-divider"></Col>
          {data?.images?.length !== 0 && (
            <>
              <Col
                className="service-request-drawer-service-body-main-container"
                style={{paddingTop: "16px"}}>
                <Text className="addVehicle-text-bold">Pictures</Text>
                <Col className="service-request-drawer-service-body-main-image-container">
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(
                          `current index: ${current}, prev index: ${prev}`
                        ),
                    }}>
                    {data?.images?.map((item) => {
                      const imageCheck = testFileUrl(item?.image);
                      const file = extractFileFormat(item?.image);
                      return (
                        <>
                          {imageCheck ? (
                            <>
                              <Col
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                }}>
                                <Avatar
                                  onClick={() => {
                                    handleViewPdf(item?.image);
                                  }}
                                  shape="square"
                                  style={{
                                    backgroundColor: "#f3f2ef",
                                    borderRadius: "16px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  size={100}
                                  src={item?.image || ""}
                                  icon={
                                    file?.fileFormat === "pdf" ? (
                                      <PdfIcon />
                                    ) : ["xls", "xlsx"]?.includes(
                                        file?.fileFormat
                                      ) ? (
                                      <XlsIcon />
                                    ) : ["doc", "docx"]?.includes(
                                        file?.fileFormat
                                      ) ? (
                                      <DocIcon />
                                    ) : null
                                  }
                                />
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "normal",
                                    color: "#0a243f",
                                    textAlign: "center",
                                  }}>
                                  {string_dot(file?.name, 15)}
                                </Text>
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                }}>
                                <Image
                                  width={100}
                                  height={100}
                                  src={item?.image}
                                  style={{borderRadius: "8px"}}
                                />
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "normal",
                                    color: "#0a243f",
                                    textAlign: "center",
                                  }}>
                                  {string_dot(file?.name, 15)}
                                </Text>
                              </Col>
                            </>
                          )}
                        </>
                      );
                    })}
                  </Image.PreviewGroup>
                </Col>
              </Col>
              <Col className="drawer-divider"></Col>
            </>
          )}
          <Col
            className="service-request-drawer-service-body-main-container"
            style={{paddingTop: "16px"}}>
            <Text className="addVehicle-text-bold">
              {customerMessageFooterCheck ? "Comments" : "Customer message"}
            </Text>

            {!customerMessageFooterCheck ? (
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
                    Hi {data?.user_data?.full_name || "N/A"}, with a/c number{" "}
                    {data?.user_data?.phone_number || "N/A"}. Your service
                    request have been <strong>SUCCESSFULLY GENERATED</strong>.
                    <br />
                    Service ID: {data?.service_request_id || "N/A"}
                    <br />
                    Sub order no: {data?.suborder?.suborder_id || "N/A"}
                  </Text>
                </Col>
                <Col className="link-wrapper link-wrapper-container">
                  <Col className="link-wrapper-sub-container">
                    <Col
                      target="_blank"
                      className="payment-links"
                      style={{cursor: "pointer"}}></Col>
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
            ) : (
              <>
                <Col className="service-comments-wrrapper">
                  {data?.service_comments?.map((item) => {
                    return (
                      <>
                        <Col className="service-request-drawer-service-body-main-container-customer-details">
                          <Col
                            className="profile-name"
                            style={{marginBottom: "10px"}}>
                            <Avatar
                              style={{
                                height: "40px",
                                width: "40px",
                                position: "relative",
                              }}>
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "40px",
                                }}>
                                <Text
                                  style={{
                                    color: "#0354a3",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}>
                                  {item?.added_by
                                    ? getNameInitials(item?.added_by)
                                    : `N/A`}
                                </Text>
                              </Col>
                            </Avatar>
                            <Col className="contact">
                              <Text
                                style={{
                                  fontWeight: 500,
                                  fontSize: "1rem",
                                  display: "flex",
                                  gap: "5px",
                                  alignItems: "center",
                                }}>
                                {item?.added_by || "N/A"}
                              </Text>
                              <Text className="service-request-drawer-service-date">
                                {item?.created_at &&
                                  dateFormat(item?.created_at)}
                              </Text>
                            </Col>
                          </Col>
                          <Text>{item?.comment || "N/A"}</Text>
                        </Col>
                      </>
                    );
                  })}
                </Col>
              </>
            )}
          </Col>
        </Drawer>
        <AddCommentModal
          isModalOpen={openModalCarousel}
          setIsModalOpen={setOpenModalCarousel}
          addCommentApi={addCommentApi}
          data={data}
        />
      </Form>
    </>
  );
};
export default ServiceRequestDrawer;
