import { React, useEffect, useState } from "react";
// eslint-disable-next-line
import {
  Row,
  Col,
  Drawer,
  Typography,

  // eslint-disable-next-line
  Button,
  Image,
} from "antd";
// eslint-disable-next-line
import { DownOutlined } from "@ant-design/icons";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import  Logo  from "../../../assets/icons/Wee4.png";

import { ReactComponent as CrossIcon } from "../../../assets/icons/x (3).svg";

import "./Navbar.css";
import {
  HeaderContainer,
  OpenCloseButton,
  ProfileContainer,
  LeftContainer,
} from "./NavbarStyled";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropDown/ProfileDropdown";

const { Title } = Typography;

const Navbar = ({ setCollapsed, collapsed }) => {
  const navigate = useNavigate();
  const handleNavigateDashboard = () => {
    const currentPath = window.location.pathname;
    const dashboardPath = "/dashboard";
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
              <Image preview={false} width={180} src={Logo} onClick={handleNavigateDashboard} />
              {/* <Logo
                style={{ cursor: "pointer", width: "120px" }}
                onClick={handleNavigateDashboard}
              /> */}
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
