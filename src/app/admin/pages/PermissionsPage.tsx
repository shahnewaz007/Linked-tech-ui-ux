import { useState } from "react";
import { Check, X, Shield } from "lucide-react";
import {
  colors, radius, card, pageTitle, pageSubtitle, btnPrimary,
} from "../components/theme";

const ROLES = ["Super Admin", "Admin", "Editor"] as const;
type Role = typeof ROLES[number];

const MODULES = [
  "Dashboard",
  "User Management",
  "Services",
  "Products",
  "Product Categories",
  "Brands",
  "Gallery",
  "Events",
  "Testimonials",
  "FAQ",
  "Team Members",
  "Inquiries",
  "Branches",
  "Company Info",
];

// Default matrix: [module][role] = allowed
const DEFAULTS: Record<string, Record<Role, boolean>> = MODULES.reduce((acc, m) => {
  const editorAllowed = !["User Management", "Team Members", "Branches", "Company Info"].includes(m);
  acc[m] = { "Super Admin": true, Admin: true, Editor: editorAllowed };
  return acc;
}, {} as Record<string, Record<Role, boolean>>);

export function PermissionsPage() {
  const [matrix, setMatrix] = useState(DEFAULTS);

  const toggle = (module: string, role: Role) => {
    if (role === "Super Admin") return; // always on
    setMatrix((prev) => ({
      ...prev,
      [module]: { ...prev[module], [role]: !prev[module][role] },
    }));
  };

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Role Permissions</h1>
          <p style={pageSubtitle}>Control what each role can access across the admin panel.</p>
        </div>
        <button style={btnPrimary}><Check size={15} /> Save Changes</button>
      </div>

      {/* Role summary cards */}
      <div className="admin-stat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {ROLES.map((r) => {
          const allowed = MODULES.filter((m) => matrix[m][r]).length;
          return (
            <div key={r} style={{ ...card, padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: radius.md,
                background: r === "Super Admin" ? colors.primaryLight : colors.surfaceMuted,
                color: r === "Super Admin" ? colors.primary : colors.textMuted,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Shield size={22} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.text }}>{r}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: colors.textMuted }}>
                  {allowed} of {MODULES.length} modules
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Matrix table */}
      <div className="admin-table-wrap" style={{ marginTop: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{
                padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700,
                color: colors.textMuted, background: colors.surfaceMuted, textTransform: "uppercase",
                letterSpacing: "0.05em", borderBottom: `1px solid ${colors.border}`, whiteSpace: "nowrap",
              }}>Module</th>
              {ROLES.map((r) => (
                <th key={r} style={{
                  padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 700,
                  color: colors.textMuted, background: colors.surfaceMuted, textTransform: "uppercase",
                  letterSpacing: "0.05em", borderBottom: `1px solid ${colors.border}`, whiteSpace: "nowrap",
                }}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODULES.map((m) => (
              <tr key={m}>
                <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600, color: colors.text, borderBottom: `1px solid ${colors.border}`, whiteSpace: "nowrap" }}>{m}</td>
                {ROLES.map((r) => {
                  const on = matrix[m][r];
                  const locked = r === "Super Admin";
                  return (
                    <td key={r} style={{ padding: "11px 16px", textAlign: "center", borderBottom: `1px solid ${colors.border}` }}>
                      <button
                        onClick={() => toggle(m, r)}
                        disabled={locked}
                        aria-label={`${m} — ${r}`}
                        style={{
                          width: 26, height: 26, borderRadius: radius.sm,
                          border: `1px solid ${on ? (locked ? colors.border : colors.primary) : colors.border}`,
                          background: on ? (locked ? colors.surfaceMuted : colors.primary) : colors.surface,
                          color: on ? (locked ? colors.textSubtle : "#fff") : colors.textSubtle,
                          cursor: locked ? "not-allowed" : "pointer",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          transition: "background 0.15s ease, border 0.15s ease",
                        }}
                      >
                        {on ? <Check size={15} /> : <X size={14} />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12, color: colors.textSubtle, margin: "12px 2px 0" }}>
        Super Admin always has full access and cannot be modified.
      </p>
    </div>
  );
}
