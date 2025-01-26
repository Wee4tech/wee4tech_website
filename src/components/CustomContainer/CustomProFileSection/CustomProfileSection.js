import React, {useState} from "react";
import {
  Avatar,
  Badge,
  Col,
  Row,
  Skeleton,
  //  Switch,
  Typography,
} from "antd";
// import { ReactComponent as StarIcon } from "../../../assets/icons/star.svg";
import {ReactComponent as VipMemberIcon} from "../../../assets/icons/vipMemberIcon.svg";
import {ReactComponent as ProProfileIcon} from "../../../assets/icons/proProfileIcon.svg";
import {ReactComponent as VipMemberInactiveIcon} from "../../../assets/icons/inactiveVipMemberIcon.svg";
import {ReactComponent as VipInactiveIcon} from "../../../assets/icons/inactiveVipIcon.svg";
import {ReactComponent as InfoIcon} from "../../../assets/icons/InfoIcon.svg";
// import { ReactComponent as MobCreditBlackIcon } from "../../../assets/icons/mobCreditBlackIcon.svg";
// import { ReactComponent as InactiveMobCreditBlackIcon } from "../../../assets/icons/inactiveMobCredit.svg";
import {
  DiamondMemberText,
  // DiamondMemberText,
  UserCardContainer,
  UserDetailContainer,
  UserDetailHeading,
  UserDetailText,
  UserDetails,
  UserNameText,
} from "./Styled";
import {baseUrl, rupifiStatusCheck} from "../../../commonUtils/commonUtils";
import {getNameInitials} from "../../../commonFuntions/CommonUtilFunctions";
import AddCustomerModal from "../../../modules/Customer/AddCustomerModal/AddCustomerModal";
import "./CustomProfileSection.css";
import MobCreditCard from "./MobCreditCard";
import StatusDropDown from "../../../modules/ManageOrders/OrderDetails/OrderItems/StatusDropDown";
import {proData} from "../../../modules/ManageOrders/OrderDetails/OrderConstant/Constant";
const {Text} = Typography;
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
const CustomProfileSection = (props) => {
  const {
    isLoading,
    editCondition,
    data,
    check,
    flag,
    vipMemberCheck = true,
    topVipBanner = false,
    // vipMember = true,
    diamondMember,
    proCheck,
    handleProApi = () => {},
    createCustomerApi = () => {},
  } = props;
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
  let first_name = data?.first_name || "";
  let last_name = data?.last_name || "";
  let full_name = editCondition
    ? data?.user_details?.full_name
    : first_name || last_name
    ? `${first_name} ${last_name}`
    : "";

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
    full_name = data?.full_name;
    wallet = data?.wallet;
    // mobstar_points = data?.mob_star_points;
    phone_number = data?.phone_number;
    email = data?.email;
    gst = data?.gst_number;
    profile_image = `${baseUrl}${data?.profile_image}`;
    ruipiCheck = data?.rupifiDetails?.account_status === "ACTIVE";
    available_balance = data?.rupifiDetails?.balance;
    approved_balance = data?.rupifiDetails?.current_limit;
    is_professional = data?.is_professional;
  } else if (check === "editOrder") {
    first_name = data?.full_name || "";
    last_name = data?.last_name || "";
    full_name = editCondition
      ? data?.full_name
      : first_name || last_name
      ? `${first_name} ${last_name}`
      : "";
    wallet = editCondition ? data?.wallet : data?.wallet?.wallet;
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
      ? data?.rupifiDetails?.account_status === "ACTIVE"
      : data?.rupifiDetails?.account_status === "ACTIVE";
    available_balance = editCondition
      ? data?.rupifiDetails?.balance
      : data?.rupifiDetails?.balance;
    approved_balance = editCondition
      ? data?.rupifiDetails?.current_limit
      : data?.rupifiDetails?.current_limit;
    is_professional = editCondition
      ? data?.is_professional
      : data?.is_professional;
  } else if (check === "customerDetail") {
    first_name = data?.first_name || "";
    last_name = data?.last_name || "";
    full_name = data?.full_name;
    wallet = data?.wallet || "0";
    // mobstar_points = data?.mobstar_points || "";

    phone_number = data?.phone_number || "";
    email = data?.email || "";
    profile_image = `${baseUrl}${data?.profile_picture}`;
    gst = data?.gst_number || "";
    ruipiCheck = data?.ruipi?.account_status === "ACTIVE";
    activeInactiveCheck = ["ACTIVE", "INACTIVE"].includes(
      data?.ruipi?.account_status
    );
    available_balance = data?.ruipi?.balance;
    approved_balance = data?.ruipi?.current_limit;
    is_professional = data?.is_professional;
  } else {
    wallet = editCondition ? data?.user_details?.wallet : data?.wallet?.wallet;

    // mobstar_points = editCondition
    //   ? data?.rfq_order?.rfq_created_by?.mobstar_points
    //   : data?.wallet?.mobstar_points;

    phone_number = editCondition
      ? data?.user_details?.phone_number
      : data?.phone_number;

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
      full_name: data?.full_name,
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
    {
      title: "Wallet",
      value: `₹ ${Number(wallet || 0).toFixed(2)}`,
    },
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
            padding: "20px",
          }}>
          <Skeleton.Image active style={{marginTop: "25px"}} />
          <Skeleton active shape={"square"} block={true} />
        </Col>
      ) : (
        <Col style={{width: "100%"}}>
          <UserCardContainer bordered={false}>
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
                  }>
                  <Col className="vip-icon-banner-container-child">
                    {ruipiCheck ? <VipMemberIcon /> : <VipMemberInactiveIcon />}
                    <InfoIcon style={{color: "#fff"}} />
                  </Col>
                  <Col className="vip-icon-banner-container-child-active">
                    {ruipiCheck ? (
                      <Text className="Active-text">Active</Text>
                    ) : (
                      <Text className="Inactive-text">Inactive</Text>
                    )}
                    {/* <Switch
                    defaultChecked
                    onChange={onChangeToggle}
                    checked={toggleCheck}
                  /> */}
                  </Col>
                </Col>
              )}
            <Col style={{display: "flex", gap: "8px"}}>
              {vipMemberCheck &&
                rupifiStatusCheck.includes(
                  data?.ruipi?.account_status ||
                    data?.user_details?.rupifiDetails?.account_status ||
                    data?.rupifiDetails?.account_status ||
                    data?.rupifiDetails?.account_status
                ) && (
                  <>
                    <Col
                      className={
                        ruipiCheck
                          ? "vip-member-icon-container"
                          : "vip-member-icon-container-inactive"
                      }>
                      {ruipiCheck ? <VipMemberIcon /> : <VipInactiveIcon />}
                    </Col>
                  </>
                )}
              {diamondMember && (
                <DiamondMemberText>Diamond member</DiamondMemberText>
              )}
            </Col>
            {flag && (
              <Col
                style={{
                  display: "flex",
                  gap: "24px",
                  float: "right",
                  paddingRight: "16px",
                  paddingTop: "5px",
                  alignItems: "center",
                }}>
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
                    handleAPI={handleProApi}
                    dropdownCheck={true}
                  />
                )}
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#2973f0",
                    cursor: "pointer",
                  }}
                  onClick={showModal}>
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
              }}>
              <Col style={{display: "flex", gap: "30px"}}>
                <Col>
                  <Badge
                    style={{position: "absolute", top: 74, left: 55}}
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
                      src={profile_image || ""}>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "80px",
                        }}>
                        <Text
                          style={{
                            color: "black",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}>
                          {full_name ? getNameInitials(full_name) : `N/A`}
                        </Text>
                      </Col>
                    </Avatar>
                  </Badge>
                </Col>
                <UserDetailContainer>
                  <Col className="custom-header-name">
                    <UserNameText level={5}>{full_name || "--"}</UserNameText>
                    {is_professional && <ProProfileIcon />}
                  </Col>
                  <Col style={{display: "flex", gap: "36px"}}>
                    {profileData.map((element, index) => (
                      <UserDetails key={index}>
                        <UserDetailHeading>{element.title}</UserDetailHeading>
                        <UserDetailText>{element.value || "--"}</UserDetailText>
                      </UserDetails>
                    ))}
                  </Col>
                </UserDetailContainer>
              </Col>
              {rupifiStatusCheck.includes(
                data?.ruipi?.account_status ||
                  data?.user_details?.rupifiDetails?.account_status ||
                  data?.rupifiDetails?.account_status ||
                  data?.rupifiDetails?.account_status
              ) && (
                <Col style={{width: "30%"}}>
                  <MobCreditCard
                    ruipiCheck={ruipiCheck}
                    approved_balance={approved_balance}
                    available_balance={available_balance}
                    rupifyData={data?.ruipi?.account_status}
                  />
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
export default React.memo(CustomProfileSection);
