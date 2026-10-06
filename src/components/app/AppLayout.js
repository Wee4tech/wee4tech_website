import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Drawer, Dropdown, Grid, Layout, Menu } from "antd";
import {
  DashboardOutlined,
  DownOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import logoWhite from "../../assets/logo-white.png";
import logoMark from "../../assets/logo-mark.png";
import logo from "../../assets/logo.png";
import { currentEmail, logout } from "../../lib/auth";
import ErrorBoundary from "./ErrorBoundary";

const { Header, Sider, Content } = Layout;

export const NAV = [
  { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "/contactusreport", icon: <MailOutlined />, label: "Contact enquiries" },
  { key: "/carriersreport", icon: <SolutionOutlined />, label: "Job applications" },
];

const menuItems = NAV.map((n) => ({ key: n.key, icon: n.icon, label: <Link to={n.key}>{n.label}</Link> }));

function SideNav({ collapsed, selected }) {
  return (
    <div className="sidenav">
      <Link to="/dashboard" className={`sidenav__brand ${collapsed ? "is-collapsed" : ""}`} aria-label="Wee4 Tech Solutions">
        <img src={collapsed ? logoMark : logoWhite} alt="Wee4 Tech Solutions" />
      </Link>
      {!collapsed && <div className="sidenav__section">Menu</div>}
      <Menu theme="dark" mode="inline" selectedKeys={selected ? [selected] : []} items={menuItems} inlineCollapsed={collapsed} />
      {!collapsed && (
        <div className="sidenav__foot">
          <span className="sidenav__dot" /> Leads from all Wee4 websites
        </div>
      )}
    </div>
  );
}

export default function AppLayout() {
  const screens = Grid.useBreakpoint();
  const isDesktop = screens.lg;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("navCollapsed") === "1");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("navCollapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const selected = NAV.find((n) => pathname.toLowerCase().startsWith(n.key))?.key;
  const email = currentEmail();

  const userMenu = {
    items: [
      { key: "who", label: <span className="muted">Signed in as<br /><strong style={{ color: "#1d2b2a" }}>{email}</strong></span>, disabled: true },
      { type: "divider" },
      { key: "logout", icon: <LogoutOutlined />, label: "Log out", danger: true },
    ],
    onClick: ({ key }) => {
      if (key === "logout") {
        logout();
        navigate("/login", { replace: true });
      }
    },
  };

  return (
    <Layout className="app-shell">
      {isDesktop ? (
        <Sider width={256} collapsedWidth={80} collapsed={collapsed} trigger={null} className="app-sider">
          <SideNav collapsed={collapsed} selected={selected} />
        </Sider>
      ) : (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={272}
          closable={false}
          rootClassName="app-drawer"
        >
          <SideNav selected={selected} />
        </Drawer>
      )}

      <Layout className="app-main">
        <Header className="app-header">
          <Button
            type="text"
            className="app-header__toggle"
            aria-label="Toggle menu"
            icon={isDesktop ? (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />) : <MenuOutlined />}
            onClick={() => (isDesktop ? setCollapsed((c) => !c) : setDrawerOpen(true))}
          />
          {!isDesktop && (
            <Link to="/dashboard" className="app-header__logo">
              <img src={logo} alt="Wee4 Tech Solutions" />
            </Link>
          )}
          <Dropdown menu={userMenu} trigger={["click"]} placement="bottomRight">
            <button type="button" className="user-chip">
              <Avatar size={32} className="user-chip__avatar">
                {email.slice(0, 1).toUpperCase()}
              </Avatar>
              {screens.md && (
                <span className="user-chip__text">
                  <strong>Admin</strong>
                  <small>{email}</small>
                </span>
              )}
              <DownOutlined className="user-chip__caret" />
            </button>
          </Dropdown>
        </Header>
        <Content className="app-content">
          <ErrorBoundary key={pathname}>
            <Outlet />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
}
