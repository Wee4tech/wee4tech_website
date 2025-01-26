import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  // Radio,
  // Select,
  // Tag,
  Typography,
  Upload,
} from "antd";
import "./AddPaymentModal.css";
// import CustomDatePicker from "../../../DatePicker/CustomDatePicker";
import CustomSelect from "../../../SelectableDropdown/CustomSelect/CustomSelect";
import { ReactComponent as RemoveIcon } from "../../../../assets/icons/RemoveImageIcon.svg";
import TextArea from "antd/es/input/TextArea";
import { bytesToSize } from "../../../../commonFuntions/CommonUtilFunctions";
import CustomSetterDatePicker from "../../../DatePicker/CustomSetterDatePicker";

const options = [
  {
    key: 1,
    value: "Cheque",
    label: "Cheque",
  },
  {
    key: 2,
    value: "UPI",
    label: "UPI",
  },
  {
    key: 3,
    value: "Bank Transfer",
    label: "Bank Transfer",
  },
  {
    key: 4,
    value: "Cash",
    label: "Cash",
  },
  {
    key: 5,
    value: "Others",
    label: "Others",
  },
];
const AddPaymentModal = ({
  openModal,
  onCancleModel,
  formData,
  setFormData,
  datePickerEmpty,
  setDatePickerEmpty,
  fileList,
  setFileList,
  paymentMode,
  setPaymentMode,
  seller_name,
  editPayment,
  setEditPayment,
  setConfirmModal,
  setOpenUploadModal,
  setInputDate,
  inputDate,
}) => {
  console.log("🚀 ~ formData:", formData)
  const { Text } = Typography;
  const { Dragger } = Upload;
  const [
    ,
    // isFormValid
    setIsFormValid,
  ] = useState(false);
  const [handleError, setHandleError] = useState({
    settlement_amount: false,
    payment_mode: false,
    ref_no: false,
  });

  const validateForm = () => {
    const requiredFields = [
      "seller_name",
      "settlement_amount",
      "payment_mode",
      // "date",
      // "ref_no",
      //   "remarks",
      //   "upload_receipt",
    ];

    const isValid = requiredFields.every((field) => !!formData[field]);

    setIsFormValid(isValid);
  };
  const handleConfirmModal = () => {
    setConfirmModal(true);
    setOpenUploadModal(false);
  };
  // const handleSaveAddress = async () => {};

  const handleInputChange = (field, value) => {
    if (field === "settlement_amount" && value !== "") {
      setHandleError({ ...handleError, settlement_amount: false });
    }
    if (field === "ref_no" && value !== "") {
      setHandleError({ ...handleError, ref_no: false });
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChangeDate = (value) => {
    handleInputChange("date", value.date);
  };
  const handleSubmitForm = (value) => {
    if (
      !formData?.settlement_amount ||
      formData?.settlement_amount === "" ||
      !formData?.payment_mode ||
      formData?.payment_mode === "" ||
      !formData?.ref_no ||
      formData?.ref_no === ""
    ) {
      setHandleError({
        payment_mode:
          !formData?.payment_mode || formData?.payment_mode === ""
            ? true
            : false,
        settlement_amount:
          !formData?.settlement_amount || formData?.settlement_amount === ""
            ? true
            : false,
        ref_no: !formData?.ref_no || formData?.ref_no === "" ? true : false,
      });
    } else {
      setHandleError({
        settlement_amount: false,
        payment_mode: false,
        ref_no: false,
      });
      handleConfirmModal();
    }
  };
  const handleChange = (value) => {
    handleInputChange("payment_mode", value);
    setHandleError({ ...handleError, payment_mode: false });
    setPaymentMode(value);
  };
  const handleCancel = () => {
    onCancleModel(false);
    setFormData({ seller_name });
    setPaymentMode("");
    setInputDate("");
    setFileList([]);
    setDatePickerEmpty(false);
    setHandleError({
      settlement_amount: false,
      payment_mode: false,
      ref_no: false,
    });
  };
  const handleFileChange = (info) => {
    //  comment for now
    // let list = [...info.fileList];
    // list = list.slice(-1);
    handleInputChange("upload_receipt", [info.file]);
    // handleInputChange("upload_receipt", [...info.fileList]);
    setFileList([info.file]);
    // setFileList([...info.fileList]);
  };
  const handleRemoveFile = (file) => {
    // Remove the file from the fileList
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    handleInputChange("upload_receipt", [...newFileList]);
    setFileList(newFileList);
    // messageApi.open({
    //   type: "success",
    //   content: "File removed successfully",
    // });
  };
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  useEffect(() => {
    if (!editPayment?.state) {
      setPaymentMode("Bank Transfer");
      handleInputChange("payment_mode", "Bank Transfer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
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
                      {item?.name}
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
                  <Text
                    style={{
                      color: "#0a243f",
                      fontSize: "14px",
                      fontWeight: 400,
                      opacity: 0.6,
                    }}
                  >
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
        title={
          editPayment?.state
            ? editPayment?.check
              ? "View summary"
              : "Edit summary"
            : "Add payment"
        }
        open={openModal}
        onCancel={handleCancel}
        onOk={handleCancel}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "28px",
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
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                border: "none",
                color: "white",
                backgroundColor: "#0354a3",
              }}
              onClick={handleSubmitForm}
              // disabled={!isFormValid}
            >
              ADD PAYMENT{" "}
            </Button>
          </Col>,
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
            {editPayment?.state && editPayment?.check && (
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => {
                    setEditPayment({ ...editPayment, check: false });
                  }}
                  style={{ width: "100px", height: "44px" }}
                >
                  Edit
                </Button>
              </Col>
            )}
            <Form.Item label={<Col>Seller name</Col>} style={{ margin: 0 }}>
              <Input
                style={{ height: 45 }}
                name="seller_name"
                value={formData?.seller_name}
                onChange={(e) =>
                  handleInputChange("seller_name", e.target.value)
                }
                disabled={true}
              />
            </Form.Item>
            <Form.Item
              label={<Col>Settlement amount</Col>}
              style={{ margin: 0 }}
              help={
                handleError?.settlement_amount ? (
                  <Col className="handle-error-text">
                    Field should not be empty!
                  </Col>
                ) : (
                  ""
                )
              }
            >
              <Input
                style={{ height: 45 }}
                name="settlement_amount"
                type="number"
                value={formData?.settlement_amount}
                onChange={(e) =>
                  handleInputChange("settlement_amount", e.target.value)
                }
                className={
                  handleError?.settlement_amount ? "handle-input-error" : ""
                }
                disabled={editPayment?.state}
              />
            </Form.Item>

            <Col style={{ display: "flex", gap: "1rem" }}>
              <Form.Item
                help={
                  handleError?.payment_mode ? (
                    <Col className="handle-error-text">
                      Field should not be empty!
                    </Col>
                  ) : (
                    ""
                  )
                }
                label={<Col>Payment mode</Col>}
                style={{ margin: 0 }}
              >
                <CustomSelect
                  placeholder={"Select Mode"}
                  width={"200px"}
                  customStyle={
                    handleError?.payment_mode ? "handle-input-error" : ""
                  }
                  options={options}
                  handleChange={handleChange}
                  value={paymentMode}
                  disabled={editPayment?.state && editPayment?.check}
                />
              </Form.Item>
              <Form.Item label={<Col>Date</Col>} style={{ margin: 0 }}>
                <Col className="date-picker-container">
                  <CustomSetterDatePicker
                    name="date"
                    format={"DD-MMM-YYYY"}
                    handleChildFieldChange={handleChangeDate}
                    disabled={editPayment?.state && editPayment?.check}
                    inputDate={inputDate}
                    setInputDate={setInputDate}
                  />
                </Col>
              </Form.Item>
            </Col>
            <Form.Item
              help={
                handleError?.ref_no ? (
                  <Col className="handle-error-text">
                    Field should not be empty!
                  </Col>
                ) : (
                  ""
                )
              }
              label={<Col>Payment ref no.</Col>}
              style={{ margin: 0 }}
            >
              <Input
                style={{ height: 45 }}
                name="ref_no"
                value={formData?.ref_no}
                onChange={(e) => handleInputChange("ref_no", e.target.value)}
                disabled={editPayment?.state && editPayment?.check}
                className={handleError?.ref_no ? "handle-input-error" : ""}
              />
            </Form.Item>
            <Form.Item label={<Col>Upload receipt</Col>} style={{ margin: 0 }}>
              <Dragger
                fileList={fileList}
                disabled={editPayment?.state && editPayment?.check}
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
                accept=".png,.jpeg,.jpg,image/png,image/jpeg,image/jpg/,.pdf"
              >
                <Col
                  style={{
                    // height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Col
                    style={{
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    <p className="ant-upload-text">
                      Drag your images here or{" "}
                      <span
                        style={{
                          color: "#2973f0",
                          marginLeft: "12px",
                        }}
                      >
                        browse
                      </span>
                    </p>
                    <p
                      className="ant-upload-hint"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      xls, doc, pdf, jpeg, png - upto 10 mb
                    </p>
                  </Col>
                </Col>
              </Dragger>
              <Col>
                {fileList?.length !== 0 && (
                  <Col style={{ padding: "0px 24px" }}>
                    {customFileListRender(fileList)}
                  </Col>
                )}
              </Col>
            </Form.Item>
            <Form.Item label={<Col>Remarks</Col>} style={{ margin: 0 }}>
              <TextArea
                rows={4}
                style={{ height: 45 }}
                name="remarks"
                value={formData?.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                disabled={editPayment?.state && editPayment?.check}
              />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(AddPaymentModal);
