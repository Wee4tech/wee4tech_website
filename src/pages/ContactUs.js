import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, Card, Empty, Grid, List, Select, Table, Tag, Typography } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import ReportToolbar from "../components/app/ReportToolbar";
import { useRecords } from "../lib/api";
import { formatDate, inRange, matchesSearch, siteColor, siteLabel } from "../lib/records";
import { exportRows } from "../lib/exportXlsx";

const { Paragraph } = Typography;
const SEARCH_FIELDS = ["name", "mobile", "email", "message", "company"];

const Contact = ({ c }) => (
  <span className="contact-links">
    {c.mobile && (
      <a href={`tel:${c.mobile}`}>
        <PhoneOutlined /> {c.mobile}
      </a>
    )}
    {c.email && (
      <a href={`mailto:${c.email}`}>
        <MailOutlined /> {c.email}
      </a>
    )}
  </span>
);

const Message = ({ text }) =>
  text ? (
    <Paragraph className="message-text" ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
      {text}
    </Paragraph>
  ) : (
    "—"
  );

export default function ContactUs() {
  const { data, loading, error, reload } = useRecords("contacts");
  const screens = Grid.useBreakpoint();
  const [params, setParams] = useSearchParams();
  const site = params.get("site") || "all";
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(null);

  const siteOptions = useMemo(() => {
    const counts = {};
    data.forEach((c) => (counts[c.site] = (counts[c.site] || 0) + 1));
    return [
      { value: "all", label: `All websites (${data.length})` },
      ...Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([s, n]) => ({ value: s, label: `${siteLabel(s)} (${n})` })),
    ];
  }, [data]);

  const rows = useMemo(
    () =>
      data.filter(
        (c) => (site === "all" || c.site === site) && matchesSearch(c, search, SEARCH_FIELDS) && inRange(c, range)
      ),
    [data, site, search, range]
  );

  const setSite = (value) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete("site");
    else next.set("site", value);
    setParams(next, { replace: true });
  };

  const handleExport = () =>
    exportRows(
      `contact-enquiries-${new Date().toISOString().slice(0, 10)}.xlsx`,
      rows.map((c) => ({
        Date: formatDate(c.created, c.createdRaw),
        Website: siteLabel(c.site),
        Name: c.name,
        Mobile: c.mobile,
        Email: c.email,
        Message: c.message,
      }))
    );

  const columns = [
    {
      title: "Received",
      dataIndex: "created",
      width: 170,
      sorter: (a, b) => (a.created?.valueOf() || 0) - (b.created?.valueOf() || 0),
      defaultSortOrder: "descend",
      render: (d, c) => <span className="nowrap">{formatDate(d, c.createdRaw)}</span>,
    },
    {
      title: "Website",
      dataIndex: "site",
      width: 170,
      render: (s) => <Tag color={siteColor(s)}>{siteLabel(s)}</Tag>,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 180,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (n, c) => (
        <>
          <strong>{n}</strong>
          {c.company && <div className="muted">{c.company}</div>}
        </>
      ),
    },
    { title: "Contact", key: "contact", width: 240, render: (_, c) => <Contact c={c} /> },
    { title: "Message", dataIndex: "message", render: (m) => <Message text={m} /> },
  ];

  return (
    <div className="page">
      <div className="page-head">
        <h2>Contact enquiries</h2>
        <span className="muted">
          {rows.length} of {data.length} shown
        </span>
      </div>

      <ReportToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search name, mobile, email or message"
        range={range}
        onRange={setRange}
        onReload={reload}
        loading={loading}
        onExport={handleExport}
        exportDisabled={!rows.length}
        extra={
          <Select
            value={site}
            onChange={setSite}
            options={siteOptions}
            className="report-toolbar__select"
            popupMatchSelectWidth={false}
          />
        }
      />

      {error && <Alert type="error" showIcon message="Couldn't load enquiries" description={error.message} style={{ marginBottom: 16 }} />}

      {screens.md ? (
        <Card bordered={false} className="panel panel--table">
          <Table
            rowKey="key"
            columns={columns}
            dataSource={rows}
            loading={loading}
            size="middle"
            scroll={{ x: 960 }}
            pagination={{ pageSize: 20, showSizeChanger: true, pageSizeOptions: [20, 50, 100], showTotal: (t) => `${t} enquiries` }}
            locale={{ emptyText: <Empty description="No enquiries match these filters" /> }}
          />
        </Card>
      ) : (
        <List
          className="card-list"
          loading={loading}
          dataSource={rows}
          pagination={rows.length > 10 ? { pageSize: 10, size: "small", align: "center" } : false}
          locale={{ emptyText: <Empty description="No enquiries match these filters" /> }}
          renderItem={(c) => (
            <List.Item>
              <Card bordered={false} className="record-card">
                <div className="record-card__top">
                  <strong>{c.name}</strong>
                  <Tag color={siteColor(c.site)}>{siteLabel(c.site)}</Tag>
                </div>
                <div className="muted record-card__date">{formatDate(c.created, c.createdRaw)}</div>
                <Contact c={c} />
                <Message text={c.message} />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
