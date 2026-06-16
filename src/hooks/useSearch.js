import { useState, useEffect } from "react";
import { buildApiUrl } from "../utils/gameHelpers";

export function useSearch(searchValue) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = searchValue.trim();
    if (!query) { setTracks([]); setError(""); return; }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(buildApiUrl("/api/search", { q: query }));
        // fallback
        if (!response.ok) {
          throw new Error(`Serveur ${response.status}`)
        };

        const data = await response.json();
        const nextTracks = data?.tracks ?? data?.items ?? data;
        setTracks(Array.isArray(nextTracks) ? nextTracks.slice(0, 3) : []);
      } catch {
        setTracks([]);
        setError("Erreur lors de la recherche.");
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return { tracks, loading, error, setTracks };
}