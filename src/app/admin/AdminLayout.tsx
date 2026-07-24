import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import {
  Menu, ChevronDown, ChevronRight, LogOut, X,
  LayoutDashboard, Shield, Users, Package, LayoutGrid,
  Settings, ExternalLink, Search, Bell,
} from "lucide-react";
import { colors, shadow, radius } from "./components/theme";
import "../../styles/admin.css";

/** Reactive window width hook — re-renders on resize */
function useWindowWidth() {
  const [w, setW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}

type ChildItem = { label: string; to: string };
type NavItem = {
  key: string;
  label: string;
  icon: React.ElementType;
  to?: string;
  children?: ChildItem[];
};

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { key: "permissions", label: "Permissions", icon: Shield, to: "/admin/permissions" },
  {
    key: "users", label: "Users", icon: Users,
    children: [
      { label: "Admins", to: "/admin/users/admin" },
      { label: "Editors", to: "/admin/users/editor" },
    ],
  },
  {
    key: "catalog", label: "Catalog", icon: Package,
    children: [
      { label: "Services", to: "/admin/catalog/services" },
      { label: "Products", to: "/admin/catalog/products" },
      { label: "Product Categories", to: "/admin/catalog/categories" },
      { label: "Brands", to: "/admin/catalog/brands" },
    ],
  },
  {
    key: "content", label: "Content", icon: LayoutGrid,
    children: [
      { label: "Gallery", to: "/admin/content/gallery" },
      { label: "Events", to: "/admin/content/events" },
      { label: "Testimonials", to: "/admin/content/testimonials" },
      { label: "FAQ", to: "/admin/content/faq" },
      { label: "Team Members", to: "/admin/content/team" },
    ],
  },
  {
    key: "settings", label: "Settings", icon: Settings,
    children: [
      { label: "Branches", to: "/admin/settings/branches" },
      { label: "Company Info", to: "/admin/settings/company" },
    ],
  },
];

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED = 68;

// Breakpoints
const BP_MOBILE  = 768;   // < 768  → mobile overlay drawer
const BP_TABLET  = 1024;  // 768–1023 → collapsed icon sidebar
// >= 1024 → full desktop sidebar

function pageTitleFromPath(path: string): string {
  if (path === "/admin" || path === "/admin/") return "Dashboard";
  if (path.startsWith("/admin/permissions")) return "Role Permissions";
  if (path.startsWith("/admin/users/admin")) return "Admin Users";
  if (path.startsWith("/admin/users/editor")) return "Editor Users";
  if (path.startsWith("/admin/catalog/services")) return "Services";
  if (path.startsWith("/admin/catalog/products")) return "Products";
  if (path.startsWith("/admin/catalog/categories")) return "Product Categories";
  if (path.startsWith("/admin/catalog/brands")) return "Brands";
  if (path.startsWith("/admin/content/gallery")) return "Gallery";
  if (path.startsWith("/admin/content/events")) return "Events";
  if (path.startsWith("/admin/content/testimonials")) return "Testimonials";
  if (path.startsWith("/admin/content/faq")) return "FAQ";
  if (path.startsWith("/admin/content/team")) return "Team Members";
  if (path.startsWith("/admin/settings/branches")) return "Branches";
  if (path.startsWith("/admin/settings/company")) return "Company Info";
  return "Admin";
}

export function AdminLayout() {
  const windowWidth = useWindowWidth();
  const isMobile  = windowWidth < BP_MOBILE;
  const isTablet  = windowWidth >= BP_MOBILE && windowWidth < BP_TABLET;
  const isDesktop = windowWidth >= BP_TABLET;

  // Desktop/tablet: collapsed ←→ expanded
  const [collapsed, setCollapsed] = useState(false);
  // Mobile: drawer open ←→ closed
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(["catalog"]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // ── Auto-collapse on tablet, expand on desktop ──────────
  useEffect(() => {
    if (isTablet)  setCollapsed(true);
    if (isDesktop) setCollapsed(false);
  }, [isTablet, isDesktop]);

  // ── Close mobile drawer on route change ─────────────────
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // ── Body scroll-lock when mobile drawer is open ─────────
  useEffect(() => {
    document.body.style.overflow = isMobile && mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, mobileOpen]);

  // ── Close user menu on outside click ────────────────────
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggle = (key: string) =>
    setExpanded((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  // Hamburger: opens mobile drawer / toggles desktop collapse
  const handleHamburger = () => {
    if (isMobile) setMobileOpen((o) => !o);
    else setCollapsed((c) => !c);
  };

  // Sidebar render width
  const sidebarW = isMobile ? SIDEBAR_WIDTH : (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH);
  // Collapsed flag used inside sidebar rendering (never collapse on mobile overlay)
  const sidebarCollapsed = isMobile ? false : collapsed;

  const pageTitle = pageTitleFromPath(location.pathname);

  // ── Sidebar inner content (shared between mobile/desktop) ─
  const sidebarContent = (
    <>
      {/* Brand row */}
      <div
        style={{
          padding: sidebarCollapsed ? "18px 0" : "18px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarCollapsed ? "center" : "space-between",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/images/logo.png"
            alt="LTL"
            style={{ width: 34, height: 34, objectFit: "contain", flexShrink: 0 }}
          />
          {!sidebarCollapsed && (
            <div style={{ minWidth: 0, overflow: "hidden" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, margin: 0, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
                Linked Technologies
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: 0, whiteSpace: "nowrap" }}>
                Admin Panel
              </p>
            </div>
          )}
        </div>
        {/* Close button — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.75)", padding: 6, borderRadius: radius.md,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          if (!item.children) {
            return (
              <NavLink
                key={item.key}
                to={item.to!}
                end={item.to === "/admin"}
                title={sidebarCollapsed ? item.label : undefined}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: sidebarCollapsed ? "10px" : "9px 12px",
                  margin: "1px 0",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: radius.md,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                  background: isActive ? colors.sidebarActive : "transparent",
                  borderLeft: isActive ? `3px solid ${colors.sidebarActiveBorder}` : "3px solid transparent",
                  transition: "background 0.15s ease, color 0.15s ease",
                  justifyContent: sidebarCollapsed ? "center" : "flex-start",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                })}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!sidebarCollapsed && (
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
                )}
              </NavLink>
            );
          }

          const isOpen = expanded.includes(item.key);
          const anyChildActive = item.children!.some((c) => location.pathname.startsWith(c.to));

          return (
            <div key={item.key}>
              <button
                onClick={() =>
                  sidebarCollapsed
                    ? (isMobile ? undefined : setCollapsed(false))
                    : toggle(item.key)
                }
                title={sidebarCollapsed ? item.label : undefined}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: sidebarCollapsed ? "center" : "space-between",
                  gap: 11,
                  padding: sidebarCollapsed ? "10px" : "9px 12px",
                  margin: "1px 0",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: radius.md,
                  background: anyChildActive && !isOpen ? colors.sidebarActive : "transparent",
                  color: anyChildActive ? "#fff" : "rgba(255,255,255,0.65)",
                  border: "none",
                  borderLeft: "3px solid transparent",
                  cursor: "pointer",
                  transition: "background 0.15s ease, color 0.15s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { if (!anyChildActive) e.currentTarget.style.background = colors.sidebarHover; }}
                onMouseLeave={(e) => { if (!(anyChildActive && !isOpen)) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <Icon size={17} style={{ flexShrink: 0 }} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </span>
                {!sidebarCollapsed && (isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />)}
              </button>

              {!sidebarCollapsed && isOpen && (
                <div style={{ marginTop: 2, marginBottom: 4 }}>
                  {item.children!.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      style={({ isActive }) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        paddingLeft: 32,
                        paddingRight: 12,
                        paddingTop: 7,
                        paddingBottom: 7,
                        margin: "1px 0",
                        fontSize: 12,
                        borderRadius: radius.sm,
                        color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                        background: isActive ? "rgba(242,145,27,0.18)" : "transparent",
                        fontWeight: isActive ? 600 : 500,
                        transition: "background 0.15s ease, color 0.15s ease",
                        whiteSpace: "nowrap",
                        textDecoration: "none",
                      })}
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            style={{
                              width: 5, height: 5, borderRadius: "50%",
                              background: isActive ? colors.primary : "rgba(255,255,255,0.3)",
                              flexShrink: 0,
                              transition: "background 0.15s ease",
                            }}
                          />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{child.label}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!sidebarCollapsed && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, margin: 0 }}>v1.0 · © Linked Technologies Ltd</p>
        </div>
      )}
    </>
  );

  return (
    <div style={{ display: "flex", height: "100svh", overflow: "hidden", background: colors.bg }}>

      {/* ── Mobile backdrop ──────────────────────────────── */}
      {isMobile && mobileOpen && (
        <div
          className="admin-drawer-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        style={{
          width: sidebarW,
          background: colors.sidebar,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          // Mobile: fixed overlay
          ...(isMobile
            ? {
                position: "fixed",
                top: 0, left: 0,
                height: "100svh",
                zIndex: 200,
                transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: mobileOpen ? shadow.xl : "none",
              }
            : {
                flexShrink: 0,
                transition: "width 0.22s ease",
              }),
        }}
      >
        {sidebarContent}
      </aside>

      {/* ── Main area ───────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* Header */}
        <header
          style={{
            background: colors.surface,
            borderBottom: `1px solid ${colors.border}`,
            padding: isMobile ? "0 14px" : "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            boxShadow: shadow.sm,
            zIndex: 30,
          }}
        >
          {/* Left: hamburger + title */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16, minWidth: 0 }}>
            <button
              onClick={handleHamburger}
              aria-label={isMobile ? "Open menu" : (collapsed ? "Expand sidebar" : "Collapse sidebar")}
              style={{
                color: colors.textMuted, background: "transparent",
                border: "none", cursor: "pointer",
                padding: 8, borderRadius: radius.md,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.surfaceMuted; e.currentTarget.style.color = colors.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
            >
              <Menu size={18} />
            </button>
            <p style={{ fontSize: isMobile ? 14 : 15, fontWeight: 700, color: colors.text, margin: 0, letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {pageTitle}
            </p>
          </div>

          {/* Right: search + actions */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 8, flexShrink: 0 }}>
            {/* Search — hidden on mobile */}
            <div
              className="hidden md:flex"
              style={{
                alignItems: "center",
                gap: 8,
                padding: "7px 12px",
                background: colors.surfaceMuted,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                width: 200,
                color: colors.textMuted,
              }}
            >
              <Search size={14} />
              <input
                placeholder="Search..."
                style={{
                  border: "none", background: "transparent", outline: "none",
                  fontSize: 13, color: colors.text, flex: 1, minWidth: 0,
                }}
              />
              <kbd style={{
                fontSize: 10, padding: "1px 5px", borderRadius: 4,
                background: colors.surface, border: `1px solid ${colors.border}`,
                color: colors.textSubtle, fontFamily: "monospace",
              }}>⌘K</kbd>
            </div>

            {/* Notifications */}
            <button
              title="Notifications"
              style={{
                position: "relative",
                color: colors.textMuted, background: "transparent",
                border: "none", cursor: "pointer",
                padding: 8, borderRadius: radius.md,
                display: "flex", alignItems: "center",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.surfaceMuted; e.currentTarget.style.color = colors.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
            >
              <Bell size={17} />
              <span style={{
                position: "absolute", top: 6, right: 7,
                width: 7, height: 7, borderRadius: "50%",
                background: colors.danger,
                border: `2px solid ${colors.surface}`,
              }} />
            </button>

            {/* Site link — icon only on mobile */}
            <button
              onClick={() => navigate("/")}
              title="Open public site"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                color: colors.textMuted, background: "transparent",
                border: "none", cursor: "pointer",
                padding: "6px 10px",
                borderRadius: radius.md,
                fontSize: 12, fontWeight: 600,
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.surfaceMuted; e.currentTarget.style.color = colors.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Site</span>
            </button>

            <div style={{ width: 1, height: 22, background: colors.border, margin: "0 2px" }} />

            {/* User menu */}
            <div style={{ position: "relative" }} ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "5px 8px 5px 5px",
                  background: "transparent", border: "none", cursor: "pointer",
                  borderRadius: radius.md,
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = colors.surfaceMuted; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #b25f08 100%)`,
                  color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                  flexShrink: 0,
                }}>AD</div>
                <div className="hidden sm:block" style={{ textAlign: "left", lineHeight: 1.2 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: colors.text }}>Admin User</p>
                  <p style={{ margin: 0, fontSize: 10, color: colors.textMuted }}>Super Admin</p>
                </div>
                <ChevronDown size={13} color={colors.textMuted} />
              </button>

              {userMenuOpen && (
                <div
                  style={{
                    position: "absolute", right: 0, top: "calc(100% + 6px)",
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: radius.lg,
                    boxShadow: shadow.lg,
                    minWidth: 220,
                    overflow: "hidden",
                    zIndex: 50,
                  }}
                >
                  <div style={{ padding: "12px 14px", borderBottom: `1px solid ${colors.border}` }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: colors.text }}>Admin User</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: colors.textMuted }}>admin@linkedtechbd.com</p>
                  </div>
                  <button
                    onClick={() => navigate("/")}
                    style={{
                      display: "flex", alignItems: "center", gap: 9,
                      width: "100%", padding: "10px 14px",
                      background: "transparent", border: "none", cursor: "pointer",
                      fontSize: 13, color: colors.danger, textAlign: "left",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = colors.dangerBg; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
