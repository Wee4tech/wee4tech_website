import React, {useEffect, useState} from "react";
import {Button, Modal, Col, Radio, Typography, Tag} from "antd";
import {CardEdit} from "../../../modules/Request/RFQ/CreateQuote/CreateQuoteProfileSection/ProfileStyled";
import "./editAddress.css";
import {ReactComponent as AddIcon} from "../../../assets/icons/AddAddressIcon.svg";
import {ReactComponent as MobCreditWhiteIcon} from "../../../assets/icons/mobCreditWhiteIcon.svg";

import DeliveryAddress from "./AddAddress/DeliveryAddress";
import BillingAddress from "./AddAddress/BillingAddress";
import {useDispatch, useSelector} from "react-redux";
import {
  getBillingAddress,
  getDeleteAddressContainer,
  getDeliveryAddress,
  updateAddressFlag,
} from "../../../redux/slices/createQuote/action";
import {useDeleteAddressMutation} from "../../../apis/createQuote";
import {
  billingAddressSelector,
  deleteAddressSelector,
  deliveryAddressSelector,
} from "../../../redux/slices/createQuote/selector";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../NotificationToast/NotificationToast";
import ManageDeleteModal from "../DeleteModal/ManageDeleteModal/ManageDeleteModal";
import {useUpdateOrderDetailsAddressMutation} from "../../../apis/ManageOrders";
const {Text} = Typography;

const EditAddressModal = ({
  address,
  deliveryAddress,
  addressID,
  order,
  orderId,
  mob_credit_check = false,
}) => {
  const dispatch = useDispatch();
  const showMobCreditIcon = (deliveryAddress || []).some(
    (item) => item?.mob_credit
  );
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
  const [formData, setFormData] = useState(initialFormData);
  const [billingFormData, setBillingFormData] = useState(initialFormData);
  const delivery_address = useSelector(deliveryAddressSelector);
  const billing_address = useSelector(billingAddressSelector);
  const delete_Address = useSelector(deleteAddressSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [value, setValue] = useState();
  const [editData, setEditData] = useState({});
  const [deleteAddressApi, {isSuccess: deleteAddressSuccess}] =
    useDeleteAddressMutation();
  const [deliverHereApi] = useUpdateOrderDetailsAddressMutation();
  useEffect(() => {
    if (deleteAddressSuccess) {
      dispatch(updateAddressFlag(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAddressSuccess]);
  useEffect(() => {
    if (addressID) {
      setValue(addressID);
    } else {
      setValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancelDelete = () => {
    dispatch(getDeleteAddressContainer({}));
    setDeleteModal(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeleteOpenModal = (data, address_type) => {
    dispatch(getDeleteAddressContainer(data));
    setDeleteModal(true);
  };

  // const moveTableRows = (value) => {
  //   setIsModalOpen(false);
  //   // createNewTable(value);
  // };
  const addAddress = (val) => {
    setEditData({});
    setIsModalOpen(false);
    if (val === "Delivery") {
      setDeliveryModal(true);
    } else {
      setBillingModal(true);
    }
  };

  const handleChangeAdress = async (address_type, index, id) => {
    if (address_type === "Delivery") {
      if (order) {
        const params = {
          order_id: orderId,
          delivery_address: id,
        };
        const response = await deliverHereApi(params);
        if (response?.error) {
          showErrorToast(response?.error?.data?.message);
        } else {
          const responseData = response?.data;
          showSuccessToast(responseData?.message);
        }
      }
      dispatch(getDeliveryAddress(deliveryAddress[index]));
    } else {
      if (order) {
        const params = {
          order_id: orderId,
          billing_address: id,
        };
        await deliverHereApi(params);
      }
      dispatch(getBillingAddress(deliveryAddress[index]));
    }
    setIsModalOpen(false);
  };
  const handleDeleteAdress = async (address_type, index) => {
    const response = await deleteAddressApi({
      address_id: delete_Address?.id,
    });
    if (response?.data?.message) {
      showSuccessToast(response?.data?.message);
      setDeleteModal(false);
      setIsModalOpen(false);
      dispatch(getDeleteAddressContainer({}));
      if (delivery_address?.id === delete_Address?.id) {
        dispatch(getDeliveryAddress({}));
      }
      if (billing_address?.id === delete_Address?.id) {
        dispatch(getBillingAddress({}));
      }
    }
  };
  const editAddressModal = (val, index) => {
    setIsModalOpen(false);
    setEditData(deliveryAddress[index]);
    if (val === "Delivery") {
      if (editData) {
        setFormData({
          nameCompany: editData.name || "",
          mobileNo: editData.phone_number || "",
          gst: editData.gst_number || "",
          addressI: editData.address_line_1 || "",
          addressII: editData.address_line_2 || "",
          pincode: editData.pincode || "",
          city: editData.city || "",
          state: editData.state || "",
          email: editData.email || "",
          address_tag: editData.address_tag || "",
          id: editData.id || "",
        });
      }

      setDeliveryModal(true);
    } else {
      setBillingModal(true);

      if (editData) {
        setBillingFormData({
          nameCompany: editData.name || "",
          mobileNo: editData.phone_number || "",
          gst: editData.gst_number || "",
          addressI: editData.address_line_1 || "",
          addressII: editData.address_line_2 || "",
          pincode: editData.pincode || "",
          city: editData.city || "",
          state: editData.state || "",
          email: editData.email || "",
          address_tag: editData.address_tag || "",
          id: editData.id || "",
        });
      }
    }
  };
  return (
    <>
      {address === "Delivery" && (
        <CardEdit onClick={showModal}>
          {delivery_address?.name ? "EDIT" : "ADD ADDRESS"}
        </CardEdit>
      )}
      {address === "Billing" && (
        <CardEdit onClick={showModal}>
          {billing_address?.name ? "EDIT" : "ADD ADDRESS"}
        </CardEdit>
      )}
      <Modal
        title={
          address === "Delivery"
            ? "Select delivery address"
            : "Select billing address"
        }
        className="edit-address"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // style={{ overflow: "hidden" }}
        footer={[]}>
        <Col
          style={{
            maxHeight: "600px",
            //  overflow: "auto"
          }}>
          <Col
            style={{
              borderWidth: "12px 1px",
              borderStyle: "solid",
              borderColor: "#f1f1f2",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "13px",
              cursor: "pointer",
            }}
            onClick={() => addAddress(address)}>
            <AddIcon />
            <Text style={{color: "#2973f0", fontSize: "16px", fontWeight: 500}}>
              Add new address
            </Text>
          </Col>
          <Col
            style={{
              // height: "300px",
              padding: "12px 30px",
              width: "100%",
            }}>
            <Radio.Group
              onChange={onChange}
              value={value}
              style={{width: "100%"}}>
              {deliveryAddress?.map((option, index) => (
                <>
                  <Col
                    key={option.id}
                    style={{
                      width: "100%",
                      //   height: "80px",
                      padding: "14px 16px",
                      borderRadius: "16px",
                      border: `2px solid ${
                        value === option.id ? "#0a243f" : "#f1f1f2"
                      }`,
                      background: `${value === option.id ? "#f1f1f2" : "#fff"}`,
                      marginBottom: "12px",
                    }}>
                    <Radio
                      value={option.id}
                      style={{width: "100%"}}
                      className="radio-edit-container">
                      <Col
                        style={{
                          paddingLeft: "16px",
                          width: "100%",
                        }}>
                        <Col
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                          <Col>
                            <Text
                              style={{
                                color: "#0a243f",
                                fontSize: "16px",
                                fontWeight: 500,
                              }}>
                              {option?.name}
                            </Text>
                          </Col>
                          <Col
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}>
                            {option?.address_tag !== "mobCredit" &&
                              option?.address_tag && (
                                <Tag>{option?.address_tag}</Tag>
                              )}
                            {option?.address_tag === "mobCredit" && (
                              <MobCreditWhiteIcon />
                            )}
                            {option?.address_type === "Billing" && (
                              <Tag>Billing</Tag>
                            )}
                          </Col>
                        </Col>

                        <Col style={{display: "flex", gap: "20px"}}>
                          <Text
                            style={{
                              color: "#0a243f",
                              fontSize: "14px",
                              fontWeight: 400,
                            }}>
                            {option?.address_line_1} , {option?.pincode}
                          </Text>
                        </Col>
                      </Col>
                    </Radio>
                    {option.id === value && (
                      <Col style={{marginTop: "10px"}}>
                        <Button
                          style={{
                            width: "100%",
                            height: "40px",
                            backgroundColor: "#0354a3",
                            color: "#fff",
                            fontWeight: 500,
                          }}
                          onClick={() =>
                            handleChangeAdress(address, index, option?.id)
                          }>
                          {address === "Delivery"
                            ? "DELIVER HERE"
                            : "BILLING ADDRESS"}
                        </Button>
                        <Col
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                          <Button
                            style={{
                              width: "49%",
                              height: "40px",
                              color: "#f0483e",
                              fontWeight: 500,
                            }}
                            onClick={() =>
                              handleDeleteOpenModal(option, address)
                            }>
                            DELETE ADDRESS
                          </Button>
                          <Button
                            style={{
                              width: "49%",
                              height: "40px",
                              color: "#2973f0",
                              fontWeight: 500,
                            }}
                            onClick={() => editAddressModal(address, index)}>
                            EDIT ADDRESS
                          </Button>
                        </Col>
                      </Col>
                    )}
                  </Col>
                </>
              ))}
            </Radio.Group>
          </Col>
        </Col>
      </Modal>
      <DeliveryAddress
        deliveryModal={deliveryModal}
        setIsModalOpen={setIsModalOpen}
        setDeliveryModal={setDeliveryModal}
        editData={editData}
        initialFormData={initialFormData}
        formData={formData}
        setFormData={setFormData}
        addressListModal={showModal}
        addressList={deliveryAddress}
        // showMobCreditIcon={showMobCreditIcon}
      />
      <BillingAddress
        initialFormData={initialFormData}
        billingFormData={billingFormData}
        setBillingFormData={setBillingFormData}
        billingModal={billingModal}
        setBillingModal={setBillingModal}
        setIsModalOpen={setIsModalOpen}
        editData={editData}
        addressListModal={showModal}
        showMobCreditIcon={showMobCreditIcon}
        mob_credit_check={mob_credit_check}
        addressList={deliveryAddress}
      />
      <ManageDeleteModal
        open={deleteModal}
        handleOk={handleCancelDelete}
        handleSave={handleDeleteAdress}
        data="this address"
      />
    </>
  );
};

export default React.memo(EditAddressModal);
