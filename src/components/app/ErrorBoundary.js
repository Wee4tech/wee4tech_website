import React from "react";
import { Button, Result } from "antd";

// Keeps a crash in one page from blanking the whole app.
export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <Result
        status="warning"
        title="Something went wrong on this page"
        subTitle={String(this.state.error?.message || this.state.error)}
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        }
      />
    );
  }
}
