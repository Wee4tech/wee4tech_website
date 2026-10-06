import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, Card, Drawer, Empty, Grid, List, Segmented, Table, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import ReportToolbar from "../components/app/ReportToolbar";
import { ContactActions, Field, NameCell, PageHeader, PersonAvatar } from "../components/app/ui";
import { useRecords } from "../lib/api";
import { formatDate, inRange, matchesSearch, siteColor, siteLabel } from "../lib/records";
import { exportRows } from "../lib/exportXlsx";

const SEARCH_FIELDS = ["name", "mobile", "email", "message", "company"];

const copyText = (c) =>
  [`Name: ${c.name}`, c.mobile && `Mobile: ${c.mobile}`, c.email && `Email: ${c.email}`, `Website: ${siteLabel(c.site)}`, `Received: ${formatDate(c.created, c.createdRaw)}`, "", c.message]
    .filter((x) => x !== false && x !== undefined)
    .join("\n");

function ContactDrawer({ record, onClose, isMobile }) {
  return (
    <Drawer
      open={Boolean(record)}
      onClose={onClose}
      width={isMobile ? "100%" : 480}
      title="Enquiry details"
      rootClassName="detail-drawer"
      destroyOnClose
    >
      {record && (
        <div className="detail">
          <div className="detail__head">
            <PersonAvatar name={record.name} size={52} />
            <div>
              <h2 className="detail__name">{record.name}</h2>
              <Tag color={siteColor(record.site)} bordered={false}>{siteLabel(record.site)}</Tag>
            </div>
          </div>
          <ContactActions
            mobile={record.mobile}
            email={record.email}
            subject="Re: your enquiry"
            copyText={copyText(record)}
            block
          />
          <div className="detail__grid">
            <Field label="Received">
              <ClockCircleOutlined /> {formatDate(record.created, record.createdRaw)}
            </Field>
            <Field label="Mobile">{record.mobile && <a href={`tel:${record.mobile}`}>{record.mobile}</a>}</Field>
            <Field label="Email">{record.email && <a href={`mailto:${record.email}`}>{record.email}</a>}</Field>
            {record.company && <Field label="Company">{record.company}</Field>}
            {record.topic && <Field label="Topic">{record.topic}</Field>}
          </div>
          <div className="detail__message">
            <div className="field__label">Message</div>
            <div className="detail__message-body">{record.message || <span className="muted">No message</span>}</div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default function ContactUs() {
  const { data, loading, error, reload } = useRecords("contacts");
  const screens = Grid.useBreakpoint();
  const [params, setParams] = useSearchParams();
  const site = params.get("site") || "all";
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(null);
  const [open, setOpen] = useState(null);

  const sites = useMemo(() => {
    const counts = {};
    data.forEach((c) => (counts[c.site] = (counts[c.site] || 0) + 1));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const rows = useMemo(
    () => data.filter((c) => (site === "all" || c.site === site) && matchesSearch(c, search, SEARCH_FIELDS) && inRange(c, range)),
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
      title: "Name",
      dataIndex: "name",
      width: 260,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (n, c) => <NameCell name={n} sub={c.email || c.mobile} />,
    },
    {
      title: "Website",
      dataIndex: "site",
      width: 180,
      render: (s) => <Tag color={siteColor(s)} bordered={false}>{siteLabel(s)}</Tag>,
    },
    { title: "Mobile", dataIndex: "mobile", width: 140, render: (m) => m || <span className="muted">—</span> },
    {
      title: "Message",
      dataIndex: "message",
      render: (m) => <div className="clamp-2">{m || <span className="muted">—</span>}</div>,
    },
    {
      title: "Received",
      dataIndex: "created",
      width: 180,
      sorter: (a, b) => (a.created?.valueOf() || 0) - (b.created?.valueOf() || 0),
      defaultSortOrder: "descend",
      render: (d, c) => (
        <div className="date-cell">
          <span>{d ? d.format("DD MMM YYYY") : c.createdRaw}</span>
          {d && <small>{d.format("hh:mm A")} · {d.fromNow()}</small>}
        </div>
      ),
    },
  ];

  const siteTabs = [
    { value: "all", label: `All (${data.length})` },
    ...sites.map(([s, n]) => ({ value: s, label: `${siteLabel(s)} (${n})` })),
  ];

  return (
    <div className="page">
      <PageHeader title="Contact enquiries" subtitle="Every enquiry submitted through your websites' contact forms." />

      <Card bordered={false} className="panel panel--flush">
        <div className="panel__tabs">
          <Segmented options={siteTabs} value={site} onChange={setSite} className="site-tabs" />
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
          count={`${rows.length} of ${data.length}`}
        />

        {error && <Alert type="error" showIcon className="mx-16 mb-16" message="Couldn't load enquiries" description={error.message} />}

        {screens.md ? (
          <Table
            rowKey="key"
            columns={columns}
            dataSource={rows}
            loading={loading}
            scroll={{ x: 980 }}
            onRow={(r) => ({ onClick: () => setOpen(r), className: "clickable-row" })}
            pagination={{ pageSize: 20, showSizeChanger: true, pageSizeOptions: [20, 50, 100], showTotal: (t) => `${t} enquiries` }}
            locale={{ emptyText: <Empty description="No enquiries match these filters" /> }}
          />
        ) : (
          <List
            className="card-list"
            loading={loading}
            dataSource={rows}
            pagination={rows.length > 10 ? { pageSize: 10, size: "small", align: "center" } : false}
            locale={{ emptyText: <Empty description="No enquiries match these filters" /> }}
            renderItem={(c) => (
              <List.Item onClick={() => setOpen(c)}>
                <div className="record-card">
                  <div className="record-card__top">
                    <NameCell name={c.name} sub={c.created ? c.created.fromNow() : c.createdRaw} />
                    <Tag color={siteColor(c.site)} bordered={false}>{siteLabel(c.site)}</Tag>
                  </div>
                  <div className="clamp-3 record-card__msg">{c.message || <span className="muted">No message</span>}</div>
                  <div className="record-card__meta">{[c.mobile, c.email].filter(Boolean).join(" · ")}</div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Card>

      <ContactDrawer record={open} onClose={() => setOpen(null)} isMobile={!screens.sm} />
    </div>
  );
}
