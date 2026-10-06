import React from "react";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="Page not found"
      subTitle="This page doesn't exist or has been removed."
      extra={
        <Link to="/dashboard">
          <Button type="primary">Go to dashboard</Button>
        </Link>
      }
    />
  );
}
