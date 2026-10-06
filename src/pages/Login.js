import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Form, Input } from "antd";
import { CheckCircleFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";
import { isAuthed, login } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  if (isAuthed()) return <Navigate to="/dashboard" replace />;

  const onFinish = ({ email }) => {
    if (login(email)) navigate(location.state?.from || "/dashboard", { replace: true });
    else setError("Invalid email or password");
  };

  return (
    <div className="login">
      <aside className="login__brand">
        <img src={logoWhite} alt="Wee4 Tech Solutions" className="login__brand-logo" />
        <div className="login__brand-copy">
          <h2>All your website leads in one place.</h2>
          <ul>
            <li><CheckCircleFilled /> Enquiries from every Wee4 website, tagged by source</li>
            <li><CheckCircleFilled /> Job applications with resumes</li>
            <li><CheckCircleFilled /> Search, filter and export to Excel</li>
          </ul>
        </div>
        <small>© {new Date().getFullYear()} Wee4 Tech Solutions</small>
      </aside>

      <main className="login__form-wrap">
        <div className="login__form">
          <img src={logo} alt="Wee4 Tech Solutions" className="login__mobile-logo" />
          <h1>Welcome back</h1>
          <p className="muted">Sign in to the admin dashboard.</p>
          {error && <Alert type="error" message={error} showIcon className="mb-16" />}
          <Form layout="vertical" onFinish={onFinish} onValuesChange={() => setError("")} requiredMark={false} size="large">
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
              <Input prefix={<MailOutlined className="muted" />} placeholder="you@wee4techsolutions.com" autoComplete="username" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
              <Input.Password prefix={<LockOutlined className="muted" />} placeholder="••••••••" autoComplete="current-password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block className="login__submit">
              Sign in
            </Button>
          </Form>
        </div>
      </main>
    </div>
  );
}
