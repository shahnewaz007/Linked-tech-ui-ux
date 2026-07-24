/**
 * Admin Panel Design Tokens — Linked Technologies Ltd
 * LTL-themed re-skin of the reference admin design system.
 * Use these constants across all admin pages for consistent modern styling.
 */
import type { CSSProperties } from "react";

export const colors = {
  // Brand — LTL orange
  primary: "#F2911B",
  primaryDark: "#d97d10",
  primaryLight: "#FDECD6",

  // Surface
  bg: "#F7F9FA",
  surface: "#ffffff",
  surfaceMuted: "#F7F9FA",
  border: "#e2e5e8",
  borderStrong: "#cfd4d8",

  // Sidebar — tech black
  sidebar: "#151719",
  sidebarHover: "rgba(255,255,255,0.05)",
  sidebarActive: "rgba(242,145,27,0.14)",
  sidebarActiveBorder: "#F2911B",

  // Text
  text: "#151719",
  textMuted: "#5a5d60",
  textSubtle: "#707375",

  // Semantic
  success: "#16a34a",
  successBg: "#dcfce7",
  warning: "#f59e0b",
  warningBg: "#fef3c7",
  danger: "#dc2626",
  dangerBg: "#fee2e2",
  info: "#2a7fa6",
  infoBg: "#e0f2fe",
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999,
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(21,23,25,0.04), 0 1px 3px rgba(21,23,25,0.06)",
  md: "0 4px 6px -1px rgba(21,23,25,0.06), 0 2px 4px -2px rgba(21,23,25,0.06)",
  lg: "0 10px 15px -3px rgba(21,23,25,0.08), 0 4px 6px -4px rgba(21,23,25,0.05)",
  xl: "0 20px 25px -5px rgba(21,23,25,0.10), 0 8px 10px -6px rgba(21,23,25,0.06)",
} as const;

// ---------- Reusable style objects ----------

export const card: CSSProperties = {
  background: colors.surface,
  borderRadius: radius.lg,
  border: `1px solid ${colors.border}`,
  boxShadow: shadow.sm,
};

export const cardPad: CSSProperties = {
  ...card,
  padding: 20,
};

export const pageTitle: CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: colors.text,
  margin: 0,
  letterSpacing: "-0.01em",
  fontFamily: "'Roboto Slab', serif",
};

export const pageSubtitle: CSSProperties = {
  fontSize: 13,
  color: colors.textMuted,
  margin: "4px 0 0",
};

export const sectionTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: colors.text,
  margin: 0,
};

export const sectionLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: colors.textMuted,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: 0,
  fontFamily: "'DM Mono', monospace",
};

// ---------- Buttons ----------

export const btnPrimary: CSSProperties = {
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 600,
  borderRadius: radius.md,
  border: "none",
  background: colors.primary,
  color: "#fff",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "background 0.15s ease, transform 0.05s ease",
  whiteSpace: "nowrap",
};

export const btnSecondary: CSSProperties = {
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 600,
  borderRadius: radius.md,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  color: colors.text,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "background 0.15s ease, border 0.15s ease",
  whiteSpace: "nowrap",
};

export const btnDanger: CSSProperties = {
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 600,
  borderRadius: radius.md,
  border: "none",
  background: colors.danger,
  color: "#fff",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  whiteSpace: "nowrap",
};

export const btnGhost: CSSProperties = {
  padding: "6px 12px",
  fontSize: 12,
  fontWeight: 600,
  borderRadius: radius.sm,
  border: "none",
  background: "transparent",
  color: colors.textMuted,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
};

// Small action buttons used in tables (View / Edit / Delete)
export const btnTableEdit: CSSProperties = {
  padding: "5px 12px",
  fontSize: 12,
  fontWeight: 600,
  borderRadius: radius.sm,
  border: `1px solid ${colors.primaryLight}`,
  background: colors.primaryLight,
  color: colors.primaryDark,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "background 0.15s ease",
};

export const btnTableDelete: CSSProperties = {
  padding: "5px 12px",
  fontSize: 12,
  fontWeight: 600,
  borderRadius: radius.sm,
  border: `1px solid ${colors.dangerBg}`,
  background: colors.dangerBg,
  color: colors.danger,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "background 0.15s ease",
};

// ---------- Form inputs ----------

export const input: CSSProperties = {
  width: "100%",
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  padding: "9px 12px",
  fontSize: 13,
  color: colors.text,
  outline: "none",
  background: colors.surface,
  boxSizing: "border-box",
  transition: "border 0.15s ease, box-shadow 0.15s ease",
};

export const label: CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: colors.text,
  marginBottom: 6,
};

// ---------- Table ----------

export const tableWrap: CSSProperties = {
  ...card,
  overflow: "hidden",
};

export const tableScroll: CSSProperties = {
  overflow: "auto",
};

export const table: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

export const th: CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
  color: colors.textMuted,
  background: colors.surfaceMuted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
  borderBottom: `1px solid ${colors.border}`,
};

export const td: CSSProperties = {
  padding: "12px 16px",
  fontSize: 13,
  color: colors.text,
  borderBottom: `1px solid ${colors.border}`,
};

export const tdMuted: CSSProperties = {
  ...td,
  color: colors.textMuted,
  fontSize: 12,
};

// ---------- Badge ----------

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

const BADGE_COLORS: Record<BadgeTone, { bg: string; color: string; dot: string }> = {
  neutral: { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
  primary: { bg: colors.primaryLight, color: colors.primaryDark, dot: colors.primary },
  success: { bg: colors.successBg, color: "#15803d", dot: colors.success },
  warning: { bg: colors.warningBg, color: "#a16207", dot: colors.warning },
  danger: { bg: colors.dangerBg, color: "#b91c1c", dot: colors.danger },
  info: { bg: colors.infoBg, color: "#0369a1", dot: colors.info },
};

export function badge(tone: BadgeTone = "neutral"): CSSProperties {
  const c = BADGE_COLORS[tone];
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 9px",
    borderRadius: radius.pill,
    background: c.bg,
    color: c.color,
    whiteSpace: "nowrap",
    lineHeight: 1.4,
  };
}

export function badgeDotColor(tone: BadgeTone = "neutral") {
  return BADGE_COLORS[tone].dot;
}

// Map common status strings to badge tones
export function statusTone(status: string): BadgeTone {
  const s = status.toLowerCase();
  if (["active", "completed", "delivered", "replied", "approved", "paid"].includes(s)) return "success";
  if (["pending", "new", "draft"].includes(s)) return "warning";
  if (["in progress", "processing", "shipped", "in-progress"].includes(s)) return "info";
  if (["closed", "cancelled", "canceled", "rejected", "failed", "refunded", "inactive"].includes(s)) return "danger";
  return "neutral";
}
