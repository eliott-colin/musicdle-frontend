import { useState } from "react";
import { buildApiUrl } from "../utils/gameHelpers";

export function useGuess() {
  const [history, setHistory] = useState([]);
  const [hints, setHints] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const compare = async (track) => {
    try {
      const response = await fetch(buildApiUrl("/api/games/classic/guess"), {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ guessId: track.id }),
      });
      if (!response.ok) throw new Error(`Serveur ${response.status}`);
      const result = await response.json();

      setHistory((prev) => [{ ...track, result }, ...prev]);

      const newHints = [];
      if (result.artist === "correct") newHints.push("Bon artiste !");
      if (result.year?.status === "close") newHints.push("Année proche !");
      if (result.year?.status === "lower") newHints.push("Année trop récente ↓");
      if (result.year?.status === "higher") newHints.push("Année trop ancienne ↑");
      if (result.track === "correct") newHints.push("GG → trouvé !");
      setHints(newHints);
    } catch {
      setError("Erreur lors de la comparaison.");
    }
  };

  return { history, hints, error, compare };
}