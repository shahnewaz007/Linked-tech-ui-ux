import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Boxes, Wrench, Image as ImageIcon, Building2,
  ArrowUpRight, ArrowDownRight, Plus, CalendarDays,
} from "lucide-react";
import {
  colors, radius, shadow, card,
  pageTitle, pageSubtitle, sectionTitle, sectionLabel,
  badge, badgeDotColor, statusTone,
} from "../components/theme";

type Trend = "up" | "down";
type Stat = {
  label: string;
  value: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  trend: Trend;
  trendValue: string;
  trendLabel: string;
};

const STATS: Stat[] = [
  { label: "Total Products", value: "86", icon: Boxes, iconColor: "#F2911B", iconBg: "#FDECD6", trend: "up", trendValue: "+6", trendLabel: "added this month" },
  { label: "Total Services", value: "9", icon: Wrench, iconColor: "#16a34a", iconBg: "#dcfce7", trend: "up", trendValue: "+1", trendLabel: "new discipline" },
  { label: "Active Brands", value: "8", icon: Building2, iconColor: "#2a7fa6", iconBg: "#e0f2fe", trend: "up", trendValue: "+1", trendLabel: "partner added" },
  { label: "Gallery Projects", value: "34", icon: ImageIcon, iconColor: "#8b5cf6", iconBg: "#ede9fe", trend: "down", trendValue: "-2", trendLabel: "vs last month" },
];

const CATEGORY_BREAKDOWN = [
  { name: "Automation & Control", count: 22, pct: 90 },
  { name: "Power & Drives", count: 18, pct: 74 },
  { name: "Measurement & Sensors", count: 14, pct: 57 },
  { name: "Electrical Distribution", count: 12, pct: 49 },
  { name: "Mechanical Components", count: 11, pct: 45 },
  { name: "Safety & Protection", count: 9, pct: 37 },
];

const RECENT_PRODUCTS = [
  { id: 1, name: "PLC & Automation Controllers", brand: "Siemens", category: "Automation & Control", status: "Active" },
  { id: 2, name: "VFDs & Motor Drives", brand: "ABB", category: "Power & Drives", status: "Active" },
  { id: 3, name: "Industrial Sensors", brand: "Omron", category: "Measurement & Sensors", status: "Active" },
  { id: 4, name: "Safety Relays & Guards", brand: "Omron", category: "Safety & Protection", status: "Inactive" },
  { id: 5, name: "Industrial Motors", brand: "Siemens", category: "Mechanical Components", status: "Active" },
];

const VOLUME_DATA = {
  week: [
    { label: "Mon", val: 4 }, { label: "Tue", val: 6 }, { label: "Wed", val: 3 },
    { label: "Thu", val: 8 }, { label: "Fri", val: 5 }, { label: "Sat", val: 2 }, { label: "Sun", val: 1 },
  ],
  month: [
    { label: "W1", val: 16 }, { label: "W2", val: 22 }, { label: "W3", val: 19 }, { label: "W4", val: 27 },
  ],
  year: [
    { label: "Jan", val: 38 }, { label: "Feb", val: 31 }, { label: "Mar", val: 46 },
    { label: "Apr", val: 52 }, { label: "May", val: 44 }, { label: "Jun", val: 49 },
    { label: "Jul", val: 61 }, { label: "Aug", val: 55 }, { label: "Sep", val: 40 },
    { label: "Oct", val: 47 }, { label: "Nov", val: 42 }, { label: "Dec", val: 35 },
  ],
};

const QUICK_ACTIONS = [
  { label: "Add Product", icon: Plus, to: "/admin/catalog/products", bg: "#FDECD6", color: "#F2911B" },
  { label: "Add Service", icon: Wrench, to: "/admin/catalog/services", bg: "#dcfce7", color: "#16a34a" },
  { label: "Add Event", icon: CalendarDays, to: "/admin/content/events", bg: "#fef3c7", color: "#f59e0b" },
  { label: "Add to Gallery", icon: ImageIcon, to: "/admin/content/gallery", bg: "#ede9fe", color: "#8b5cf6" },
];

export function DashboardPage() {
  const [volTab, setVolTab] = useState<"week" | "month" | "year">("week");
  const [hoverBar, setHoverBar] = useState<number | null>(null);
  const navigate = useNavigate();
  const volData = VOLUME_DATA[volTab];
  const maxVal = Math.max(...volData.map((d) => d.val));
  const totalVol = volData.reduce((sum, d) => sum + d.val, 0);

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={pageTitle}>Welcome back, Admin 👋</h1>
          <p style={pageSubtitle}>Here's what's happening across Linked Technologies today.</p>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "8px 14px",
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          fontSize: 12,
          color: colors.textMuted,
          boxShadow: shadow.sm,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: colors.success }} />
          All systems operational
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stat-grid">
        {STATS.map((s) => {
          const Icon = s.icon;
          const TrendIcon = s.trend === "up" ? ArrowUpRight : ArrowDownRight;
          const trendColor = s.trend === "up" ? colors.success : colors.danger;
          return (
            <div key={s.label} style={{ ...card, padding: 18, transition: "box-shadow 0.18s ease", cursor: "default" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = shadow.md; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = shadow.sm; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: radius.md,
                  background: s.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={20} color={s.iconColor} />
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 3,
                  padding: "3px 8px", borderRadius: radius.pill,
                  background: s.trend === "up" ? colors.successBg : colors.dangerBg,
                  color: trendColor,
                  fontSize: 11, fontWeight: 700,
                }}>
                  <TrendIcon size={11} />
                  {s.trendValue}
                </div>
              </div>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: 0, fontWeight: 500 }}>{s.label}</p>
              <p style={{ fontSize: 26, fontWeight: 700, color: colors.text, margin: "4px 0 4px", letterSpacing: "-0.02em" }}>{s.value}</p>
              <p style={{ fontSize: 11, color: colors.textSubtle, margin: 0 }}>{s.trendLabel}</p>
            </div>
          );
        })}
      </div>

      {/* Two-col: Category breakdown + Volume chart */}
      <div className="admin-dash-2col">
        {/* Products by category */}
        <div style={{ ...card, padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
            <div>
              <h2 style={sectionTitle}>Products by Category</h2>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: "3px 0 0" }}>
                <span style={{ fontWeight: 700, color: colors.text, fontSize: 16 }}>
                  {CATEGORY_BREAKDOWN.reduce((s, b) => s + b.count, 0)}
                </span>
                <span style={{ marginLeft: 6 }}>total products</span>
              </p>
            </div>
            <span style={sectionLabel}>Catalog</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            {CATEGORY_BREAKDOWN.map((b, i) => (
              <div key={b.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.text, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: 20, height: 20, borderRadius: 5,
                      background: i === 0 ? "#FDECD6" : colors.surfaceMuted,
                      color: i === 0 ? "#9a5a06" : colors.textMuted,
                      fontSize: 10, fontWeight: 800,
                    }}>{i + 1}</span>
                    {b.name}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: colors.text }}>{b.count}</span>
                </div>
                <div style={{ position: "relative", height: 8, background: colors.surfaceMuted, borderRadius: radius.pill, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${b.pct}%`,
                    background: `linear-gradient(90deg, ${colors.primary} 0%, #f6b25f 100%)`,
                    borderRadius: radius.pill,
                    transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Chart */}
        <div style={{ ...card, padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8, flexShrink: 0 }}>
            <div>
              <h2 style={sectionTitle}>Catalog Additions</h2>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: "3px 0 0" }}>
                <span style={{ fontWeight: 700, color: colors.text, fontSize: 18 }}>{totalVol}</span>
                <span style={{ marginLeft: 8 }}>total · {volTab}</span>
              </p>
            </div>
            <div style={{
              display: "inline-flex",
              padding: 3,
              background: colors.surfaceMuted,
              borderRadius: radius.md,
              gap: 2,
              border: `1px solid ${colors.border}`,
            }}>
              {(["week", "month", "year"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setVolTab(t)}
                  style={{
                    padding: "5px 14px", fontSize: 11, fontWeight: 600,
                    borderRadius: radius.sm, border: "none", cursor: "pointer",
                    background: volTab === t ? colors.surface : "transparent",
                    color: volTab === t ? colors.text : colors.textMuted,
                    boxShadow: volTab === t ? shadow.sm : "none",
                    transition: "all 0.15s ease",
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flex: 1, minHeight: 180 }}>
            <div style={{
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              paddingBottom: 24, flexShrink: 0, width: 24,
            }}>
              {[maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0].map((v) => (
                <span key={v} style={{ fontSize: 10, color: colors.textSubtle, fontWeight: 500, lineHeight: 1, textAlign: "right" }}>{v}</span>
              ))}
            </div>

            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 24 }}>
                {[0, 25, 50, 75, 100].map((pct) => (
                  <div key={pct} style={{
                    position: "absolute", left: 0, right: 0,
                    bottom: `${pct}%`, height: 1,
                    borderTop: pct === 0 ? `1.5px solid ${colors.border}` : "1px dashed rgba(112,115,117,0.28)",
                    zIndex: 1,
                  }} />
                ))}

                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "flex-end",
                  gap: volData.length > 8 ? 3 : 6,
                  zIndex: 2,
                }}>
                  {volData.map((d, i) => {
                    const isHover = hoverBar === i;
                    const heightPct = maxVal > 0 ? (d.val / maxVal) * 100 : 0;
                    return (
                      <div
                        key={d.label}
                        onMouseEnter={() => setHoverBar(i)}
                        onMouseLeave={() => setHoverBar(null)}
                        style={{
                          flex: 1, height: "100%",
                          display: "flex", alignItems: "flex-end",
                          position: "relative", cursor: "pointer",
                        }}
                      >
                        {isHover && (
                          <div style={{
                            position: "absolute",
                            bottom: `calc(${heightPct}% + 8px)`,
                            left: "50%", transform: "translateX(-50%)",
                            background: colors.sidebar,
                            color: "#fff",
                            fontSize: 11, fontWeight: 700,
                            padding: "5px 10px",
                            borderRadius: radius.md,
                            whiteSpace: "nowrap",
                            boxShadow: shadow.lg,
                            zIndex: 20,
                            letterSpacing: "-0.01em",
                            pointerEvents: "none",
                          }}>
                            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 10 }}>{d.label} · </span>
                            {d.val} items
                            <div style={{
                              position: "absolute", bottom: -4, left: "50%",
                              transform: "translateX(-50%)",
                              width: 8, height: 8,
                              background: colors.sidebar,
                              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                            }} />
                          </div>
                        )}
                        <div style={{
                          width: "100%",
                          height: `${heightPct}%`,
                          minHeight: 4,
                          background: isHover
                            ? `linear-gradient(180deg, #f6b25f 0%, #F2911B 55%, #b25f08 100%)`
                            : `linear-gradient(180deg, #f8cd9a 0%, #F2911B 55%, #d97d10 100%)`,
                          borderRadius: "6px 6px 0 0",
                          transition: "background 0.2s ease",
                        }} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{
                position: "absolute", left: 0, right: 0, bottom: 0, height: 24,
                display: "flex", alignItems: "center",
                gap: volData.length > 8 ? 3 : 6,
              }}>
                {volData.map((d, j) => (
                  <div key={d.label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{
                      fontSize: 10, fontWeight: 500,
                      color: hoverBar === j ? colors.primary : colors.textMuted,
                      transition: "color 0.15s ease",
                    }}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-col: Recent Products + Quick Actions */}
      <div className="admin-dash-2col-wide">
        {/* Recently Added Products */}
        <div style={{ ...card, overflow: "hidden" }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <h2 style={sectionTitle}>Recently Added Products</h2>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: "2px 0 0" }}>Latest catalog entries</p>
            </div>
            <button
              onClick={() => navigate("/admin/catalog/products")}
              style={{
                fontSize: 12, fontWeight: 600,
                color: colors.primary,
                background: "transparent", border: "none",
                cursor: "pointer", padding: "6px 10px",
                borderRadius: radius.md,
                display: "inline-flex", alignItems: "center", gap: 4,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.primaryLight; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              View all <ArrowUpRight size={13} />
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {RECENT_PRODUCTS.map((r) => {
                  const tone = statusTone(r.status);
                  return (
                    <tr key={r.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "12px 20px" }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: colors.text }}>{r.name}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 11, color: colors.textMuted }}>{r.brand}</p>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: colors.textMuted, whiteSpace: "nowrap" }}>{r.category}</td>
                      <td style={{ padding: "12px 20px", textAlign: "right" }}>
                        <span style={badge(tone)}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ ...card, padding: 20 }}>
          <h2 style={sectionTitle}>Quick Actions</h2>
          <p style={{ fontSize: 12, color: colors.textMuted, margin: "3px 0 16px" }}>Jump to common tasks</p>
          <div className="admin-quick-actions">
            {QUICK_ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  onClick={() => navigate(a.to)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
                    padding: 14,
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: radius.md,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = shadow.md; e.currentTarget.style.borderColor = a.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = colors.border; }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: radius.md,
                    background: a.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={18} color={a.color} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{a.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
