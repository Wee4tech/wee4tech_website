import React from "react";
import { Button, DatePicker, Input, Tooltip } from "antd";
import { DownloadOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";

// Shared search / date range / refresh / export bar for the report pages.
export default function ReportToolbar({
  search,
  onSearch,
  searchPlaceholder,
  range,
  onRange,
  onReload,
  loading,
  onExport,
  exportDisabled,
  count,
}) {
  return (
    <div className="toolbar">
      <Input
        allowClear
        prefix={<SearchOutlined className="muted" />}
        placeholder={searchPlaceholder}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="toolbar__search"
      />
      <DatePicker.RangePicker
        value={range}
        onChange={onRange}
        format="DD MMM YYYY"
        allowEmpty={[true, true]}
        placeholder={["From date", "To date"]}
        className="toolbar__range"
      />
      <div className="toolbar__end">
        {count && <span className="toolbar__count">{count}</span>}
        <Tooltip title="Refresh">
          <Button icon={<ReloadOutlined />} onClick={onReload} loading={loading} aria-label="Refresh" />
        </Tooltip>
        <Button type="primary" ghost icon={<DownloadOutlined />} onClick={onExport} disabled={exportDisabled}>
          Export
        </Button>
      </div>
    </div>
  );
}
