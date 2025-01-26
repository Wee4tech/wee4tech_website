import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Dashboard from "./modules/Dashboard/Dashboard";
import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

//import LogIn from "./components/LogIn/LogIn";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import NotificationToast from "./NotificationToast/NotificationToast.js";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.js";
import Page404 from "./modules/NotFoundPage/Page404.js";

import SellerLogin from "./modules/Seller/SellerLogin/SellerLogin.js";




import ContactUs from "./modules/Reports/ContactUs/ContactUs.js";
import Carriers from "./modules/Reports/Carriers/Carriers.js";

const generateBreakpoint = (min, max) =>
  `@media screen and (min-width: ${min}px) and (max-width: ${max}px)`;

const theme = {
  breakpoints: {
    xs: generateBreakpoint(0, 550),
    sm: generateBreakpoint(551, 850),
    md: generateBreakpoint(851, 1150),
    lg: generateBreakpoint(1151, 1500),
  },
  light: {
    background: "#ffffff",
    textColor: "#333333",
    buttonColor: "#ff9900",
    fontFamily: "Arial, sans-serif",
    fontWeight: "normal",
  },
  dark: {
    background: "#333333",
    textColor: "#ffffff",
    buttonColor: "#007bff",
    fontFamily: "Arial, sans-serif",
    fontWeight: "normal",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NotificationToast />
        <Router>
          <ScrollToTop />
          {/* Generic route for 404 page */}
          <Layout style={{ minHeight: "100vh" }}>
            <Routes>
              <Route path="*" element={<Page404 />} />

              {/* DASHBOARD ROUTES */}
              <Route
                path="/admin/dashboard"
                exact
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              

              {/* REPORTS */}
              <Route
                exact
                element={
                  <PrivateRoute>
                    <ContactUs />
                  </PrivateRoute>
                }
                path="/contactusreport"
              />

              <Route
                exact
                element={
                  <PrivateRoute>
                    <Carriers />
                  </PrivateRoute>
                }
                path="carriersreport"
              />

              {["/", "Login"].map((path) => (
                <Route exact path={path} element={<SellerLogin />} />
              ))}

             

              {/* DASHBOARD ROUTES */}
              <Route
                path="/dashboard"
                exact
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
