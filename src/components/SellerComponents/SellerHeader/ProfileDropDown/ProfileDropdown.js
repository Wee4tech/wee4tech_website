import React from "react";
  // eslint-disable-next-line
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown } from "antd";
import { ProfileText } from "../NavbarStyled";
import "./ProfileDropDown.css";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  //const userName = localStorage.getItem("userName");
  let userName =
    localStorage.getItem("selleruserName") !== null &&
    localStorage.getItem("selleruserName") !== undefined
      ? localStorage.getItem("selleruserName")
      : "";
  if (userName === "undefined") {
    userName = "";
  }
  const sellerProfilePic = localStorage.getItem("sellerProfilePic") || "";
  
  const navigate = useNavigate();
  const items = [
    // {
    //   label: <Col className="profile-dropdown-list">Change Password</Col>,
    //   key: "0",
    //   onClick: () => handleChangePassword(),
    // },

    // {
    //   type: "divider",
    // },

    {
      label: <Col className="profile-dropdown-list">Account and Settings</Col>,
      key: "1",
      onClick: () => handleAccounts(),
    },
    {
      type: "divider",
    },
    {
      label: <Col className="profile-dropdown-list">Logout</Col>,
      key: "2",
      onClick: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleAccounts = () => {
    navigate("/Accountsandsettings");
  };
  // eslint-disable-next-line
  const handleChangePassword = () => {
    navigate("/changePassword");
  };
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <Col
        className="profile-dropDown-wrapper"
        onClick={(e) => e.preventDefault()}
      >
        {/* <Avatar className="profile-pic" size={38} src={sellerProfilePic} icon={<UserOutlined />} /> */}
        {sellerProfilePic ? (
          <Avatar src={sellerProfilePic} className="profile-pic" />
        ) : (
          <span className="member_img" style={{margin:"0px"}}>
            {userName?.slice(0, 2).toUpperCase()}
          </span>
        )}
        <ProfileText>{userName ? userName : ""}</ProfileText>
        <DownOutlined className="profile-dropdown-styled-cursor" />
      </Col>
    </Dropdown>
  );
};

export default ProfileDropdown;
