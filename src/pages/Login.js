import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../assets/wee4-logo.png";
import { isAuthed, login } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  if (isAuthed()) return <Navigate to="/dashboard" replace />;

  const onFinish = ({ email }) => {
    if (login(email)) {
      navigate(location.state?.from || "/dashboard", { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card" bordered={false}>
        <img src={logo} alt="Wee4 Tech Solutions" className="login-card__logo" />
        <h1 className="login-card__title">Admin login</h1>
        <p className="login-card__sub">Sign in to view website enquiries and job applications.</p>
        {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
        <Form layout="vertical" onFinish={onFinish} onValuesChange={() => setError("")} requiredMark={false}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input size="large" prefix={<MailOutlined />} autoComplete="username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Log in
          </Button>
        </Form>
      </Card>
    </div>
  );
}
