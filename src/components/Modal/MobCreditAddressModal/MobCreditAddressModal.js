import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
// import { ReactComponent as LeftArrowIcon } from "../../../../assets/icons/chevron-left.svg";
import { Option } from "antd/es/mentions";
import { useAddNewAddressMutation } from "../../../apis/createQuote";
import { showSuccessToast } from "../../../NotificationToast/NotificationToast";
import { stateOptions } from "../../../commonUtils/commonUtils";
const MobCreditAddressModal = ({
  isModalOpen,
  setModalClose,
  data,
  handleRefech,
}) => {
  const { Text, Title } = Typography;
  const [billingFormData, setBillingFormData] = useState({});
  const [createNewAddressApi, { isLoading: isCreateLoading }] =
    useAddNewAddressMutation();

  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = () => {
    const requiredFields = [
      "nameCompany",
      "mobileNo",
      "addressI",
      // "email",
      "city",
      "state",
      // "pincode",
    ];

    const isValid = requiredFields?.every((field) => !!billingFormData[field]);
    setIsFormValid(isValid);
  };
  const handleCancel = () => {
    setBillingFormData({});
    setModalClose(false);
  };

  const handleSaveAddress = async () => {
    // setBillingFormData(initialFormData);
    const params = {
      mob_user: data?.id,
      address_type: "Billing",
      name: billingFormData?.nameCompany,
      gst_number: billingFormData?.gst,
      phone_number: billingFormData?.mobileNo,
      email: billingFormData?.email,
      address_line_1: billingFormData?.addressI,
      address_line_2: billingFormData?.addressII,
      google_map_link: billingFormData?.addressII,
      city: billingFormData?.city,
      state: billingFormData?.state,
      pincode: billingFormData?.pincode,
      address_tag: "mobCredit",
    };

    const response = await createNewAddressApi(params);
    if (response?.data?.status === true) {
      setModalClose(false);
      showSuccessToast(response?.data?.message);
      setBillingFormData({});
      handleRefech();
    }
    //  else {
    //   if (response?.error?.data?.data?.email[0]) {
    //     showErrorToast(response?.error?.data?.data?.email[0]);
    //   }
    // }
  };
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingFormData]);

  const handleInputChange = (field, value) => {
    setBillingFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    validateForm();
  };
  return (
    <>
      <Modal
        title={
          <>
            <Row style={{ width: "100%", alignItems: "center" }}>
              <Col style={{ paddingTop: "6px", width: "35%" }}></Col>
              <Title level={4} style={{ width: "65%", margin: 0 }}>
                Add Address
              </Title>
            </Row>
          </>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "28px",
              width: "100%",
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
              loading={isCreateLoading}
              style={{
                height: "48px",
                fontWeight: 500,
                fontSize: "14px",
                border: "none",
                color: "white",
                backgroundColor: "#0354a3",
              }}
              disabled={!isFormValid}
              onClick={handleSaveAddress}
            >
              {"SAVE THIS ADDRESS"}
            </Button>
          </Col>,
        ]}
      >
        <Form
          name="billing_address"
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
                  Name / Company<Text style={{ color: "#FF0000" }}> *</Text>
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Input
                style={{ height: 45 }}
                name="nameCompany"
                value={billingFormData?.nameCompany}
                onChange={(e) =>
                  handleInputChange("nameCompany", e.target.value)
                }
              />
            </Form.Item>
            <Col style={{ display: "flex", gap: "1rem" }}>
              <Form.Item
                label={
                  <Col>
                    Business Mobile(for OTP){" "}
                    <Text style={{ color: "#FF0000" }}> *</Text>
                  </Col>
                }
                style={{ margin: 0 }}
              >
                <Input
                  style={{ height: 45 }}
                  maxLength={10}
                  name="mobileNo"
                  value={billingFormData?.mobileNo}
                  onChange={(e) => {
                    if (/^\d{0,10}$/.test(e.target.value)) {
                      handleInputChange("mobileNo", e.target.value);
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="GSTIN (Optional)" style={{ margin: 0 }}>
                <Input
                  style={{ height: 45 }}
                  value={billingFormData?.gst}
                  name="gst"
                  onChange={(e) => handleInputChange("gst", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Col>
          <Divider style={{ margin: 0, borderTopWidth: "12px" }} />
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
                  Email
                  {/* <Text style={{ color: "#FF0000" }}> *</Text> */}
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Input
                value={billingFormData?.email}
                name="email"
                style={{ height: 45 }}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Form.Item>
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
                value={billingFormData?.addressI}
                name="addressI"
                style={{ height: 45 }}
                onChange={(e) => handleInputChange("addressI", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Road/ Area/ Colony or google maps link"
              style={{ margin: 0 }}
            >
              <Input
                style={{ height: 45 }}
                name="addressII"
                value={billingFormData?.addressII}
                onChange={(e) => handleInputChange("addressII", e.target.value)}
              />
            </Form.Item>
            <Col style={{ display: "flex", gap: "1rem" }}>
              <Form.Item
                label={
                  <Col>
                    Pincode
                    {/* <Text style={{ color: "#FF0000" }}> *</Text> */}
                  </Col>
                }
                style={{ margin: 0 }}
              >
                <Input
                  style={{ height: 45 }}
                  maxLength={6}
                  name="pincode"
                  value={billingFormData?.pincode}
                  onChange={(e) => {
                    if (/^\d{0,6}$/.test(e.target.value)) {
                      handleInputChange("pincode", e.target.value);
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <Col>
                    City<Text style={{ color: "#FF0000" }}> *</Text>
                  </Col>
                }
                style={{ margin: 0 }}
              >
                <Input
                  style={{ height: 45 }}
                  name="city"
                  value={billingFormData?.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Form.Item
              label={
                <Col>
                  State<Text style={{ color: "#FF0000" }}> *</Text>
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Select
                showSearch
                placeholder="--Select or Search  state--"
                onChange={(e) => handleInputChange("state", e)}
                value={billingFormData?.state}
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
                  <Option key={index} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="radioGroup" label="Select Tag">
              <Radio.Group
                defaultValue={"mobCredit"}
                onChange={(e) =>
                  handleInputChange("address_tag", e.target.value)
                }
              >
                <Radio value={"mobCredit"} className="radio-mob-credit">
                  <Tag
                    style={{
                      width: "120px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    MOB CREDIT
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

export default MobCreditAddressModal;
