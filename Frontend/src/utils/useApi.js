import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

// GET helper with loading/error state and optional polling.
export default function useApi(path, { poll = 0 } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setData(await api(path));
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    load();
    if (!poll) return undefined;
    const id = setInterval(load, poll);
    return () => clearInterval(id);
  }, [load, poll]);

  return { data, error, loading, reload: load };
}
