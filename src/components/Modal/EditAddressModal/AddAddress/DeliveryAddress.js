import React, {useEffect, useState} from "react";
import {
  Button,
  Checkbox,
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
import {ReactComponent as LeftArrowIcon} from "../../../../assets/icons/chevron-left.svg";


import {
  useAddNewAddressMutation,
  useUpdateAddressMutation,
} from "../../../../apis/createQuote";
import {useDispatch, useSelector} from "react-redux";
import {
  billingAddressSelector,
  createQuoteUserSelector,
  editQuoteDataSelector,

} from "../../../../redux/slices/createQuote/selector";
import {
  getBillingAddress,
  getDeliveryAddress,
  updateAddressFlag,
} from "../../../../redux/slices/createQuote/action";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../NotificationToast/NotificationToast";
import {Option} from "antd/es/mentions";
import {gstRegex, stateOptions} from "../../../../commonUtils/commonUtils";
import {useParams} from "react-router-dom";
import UserBillingConfirmModal from "../../../UserBillingConfirmModal/UserBillingConfirmModal";


const DeliveryAddress = ({
  deliveryModal,
  setDeliveryModal,
  setIsModalOpen,
  editData,
  initialFormData,
  formData,
  setFormData,
  addressListModal,
  addressList,
}) => {
  const dispatch = useDispatch();
  // const deliveryAddressRedux = useSelector(deliveryAddressSelector);
  const billingAddressRedux = useSelector(billingAddressSelector);

  const {Text, Title} = Typography;
  const params_id = useParams();

  const mob_user = useSelector(createQuoteUserSelector);
  const mob_user_2 = useSelector(editQuoteDataSelector);

  const [validationErrors, setValidationErrors] = useState({
    mobileNo: "",
    email: "",
    pincode: "",
    // Add more fields if needed
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [openBillingModal, setOpenBillingModal] = useState(false);

// eslint-disable-next-line
  const [address_tag, setAddress_tag] = useState("");
  
  const handleCancelBillingModal = () => {
    setOpenBillingModal(false);
  };
  const handleSaveBillingModal = () => {
    setFormData((prevData) => ({
      ...prevData,
      address_type: "",
    }));
    setOpenBillingModal(false);
  };
  const handleAddressTag = (event) => {
    const checkedTag = event?.target?.checked;
    if (!checkedTag) {
      setOpenBillingModal(true);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
      setAddress_tag(event.target.value);
    }
  };
  useEffect(() => {
    if (editData) {
      setFormData({
        nameCompany: editData?.name || "",
        mobileNo: editData?.phone_number || "",
        gst: editData?.gst_number || "",
        addressI: editData?.address_line_1 || "",
        addressII: editData?.address_line_2 || "",
        google_map_link: editData?.address_line_2 || "",
        pincode: editData?.pincode || "",
        city: editData?.city || "",
        state: editData?.state || "",
        email: editData?.email || "",
        address_tag: editData?.address_tag || "",
        site_person: editData?.site_person || "",
        site_person_mobile: editData?.site_person_mobile || "",
        address_type: editData.address_type || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);
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

    const isValid = requiredFields.every((field) => !!formData[field]);
    // setIsFormValid(isValid && noValidationErrors);
    setIsFormValid(isValid);
  };
  const [
    createNewAddressApi,
    {isSuccess: createAddressSuccess, isLoading: isCreateLoading},
  ] = useAddNewAddressMutation();
  const [
    updateAddressApi,
    {isSuccess: updateAddressSuccess, isLoading: isUpdateLoading},
  ] = useUpdateAddressMutation();

  useEffect(() => {
    if (createAddressSuccess || updateAddressSuccess) {
      dispatch(updateAddressFlag(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createAddressSuccess, updateAddressSuccess]);

  const handleSaveAddress = async () => {
    const newValidationErrors = {};

    // Validate mobile number (10 digits)
    if (!/^[0-9]{10}$/.test(formData.mobileNo)) {
      newValidationErrors.mobileNo = "Invalid mobile number (10 digits)";
    }
   
    //Validate GST
    // if (!/^(?:[0-3|9][0-9])[a-zA-Z0-9]{13}$/.test(formData.gst)) {
    //   newValidationErrors.gst = "Invalid GST";
    // }
    // Validate email
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   newValidationErrors.email = "Invalid email";
    // }

    // Validate pincode (6 digits)
    // if (!/^[0-9]{6}$/.test(formData.pincode)) {
    //   newValidationErrors.pincode = "Invalid pincode (6 digits)";
    // }
    if (formData.gst.trim() !== "") {
      if (!gstRegex.test(formData.gst)) {
        newValidationErrors.gst = "Invalid GSTIN";
      }
    }

    setValidationErrors(newValidationErrors);

    if (Object.values(newValidationErrors).some((error) => !!error)) {
      // If there are validation errors, stop the function
      return;
    }

    // setFormData(initialFormData);
    const params = {
      mob_user: params_id?.quote_id
        ? mob_user_2?.rfq_order?.rfq_created_by?.id || mob_user_2?.user?.id
        : mob_user?.id ||
          mob_user?.payload?.user_details?.id ||
          mob_user?.payload?.id,
      address_type: formData?.address_type,
      name: formData.nameCompany,
      phone_number: formData.mobileNo,
      email: formData.email,
      gst_number: formData.gst,
      address_line_1: formData.addressI,
      address_line_2: formData.addressII,
      google_map_link: formData.addressII,
      site_person: formData.site_person,
      site_person_mobile: formData.site_person_mobile,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      address_tag: formData.address_tag,
    };
    if (editData?.name) {
      params.address_id = editData.id;
      const response = await updateAddressApi(params);
      if (response?.data?.status === true) {
        showSuccessToast(response.data.message);
        setDeliveryModal(false);
        dispatch(getDeliveryAddress(response?.data?.data));
        setFormData(initialFormData);

        // if (response?.data?.data.id === deliveryAddressRedux?.id) {
        // }
        if (response?.data?.data?.id === billingAddressRedux?.id) {
          dispatch(getBillingAddress(response?.data?.data));
        }
      } else {
        // if (response.error.data.data.email[0]) {
        //   showErrorToast(response.error.data.data.email[0]);
        // }
        showErrorToast(response?.data?.message);
      }
    } else {
      const response = await createNewAddressApi(params);
      if (response?.data?.status === true) {
        showSuccessToast(response?.data?.message);
        addressListModal();
        dispatch(getDeliveryAddress(response?.data?.data));
        setFormData(initialFormData);
        if (response?.data?.data?.id === billingAddressRedux?.id) {
          dispatch(getBillingAddress(response?.data?.data));
        }
        setDeliveryModal(false);
      } else {
        // if (response?.error?.data?.data?.email[0]) {
        //   showErrorToast(response?.error?.data?.data?.email[0]);
        // }
        showErrorToast(response?.data?.message);
      }
    }
  };
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  const handleInputChange = (field, value) => {
    // let validatedValue = value;

    // if (field === "mobileNo") {
    //   validatedValue = value.replace(/\D/g, "");
    // }
    if (
      field?.target?.name === "gst_number" &&
      field?.target?.value?.length > 15
    )

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // validateForm();
  };

  const handleBack = () => {
    setFormData(initialFormData);
    setDeliveryModal(false);
    setIsModalOpen(true);
    setValidationErrors({mobileNo: "", email: "", pincode: ""});
  };
  const handleCancel = () => {
    setFormData(initialFormData);
    setDeliveryModal(false);
    setValidationErrors({mobileNo: "", email: "", pincode: ""});
  };
  const tagData = editData?.address_tag;
  // const isDisabledBillingAddressCheck = isDisabledBillingAddress(
  //   addressList || [],
  //   formData
  // );
  return (
    <>
      <Modal
        title={
          <>
            <Row style={{width: "100%", alignItems: "center"}}>
              <Col style={{paddingTop: "6px", width: "35%"}}>
                <LeftArrowIcon
                  style={{cursor: "pointer"}}
                  onClick={handleBack}
                />
              </Col>
              <Title level={4} style={{width: "65%", margin: 0}}>
                Delivery Address
              </Title>
            </Row>
          </>
        }
        open={deliveryModal}
        onCancel={handleCancel}
        closeIcon={false}
        footer={[
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "28px",
              width: "100%",
            }}>
            <Button
              onClick={handleCancel}
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
              loading={isCreateLoading || isUpdateLoading}
              style={{
                height: "48px",
                // maxWidth: "200px",
                // width: "100%",
                fontWeight: 500,
                fontSize: "14px",
                border: "none",
                color: "white",
                backgroundColor: "#0354a3",
              }}
              onClick={handleSaveAddress}
              disabled={!isFormValid}>
              {editData?.name ? "SAVE & UPDATE ADDRESS" : "SAVE THIS ADDRESS"}
            </Button>
          </Col>,
        ]}>
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
          autoComplete="off">
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2px 18px 18px 18px",
              gap: 12,
            }}>
            <Form.Item
              label={
                <Col>
                  Name / Company<Text style={{color: "#FF0000"}}> *</Text>
                </Col>
              }
              style={{margin: 0}}>
              <Input
                style={{height: 45}}
                name="nameCompany"
                value={formData.nameCompany}
                onChange={(e) =>
                  handleInputChange("nameCompany", e.target.value)
                }
              />
            </Form.Item>
            <Col style={{display: "flex", gap: "1rem"}}>
              <Form.Item
                label={
                  <Col>
                    Business Mobile(for OTP)
                    <Text style={{color: "#FF0000"}}> *</Text>
                  </Col>
                }
                style={{margin: 0}}
                help={
                  validationErrors.mobileNo && (
                    <Col style={{color: "red"}}>
                      Invalid mobile number (10 digits)
                    </Col>
                  )
                }>
                <Input
                  style={{
                    height: 45,
                    borderColor: validationErrors.mobileNo ? "red" : "",
                    backgroundColor: validationErrors.mobileNo ? "#FFD6D6" : "",
                  }}
                  name="mobileNo"
                  maxLength={10}
                  // onKeyDown={(e) => {
                  //   if (
                  //     e.ctrlKey &&
                  //     e.key === "c" &&
                  //     e.ctrlKey &&
                  //     e.key === "v" &&
                  //     e.ctrlKey &&
                  //     e.key === "x" &&
                  //     (e.key < "0" || e.key > "9") &&
                  //     e.key !== "Backspace" &&
                  //     e.key !== "ArrowLeft" &&
                  //     e.key !== "ArrowRight" &&
                  //     e.key !== "Tab"
                  //   ) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  value={formData.mobileNo}
                  onChange={(e) => {
                    if (/^\d{0,10}$/.test(e.target.value)) {
                      handleInputChange("mobileNo", e.target.value);
                    }
                  }}
                  // onChange={(e) =>
                  //   handleInputChange("mobileNo", e.target.value)
                  // }
                />
              </Form.Item>
              <Form.Item
                label="GSTIN (Optional)"
                // name="gst"
                style={{margin: 0}}
                // value={formData.gst}
                help={
                  validationErrors.gst && (
                    <Col
                      style={{
                        color: "red",
                      }}>
                      Invalid Gst No
                    </Col>
                  )
                }>
                <Input
                  style={{
                    height: 45,
                    borderColor: validationErrors.gst ? "red" : "",
                    backgroundColor: validationErrors.gst ? "#FFD6D6" : "",
                  }}
                  value={formData.gst}
                  name="gst"
                  onChange={(e) => handleInputChange("gst", e.target.value)}
                />
              </Form.Item>
            </Col>
          </Col>
          <Divider style={{margin: 0, borderTopWidth: "12px"}} />
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 18px 18px 18px",
              gap: 12,
            }}>
            <Form.Item
              label={
                <Col>
                  Email
                  {/* <Text style={{ color: "#FF0000" }}> *</Text> */}
                </Col>
              }
              help={
                validationErrors.email && (
                  <Col style={{color: "red"}}>Invalid email</Col>
                )
              }
              style={{margin: 0}}>
              <Input
                value={formData.email}
                name="email"
                style={{
                  height: 45,
                  borderColor: validationErrors.email ? "red" : "",
                  backgroundColor: validationErrors.email ? "#FFD6D6" : "",
                }}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={
                <Col>
                  House no/ Building name (Address line 1)
                  <Text style={{color: "#FF0000"}}> *</Text>
                </Col>
              }
              style={{margin: 0}}>
              <Input
                value={formData.addressI}
                name="addressI"
                style={{height: 45}}
                onChange={(e) => handleInputChange("addressI", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Road/ Area/ Colony or google maps link"
              style={{margin: 0}}>
              <Input
                style={{height: 45}}
                name="addressII"
                value={formData.addressII}
                onChange={(e) => handleInputChange("addressII", e.target.value)}
              />
            </Form.Item>
            <Col style={{display: "flex", gap: "1rem"}}>
              <Form.Item
                label={
                  <Col>
                    Pincode
                    {/* <Text style={{ color: "#FF0000" }}> *</Text>{" "} */}
                  </Col>
                }
                help={
                  validationErrors.pincode && (
                    <Col style={{color: "red"}}>Invalid pincode (6 digits)</Col>
                  )
                }
                style={{margin: 0}}>
                <Input
                  style={{
                    height: 45,
                    borderColor: validationErrors.pincode ? "red" : "",
                    backgroundColor: validationErrors.pincode ? "#FFD6D6" : "",
                  }}
                  name="pincode"
                  maxLength={6}
                  // onKeyDown={(e) => {
                  //   if (
                  //     e.ctrlKey &&
                  //     e.key === "c" &&
                  //     e.ctrlKey &&
                  //     e.key === "v" &&
                  //     e.ctrlKey &&
                  //     e.key === "x" &&
                  //     (e.key < "0" || e.key > "9") &&
                  //     e.key !== "Backspace" &&
                  //     e.key !== "ArrowLeft" &&
                  //     e.key !== "ArrowRight" &&
                  //     e.key !== "Tab"
                  //   ) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  value={formData.pincode}
                  // onChange={(e) => handleInputChange("pincode", e.target.value)}
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
                    City <Text style={{color: "#FF0000"}}> *</Text>{" "}
                  </Col>
                }
                style={{margin: 0}}>
                <Input
                  style={{height: 45}}
                  name="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Form.Item
              label={
                <Col>
                  State <Text style={{color: "#FF0000"}}> *</Text>{" "}
                </Col>
              }
              style={{margin: 0}}>
              {/* <Select
                placeholder="--Select state--"
                onChange={(e) => handleInputChange("state", e)}
                value={formData.state}
              >
                <Option disabled value="">
                  --Select state--
                </Option>
                <Option value="Karnataka">Karnataka</Option>
                <Option value="Tamil Nadu">Tamil Nadu</Option>
              </Select> */}
              <Select
                showSearch
                placeholder="--Select or Search  state--"
                onChange={(e) => handleInputChange("state", e)}
                value={formData.state}
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  height: "46px",
                }}>
                <Option disabled value="">
                  --Select or Search state--
                </Option>
                {stateOptions.map((option, index) => (
                  <Option key={index} value={option.value}>
                    {option.label}
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
            <Col style={{display: "flex", gap: "1rem"}}>
              <Form.Item
                label={<Col>Site person(for delivery)</Col>}
                style={{margin: 0}}>
                <Input
                  style={{height: 45}}
                  name="site_person"
                  value={formData?.site_person}
                  onChange={(e) =>
                    handleInputChange("site_person", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                label={<Col>Site person mobile</Col>}
                style={{margin: 0}}
                help={
                  validationErrors.site_person_mobile && (
                    <Col style={{color: "red"}}>
                      Invalid mobile number (10 digits)
                    </Col>
                  )
                }>
                <Input
                  style={{
                    height: 45,
                    borderColor: validationErrors.site_person_mobile
                      ? "red"
                      : "",
                    backgroundColor: validationErrors.site_person_mobile
                      ? "#FFD6D6"
                      : "",
                  }}
                  name="site_person_mobile"
                  maxLength={10}
                  // onKeyDown={(e) => {
                  //   if (
                  //     e.ctrlKey &&
                  //     e.key === "c" &&
                  //     e.ctrlKey &&
                  //     e.key === "v" &&
                  //     e.ctrlKey &&
                  //     e.key === "x" &&
                  //     (e.key < "0" || e.key > "9") &&
                  //     e.key !== "Backspace" &&
                  //     e.key !== "ArrowLeft" &&
                  //     e.key !== "ArrowRight" &&
                  //     e.key !== "Tab"
                  //   ) {
                  //     e.preventDefault();
                  //   }
                  // }}
                  value={formData?.site_person_mobile}
                  onChange={(e) => {
                    if (/^\d{0,10}$/.test(e.target.value)) {
                      handleInputChange("site_person_mobile", e.target.value);
                    }
                  }}
                  // onChange={(e) =>
                  //   handleInputChange("mobileNo", e.target.value)
                  // }
                />
              </Form.Item>
            </Col>
            <Form.Item
              style={{margin: 0}}
              name="radioGroup"
              label="Select Tag"
              // value={formData.address_tag }
              // onChange={(e) => handleInputChange("address_tag", e.target.value)}
              // rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group
                defaultValue={tagData}
                // onChange={(e) => handleAddressTag(e)}
                onChange={(e) =>
                  handleInputChange("address_tag", e.target.value)
                }
                name={"address_tag"}>
                <Radio value={"Home"}>
                  <Tag
                    style={{
                      width: "60px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}>
                    Home
                  </Tag>
                </Radio>
                <Radio value={"Office"}>
                  <Tag
                    style={{
                      width: "70px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}>
                    Office
                  </Tag>
                </Radio>
                {/* <Radio
                  value={"Billing Address"}
                  disabled={!formData.gst}
                  checked={formData?.address_tag === "Billing Address"}
                >
                  <Tag
                    style={{
                      width: "140px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Billing Address
                  </Tag>
                </Radio> */}
                {/* <Radio value={"Mob_credit"} className="radio-mob-credit"                   checked={formData?.address_tag === "Mob_credit"}
>
                  <MobCreditWhiteIcon />
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
                </Radio> */}
              </Radio.Group>
            </Form.Item>

            <Checkbox
              value={"Billing"}
              disabled={
                !gstRegex?.test(formData?.gst)
                // editData?.address_type === "Billing"
                //   ? false || !gstRegex?.test(formData?.gst)
                //   : isDisabledBillingAddressCheck ||
                //     !gstRegex?.test(formData?.gst)
              }
              checked={formData?.address_type === "Billing"}
              onChange={(e) => handleAddressTag(e)}
              name={"address_type"}>
              <Text
                style={{
                  // width: "140px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
                Mark as billing address
              </Text>
            </Checkbox>
            {!gstRegex.test(formData?.gst) && (
              <Text
                style={{
                  display: "block",
                  // marginTop: "20px",
                  color: "#c13615",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}>
                Please add GSTIN to include the ‘Billing Address’ tag
              </Text>
            )}
          </Col>
          <UserBillingConfirmModal
            open={openBillingModal}
            handleCancel={handleCancelBillingModal}
            handleSave={handleSaveBillingModal}
          />
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(DeliveryAddress);
