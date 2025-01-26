import React from "react";
import MainLayout from "../../layouts/MainLayout";

import { Content } from "antd/es/layout/layout";

const CommonRoute = (props) => {
  console.log("🚀 ~ CommonRoute ~ props:", props)
  const { children } = props;

    <MainLayout>
      <Content>{children}</Content>
    </MainLayout>
  
};

export default CommonRoute;
