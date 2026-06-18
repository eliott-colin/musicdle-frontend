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

      // 🎤 artist
      if (result.artist === "correct") {
        newHints.push({
          status: "artist",
          text: "✅ Bon artiste !",
        });
      }

      // 📅 year
      if (result.year?.status === "tooRecent") {
        newHints.push({
          status: "year",
          text: "Sorti plus tôt",
          direction: "arrow-down",
        });
      }

      if (result.year?.status === "tooOld") {
        newHints.push({
          status: "year",
          text: "Sorti plus tard",
          direction: "arrow-up",
        });
      }

      if (result.year?.status === "close") {
        newHints.push({
          status: "year",
          text: "Tu chauffes sur l'année 🔥",
        });
      }

      // 🎵 track
      if (result.track === "correct") {
        newHints.push({
          status: "track",
          text: "🎉 Bravo ! Trouvé !",
        });
      }

      // ⏱️ duration
      if (result.duration?.status === "close") {
        newHints.push({
          status: "duration",
          text: "Durée très proche",
          subtext:
            result.duration.diff > 0
              ? "Essaie un titre un peu plus court"
              : "Essaie un titre un peu plus long",
          direction: result.duration.diff > 0 ? "arrow-down" : "arrow-up",
        });
      }

      if (result.duration?.status === "tooRecent") {
        newHints.push({
          status: "duration",
          text: "Essaie un titre plus court",
          direction: "arrow-down",
        });
      }

      if (result.duration?.status === "tooOld") {
        newHints.push({
          status: "duration",
          text: "Essaie un titre plus long",
          direction: "arrow-up",
        });
      }

      setHints(newHints);
    } catch (error) {
      setError(error?.message || "Erreur lors de la comparaison.");
    }
  };

  return { history, hints, error, compare };
}
