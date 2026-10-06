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

const theme = {
  token: {
    colorPrimary: "#0354a3",
    borderRadius: 8,
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
