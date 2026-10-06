import React, { useMemo, useState } from "react";
import { Alert, Card, Descriptions, Empty, Grid, List, Table } from "antd";
import { FilePdfOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import ReportToolbar from "../components/app/ReportToolbar";
import { useRecords } from "../lib/api";
import { formatDate, inRange, matchesSearch } from "../lib/records";
import { exportRows } from "../lib/exportXlsx";

const SEARCH_FIELDS = ["name", "mobile", "email", "skills", "company", "currentLocation", "preferredLocation"];

const Resume = ({ url }) =>
  url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <FilePdfOutlined /> View resume
    </a>
  ) : (
    <span className="muted">—</span>
  );

const Contact = ({ j }) => (
  <span className="contact-links">
    {j.mobile && (
      <a href={`tel:${j.mobile}`}>
        <PhoneOutlined /> {j.mobile}
      </a>
    )}
    {j.email && (
      <a href={`mailto:${j.email}`}>
        <MailOutlined /> {j.email}
      </a>
    )}
  </span>
);

export default function Careers() {
  const { data, loading, error, reload } = useRecords("careers");
  const screens = Grid.useBreakpoint();
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(null);

  const rows = useMemo(
    () => data.filter((j) => matchesSearch(j, search, SEARCH_FIELDS) && inRange(j, range)),
    [data, search, range]
  );

  const handleExport = () =>
    exportRows(
      `job-applications-${new Date().toISOString().slice(0, 10)}.xlsx`,
      rows.map((j) => ({
        "Applied on": formatDate(j.created, j.createdRaw),
        Name: j.name,
        Mobile: j.mobile,
        Email: j.email,
        Skills: j.skills,
        "Total exp": j.totalExp,
        "Relevant exp": j.relevantExp,
        "Current company": j.company,
        "Current location": j.currentLocation,
        "Preferred location": j.preferredLocation,
        CTC: j.ctc,
        "Expected CTC": j.expectedCtc,
        Resume: j.resume,
      }))
    );

  const columns = [
    {
      title: "Applied on",
      dataIndex: "created",
      width: 170,
      fixed: screens.lg ? "left" : undefined,
      sorter: (a, b) => (a.created?.valueOf() || 0) - (b.created?.valueOf() || 0),
      defaultSortOrder: "descend",
      render: (d, j) => <span className="nowrap">{formatDate(d, j.createdRaw)}</span>,
    },
    {
      title: "Candidate",
      dataIndex: "name",
      width: 230,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (n, j) => (
        <>
          <strong>{n}</strong>
          <Contact j={j} />
        </>
      ),
    },
    { title: "Skills", dataIndex: "skills", width: 220 },
    {
      title: "Experience",
      key: "exp",
      width: 140,
      render: (_, j) => (
        <>
          {j.totalExp || "—"}
          {j.relevantExp && <div className="muted">Relevant: {j.relevantExp}</div>}
        </>
      ),
    },
    { title: "Current company", dataIndex: "company", width: 180 },
    {
      title: "Location",
      key: "loc",
      width: 200,
      render: (_, j) => (
        <>
          {j.currentLocation || "—"}
          {j.preferredLocation && <div className="muted">Prefers: {j.preferredLocation}</div>}
        </>
      ),
    },
    {
      title: "CTC",
      key: "ctc",
      width: 150,
      render: (_, j) => (
        <>
          {j.ctc || "—"}
          {j.expectedCtc && <div className="muted">Expects: {j.expectedCtc}</div>}
        </>
      ),
    },
    { title: "Resume", dataIndex: "resume", width: 140, render: (u) => <Resume url={u} /> },
  ];

  return (
    <div className="page">
      <div className="page-head">
        <h2>Job applications</h2>
        <span className="muted">
          {rows.length} of {data.length} shown
        </span>
      </div>

      <ReportToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search name, skills, company, location…"
        range={range}
        onRange={setRange}
        onReload={reload}
        loading={loading}
        onExport={handleExport}
        exportDisabled={!rows.length}
      />

      {error && <Alert type="error" showIcon message="Couldn't load applications" description={error.message} style={{ marginBottom: 16 }} />}

      {screens.md ? (
        <Card bordered={false} className="panel panel--table">
          <Table
            rowKey="key"
            columns={columns}
            dataSource={rows}
            loading={loading}
            size="middle"
            scroll={{ x: 1430 }}
            pagination={{ pageSize: 20, showSizeChanger: true, pageSizeOptions: [20, 50, 100], showTotal: (t) => `${t} applications` }}
            locale={{ emptyText: <Empty description="No applications match these filters" /> }}
          />
        </Card>
      ) : (
        <List
          className="card-list"
          loading={loading}
          dataSource={rows}
          pagination={rows.length > 10 ? { pageSize: 10, size: "small", align: "center" } : false}
          locale={{ emptyText: <Empty description="No applications match these filters" /> }}
          renderItem={(j) => (
            <List.Item>
              <Card bordered={false} className="record-card">
                <div className="record-card__top">
                  <strong>{j.name}</strong>
                  <Resume url={j.resume} />
                </div>
                <div className="muted record-card__date">{formatDate(j.created, j.createdRaw)}</div>
                <Contact j={j} />
                <Descriptions
                  size="small"
                  column={1}
                  colon={false}
                  className="record-card__details"
                  items={[
                    { key: "s", label: "Skills", children: j.skills || "—" },
                    { key: "e", label: "Experience", children: [j.totalExp, j.relevantExp && `(${j.relevantExp} relevant)`].filter(Boolean).join(" ") || "—" },
                    { key: "c", label: "Company", children: j.company || "—" },
                    { key: "l", label: "Location", children: [j.currentLocation, j.preferredLocation && `→ ${j.preferredLocation}`].filter(Boolean).join(" ") || "—" },
                    { key: "p", label: "CTC", children: [j.ctc, j.expectedCtc && `→ ${j.expectedCtc}`].filter(Boolean).join(" ") || "—" },
                  ]}
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
