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
      if (!response.ok) {
        throw new Error(`Serveur ${response.status}`)
      };
      const result = await response.json();

      setHistory((prev) => [{ ...track, result }, ...prev]);

      const newHints = [];
      if (result.artist === "correct") {
        newHints.push({ status: "artist", text: "Bon artiste !" });
      }

      if (result.year?.status === "close") {
        newHints.push({
          status: "close",
          text:
            result.year.diff > 0
              ? "Date très proche, un peu plus récent"
              : "Date très proche, un peu plus ancien",
          direction: result.year.diff > 0 ? "arrow-up" : "arrow-down",
        });
      }
      if (result.year?.status === "lower") {
        newHints.push({
          status: "lower",
          text: "Année trop récente",
          direction: "arrow-down",
        });
      }
      if (result.year?.status === "higher") {
        newHints.push({
          status: "higher",
          text: "Année trop ancienne",
          direction: "arrow-up",
        });
      }

      if (result.track === "correct") {
        newHints.push({ status: "track", text: "GG → trouvé !" });
      }
      console.log(result.duration)
      if (result.duration?.status === "close") {
        newHints.push({
          status: "close",
          text:
            result.duration.diff > 0
              ? "Durée proche à 30s (plus long)"
              : "Durée proche à 30s (plus court)",
          direction: result.duration.diff > 0 ? "arrow-up" : "arrow-down",
        });
      }
      if (result.duration?.status === "lower") {
        newHints.push({
          status: "lower",
          text: "Durée trop longue",
          direction: "arrow-down",
        });
      }
      if (result.duration?.status === "higher") {
        newHints.push({
          status: "higher",
          text: "Durée trop courte",
          direction: "arrow-up",
        });
      }

      if(result.duration)
      setHints(newHints);
    } catch {
      setError("Erreur lors de la comparaison.");
    }
  };

  return { history, hints, error, compare };
}