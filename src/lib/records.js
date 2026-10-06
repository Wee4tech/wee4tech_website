import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { SITE_COLORS, SITE_LABELS } from "./config";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

// The API returns different formats per endpoint ("30-Sep-2026 16:50", "2026-10-06 13:27:11").
const DATE_FORMATS = [
  "DD-MMM-YYYY HH:mm",
  "DD-MMM-YYYY HH:mm:ss",
  "YYYY-MM-DD HH:mm:ss",
  "YYYY-MM-DDTHH:mm:ss",
  "DD-MM-YYYY HH:mm",
  "DD/MM/YYYY HH:mm",
];

export function parseDate(value) {
  if (!value) return null;
  const strict = dayjs(value, DATE_FORMATS, true);
  if (strict.isValid()) return strict;
  const loose = dayjs(value);
  return loose.isValid() ? loose : null;
}

export const formatDate = (d, raw = "") => (d ? d.format("DD MMM YYYY, hh:mm A") : raw);

export const OTHER_SITE = "other";

/**
 * Work out which website an enquiry came from. The shared API does not store a site
 * (Type always comes back as 0), so we read it from the message:
 *  1. an explicit "Website: example.com" line            (recommended for every site's form)
 *  2. a URL in the message ("Page: https://3drendershop.com/...")
 *  3. Wee4 Tech's form prefixes the topic in brackets ("[E-commerce store] ...")
 *  4. 3D Render Shop's form layout ("Service: ..." + "Project type: ...")
 *  5. anything else -> "other"
 */
export function detectSite(message = "") {
  const tagged = message.match(/^\s*Website:\s*(?:https?:\/\/)?(?:www\.)?([a-z0-9.-]+\.[a-z]{2,})/im);
  if (tagged) return tagged[1].toLowerCase();
  const url = message.match(/https?:\/\/(?:www\.)?([a-z0-9.-]+\.[a-z]{2,})/i);
  if (url && !/^(localhost|127\.)/.test(url[1])) return url[1].toLowerCase();
  if (/^\s*\[[^\]]+\]/.test(message)) return "wee4techsolutions.com";
  if (/^Service:/m.test(message) && /^Project type:/m.test(message)) return "3drendershop.com";
  return OTHER_SITE;
}

export const siteLabel = (site) =>
  site === OTHER_SITE ? "Other / untagged" : SITE_LABELS[site] || site;

export const siteColor = (site) => SITE_COLORS[site] || (site === OTHER_SITE ? "default" : "purple");

// the API sometimes sends the literal strings "null" / "undefined"
const clean = (v) => {
  const s = v === null || v === undefined ? "" : String(v).trim();
  return /^(null|undefined)$/i.test(s) ? "" : s;
};

export function normalizeContact(r, i) {
  const message = clean(r.Message);
  const createdRaw = clean(r.CreatedDT);
  return {
    key: r.ContactId ?? `c${i}`,
    name: [clean(r.FirstName), clean(r.LastName)].filter(Boolean).join(" ") || "—",
    mobile: clean(r.MobileNo),
    email: clean(r.EmailId),
    company: clean(r.Companyname),
    message,
    topic: (message.match(/^\s*\[([^\]]+)\]/) || [])[1] || "",
    site: detectSite(message),
    created: parseDate(createdRaw),
    createdRaw,
  };
}

export function normalizeCareer(r, i) {
  const createdRaw = clean(r.CreatedDate);
  return {
    key: r.JobId ? `${r.JobId}-${i}` : `j${i}`,
    name: clean(r.FullName) || "—",
    mobile: clean(r.MobileNo),
    email: clean(r.EmailId),
    skills: clean(r.Skills),
    currentLocation: clean(r.CurrentLocation),
    preferredLocation: clean(r.PreferredLocation),
    company: clean(r.CurrentCompany),
    totalExp: clean(r.TotalExp),
    relevantExp: clean(r.RelevantExp),
    ctc: clean(r.CTC),
    expectedCtc: clean(r.ExpectedCTC),
    resume: clean(r.ResumePath) || clean(r.DocumentPath),
    created: parseDate(createdRaw),
    createdRaw,
  };
}

export function matchesSearch(record, query, fields) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  return fields.some((f) => String(record[f] || "").toLowerCase().includes(q));
}

export function inRange(record, range) {
  if (!range || !range[0] || !range[1]) return true;
  if (!record.created) return false;
  return !record.created.isBefore(range[0].startOf("day")) && !record.created.isAfter(range[1].endOf("day"));
}
