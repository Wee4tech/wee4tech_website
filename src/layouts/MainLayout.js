import React from "react";
import { Affix, Layout } from "antd";


const { Header: AntHeader } = Layout;
const MainLayout = (props) => {
  return (
    <Layout>
      <Affix>
        <AntHeader className="">
          {/* <NavbarBlank collapsed={collapsed} setCollapsed={setCollapsed} /> */}
        </AntHeader>
      </Affix>

      <Layout>
        {/* <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /> */}
        {/* </Sider> */}
        <section
          style={{ overflow: "initial", marginLeft: "0px !important" }}
          className="content-container"
        >
          {" "}
          {props.children}
        </section>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
