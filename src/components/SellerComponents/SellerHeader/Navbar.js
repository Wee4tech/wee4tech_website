import { React, useEffect, useState } from "react";
// eslint-disable-next-line
import {
  Row,
  Col,
  Badge,
  Drawer,
  Typography,
  Dropdown,
  Menu,
  Modal,
  // eslint-disable-next-line
  Button,
} from "antd";
// eslint-disable-next-line
import { DownOutlined } from "@ant-design/icons";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { ReactComponent as Logo } from "../../../assets/seller/icons/mobapartner.svg";
import { ReactComponent as BellIcon } from "../../../assets/seller/icons/bell_black_outline.svg";
import { ReactComponent as CrossIcon } from "../../../assets/seller/icons/x-close.svg";

import { ReactComponent as HomeblueIcon } from "../../../assets/seller/icons/homeblue.svg";
import "./Navbar.css";
import {
  HeaderContainer,
  OpenCloseButton,
  ProfileContainer,
  LeftContainer,
  LeftContainerMobile,
} from "./NavbarStyled";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropDown/ProfileDropdown";

const { Title } = Typography;

const ArrowTop = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10.121"
    height="10.121"
    viewBox="0 0 10.121 10.121"
  >
    <path
      data-name="Line 113"
      transform="translate(1.061 1.061)"
      style={{
        fill: "none",
        stroke: "#000",
        strokelinecap: "round",
        strokelinejoin: "round",
        strokewidth: "1.5px",
      }}
      d="m0 8 8-8"
    />
    <path
      data-name="Path 45676"
      d="M7 7h8v8"
      style={{
        fill: "none",
        stroke: "#000",
        strokelinecap: "round",
        strokelinejoin: "round",
        strokewidth: "1.5px",
      }}
      transform="translate(-5.939 -5.939)"
    />
  </svg>,
];
const Navbar = ({ setCollapsed, collapsed }) => {
  const navigate = useNavigate();
  const handleNavigateDashboard = () => {
    const currentPath = window.location.pathname;
    const dashboardPath = "/seller/sellerdashboard";
    if (currentPath === dashboardPath) {
      window.location.reload();
    } else {
      navigate(dashboardPath);
    }
  };

  useEffect(() => window.scrollTo(0, 0));
  const [visible, setVisible] = useState(false);

  return (
    <>
      <HeaderContainer
        style={{
          backgroundColor: "#fff",
          color: "#0a243f",
          boxShadow: "0 3px 3px 0 rgba(0, 0, 0, 0.08)",
          borderBottom: "1px solid #dedede ",
          padding: "12px 0px",
        }}
      >
        <Row gutter={[24, 0]} style={{ margin: "0px" }}>
          <Col xs={12} sm={24} md={12} lg={12} xl={12}>
            <LeftContainer>
              <OpenCloseButton
                style={{ color: "#0a243f" }}
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </OpenCloseButton>
              <Logo
                style={{ cursor: "pointer", width: "120px" }}
                onClick={handleNavigateDashboard}
              />
            </LeftContainer>
          </Col>

          <Col
            xs={12}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            className="header-control text-right"
          >
            <ProfileContainer>
              <ProfileDropdown />
            </ProfileContainer>
          </Col>
        </Row>
      </HeaderContainer>
      <Drawer
        title={
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              0 Notifications
            </Title>
            <Col
              onClick={() => setVisible(false)}
              style={{
                width: "48px",
                height: "48px",
                padding: "16px",
                borderRadius: " 24px",
                cursor: "pointer",
              }}
            >
              <CrossIcon />
            </Col>
          </Col>
        }
        placement="right"
        visible={visible}
        className="notification-drawer"
        closable={false}
        onClose={() => setVisible(false)}
      ></Drawer>
    </>
  );
};

export default Navbar;
