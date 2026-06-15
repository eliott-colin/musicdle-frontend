import { useState, useEffect } from "react";
import { buildApiUrl } from "../utils/gameHelpers";

export function useGenre() {
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGenre = async () => {
    // console.log(buildApiUrl("/api/games/classic/guess/genre"));
    try {
      setLoading(true);
      setError("");
      const response = await fetch(buildApiUrl("/api/games/classic/guess/genre"));
      
      // fallback
      if (!response.ok) {
        throw new Error(`Serveur ${response.status}`);
      }
      console.log(response)
      const data = await response.json();
      
      console.log(data);
      setGenre(
        typeof data === "string"
          ? data
          : data?.genre
      );
    } catch (fetchError) {
      setError("Erreur lors de la récupération du genre.");
      console.warn(fetchError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  return { genre, error, loading, refreshGenre: fetchGenre };
}
