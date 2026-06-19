export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(
  /\/$/,
  "",
);

export function buildApiUrl(path, params) {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }
  return url.toString();
}

export function getColor(result) {
  if (!result) return "";

  const status = typeof result === "string" ? result : result.status;

  switch (status) {
    case "correct":
      return "bg-green border-black";

    case "close":
      return "bg-yellow border-black";

    case "far":
      return "bg-red border-black";

    default:
      return "bg-red border-black";
  }
}

export function getArrowDirection(result) {
  if (!result || !result.direction) {
    return ""
  };
  switch (result.direction) {
    case "tooRecent":
      return "arrow-down";
    case "tooOld":
      return "arrow-up";
    case "tooLong":
      return "arrow-down";
    case "tooShort":
      return "arrow-up";
    default:
      return "";
  }
}
