export const COLORS = {
  primary: "#6C63FF",
  primaryLight: "#8B85FF",
  primaryDark: "#4A44CC",
  accent: "#FF6B6B",
  accentGreen: "#00D9A0",
  accentAmber: "#FFB347",
  accentBlue: "#4FC3F7",
  dark: {
    bg: "#0A0A0F",
    surface: "#111118",
    card: "#16161F",
    border: "#222230",
    text: "#F0F0FF",
    muted: "#7070A0",
    subtle: "#2A2A3A"
  },
  light: {
    bg: "#F7F7FF",
    surface: "#FFFFFF",
    card: "#FAFAFF",
    border: "#E8E8F0",
    text: "#0A0A1F",
    muted: "#6B6B8A",
    subtle: "#EEEEF8"
  }
} as const;

export const SUPPORTED_FILE_TYPES = ["pdf", "docx", "txt", "png", "jpg", "jpeg"] as const;
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
