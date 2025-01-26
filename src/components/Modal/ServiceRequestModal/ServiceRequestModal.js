import React, {useEffect, useState} from "react";
import "./ServiceRequestModal.css";
import {DownOutlined} from "@ant-design/icons";
import {ReactComponent as TableShopIcon} from "../../../assets/icons/TableShopicon.svg";
import {ReactComponent as FileInvoiceIcon} from "../../../assets/icons/invoiceButtonIcon.svg";
import {ReactComponent as RemoveIcon} from "../../../assets/icons/RemoveImageIcon.svg";
import {
  Modal,
  Col,
  Button,
  Row,
  Avatar,
  Typography,
  Form,
  Input,
  Upload,
  List,
  Dropdown,
  Menu,
} from "antd";
import {
  bytesToSize,
  handlePdfDownload,
} from "../../../commonFuntions/CommonUtilFunctions";
import {issueTypeOptions} from "../../../commonUtils/commonUtils";
const ServiceRequestModal = (props) => {
  const {
    isModalOpen,
    title = "Add Item",
    setIsModalOpen,
    saveText = "Save",
    data,
    handleSave = () => {},
    initialValues,
    serviceRequestForm,
    setServiceRequestForm,
    form,
    loading,
    setserviceRequestModalState,
    index
  } = props;
  
  const [fileList, setFileList] = useState([]);
  const [fileListError, setFileListError] = useState(false);
  const {Dragger} = Upload;
  const {Text} = Typography;
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileListError(false);
    setServiceRequestForm(initialValues);
    setserviceRequestModalState((prevStates) => ({
      ...prevStates,
      [index]: { isOpen: false },
    }));
  };
  const handleFileChange = (info) => {
    if (info?.fileList?.length <= 6) {
      setFileList([...info?.fileList]);
      setServiceRequestForm((prev) => ({
        ...prev,
        images: [...info?.fileList],
      }));
      setFileListError(false);
    } else {
      setFileListError(true);
    }
  };
  const handleRemoveFile = (file) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
    setServiceRequestForm((prev) => ({...prev, images: newFileList}));
    setFileListError(false);
  };
  const handleOnChange = (event) => {
    setServiceRequestForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleChange = (event) => {
    setServiceRequestForm((prev) => ({
      ...prev,
      issue_type: event?.key,
    }));
  };
  useEffect(() => {
    if (isModalOpen) {
      setFileList([]);
      setServiceRequestForm(() => ({
        ...initialValues,
        comments: "",
        issue_type: "",
        suborder: data?.id,
      }));
      form.resetFields();
      setFileListError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);
  const customFileListRender = (fileList) => {
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
                }}>
                <Col
                  style={{display: "flex", gap: "30px", alignItems: "center"}}>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}>
                    <Text
                      style={{
                        color: "#0a243f",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}>
                      {item?.name}
                    </Text>
                  </Col>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}>
                  <Text
                    style={{
                      color: "#0a243f",
                      fontSize: "14px",
                      fontWeight: 400,
                      opacity: 0.6,
                    }}>
                    {bytesToSize(item?.size)}
                  </Text>
                  <RemoveIcon onClick={() => handleRemoveFile(item)} />
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
        title={title}
        open={isModalOpen}
        // open={true}
        // onOk={handleAddVehicle}
        onCancel={handleCancel}
        footer={
          <Col className="addFile-wrapper">
            <Button key="back" className="cancel-btn" onClick={handleCancel}>
              CANCEL
            </Button>
            <Button
              type="primary"
              className="service-submit-btn"
              onClick={handleSave}
              loading={loading}
              disabled={!serviceRequestForm?.issue_type}>
              {saveText}
            </Button>
          </Col>
        }>
        <Col style={{height: "400px", overflow: "auto"}}>
          <Form layout="vertical">
            <Row className="service-main-container">
              <Row className="sub-orders-card-container-parent-header service-first-container">
                <Row className="myAccOrderDetailsTableImageParent">
                  <Avatar
                    shape="square"
                    src={
                      data?.seller_display_image ||
                      data?.vendor?.seller_display_image ||
                      ""
                    }
                    style={{
                      backgroundColor:
                        data?.seller_display_image ||
                        data?.vendor?.seller_display_image
                          ? ""
                          : "#f3f2ef",
                      borderRadius: "16px",
                    }}
                    size={60}
                    icon={
                      <TableShopIcon style={{marginTop: "12px"}} />
                    }></Avatar>
                  <Row className="myAccOrderDetailsTableTextContentParent">
                    <Text className="myAccOrderDetailsTableTextTitleParent">
                      {data?.vendor_name || data?.vendor?.vendor_name || "N/A"}
                    </Text>
                    <Text className="myAccOrderDetailsTableTextValueParent">
                      Sub ID : {data?.suborder_id || data?.sub_order_id}
                    </Text>
                  </Row>
                </Row>
                <Row className="sub-order-button-container">
                  {data?.invoices?.length && (
                    <Button
                      className="sub-order-view-all-item-button"
                      icon={<FileInvoiceIcon />}
                      onClick={() =>
                        handlePdfDownload(data?.invoices?.[0]?.file)
                      }>
                      Invoice
                    </Button>
                  )}
                </Row>
              </Row>
              <Row className="service-second-container">
                <Form.Item
                  // help={
                  //   handleError?.payment_mode ? (
                  //     <Col className="handle-error-text">
                  //       Field should not be empty!
                  //     </Col>
                  //   ) : (
                  //     ""
                  //   )
                  // }
                  // name={"issue_type"}
                  label={
                    <Col
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}>
                      <Text className="addVehicle-text-bold">Issue type</Text>
                      <Text style={{color: "red"}}>*</Text>
                    </Col>
                  }
                  style={{margin: 0, width: "100%"}}>
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={handleChange}
                        style={{
                          maxHeight: "250px",
                          maxWidth: "600px",
                          // overflow: "auto",
                          overflowX: "hidden",
                        }}>
                        <Menu.Item key="" disabled>
                          --Select Type--
                        </Menu.Item>
                        {issueTypeOptions?.map((option) => (
                          <Menu.Item key={option?.label} value={option?.label}>
                            {option?.label}
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                    placement="bottomLeft"
                    trigger={["click"]}>
                    <Input
                      readOnly
                      style={{
                        border: "1px solid #dedede",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                      value={
                        serviceRequestForm?.issue_type || "--Select Type--"
                      }
                      suffix={<DownOutlined />}
                    />
                  </Dropdown>
                </Form.Item>
                <Form.Item
                  label={<Col style={{fontWeight: 500}}>Comments</Col>}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "0px",
                  }}>
                  <Input.TextArea
                    rows={4}
                    name={"comments"}
                    value={serviceRequestForm?.comments}
                    placeholder="Enter comments"
                    className="wallet-amount-input"
                    onChange={handleOnChange}
                  />
                </Form.Item>
              </Row>
              <Row style={{padding: "20px", width: "100%"}}>
                <Form.Item
                  label={
                    <Col
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}>
                      <Text
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#0a243f",
                        }}>
                        Please share pictures
                      </Text>
                      <Text
                        style={{
                          // fontSize: "14px",
                          color: "#0a243f",
                          fontSize: "normal",
                          opacity: 0.6,
                        }}>
                        Images helps to understand the issue better
                      </Text>
                      {fileListError && (
                        <Text
                          style={{
                            color: "#bf2600",
                            fontSize: "normal",
                          }}>
                          Can’t add more than 6 files
                        </Text>
                      )}
                    </Col>
                  }
                  style={{margin: 0, width: "100%"}}
                  name="images">
                  <Dragger
                    fileList={fileList}
                    // disabled={editPayment?.state && editPayment?.check}
                    beforeUpload={() => false}
                    onChange={(info) => handleFileChange(info)}
                    className="custom-dragger"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      border: "2px dashed #dedede",
                    }}
                    showUploadList={false}
                    multiple={true}
                    accept=".png,.jpeg,.jpg,image/png,image/jpeg,image/jpg/,.pdf">
                    <Col
                      style={{
                        // height: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <Col
                        style={{
                          fontFamily: "Inter",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}>
                        <FileInvoiceIcon />
                        <p className="ant-upload-text">
                          Drop your files here or{" "}
                          <span
                            style={{
                              color: "#2973f0",
                              marginLeft: "12px",
                            }}>
                            browse
                          </span>
                        </p>
                        <p
                          className="ant-upload-hint"
                          style={{
                            fontSize: "14px",
                          }}>
                          xls, doc, pdf, jpeg, png - upto 10 mb
                        </p>
                      </Col>
                    </Col>
                  </Dragger>
                  <Col>
                    {fileList?.length !== 0 && (
                      <Col style={{padding: "0px 24px"}}>
                        {customFileListRender(fileList)}
                      </Col>
                    )}
                  </Col>
                </Form.Item>
              </Row>
            </Row>
          </Form>
        </Col>
      </Modal>
    </>
  );
};

export default ServiceRequestModal;
