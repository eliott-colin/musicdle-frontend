import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  exchangeSpotifyCodeForToken,
  getSpotifyReturnTo,
} from "../utils/spotifyAuth";

function SpotifyCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Connexion Spotify en cours...");

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      setMessage(`Spotify a renvoyé une erreur: ${error}`);
      return;
    }

    if (!code) {
      setMessage("Le code OAuth Spotify est manquant.");
      return;
    }

    const run = async () => {
      try {
        await exchangeSpotifyCodeForToken(code, state);
        navigate(getSpotifyReturnTo(), { replace: true });
      } catch (callbackError) {
        setMessage(
          callbackError instanceof Error
            ? callbackError.message
            : "Impossible de récupérer le token Spotify.",
        );
      }
    };

    run();
  }, [navigate, searchParams]);

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <h1 className="main-title">Spotify</h1>
        <p className="intro">{message}</p>
      </section>
    </main>
  );
}

export default SpotifyCallback;