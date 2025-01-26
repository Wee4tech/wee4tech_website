import React, { useState,useEffect } from "react";
import { Layout, Affix } from "antd";
import Sidebar from "../components/SellerComponents/SellerSidebar/Sidebar";
import Navbar from "../components/SellerComponents/SellerHeader/Navbar";
import "../SellerResponsive.css"

const { Content, Header: AntHeader } = Layout;

export const SellerLayout = (props) => {
  // const [collapsed, setCollapsed] = useState(false);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const [collapsed, setCollapsed] = useState(() => {
    const storedCollapsed = localStorage.getItem("collapsed");
    return storedCollapsed!== null? JSON.parse(storedCollapsed) : isMobile;
  });
  useEffect(() => {
    localStorage.setItem("collapsed", JSON.stringify(collapsed));
  }, [collapsed]);
   return (
   
    <Layout className={`layout-dashboard layout-profile ${collapsed ? 'menu-collapsed' : ''}`}>
       <Affix>
          <AntHeader className="">
          <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </AntHeader>
        </Affix>

      <Layout>
        
        {/* <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
         // console.log(collapsed, type);
        }}
        trigger={null}
        // width={320}
       
        className={`sider-primary ant-layout-sider-primary ant-layout-sider ant-layout-sider-light ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      > */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* </Sider> */}
        <Content style={{ overflow: 'initial' }} className="content-ant "> {props.children}</Content>
      </Layout>
    </Layout>
  );
};
export default SellerLayout;
