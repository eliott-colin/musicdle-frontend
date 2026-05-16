import { useEffect, useState } from "react";
import "./GameDay.css";
import {
  getSpotifyAccessToken,
  startSpotifyLogin,
} from "../utils/spotifyAuth";

function GameDay({ id = "" }) {
  const [searchValue, setSearchValue] = useState(id);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState(() => getSpotifyAccessToken());

  useEffect(() => {
    setSearchValue(id);
  }, [id]);

  useEffect(() => {
    setAccessToken(getSpotifyAccessToken());
  }, []);

  const handleSpotifyLogin = async () => {
    try {
      await startSpotifyLogin(`${window.location.pathname}${window.location.search}`);
      setAccessToken(getSpotifyAccessToken());
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Impossible d'ouvrir Spotify.");
    }
  };

  useEffect(() => {
    const query = searchValue.trim();

    if (!query) {
      setTracks([]);
      setError("");
      return;
    }

    if (!accessToken) {
      setTracks([]);
      setError("Connecte-toi à Spotify pour lancer la recherche.");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          q: query,
          type: "track",
        });

        const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Spotify a répondu avec le code ${response.status}.`);
        }

        const data = await response.json();
        setTracks(data?.tracks?.items ?? []);
      } catch (fetchError) {
        setTracks([]);
        setError(fetchError instanceof Error ? fetchError.message : "Erreur lors de la recherche Spotify.");
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchValue, accessToken]);

  return (
    <section className="game-day-card">
      <div className="game-day-form">
        <label className="game-day-label" htmlFor="research">
          Ecris un morceau, un artiste ou un mot-clé.
        </label>
        <div className="game-day-row">
          <input
            id="research"
            className="game-day-input"
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Ex: Que, Daft Punk, Shape of You"
            aria-label="Recherche Spotify"
          />
        </div>
      </div>

      {!accessToken ? (
        <button className="game-day-button secondary" type="button" onClick={handleSpotifyLogin}>
          Se connecter à Spotify
        </button>
      ) : null}

      {loading ? <p className="game-day-message">Recherche...</p> : null}

      {error ? <p className="game-day-message error">{error}</p> : null}

      {tracks.length > 0 ? (
        <ul className="game-day-results">
          {tracks.map((track) => (
            <li key={track.id} className="game-day-result">
            <div className="game-day-track">
              <img src={track.album.images[0]?.url} alt={track.name}  width="100" height="100" style={{borderRadius : "14px"}}/>
              <div className="game-day-track-info">
                  <strong>{track.name}</strong>
                  <span>
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </span>
              </div>
            </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default GameDay;