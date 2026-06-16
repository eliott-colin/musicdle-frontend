export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

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

export function getColor(state) {
  const s = typeof state === "object" ? state?.status : state;
  switch (s) {
    case "correct": return "bg-green border-black";
    case "close": return "bg-close border-black"
    case "higher" :return "bg-red border-black"
    case "lower" : return "bg-red border-black"
    case "longer":
    case "shorter": return "bg-yellow border-black";
    default: return "bg-red border-black";
  }
}

export function getYearArrowDirection(yearResult) {
  if (!yearResult) return "";
  if (yearResult.status === "higher") return "arrow-up";
  if (yearResult.status === "lower") return "arrow-down";
  if (yearResult.status === "close") return yearResult.diff > 0 ? "arrow-up" : "arrow-down";
  return "";
}