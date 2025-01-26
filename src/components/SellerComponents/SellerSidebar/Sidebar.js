import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography } from "antd";
import HomeIcon from "../../Icons/HomeIcon";
import { sellerMenuItems, sellerRoutes } from "./../SellerSidebar/menuItems";
import OrderIcon from "../../Icons/OrderIcon";
import CustomerIcon from "../../Icons/CustomerIcon";
import SellerIcon from "../../Icons/SellerIcon";
import ReturnIcon from "../../Icons/ReturnIcon";
import RenderIcons from "./../SellerSidebar/RenderIcons";
import RequestIcon from "../../Icons/RequestIcon";
import SettingsIcon from "../../Icons/SettingsIcon";
import ReportsIcon from "../../Icons/ReportsIcon";
import SubMenu from "antd/es/menu/SubMenu";
import { Link, useLocation, useParams } from "react-router-dom";
import "./../SellerSidebar/Sidebar.css";
import { MobIcon } from "../../Icons/MobIcon";
import ReturnExchange from "../../Icons/returnsexchange";
import OrderIssue from "../../Icons/OrderIssue";
import ManageProduct from "../../Icons/ManageProduct";
import Payables from "../../Icons/Payables";
import Settlements from "../../Icons/Settlements";
// import {Settlements as ReactComponent} from "../../../assets/seller/icons/settlement.svg"
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
// eslint-disable-next-line
const Text = Typography;
const Sidebar = ({ collapsed, setCollapsed }) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // eslint-disable-next-line
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState(null);
  const { seller_id } = useParams();
  let { pathname } = useLocation();
  let url_parts = pathname.split("/");
  let new_url = url_parts.slice(0, url_parts.length - 1).join("/");

  const mapAdminIcon = {
    dashboard: <HomeIcon />,
    orders: <OrderIcon />,
    return: <ReturnIcon />,
    requests: <RequestIcon />,
    product: <ManageProduct />,
    sellers: <SellerIcon />,
    reports: <ReportsIcon />,
    accounts: <SettingsIcon />,
    MOBsettlements: <Settlements />,
    customer: <CustomerIcon />,
    forms: <RequestIcon />,
    Payablesrecievables: <Payables />,
    ReturnExchange: <ReturnExchange />,
    OrderIssues: <OrderIssue />,
  };

  const mapSellerIcon = {
    inventoryAndPrice: <MobIcon />,
    catalogue: <SellerIcon />,
    mobLibrary: <MobIcon />,
  };
  const sellerCheck = sellerRoutes.includes(new_url);
  const menuItems = sellerMenuItems;
  const mapIcon = sellerCheck ? mapSellerIcon : mapAdminIcon;
  // useEffect(() => {
  //   const meunitem = sellerCheck ? sellerMenuItems : adminMenuItems;
  //   let previousSelectedMenu = meunitem.filter(
  //     (item) => item?.path !== "" && pathname?.includes(item?.path)
  //   );
  //   setSelectedMenu(previousSelectedMenu?.[0]?.key);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);
  useEffect(() => {
    const menuItems = sellerMenuItems;
    let previousSelectedMenu = null;

    menuItems.forEach((item) => {
      if (item.children) {
        const foundChild = item.children.find(
          (child) => child.path !== "" && pathname.includes(child.path)
        );
        if (foundChild) {
          previousSelectedMenu = foundChild.key;
        }
      } else {
        if (item.path !== "" && pathname.includes(item.path)) {
          previousSelectedMenu = item.key;
        }
      }
    });

    setSelectedMenu(previousSelectedMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const handleLinkClick = (menuItemKey) => {
    if (selectedMenu === menuItemKey) {
      window.location.reload(); // Reload the page
    } else {
      setSelectedMenu(menuItemKey);
      if (isMobile) {
        setCollapsed(true); // Close the menu on mobile devices
      }
    }
  };

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        className="left-sidebar"
        style={{
          background: "#fff !important",
          transition: "all 0.5s ease-in-out 0s",
          border: "solid 1px #d0d0d0",
          overflow: "auto",
          // height: "100vh",
          position: "fixed",
          left: 0,
          top: 72,
          bottom: 0,
        }}
        width={300}
        tabIndex={0}
        // className="d-none d-md-block d-lg-block d-xl-block"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedMenu]}
          selectedKeys={[selectedMenu]}
          style={{
            marginTop: "24px",
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: "500",
            border: "none",
            background: "#fff !important",
            transition: "all 0.5s ease-in-out 0s",
            // overflow: 'auto',
            left: 0,
            top: 68,
            bottom: 0,
            zIndex: 1000,
          }}
          inlineCollapsed={collapsed}
        >
          {menuItems.map((menuItem) => {
            if (menuItem.children) {
              return (
                <SubMenu
                  key={menuItem.key}
                  icon={<RenderIcons value={mapIcon[menuItem.key]} />}
                  // style={{paddingLeft:"0px"}}
                  // style={{ padding: "5px 0px 0px 12px" }}
                  onClick={() => {
                    setSelectedMenu(menuItem.key);
                  }}
                  title={menuItem.label}
                >
                  {menuItem.children.map((submenuItem) => {
                    return (
                      <Menu.Item
                        // style={{paddingLeft:"0px"}}

                        key={submenuItem.key}
                        onClick={() => handleLinkClick(submenuItem.key)}
                      >
                        <Link to={submenuItem.path}> {submenuItem.title}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            } else {
              const linkPath =
                seller_id && sellerRoutes.includes(new_url)
                  ? `${menuItem.path}/${seller_id}`
                  : menuItem.path;
              return (
                <Menu.Item
                  key={menuItem.key}
                  icon={<RenderIcons value={mapIcon[menuItem.key]} />}
                  // style={{ padding: "5px 0px 0px 12px" }}
                  onClick={() => {
                    setSelectedMenu(menuItem.key);
                    handleLinkClick(menuItem.key);
                  }}
                >
                  <Link to={linkPath}> {menuItem.label}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      {!collapsed && (
        <div
          className={`ant-drawer-mask ${
            collapsed ? "" : "ant-drawer-mask-visible"
          }`}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 999,
            background: "rgba(0, 0, 0, 0.45)",
            opacity: collapsed ? 0 : 1,
            transition: "opacity 0.3s",
            display: `${collapsed ? "none" : "block"}`,
          }}
          onClick={() => setCollapsed(!collapsed)}
        ></div>
      )}
    </>
  );
};
export default Sidebar;
