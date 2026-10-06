import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Alert, Card, Col, Empty, List, Progress, Row, Skeleton, Statistic, Tag } from "antd";
import { CalendarOutlined, MailOutlined, RiseOutlined, SolutionOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useRecords } from "../lib/api";
import { siteColor, siteLabel } from "../lib/records";

export default function Dashboard() {
  const contacts = useRecords("contacts");
  const careers = useRecords("careers");

  const stats = useMemo(() => {
    const now = dayjs();
    const weekAgo = now.subtract(7, "day");
    const bySite = {};
    let today = 0;
    let week = 0;
    contacts.data.forEach((c) => {
      bySite[c.site] = (bySite[c.site] || 0) + 1;
      if (c.created?.isSame(now, "day")) today += 1;
      if (c.created?.isAfter(weekAgo)) week += 1;
    });
    const sites = Object.entries(bySite).sort((a, b) => b[1] - a[1]);
    return { today, week, sites };
  }, [contacts.data]);

  const loading = contacts.loading && !contacts.data.length;

  return (
    <div className="page">
      {(contacts.error || careers.error) && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message="Couldn't load some data"
          description={(contacts.error || careers.error).message}
        />
      )}

      <Row gutter={[16, 16]}>
        {[
          { title: "Total enquiries", value: contacts.data.length, icon: <MailOutlined />, to: "/contactusreport" },
          { title: "Enquiries today", value: stats.today, icon: <CalendarOutlined />, to: "/contactusreport" },
          { title: "Last 7 days", value: stats.week, icon: <RiseOutlined />, to: "/contactusreport" },
          { title: "Job applications", value: careers.data.length, icon: <SolutionOutlined />, to: "/carriersreport" },
        ].map((s) => (
          <Col xs={12} lg={6} key={s.title}>
            <Link to={s.to}>
              <Card className="stat-card" bordered={false}>
                <Statistic
                  title={s.title}
                  value={s.value}
                  prefix={<span className="stat-card__icon">{s.icon}</span>}
                  loading={s.to === "/carriersreport" ? careers.loading && !careers.data.length : loading}
                />
              </Card>
            </Link>
          </Col>
        ))}

        <Col xs={24} lg={10}>
          <Card title="Enquiries by website" bordered={false} className="panel">
            {loading ? (
              <Skeleton active />
            ) : stats.sites.length ? (
              <div className="site-breakdown">
                {stats.sites.map(([site, count]) => (
                  <Link to={`/contactusreport?site=${encodeURIComponent(site)}`} key={site} className="site-breakdown__row">
                    <div className="site-breakdown__label">
                      <Tag color={siteColor(site)}>{siteLabel(site)}</Tag>
                      <strong>{count}</strong>
                    </div>
                    <Progress percent={Math.round((count / contacts.data.length) * 100)} showInfo={false} size="small" />
                  </Link>
                ))}
              </div>
            ) : (
              <Empty description="No enquiries yet" />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card
            title="Latest enquiries"
            bordered={false}
            className="panel"
            extra={<Link to="/contactusreport">View all</Link>}
          >
            <List
              loading={loading}
              dataSource={contacts.data.slice(0, 6)}
              locale={{ emptyText: <Empty description="No enquiries yet" /> }}
              renderItem={(c) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span className="latest__title">
                        {c.name} <Tag color={siteColor(c.site)}>{siteLabel(c.site)}</Tag>
                      </span>
                    }
                    description={<span className="latest__msg">{c.message || "—"}</span>}
                  />
                  <span className="latest__when">{c.created ? c.created.fromNow() : c.createdRaw}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24}>
          <Card
            title="Latest job applications"
            bordered={false}
            className="panel"
            extra={<Link to="/carriersreport">View all</Link>}
          >
            <List
              loading={careers.loading && !careers.data.length}
              dataSource={careers.data.slice(0, 5)}
              locale={{ emptyText: <Empty description="No applications yet" /> }}
              renderItem={(j) => (
                <List.Item>
                  <List.Item.Meta
                    title={j.name}
                    description={[j.skills, j.totalExp && `${j.totalExp} exp`, j.currentLocation].filter(Boolean).join(" · ") || "—"}
                  />
                  <span className="latest__when">{j.created ? j.created.fromNow() : j.createdRaw}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
