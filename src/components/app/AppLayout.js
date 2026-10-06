import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Drawer, Grid, Layout, Menu, Tooltip } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import logo from "../../assets/wee4-logo.png";
import { currentEmail, logout } from "../../lib/auth";
import ErrorBoundary from "./ErrorBoundary";

const { Header, Sider, Content } = Layout;

export const NAV = [
  { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "/contactusreport", icon: <MailOutlined />, label: "Contact enquiries" },
  { key: "/carriersreport", icon: <SolutionOutlined />, label: "Job applications" },
];

const menuItems = NAV.map((n) => ({ key: n.key, icon: n.icon, label: <Link to={n.key}>{n.label}</Link> }));

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

  // close the mobile drawer after navigating
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const selected = NAV.find((n) => pathname.toLowerCase().startsWith(n.key))?.key;
  const title = NAV.find((n) => n.key === selected)?.label || "";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const nav = <Menu mode="inline" selectedKeys={selected ? [selected] : []} items={menuItems} className="app-menu" />;

  return (
    <Layout className="app-shell">
      {isDesktop ? (
        <Sider
          theme="light"
          width={240}
          collapsedWidth={72}
          collapsed={collapsed}
          trigger={null}
          collapsible
          className="app-sider"
        >
          <Link to="/dashboard" className={`app-brand ${collapsed ? "is-collapsed" : ""}`}>
            <img src={logo} alt="Wee4 Tech Solutions" />
          </Link>
          {nav}
        </Sider>
      ) : (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={260}
          closable={false}
          rootClassName="app-drawer"
        >
          <Link to="/dashboard" className="app-brand">
            <img src={logo} alt="Wee4 Tech Solutions" />
          </Link>
          {nav}
        </Drawer>
      )}

      <Layout>
        <Header className="app-header">
          <Button
            type="text"
            aria-label="Toggle menu"
            icon={isDesktop ? (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />) : <MenuOutlined />}
            onClick={() => (isDesktop ? setCollapsed((c) => !c) : setDrawerOpen(true))}
          />
          {!isDesktop && (
            <Link to="/dashboard" className="app-header__logo">
              <img src={logo} alt="Wee4 Tech Solutions" />
            </Link>
          )}
          <h1 className="app-header__title">{isDesktop ? title : ""}</h1>
          <div className="app-header__right">
            {screens.md && <span className="app-header__user">{currentEmail()}</span>}
            <Tooltip title="Log out">
              <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                {screens.sm ? "Log out" : null}
              </Button>
            </Tooltip>
          </div>
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
