import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  // Radio,
  Select,
  Tag,
  // Tag,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import "./AddNewCustomerModal.css";
import CustomDatePicker from "../../DatePicker/CustomDatePicker";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../NotificationToast/NotificationToast";
import { stateOptions } from "../../../commonUtils/commonUtils";

const AddNewCustomerModal = ({
  handleApi,
  addressListModal,
  addCustomerModal,
  setAddCustomerModal,
}) => {
  const { Text } = Typography;
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({});

  const validateForm = () => {
    const requiredFields = [
      "user_name",
      "phone_number",
      "address_line_1",
      "email",
      "city",
      "state",
      "pincode",
      "date_of_birth",
      "address_tag",
    ];

    const isValid = requiredFields.every((field) => !!formData[field]);
    setIsFormValid(isValid);
  };

  const handleSaveAddress = async () => {
    const response = await handleApi({
      phone_number: formData?.phone_number,
      email: formData?.email,
      full_name: formData?.user_name,
      date_of_birth: formData?.date_of_birth,
      address_tag: formData?.address_tag,
      address: {
        name: formData?.user_name,
        phone_number: formData?.phone_number,
        email: formData?.email,
        address_line_1: formData?.address_line_1,
        address_line_2: formData?.addressII,
        city: formData?.city,
        state: formData?.state,
        pincode: formData?.pincode,
        gst_number: formData?.gst,
      },
    });
    if (response?.data?.status === true) {
      showSuccessToast(response?.data?.message);
      handleCancel();
    } else {
      showErrorToast(response?.error?.data?.message);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChangeDate = (value) => {
    handleInputChange("date_of_birth", value.date_of_birth);
  };
  const handleCancel = () => {
    setAddCustomerModal(false);
    setFormData({});
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <Modal
        title={"Add new customer"}
        open={addCustomerModal}
        onCancel={handleCancel}
        onOk={handleCancel}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "28px",
              borderTop: "1px solid #dedede",
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
              onClick={handleSaveAddress}
              disabled={!isFormValid}
            >
              ADD CUSTOMER
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
            <Form.Item
              label={
                <Col>
                  Name <Text style={{ color: "#FF0000" }}> *</Text>
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Input
                style={{ height: 45 }}
                name="user_name"
                value={formData?.user_name}
                onChange={(e) => handleInputChange("user_name", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label={
                <Col>
                  Email id <Text style={{ color: "#FF0000" }}> *</Text>
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Input
                value={formData?.email}
                name="email"
                style={{ height: 45 }}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={
                <Col>
                  Date of birth <Text style={{ color: "#FF0000" }}> *</Text>
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Col style={{ width: "100%" }} className="date-picker-container">
                <CustomDatePicker
                  name="date_of_birth"
                  // value={addVehicleFormData?.assigned_date}
                  handleChildFieldChange={handleChangeDate}
                />
              </Col>
            </Form.Item>
            <Col style={{ display: "flex", gap: "1rem" }}>
              <Form.Item
                label={
                  <Col>
                    Phone Number<Text style={{ color: "#FF0000" }}> *</Text>
                  </Col>
                }
                style={{ margin: 0 }}
              >
                <Input
                  style={{ height: 45 }}
                  name="phone_number"
                  maxLength={10}
                  onKeyDown={(e) => {
                    if (
                      (e.key < "0" || e.key > "9") &&
                      e.key !== "Backspace" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  value={formData?.phone_number}
                  onChange={(e) =>
                    handleInputChange("phone_number", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                label="GSTIN (Optional)"
                // name="gst"
                style={{ margin: 0 }}
                // value={formData.gst}
              >
                <Input
                  style={{ height: 45 }}
                  value={formData?.gst}
                  name="gst"
                  onChange={(e) => handleInputChange("gst", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 18px 18px 18px",
              gap: 12,
            }}
          >
            <Form.Item
              label={
                <Col>
                  House no/ Building name (Address line 1)
                  <Text style={{ color: "#FF0000" }}> *</Text>
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Input
                value={formData?.address_line_1}
                name="address_line_1"
                style={{ height: 45 }}
                onChange={(e) =>
                  handleInputChange("address_line_1", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              label="Road/ Area/ Colony or google maps link"
              style={{ margin: 0 }}
            >
              <Input
                style={{ height: 45 }}
                name="addressII"
                value={formData?.addressII}
                onChange={(e) => handleInputChange("addressII", e.target.value)}
              />
            </Form.Item>
            <Col style={{ display: "flex", gap: "1rem" }}>
              <Form.Item
                label={
                  <Col>
                    Pincode <Text style={{ color: "#FF0000" }}> *</Text>{" "}
                  </Col>
                }
                style={{ margin: 0 }}
              >
                <Input
                  style={{ height: 45 }}
                  name="pincode"
                  maxLength={6}
                  onKeyDown={(e) => {
                    if (
                      (e.key < "0" || e.key > "9") &&
                      e.key !== "Backspace" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  value={formData?.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={
                  <Col>
                    City <Text style={{ color: "#FF0000" }}> *</Text>{" "}
                  </Col>
                }
                style={{ margin: 0 }}
              >
                <Input
                  style={{ height: 45 }}
                  name="city"
                  value={formData?.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Form.Item
              label={
                <Col>
                  State <Text style={{ color: "#FF0000" }}> *</Text>{" "}
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Select
                showSearch
                placeholder="--Select or Search  state--"
                onChange={(e) => handleInputChange("state", e)}
                value={formData?.state}
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  height: "46px",
                }}
              >
                <Option disabled value="">
                  --Select or Search state--
                </Option>
                {stateOptions?.map((option, index) => (
                  <Option key={index} value={option?.value}>
                    {option?.label}
                  </Option>
                ))}
              </Select>
              {/* <Input
                style={{ height: 45 }}
                name="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              /> */}
            </Form.Item>
            <Form.Item name="radioGroup" label="Select Tag">
              <Radio.Group
                // defaultValue={tagData}
                onChange={(e) =>
                  handleInputChange("address_tag", e.target.value)
                }
              >
                <Radio value="Home">
                  <Tag
                    style={{
                      width: "60px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Home
                  </Tag>
                </Radio>
                <Radio value="Office">
                  <Tag
                    style={{
                      width: "70px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Office
                  </Tag>
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(AddNewCustomerModal);
