import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Col,
  Row,
  Skeleton,
  //  Switch,
  Typography,
} from "antd";
import { ReactComponent as MobCreditIcon } from "../../../assets/seller/icons/creditlogo_button.svg";
// import { ReactComponent as ProProfileIcon } from "../../../assets/icons/proProfileIcon.svg";
// import { ReactComponent as InfoIcon } from "../../../assets/icons/InfoIcon.svg";
import MobCreditApplyNowIcon from "../../../assets/seller/icons/credit-applynow.webp";
// import { ReactComponent as InactiveMobCreditBlackIcon } from "../../../assets/icons/inactiveMobCredit.svg";
import {
  // eslint-disable-next-line
  DiamondMemberText,
  // DiamondMemberText,
  UserCardContainer,
  UserDetailContainer,
  UserDetailHeading,
  UserDetailText,
  UserDetails,
  UserNameText,
} from "./Styled";
import { baseUrl, rupifiStatusCheck } from "../../../commonUtils/commonUtils";
import { getNameInitials } from "../../../commonFuntions/CommonUtilFunctions";
import AddCustomerModal from "../../../modules/Customer/AddCustomerModal/AddCustomerModal";
import "./SellerCustomview.css";
import MobCreditCard from "./MobCreditCard";
import StatusDropDown from "../../../modules/ManageOrders/OrderDetails/OrderItems/StatusDropDown";
import { proData } from "../../../modules/ManageOrders/OrderDetails/OrderConstant/Constant";
const { Text } = Typography;
const initialFormData = {
  full_name: "",
  phone_number: "",
  gst_number: "",
  address_line_1: "",
  address_line_2: "",
  pincode: "",
  city: "",
  email: "",
  id: "",
  date_of_birth: "",
};
const SellerCustomview = (props) => {
  const {
    isLoading,
    editCondition,
    data,
    check,
    flag,
    topVipBanner = false,
    // vipMember = true,
    // diamondMember,
    proCheck,
    // handleProApi = () => {},
    createCustomerApi = () => {},
  } = props;
  // console.log("🚀 ~ SellerCustomview ~ flag:", flag)

  const [editCustomerModal, setEditCustomerModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  // const [toggleCheck, setToggleCheck] = useState(true);
  const [
    ,
    // isModalOpen
    setIsModalOpen,
  ] = useState(false);

  const [editData, setEditData] = useState({});
  // const onChangeToggle = (checked) => {
  //   setToggleCheck(checked);
  // };

  const bmp_credit_enable =
    localStorage.getItem("bmp_credit_enable") === "true";
  //  console.log("🚀 ~ SellerCustomview ~ data:", data)

  let first_name = data?.name || "";
  let last_name = data?.last_name || "";
  let full_name = editCondition
    ? data?.name
    : first_name || last_name
    ? `${first_name} ${last_name}`
    : "";
  // eslint-disable-next-line
  let wallet,
    //  mobstar_points,
    phone_number,
    email,
    profile_image,
    gst,
    ruipiCheck,
    activeInactiveCheck,
    available_balance,
    approved_balance,
    is_professional;

  if (check === "viewDetail") {
    // first_name = data?.first_name || "";
    // last_name = data?.last_name || "";
    full_name = data?.name;
    //  wallet = data?.wallet;
    // mobstar_points = data?.mob_star_points;
    phone_number = data?.phone_number;
    email = data?.email;
    gst = data?.gst_number;
    profile_image = `${baseUrl}${data?.profile_image}`;
    ruipiCheck =
      data?.mobCredit?.account_status === "ACTIVE" ||
      data?.mobCredit?.rupifiDetails?.account_status === "ACTIVE";
    available_balance =
      data?.mobCredit?.balance || data?.mobCredit?.rupifiDetails?.balance;
    approved_balance =
      data?.mobCredit?.current_limit || data?.mobCredit?.rupifiDetails?.balance;
    is_professional = data?.is_professional;
  } else if (check === "editOrder") {
    first_name = data?.name || "";
    // last_name = data?.last_name || "";
    full_name = editCondition
      ? data?.name
      : first_name || last_name
      ? `${first_name} ${last_name}`
      : "";
    // wallet = editCondition ? data?.wallet : data?.wallet?.wallet;
    // mobstar_points = "";

    //// editCondition
    ////   ? data?.mobstar_points
    ////   : data?.wallet?.mobstar_points;
    phone_number = editCondition ? data?.phone_number : data?.phone_number;
    email = editCondition ? data?.email : data?.email;
    profile_image = editCondition
      ? data?.profile_image
      : `${baseUrl}${data?.profile_picture}`;
    gst = editCondition ? data?.gst_number : `${data?.gst_number || "--"}`;
    ruipiCheck = editCondition
      ? data?.mobCredit?.account_status === "ACTIVE"
      : data?.mobCredit?.account_status === "ACTIVE";
    available_balance = editCondition
      ? data?.mobCredit?.balance
      : data?.mobCredit?.balance;
    approved_balance = editCondition
      ? data?.mobCredit?.current_limit
      : data?.mobCredit?.current_limit;
    is_professional = editCondition
      ? data?.is_professional
      : data?.is_professional;
  } else if (check === "customerDetail") {
    first_name = data?.first_name || "";
    last_name = data?.last_name || "";
    full_name = data?.full_name;
    // wallet = data?.wallet || "0";
    // mobstar_points = data?.mobstar_points || "";

    phone_number = data?.phone_number || "";
    email = data?.email || "";
    profile_image = `${baseUrl}${data?.profile_picture}`;
    gst = data?.gst_number || "";
    ruipiCheck = data?.mobCredit?.account_status === "ACTIVE";
    activeInactiveCheck = ["ACTIVE", "INACTIVE"].includes(
      data?.ruipi?.account_status
    );
    available_balance = data?.mobCredit?.balance;
    approved_balance = data?.mobCredit?.current_limit;
    is_professional = data?.is_professional;
  } else {
    // wallet = editCondition ? data?.user_details?.wallet : data?.wallet?.wallet;

    // mobstar_points = editCondition
    //   ? data?.rfq_order?.rfq_created_by?.mobstar_points
    //   : data?.wallet?.mobstar_points;

    phone_number = editCondition ? data?.phone_number : data?.phone_number;

    email = editCondition ? data?.user_details?.email : data?.email;

    profile_image = editCondition
      ? data?.user_details?.profile_image
      : `${baseUrl}${data?.profile_picture}`;
    gst = editCondition ? data?.user_details?.gst_number : data?.gst_number;
    ruipiCheck = editCondition
      ? data?.user_details?.rupifiDetails?.account_status === "ACTIVE"
      : data?.rupifiDetails?.account_status === "ACTIVE";
    available_balance = editCondition
      ? data?.user_details?.rupifiDetails?.balance
      : data?.rupifiDetails?.balance;
    approved_balance = editCondition
      ? data?.user_details?.rupifiDetails?.current_limit
      : data?.rupifiDetails?.current_limit;
    is_professional = editCondition
      ? data?.user_details?.is_professional
      : data?.is_professional;
  }
  const showModal = () => {
    setEditData({
      full_name: data?.name,
      phone_number: data?.phone_number,
      gst_number: data?.gst_number,
      address_line_1: data?.address_line_1,
      address_line_2: data?.address_line_2,
      pincode: data?.pincode,
      city: data?.city,
      email: data?.email,
      id: data?.id,
      date_of_birth: data?.date_of_birth,
    });

    setEditCustomerModal(true);
  };
  const profileData = [
    // {
    //   title: "Wallet",
    //   value: `₹ ${Number(wallet || 0).toFixed(2)}`,
    // },
    // {
    //   title: "Mobstar points",
    //   value: check
    //     ? `${mobstar_points || "--"}`
    //     : `${mobstar_points || "--"} points (₹${
    //         mobstar_points || 0 / 10 || "--"
    //       })`,
    // },
    {
      title: "Phone number",
      value: phone_number || "--",
    },
    {
      title: "Email id",
      value: email || "--",
    },
    {
      title: "GST details",
      value: gst || "--",
    },
  ];
  return (
    <>
      {isLoading ? (
        <Col
          style={{
            width: "100%",
            display: "flex",
            backgroundColor: "#fff",
            gap: "30px",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Skeleton.Image active style={{ marginTop: "25px" }} />
          <Skeleton active shape={"square"} block={true} />
        </Col>
      ) : (
        <Col style={{ width: "100%" }}>
          <UserCardContainer
            className="payable-card"
            bordered={false}
            style={{ backgroundColor: "#f1f1f2" }}
          >
            {topVipBanner &&
              rupifiStatusCheck.includes(
                data?.ruipi?.account_status ||
                  data?.user_details?.rupifiDetails?.account_status ||
                  data?.rupifiDetails?.account_status ||
                  data?.rupifiDetails?.account_status
              ) && (
                <Col
                  className={
                    ruipiCheck
                      ? "vip-icon-banner-container-active"
                      : "vip-icon-banner-container-inactive"
                  }
                >
                  <Col className="vip-icon-banner-container-child-active">
                    {ruipiCheck ? (
                      <Text className="Active-text">Active</Text>
                    ) : (
                      // <Text className="Inactive-text">Inactive</Text>
                      <>
                        {data?.rupifiDetails?.primary_status === "REJECTED" ? (
                          <Text className="text-danger"> REJECTED</Text>
                        ) : data?.rupifiDetails?.primary_status ===
                          "PRE_APPROVED" ? (
                          <Text className="text-progress">IN PROGRESS</Text>
                        ) : data?.rupifiDetails?.primary_status ===
                          "PRE_APPROVAL_PENDING" ? (
                          <Text className="text-progress"> IN PROGRESS</Text>
                        ) : data?.rupifiDetails?.primary_status ===
                          "INCOMPLETE" ? (
                          <Text className="text-progress"> IN PROGRESS </Text>
                        ) : data?.rupifiDetails?.primary_status ===
                          "UNDER_REVIEW" ? (
                          <Text className="text-progress"> IN PROGRESS </Text>
                        ) : (
                          // ) : primary_status === "PRE_APPROVAL_PENDING" ? (
                          //   <Text className="text-warning"> IN PROGRESS</Text>
                          <Text className="text-danger"> INACTIVE </Text>
                        )}
                      </>
                    )}
                  </Col>
                </Col>
              )}

            {flag && (
              <Col
                style={{
                  display: "flex",
                  gap: "24px",
                  float: "right",
                  paddingRight: "16px",
                  paddingTop: "5px",
                  alignItems: "center",
                }}
              >
                {/* <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#bf2600",
                  }}
                >
                  Flag
                </Text> */}
                {proCheck && (gst || activeInactiveCheck) && (
                  <StatusDropDown
                    status={is_professional ? "PRO Active" : "PRO Inactive"}
                    data={proData}
                    // api={updateOrderStatusApi}
                    // index={index}
                    //handleAPI={handleProApi}
                    // dropdownCheck={true}
                  />
                )}
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#2973f0",
                    cursor: "pointer",
                  }}
                  onClick={showModal}
                >
                  Edit profile
                </Text>
              </Col>
            )}
            <Row
              style={{
                padding: "18px 18px 18px 18px",
                // paddingRight: "24px",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Col
                className="full-card-width"
                style={{ display: "flex", gap: "30px" }}
              >
                <Col>
                  <Badge
                    style={{ position: "absolute", top: 74, left: 55 }}
                    // count={flag ? "" : <StarIcon />}
                  >
                    <Avatar
                      shape="square"
                      style={{
                        height: "88px",
                        width: "88px",
                        position: "relative",
                        border: ruipiCheck ? "1.6px solid #fecb00" : "",
                      }}
                      src={profile_image || ""}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "80px",
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          {full_name ? getNameInitials(full_name) : `N/A`}
                        </Text>
                      </Col>
                    </Avatar>
                  </Badge>
                </Col>
                <UserDetailContainer>
                  <Col className="custom-header-name">
                    <UserNameText level={5}>{full_name || "--"}</UserNameText>
                    {!window.location.pathname.startsWith(
                      "/seller/CustomerViewDetails/"
                    ) && (
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#2973f0",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          window.open(
                            `/seller/CustomerViewDetails/${phone_number}`,
                            "_blank"
                          )
                        }
                      >
                        Seller customer view
                      </Text>
                    )}
                  </Col>
                  <Row gutter={[16, 16]}>
                    {profileData.map((element, index) => (
                      <Col xs={24} sm={12} md={12} lg={24} xl={8}>
                        <UserDetails key={index}>
                          <UserDetailHeading>{element.title}</UserDetailHeading>
                          <UserDetailText>
                            {element.value || "--"}
                          </UserDetailText>
                        </UserDetails>
                      </Col>
                    ))}
                  </Row>
                </UserDetailContainer>
              </Col>
              {bmp_credit_enable ? (
                <Col className="mob-credit-card-wrapper">
                  <MobCreditCard
                    ruipiCheck={ruipiCheck}
                    approved_balance={approved_balance}
                    available_balance={available_balance}
                    rupifyData={data?.mobCredit}
                  />
                </Col>
              ) : (
                <Col className="mob-credit-black mob-credit-card-wrapper">
                  <div className="mobcredit-banner">
                    <img
                      src={MobCreditApplyNowIcon}
                      className="bg-image-bag"
                      alt=""
                    />
                    <div className="banner-text-container">
                      <h1 className="banner-title">
                        {" "}
                        <MobCreditIcon />
                      </h1>
                      <p className="banner-subtitle">
                        Get credit up to 50 Lakhs
                      </p>
                    </div>
                    <div className="button-container">
                      <Text
                        className="hyperlink-text-white mobcredit-applynow"
                        onClick={() =>
                          window.open("/Seller/mobcreditonboarding", "_blank")
                        }
                      >
                        APPLY NOW
                      </Text>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </UserCardContainer>
          <AddCustomerModal
            addCustomerModal={editCustomerModal}
            setIsModalOpen={setIsModalOpen}
            setAddCustomerModal={setEditCustomerModal}
            editData={editData}
            initialFormData={initialFormData}
            title={"Edit customer"}
            formData={formData}
            setFormData={setFormData}
            addressListModal={showModal}
            createCustomerApi={createCustomerApi}
          />
        </Col>
      )}
    </>
  );
};
export default React.memo(SellerCustomview);
