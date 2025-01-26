import React, { useEffect, useState } from "react";
import {
  // Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  // Row,
  Select,
  Tag,
  Typography,
} from "antd";
import { useDispatch } from "react-redux";
import { Option } from "antd/es/mentions";
import "./AddNewSellerModal.css";
// import {
//   useCreateSellerAddressMutation,
//   useUpdateSellerAddressMutation,
// } from "../../../apis/sellerCatalogue";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../NotificationToast/NotificationToast";
import { useParams } from "react-router-dom";
import { stateOptions } from "../../../commonUtils/commonUtils";

const initialFormData = {
  nameCompany: "",
  mobileNo: "",
  gst: "",
  addressI: "",
  addressII: "",
  pincode: "",
  city: "",
  state: "",
  email: "",
  address_tag: "",
  id: "",
};
const AddNewSellerModal = ({
  deliveryModal,
  setDeliveryModal,
  setIsModalOpen,
  editData,
  dispatchEditData,
  //   initialFormData,
  //   formData,
  //   setFormData,
  addressListModal,
  getAllAddressAPI,
  isCreateLoading,
  isUpdateLoading,
  createAddressAPI = () => {},
  updateAddressAPI = () => {},
  fetchingID,
}) => {
  const dispatch = useDispatch();
  const { Text, Title } = Typography;
  const paramsId = useParams();
  const [formData, setFormData] = useState(initialFormData);
  const [isFormValid, setIsFormValid] = useState(false);
  // const [createSellerAddressAPI, { isLoading: isCreateLoading }] =
  //   useCreateSellerAddressMutation();
  // const [updateSellerAddressAPI, { isLoading: isUpdateLoading }] =
  //   useUpdateSellerAddressMutation();
  const validateForm = () => {
    const requiredFields = [
      "nameCompany",
      "mobileNo",
      // "addressI",
      // "email",
      "city",
      "state",
      // "pincode",
    ];

    const isValid = requiredFields?.every((field) => !!formData[field]);
    setIsFormValid(isValid);
  };

  const handleSaveAddress = async () => {
    setFormData(initialFormData);
    setDeliveryModal(false);
    // const params = {
    //   bmp_id: paramsId?.seller_id,
    //   name: formData?.nameCompany,
    //   phone_number: formData?.mobileNo,
    //   email: formData?.email,
    //   gst_number: formData?.gst,
    //   address: formData?.addressI,
    //   address_line_2: formData?.addressII,
    //   city: formData?.city,
    //   state: formData?.state,
    //   pincode: formData?.pincode,
    //   // address_tag: formData?.address_tag,
    // };

    let response;
    if (editData?.mob_user) {
      response = await updateAddressAPI({
        address_id: formData?.id,
        name: formData?.nameCompany,
        phone_number: formData?.mobileNo,
        email: formData?.email,
        address: formData?.addressI,
        address_line_2: formData?.addressII,
        google_map_link: formData?.addressII,
        city: formData?.city,
        state: formData?.state,
        pincode: formData?.pincode,
        gst: formData?.gst,
        // is_active: false,
      });
    } else {
      response = await createAddressAPI({
        bmp_id: paramsId?.seller_id,
        name: formData?.nameCompany,
        phone_number: formData?.mobileNo,
        email: formData?.email,
        address: formData?.addressI,
        address_line_2: formData?.addressII,
        google_map_link: formData?.addressII,
        city: formData?.city,
        state: formData?.state,
        pincode: formData?.pincode,
        gst: formData?.gst,
      });
    }

    if (response?.data?.status) {
      showSuccessToast(response?.data?.message);
      getAllAddressAPI({ [fetchingID]: paramsId?.seller_id });
    } else {
      showErrorToast(response?.error?.data?.message);
    }
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    validateForm();
  };
  useEffect(() => {
    if (editData) {
      setFormData({
        nameCompany: editData.name || "",
        mobileNo: editData.phone_number || "",
        gst: editData.gst || "",
        addressI: editData.address || "",
        addressII: editData.address_line_2 || "",
        google_map_link: editData.address_line_2 || "",
        pincode: editData.pincode || "",
        city: editData.city || "",
        state: editData.state || "",
        email: editData.email || "",
        address_tag: editData.address_tag || "Home",
        id: editData?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);
  const handleCancel = () => {
    setFormData(initialFormData);
    dispatch(dispatchEditData({}));
    setDeliveryModal(false);
  };
  const tagData = editData?.address_tag;
  return (
    <>
      <Modal
        title={
          <>
            <Title level={4} style={{ width: "65%", margin: 0 }}>
              Add Address
            </Title>
          </>
        }
        open={deliveryModal}
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
              disabled={!isFormValid}
            >
              {"SAVE THIS ADDRESS"}
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
            height: "400px",
            width: "100%",
            overflow: "auto",
          }}
          autoComplete="off"
        >
          {/* <Col style={{ padding: "10px" }}>
            <Avatar
              shape="square"
              style={{
                width: "100%",
                height: "250px",
                backgroundColor: "#015fe578",
              }}
            />
          </Col> */}
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
                value={formData?.nameCompany}
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
                  // type="number"
                  value={formData?.mobileNo}
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
                value={formData?.email}
                name="email"
                style={{ height: 45 }}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={
                <Col>
                  House no/ Building name (Address line 1)
                  {/* <Text style={{ color: "#FF0000" }}> *</Text> */}
                </Col>
              }
              style={{ margin: 0 }}
            >
              <Input
                value={formData?.addressI}
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
                value={formData?.addressII}
                onChange={(e) => handleInputChange("addressII", e.target.value)}
              />
            </Form.Item>
            <Col style={{ display: "flex", gap: "1rem" }}>
              <Form.Item
                label={
                  <Col>
                    Pincode
                    {/* <Text style={{ color: "#FF0000" }}> *</Text>{" "} */}
                  </Col>
                }
                style={{ margin: 0 }}
              >
                <Input
                  style={{ height: 45 }}
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
                  value={formData?.pincode}
                  onChange={(e) => {
                    if (/^\d{0,6}$/.test(e.target.value)) {
                      handleInputChange("pincode", e.target.value);
                    }
                  }}
                  // onChange={(e) => handleInputChange("pincode", e.target.value)}
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
              // style={{ margin: 0 }}
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
            <Form.Item
              name="radioGroup"
              label="Address Type"
              // value={formData.address_tag }
              // onChange={(e) => handleInputChange("address_tag", e.target.value)}
              // rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group
                defaultValue={tagData}
                onChange={(e) =>
                  handleInputChange("address_tag", e.target.value)
                }
              >
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
                    }}
                  >
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

export default AddNewSellerModal;
