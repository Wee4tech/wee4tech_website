import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import HomeIcon from "../Icons/HomeIcon";
import { adminMenuItems, sellerMenuItems, sellerRoutes } from "./menuItems";
import OrderIcon from "../Icons/OrderIcon";
import CustomerIcon from "../Icons/CustomerIcon";
import SellerIcon from "../Icons/SellerIcon";
import ReturnIcon from "../Icons/ReturnIcon";
import RenderIcons from "./RenderIcons";
import RequestIcon from "../Icons/RequestIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import ReportsIcon from "../Icons/ReportsIcon";
import SubMenu from "antd/es/menu/SubMenu";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Sidebar.css";
import { MobIcon } from "../Icons/MobIcon";

const { Sider } = Layout;
const Sidebar = ({ collapsed, setCollapsed }) => {
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
    product: <OrderIcon />,
    sellers: <SellerIcon />,
    reports: <ReportsIcon />,
    accounts: <SettingsIcon />,
    settlement: <RequestIcon />,
    customer: <CustomerIcon />,
    categories: <OrderIcon />,
    manageState: <OrderIcon />,
    manageVehicle: <OrderIcon />,
    manageCity: <OrderIcon />,
    forms: <RequestIcon />,
  };

  const mapSellerIcon = {
    inventoryAndPrice: <MobIcon />,
    catalogue: <SellerIcon />,
    mobLibrary: <MobIcon />,
  };
  const sellerCheck = sellerRoutes.includes(new_url);
  const menuItems = sellerCheck ? sellerMenuItems : adminMenuItems;
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
    const menuItems = sellerCheck ? sellerMenuItems : adminMenuItems;
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
    }
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
      style={{
        background: "#fff !important",
        transition: "all 0.5s ease-in-out 0s",
        border: "solid 1px #d0d0d0",
      }}
      width={300}
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
        }}
        inlineCollapsed={collapsed}
      >
        {menuItems.map((menuItem) => {
          if (menuItem.children) {
            return (
              <SubMenu
                key={menuItem.key}
                icon={<RenderIcons value={mapIcon[menuItem.key]} />}
                onClick={() => {
                  setSelectedMenu(menuItem.key);
                }}
                title={menuItem.label}
              >
                {menuItem.children.map((submenuItem) => {
                  return (
                    <Menu.Item
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
                style={{ padding: "13px", paddingLeft: "13px" }}
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
  );
};
export default Sidebar;
