import React from "react";
import { Tabs, Affix, Layout } from "antd";

import TermsDetails from "./TermsDetails";
import PrivacyDetails from "./PrivacyDetails";
import "./Termsandcondition.css"
import Navbar from "../../components/SellerComponents/SellerHeader/Navbar";
const { Header: AntHeader } = Layout;
const Termsandcondition = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Privacy Policy",
      children: <PrivacyDetails/>,
    },
    {
      key: "2",
      label: "Terms and conditions",
      children: <TermsDetails/>,
    },
    // {
    //   key: "3",
    //   label: "Tab 3",
    //   children: "Content of Tab Pane 3",
    // },
  ];

  return (
    <div>
      <Affix>
        <AntHeader className="">
          <Navbar collapsed={true} setCollapsed={true} />
        </AntHeader>
      </Affix>
      <Layout>
        <section

          style={{ overflow: "initial", marginLeft: "0px !important" }}
          className="content-container d-none d-md-block d-lg-block d-xl-block"
        >
          <Tabs
          className="custom-tab-terms "
            tabPosition={"left"}
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        
        </section>
        <section
          style={{ overflow: "initial", marginLeft: "0px !important" }}
          className="content-container d-block d-sm-block d-lg-none d-xl-none"
        >
         
          <Tabs
          className="custom-tab-terms"
            tabPosition={"top"}
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </section>
      </Layout>
    </div>
  );
};

export default Termsandcondition;
