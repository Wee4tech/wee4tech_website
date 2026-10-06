import React from "react";
import { Avatar, Button, Tooltip, message } from "antd";
import { CopyOutlined, MailOutlined, PhoneOutlined, WhatsAppOutlined } from "@ant-design/icons";

export function PageHeader({ title, subtitle, extra }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__sub">{subtitle}</p>}
      </div>
      {extra && <div className="page-header__extra">{extra}</div>}
    </div>
  );
}

const AVATAR_COLORS = ["#177a71", "#e0a106", "#3b6fd8", "#9b51e0", "#d9534f", "#1e8fa8", "#6b8e23", "#c2185b"];

export function PersonAvatar({ name = "", size = 36 }) {
  const initials =
    name
      .replace(/[^a-z\s]/gi, " ")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?";
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return (
    <Avatar size={size} style={{ background: AVATAR_COLORS[hash % AVATAR_COLORS.length], flex: "none", fontWeight: 600 }}>
      {initials}
    </Avatar>
  );
}

export function NameCell({ name, sub }) {
  return (
    <div className="name-cell">
      <PersonAvatar name={name} size={34} />
      <div className="name-cell__text">
        <div className="name-cell__name">{name}</div>
        {sub && <div className="name-cell__sub">{sub}</div>}
      </div>
    </div>
  );
}

// Indian numbers come in as 10 digits; WhatsApp needs the country code.
const waNumber = (mobile) => {
  const d = String(mobile).replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
};

export function ContactActions({ mobile, email, subject, copyText, block }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      message.success("Copied to clipboard");
    } catch {
      message.error("Couldn't copy");
    }
  };
  return (
    <div className={`contact-actions ${block ? "contact-actions--block" : ""}`}>
      {mobile && (
        <Button icon={<PhoneOutlined />} href={`tel:${mobile}`}>
          Call
        </Button>
      )}
      {mobile && (
        <Button
          icon={<WhatsAppOutlined />}
          href={`https://wa.me/${waNumber(mobile)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          WhatsApp
        </Button>
      )}
      {email && (
        <Button icon={<MailOutlined />} href={`mailto:${email}?subject=${encodeURIComponent(subject || "")}`}>
          Email
        </Button>
      )}
      {copyText && (
        <Tooltip title="Copy details">
          <Button icon={<CopyOutlined />} onClick={copy} aria-label="Copy details" />
        </Tooltip>
      )}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div className="field">
      <div className="field__label">{label}</div>
      <div className="field__value">{children || <span className="muted">—</span>}</div>
    </div>
  );
}
