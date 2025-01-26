import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown } from "antd";
import { ProfileText } from "../NavbarStyled";
import "./ProfileDropDown.css";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const items = [
    {
      label: <Col className="profile-dropdown-list">Change Password</Col>,
      key: "0",
      onClick: () => handleChangePassword(),
    },

    {
      type: "divider",
    },
    {
      label: <Col className="profile-dropdown-list">Logout</Col>,
      key: "1",
      onClick: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/admin/changePassword");
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
        <Avatar size={38} icon={<UserOutlined />} />
        <ProfileText>{userName}</ProfileText>
        <DownOutlined className="profile-dropdown-styled-cursor" />
      </Col>
    </Dropdown>
  );
};

export default ProfileDropdown;
