import React from "react";
import { Button, DatePicker, Flex, Input, Tooltip } from "antd";
import { DownloadOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";

// Shared search / date range / refresh / export bar for the report pages.
export default function ReportToolbar({
  search,
  onSearch,
  searchPlaceholder,
  range,
  onRange,
  extra,
  onReload,
  loading,
  onExport,
  exportDisabled,
}) {
  return (
    <Flex wrap="wrap" gap={12} className="report-toolbar">
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder={searchPlaceholder}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="report-toolbar__search"
      />
      {extra}
      <DatePicker.RangePicker
        value={range}
        onChange={onRange}
        format="DD MMM YYYY"
        allowEmpty={[true, true]}
        className="report-toolbar__range"
      />
      <Flex gap={8} className="report-toolbar__actions">
        <Tooltip title="Refresh">
          <Button icon={<ReloadOutlined />} onClick={onReload} loading={loading} aria-label="Refresh" />
        </Tooltip>
        <Button icon={<DownloadOutlined />} onClick={onExport} disabled={exportDisabled}>
          Export
        </Button>
      </Flex>
    </Flex>
  );
}
