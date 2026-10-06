import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Col, Empty, Row, Skeleton, Tag, Tooltip } from "antd";
import { ArrowRightOutlined, CalendarOutlined, MailOutlined, RiseOutlined, SolutionOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useRecords } from "../lib/api";
import { siteColor, siteLabel } from "../lib/records";
import { PageHeader, PersonAvatar } from "../components/app/ui";

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

function StatCard({ title, value, icon, tone, hint, to, loading }) {
  return (
    <Link to={to} className="stat-link">
      <Card bordered={false} className="stat-card">
        <div className={`stat-card__icon tone-${tone}`}>{icon}</div>
        <div className="stat-card__body">
          <div className="stat-card__label">{title}</div>
          {loading ? <Skeleton.Button active size="small" /> : <div className="stat-card__value">{value}</div>}
          {hint && <div className="stat-card__hint">{hint}</div>}
        </div>
      </Card>
    </Link>
  );
}

function TrendChart({ days }) {
  const max = Math.max(1, ...days.map((d) => d.count));
  return (
    <div className="trend">
      {days.map((d) => (
        <Tooltip key={d.key} title={`${d.label}: ${d.count} enquir${d.count === 1 ? "y" : "ies"}`}>
          <div className="trend__col">
            <div className="trend__bar-wrap">
              <div className={`trend__bar ${d.isToday ? "is-today" : ""}`} style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}>
                {d.count > 0 && <span className="trend__count">{d.count}</span>}
              </div>
            </div>
            <div className="trend__day">{d.short}</div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const contacts = useRecords("contacts");
  const careers = useRecords("careers");

  const stats = useMemo(() => {
    const now = dayjs();
    const bySite = {};
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = now.subtract(13 - i, "day");
      return { key: d.format("YYYY-MM-DD"), label: d.format("ddd, DD MMM"), short: d.format("DD"), isToday: i === 13, count: 0 };
    });
    const index = Object.fromEntries(days.map((d, i) => [d.key, i]));
    let today = 0;
    let week = 0;
    contacts.data.forEach((c) => {
      bySite[c.site] = (bySite[c.site] || 0) + 1;
      if (!c.created) return;
      if (c.created.isSame(now, "day")) today += 1;
      if (c.created.isAfter(now.subtract(7, "day"))) week += 1;
      const i = index[c.created.format("YYYY-MM-DD")];
      if (i !== undefined) days[i].count += 1;
    });
    const jobsWeek = careers.data.filter((j) => j.created?.isAfter(now.subtract(7, "day"))).length;
    return { today, week, jobsWeek, days, sites: Object.entries(bySite).sort((a, b) => b[1] - a[1]) };
  }, [contacts.data, careers.data]);

  const loadingC = contacts.loading && !contacts.data.length;
  const loadingJ = careers.loading && !careers.data.length;
  const error = contacts.error || careers.error;

  return (
    <div className="page">
      <PageHeader title={`${greeting()} 👋`} subtitle={`Here's what's coming in from your websites · ${dayjs().format("dddd, DD MMMM YYYY")}`} />

      {error && <Alert type="error" showIcon className="mb-16" message="Couldn't load some data" description={error.message} />}

      <Row gutter={[16, 16]}>
        <Col xs={12} xl={6}>
          <StatCard title="Total enquiries" value={contacts.data.length} icon={<MailOutlined />} tone="teal" to="/contactusreport" loading={loadingC} hint="All websites" />
        </Col>
        <Col xs={12} xl={6}>
          <StatCard title="Today" value={stats.today} icon={<CalendarOutlined />} tone="amber" to="/contactusreport" loading={loadingC} hint="New enquiries" />
        </Col>
        <Col xs={12} xl={6}>
          <StatCard title="Last 7 days" value={stats.week} icon={<RiseOutlined />} tone="blue" to="/contactusreport" loading={loadingC} hint="Enquiries" />
        </Col>
        <Col xs={12} xl={6}>
          <StatCard title="Job applications" value={careers.data.length} icon={<SolutionOutlined />} tone="purple" to="/carriersreport" loading={loadingJ} hint={`${stats.jobsWeek} this week`} />
        </Col>

        <Col xs={24} xl={16}>
          <Card bordered={false} className="panel" title="Enquiries · last 14 days">
            {loadingC ? <Skeleton active paragraph={{ rows: 5 }} /> : <TrendChart days={stats.days} />}
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card bordered={false} className="panel" title="By website">
            {loadingC ? (
              <Skeleton active />
            ) : stats.sites.length ? (
              <div className="site-list">
                {stats.sites.map(([site, count]) => {
                  const pct = Math.round((count / contacts.data.length) * 100);
                  return (
                    <Link to={`/contactusreport?site=${encodeURIComponent(site)}`} key={site} className="site-list__row">
                      <div className="site-list__top">
                        <Tag color={siteColor(site)} bordered={false}>{siteLabel(site)}</Tag>
                        <span className="site-list__count">
                          {count} <small>{pct}%</small>
                        </span>
                      </div>
                      <div className="meter">
                        <span style={{ width: `${pct}%` }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Empty description="No enquiries yet" />
            )}
          </Card>
        </Col>

        <Col xs={24} xl={14}>
          <Card
            bordered={false}
            className="panel"
            title="Latest enquiries"
            extra={<Link to="/contactusreport"><Button type="link" size="small">View all <ArrowRightOutlined /></Button></Link>}
          >
            {loadingC ? (
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            ) : contacts.data.length ? (
              <ul className="feed">
                {contacts.data.slice(0, 6).map((c) => (
                  <li key={c.key} className="feed__item">
                    <PersonAvatar name={c.name} />
                    <div className="feed__body">
                      <div className="feed__top">
                        <strong className="feed__name">{c.name}</strong>
                        <Tag color={siteColor(c.site)} bordered={false}>{siteLabel(c.site)}</Tag>
                      </div>
                      <div className="feed__text">{c.message || "—"}</div>
                    </div>
                    <span className="feed__when">{c.created ? c.created.fromNow() : c.createdRaw}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty description="No enquiries yet" />
            )}
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card
            bordered={false}
            className="panel"
            title="Latest applications"
            extra={<Link to="/carriersreport"><Button type="link" size="small">View all <ArrowRightOutlined /></Button></Link>}
          >
            {loadingJ ? (
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            ) : careers.data.length ? (
              <ul className="feed">
                {careers.data.slice(0, 6).map((j) => (
                  <li key={j.key} className="feed__item">
                    <PersonAvatar name={j.name} />
                    <div className="feed__body">
                      <strong className="feed__name">{j.name}</strong>
                      <div className="feed__text">{[j.skills, j.currentLocation].filter(Boolean).join(" · ") || "—"}</div>
                    </div>
                    <span className="feed__when">{j.created ? j.created.fromNow() : j.createdRaw}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty description="No applications yet" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
