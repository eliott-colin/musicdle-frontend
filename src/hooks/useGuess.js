import { useState } from "react";
import { buildApiUrl } from "../utils/gameHelpers";

export function useGuess() {
  const [history, setHistory] = useState([]);
  const [hints, setHints] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const compare = async (track) => {
    try {
      setError("");

      const response = await fetch(buildApiUrl("/api/games/classic/guess"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ guessId: track.id }),
      });

      if (!response.ok) {
        throw new Error(`Serveur ${response.status}`);
      }

      const result = await response.json();
      setHistory((prev) => [{ ...track, result }, ...prev]);

      const newHints = [];

      if (result.artist === "correct") {
        newHints.push({
          status: "artist",
          text: "Bon artiste !",
        });
      }

      if (result.year?.status === "close") {
        newHints.push({
          text: "Année proche",
          direction:
            result.year.direction === "tooRecent" ? "arrow-down" : "arrow-up",
        });
      }

      if (result.year?.status === "far") {
        newHints.push({
          text:
            result.year.direction === "tooRecent"
              ? "Sorti bien plus tôt"
              : "Sorti bien plus tard",
          direction:
            result.year.direction === "tooRecent" ? "arrow-down" : "arrow-up",
        });
      }

      if (result.track === "correct") {
        newHints.push({
          status: "track",
          text: "Bravo ! Trouvé !",
        });
      }

      // ⏱️ duration

      if (result.duration?.status === "close") {
        newHints.push({
          status: "duration",
          text: "Durée proche",
          subtext:
            result.duration.direction === "tooLong"
              ? "Un peu trop long"
              : "Un peu trop court",
          direction:
            result.duration.direction === "tooLong" ? "arrow-down" : "arrow-up",
        });
      }

      if (result.duration?.status === "far") {
        newHints.push({
          status: "duration",
          text:
            result.duration.direction === "tooLong"
              ? "Beaucoup trop long"
              : "Beaucoup trop court",
          subtext:
            result.duration.direction === "tooLong"
              ? "Essaie un titre plus court"
              : "Essaie un titre plus long",
          direction:
            result.duration.direction === "tooLong" ? "arrow-down" : "arrow-up",
        });
      }

      setHints(newHints);
    } catch (error) {
      setError(error?.message || "Erreur lors de la comparaison.");
    }
  };

  return { history, hints, error, compare };
}
