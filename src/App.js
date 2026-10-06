import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import AppLayout from "./components/app/AppLayout";
import RequireAuth from "./components/app/RequireAuth";
import ErrorBoundary from "./components/app/ErrorBoundary";
import { isAuthed } from "./lib/auth";

// Each page is its own chunk, so the first load only ships what's needed.
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Careers = lazy(() => import("./pages/Careers"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Wee4 brand: teal #177a71, amber #fdbe26, ink #122120, Plus Jakarta Sans (same as wee4techsolutions.com)
const theme = {
  token: {
    colorPrimary: "#177a71",
    colorLink: "#177a71",
    colorWarning: "#e0a106",
    colorText: "#1d2b2a",
    colorTextSecondary: "#5d6b69",
    colorTextTertiary: "#8a9896",
    colorBorder: "#d9e3e1",
    colorBorderSecondary: "#e8eeed",
    colorBgLayout: "#f3f7f6",
    borderRadius: 10,
    borderRadiusLG: 14,
    controlHeight: 38,
    fontSize: 14,
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  },
  components: {
    Menu: {
      darkItemBg: "transparent",
      darkSubMenuItemBg: "transparent",
      darkItemColor: "rgba(255,255,255,0.68)",
      darkItemHoverColor: "#ffffff",
      darkItemHoverBg: "rgba(255,255,255,0.06)",
      darkItemSelectedBg: "#177a71",
      darkItemSelectedColor: "#ffffff",
      itemHeight: 44,
      itemBorderRadius: 10,
      itemMarginInline: 12,
      iconSize: 17,
    },
    Table: { headerBg: "#f7faf9", headerColor: "#5d6b69", rowHoverBg: "#f4f9f8", headerSplitColor: "transparent" },
    Card: { paddingLG: 20 },
    Statistic: { contentFontSize: 28 },
  },
};

const PageLoader = () => (
  <div className="page-loader">
    <Spin size="large" />
  </div>
);

export default function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to={isAuthed() ? "/dashboard" : "/login"} replace />} />
              <Route path="/login" element={<Login />} />
              <Route
                element={
                  <RequireAuth>
                    <AppLayout />
                  </RequireAuth>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contactusreport" element={<ContactUs />} />
                <Route path="/carriersreport" element={<Careers />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </ConfigProvider>
  );
}
