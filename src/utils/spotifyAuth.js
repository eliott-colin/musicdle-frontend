const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

export const SPOTIFY_STORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expiresAt: "spotify_expires_at",
  codeVerifier: "spotify_code_verifier",
  authState: "spotify_auth_state",
  returnTo: "spotify_return_to",
};

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function randomString(length = 64) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const values = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(values, (value) => characters[value % characters.length]).join("");
}

async function sha256(value) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64UrlEncode(digest);
}

export function getSpotifyAccessToken() {
  const accessToken = localStorage.getItem(SPOTIFY_STORAGE_KEYS.accessToken);
  const expiresAt = Number(localStorage.getItem(SPOTIFY_STORAGE_KEYS.expiresAt));

  if (!accessToken) {
    return null;
  }

  if (expiresAt && Date.now() > expiresAt) {
    localStorage.removeItem(SPOTIFY_STORAGE_KEYS.accessToken);
    localStorage.removeItem(SPOTIFY_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(SPOTIFY_STORAGE_KEYS.expiresAt);
    return null;
  }

  return accessToken;
}

export function clearSpotifyAuthState() {
  localStorage.removeItem(SPOTIFY_STORAGE_KEYS.codeVerifier);
  localStorage.removeItem(SPOTIFY_STORAGE_KEYS.authState);
  localStorage.removeItem(SPOTIFY_STORAGE_KEYS.returnTo);
}

function getSpotifyRedirectUri() {
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

  if (!redirectUri) {
    throw new Error("Ajoute VITE_SPOTIFY_REDIRECT_URI dans ton .env.");
  }

  return redirectUri;
}

export async function startSpotifyLogin(returnTo = "/") {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

  if (!clientId) {
    throw new Error("Ajoute VITE_SPOTIFY_CLIENT_ID dans ton .env.");
  }

  const redirectUri = getSpotifyRedirectUri();
  const codeVerifier = randomString(96);
  const codeChallenge = await sha256(codeVerifier);
  const state = randomString(32);

  localStorage.setItem(SPOTIFY_STORAGE_KEYS.codeVerifier, codeVerifier);
  localStorage.setItem(SPOTIFY_STORAGE_KEYS.authState, state);
  localStorage.setItem(SPOTIFY_STORAGE_KEYS.returnTo, returnTo);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: "",
    redirect_uri: redirectUri,
    state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  window.location.assign(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
}

export async function exchangeSpotifyCodeForToken(code, state) {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = getSpotifyRedirectUri();
  const storedVerifier = localStorage.getItem(SPOTIFY_STORAGE_KEYS.codeVerifier);
  const storedState = localStorage.getItem(SPOTIFY_STORAGE_KEYS.authState);

  if (!clientId) {
    throw new Error("Ajoute VITE_SPOTIFY_CLIENT_ID dans ton .env.");
  }

  if (!storedVerifier) {
    throw new Error("Le vérificateur PKCE est introuvable.");
  }

  if (!state || state !== storedState) {
    throw new Error("Le state OAuth Spotify est invalide.");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: storedVerifier,
  });

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Spotify a répondu avec le code ${response.status}.`);
  }

  const data = await response.json();

  localStorage.setItem(SPOTIFY_STORAGE_KEYS.accessToken, data.access_token);

  if (data.refresh_token) {
    localStorage.setItem(SPOTIFY_STORAGE_KEYS.refreshToken, data.refresh_token);
  }

  if (data.expires_in) {
    localStorage.setItem(
      SPOTIFY_STORAGE_KEYS.expiresAt,
      String(Date.now() + data.expires_in * 1000),
    );
  }

  clearSpotifyAuthState();

  return data;
}

export function getSpotifyReturnTo() {
  return localStorage.getItem(SPOTIFY_STORAGE_KEYS.returnTo) || "/";
}