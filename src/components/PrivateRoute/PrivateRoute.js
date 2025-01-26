import React from "react";

import { Navigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import SellerLayout from "../../layouts/SellerLayout";

const PrivateRoute = (props) => {
  const { children } = props;
  const isAuthenticated = localStorage.getItem("accessToken") !== null;
  return isAuthenticated ? (
    <SellerLayout>
      <Content>{children}</Content>
    </SellerLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
