import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "./config";
import { normalizeCareer, normalizeContact } from "./records";

async function post(path, body) {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

const byNewest = (a, b) => (b.created?.valueOf() || 0) - (a.created?.valueOf() || 0);

const loaders = {
  contacts: () =>
    post("Registration/GetContactus", { UserId: 1 }).then((r) =>
      (r?._lstContactusResModel || []).map(normalizeContact).sort(byNewest)
    ),
  careers: () =>
    post("Careers/GetCareersApplied/", { UserId: 1 }).then((r) =>
      (r?._lstJobApplied || []).map(normalizeCareer).sort(byNewest)
    ),
};

// One in-flight/settled request per resource, shared by every page in the session.
const cache = {};

function load(name, force) {
  if (force || !cache[name]) {
    cache[name] = loaders[name]().catch((err) => {
      delete cache[name];
      throw err;
    });
  }
  return cache[name];
}

export function useRecords(name) {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  const run = useCallback(
    (force = false) => {
      let active = true;
      setState((s) => ({ ...s, loading: true, error: null }));
      load(name, force)
        .then((data) => active && setState({ data, loading: false, error: null }))
        .catch((error) => active && setState((s) => ({ ...s, loading: false, error })));
      return () => {
        active = false;
      };
    },
    [name]
  );

  useEffect(() => run(false), [run]);

  return { ...state, reload: () => run(true) };
}
