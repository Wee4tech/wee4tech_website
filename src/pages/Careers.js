import React, { useMemo, useState } from "react";
import { Alert, Button, Card, Drawer, Empty, Grid, List, Table } from "antd";
import { ClockCircleOutlined, FilePdfOutlined } from "@ant-design/icons";
import ReportToolbar from "../components/app/ReportToolbar";
import { ContactActions, Field, NameCell, PageHeader, PersonAvatar } from "../components/app/ui";
import { useRecords } from "../lib/api";
import { formatDate, inRange, matchesSearch } from "../lib/records";
import { exportRows } from "../lib/exportXlsx";

const SEARCH_FIELDS = ["name", "mobile", "email", "skills", "company", "currentLocation", "preferredLocation"];

const skillList = (s) => s.split(/[,/|]+/).map((x) => x.trim()).filter(Boolean);

function Skills({ value, max = 4 }) {
  if (!value) return <span className="muted">—</span>;
  const list = skillList(value);
  return (
    <div className="chips">
      {list.slice(0, max).map((s) => (
        <span key={s} className="chip">{s}</span>
      ))}
      {list.length > max && <span className="chip chip--more">+{list.length - max}</span>}
    </div>
  );
}

const copyText = (j) =>
  [
    `Name: ${j.name}`,
    j.mobile && `Mobile: ${j.mobile}`,
    j.email && `Email: ${j.email}`,
    j.skills && `Skills: ${j.skills}`,
    j.totalExp && `Experience: ${j.totalExp}${j.relevantExp ? ` (relevant ${j.relevantExp})` : ""}`,
    j.company && `Current company: ${j.company}`,
    j.currentLocation && `Location: ${j.currentLocation}${j.preferredLocation ? ` → ${j.preferredLocation}` : ""}`,
    (j.ctc || j.expectedCtc) && `CTC: ${j.ctc || "—"} → ${j.expectedCtc || "—"}`,
    j.resume && `Resume: ${j.resume}`,
  ]
    .filter(Boolean)
    .join("\n");

function CandidateDrawer({ record, onClose, isMobile }) {
  return (
    <Drawer open={Boolean(record)} onClose={onClose} width={isMobile ? "100%" : 480} title="Candidate details" rootClassName="detail-drawer" destroyOnClose>
      {record && (
        <div className="detail">
          <div className="detail__head">
            <PersonAvatar name={record.name} size={52} />
            <div>
              <h2 className="detail__name">{record.name}</h2>
              <span className="muted">
                <ClockCircleOutlined /> Applied {formatDate(record.created, record.createdRaw)}
              </span>
            </div>
          </div>
          <ContactActions mobile={record.mobile} email={record.email} subject="Your application at Wee4 Tech Solutions" copyText={copyText(record)} block />
          {record.resume && (
            <Button block type="primary" icon={<FilePdfOutlined />} href={record.resume} target="_blank" rel="noopener noreferrer">
              Open resume
            </Button>
          )}
          <div className="detail__grid">
            <Field label="Skills"><Skills value={record.skills} max={20} /></Field>
            <Field label="Total experience">{record.totalExp}</Field>
            <Field label="Relevant experience">{record.relevantExp}</Field>
            <Field label="Current company">{record.company}</Field>
            <Field label="Current location">{record.currentLocation}</Field>
            <Field label="Preferred location">{record.preferredLocation}</Field>
            <Field label="Current CTC">{record.ctc}</Field>
            <Field label="Expected CTC">{record.expectedCtc}</Field>
            <Field label="Mobile">{record.mobile && <a href={`tel:${record.mobile}`}>{record.mobile}</a>}</Field>
            <Field label="Email">{record.email && <a href={`mailto:${record.email}`}>{record.email}</a>}</Field>
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default function Careers() {
  const { data, loading, error, reload } = useRecords("careers");
  const screens = Grid.useBreakpoint();
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(null);
  const [open, setOpen] = useState(null);

  const rows = useMemo(() => data.filter((j) => matchesSearch(j, search, SEARCH_FIELDS) && inRange(j, range)), [data, search, range]);

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
      title: "Candidate",
      dataIndex: "name",
      width: 260,
      fixed: screens.xl ? "left" : undefined,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (n, j) => <NameCell name={n} sub={j.email || j.mobile} />,
    },
    { title: "Skills", dataIndex: "skills", width: 260, render: (s) => <Skills value={s} /> },
    {
      title: "Experience",
      key: "exp",
      width: 130,
      render: (_, j) => (
        <div className="date-cell">
          <span>{j.totalExp || "—"}</span>
          {j.relevantExp && <small>Relevant {j.relevantExp}</small>}
        </div>
      ),
    },
    {
      title: "Location",
      key: "loc",
      width: 170,
      render: (_, j) => (
        <div className="date-cell">
          <span>{j.currentLocation || "—"}</span>
          {j.preferredLocation && <small>Prefers {j.preferredLocation}</small>}
        </div>
      ),
    },
    {
      title: "CTC",
      key: "ctc",
      width: 140,
      render: (_, j) => (
        <div className="date-cell">
          <span>{j.ctc || "—"}</span>
          {j.expectedCtc && <small>Expects {j.expectedCtc}</small>}
        </div>
      ),
    },
    {
      title: "Resume",
      dataIndex: "resume",
      width: 110,
      render: (u) =>
        u ? (
          <a href={u} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            <FilePdfOutlined /> View
          </a>
        ) : (
          <span className="muted">—</span>
        ),
    },
    {
      title: "Applied",
      dataIndex: "created",
      width: 170,
      sorter: (a, b) => (a.created?.valueOf() || 0) - (b.created?.valueOf() || 0),
      defaultSortOrder: "descend",
      render: (d, j) => (
        <div className="date-cell">
          <span>{d ? d.format("DD MMM YYYY") : j.createdRaw}</span>
          {d && <small>{d.fromNow()}</small>}
        </div>
      ),
    },
  ];

  return (
    <div className="page">
      <PageHeader title="Job applications" subtitle="Candidates who applied through the careers page." />

      <Card bordered={false} className="panel panel--flush">
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
          count={`${rows.length} of ${data.length}`}
        />

        {error && <Alert type="error" showIcon className="mx-16 mb-16" message="Couldn't load applications" description={error.message} />}

        {screens.md ? (
          <Table
            rowKey="key"
            columns={columns}
            dataSource={rows}
            loading={loading}
            scroll={{ x: 1240 }}
            onRow={(r) => ({ onClick: () => setOpen(r), className: "clickable-row" })}
            pagination={{ pageSize: 20, showSizeChanger: true, pageSizeOptions: [20, 50, 100], showTotal: (t) => `${t} applications` }}
            locale={{ emptyText: <Empty description="No applications match these filters" /> }}
          />
        ) : (
          <List
            className="card-list"
            loading={loading}
            dataSource={rows}
            pagination={rows.length > 10 ? { pageSize: 10, size: "small", align: "center" } : false}
            locale={{ emptyText: <Empty description="No applications match these filters" /> }}
            renderItem={(j) => (
              <List.Item onClick={() => setOpen(j)}>
                <div className="record-card">
                  <div className="record-card__top">
                    <NameCell name={j.name} sub={j.created ? j.created.fromNow() : j.createdRaw} />
                    {j.resume && <FilePdfOutlined className="record-card__icon" />}
                  </div>
                  <Skills value={j.skills} />
                  <div className="record-card__meta">
                    {[j.totalExp && `${j.totalExp} exp`, j.currentLocation, j.expectedCtc && `Expects ${j.expectedCtc}`].filter(Boolean).join(" · ")}
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Card>

      <CandidateDrawer record={open} onClose={() => setOpen(null)} isMobile={!screens.sm} />
    </div>
  );
}
