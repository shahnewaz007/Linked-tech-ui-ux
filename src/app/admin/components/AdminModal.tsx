import { useEffect } from "react";
import { X } from "lucide-react";
import { colors, radius, shadow, btnPrimary, btnSecondary } from "./theme";

interface AdminModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  submitLabel?: string;
  showFooter?: boolean;
}

const sizeMap = {
  sm: 480,
  md: 560,
  lg: 760,
  xl: 1040,
};

export function AdminModal({
  title,
  subtitle,
  onClose,
  onSubmit,
  children,
  size = "md",
  submitLabel = "Save",
  showFooter = true,
}: AdminModalProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes adminModalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes adminModalScaleIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .admin-modal-scroll {
          padding-top: 60px;
          padding-left: 16px;
          padding-right: 16px;
          padding-bottom: 16px;
        }
        @media (max-width: 639px) {
          .admin-modal-scroll {
            padding-top: 12px;
            padding-left: 8px;
            padding-right: 8px;
            padding-bottom: 8px;
          }
        }
        .admin-modal-box {
          max-height: 85svh;
        }
        @media (max-width: 639px) {
          .admin-modal-box {
            max-height: calc(100svh - 20px);
            border-radius: 16px !important;
          }
        }
      `}</style>
      <div
        className="admin-modal-scroll"
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          background: "rgba(21,23,25,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          overflowY: "auto",
          animation: "adminModalFadeIn 0.18s ease-out",
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="admin-modal-box"
          style={{
            background: colors.surface,
            borderRadius: radius.xl,
            boxShadow: shadow.xl,
            width: "100%",
            maxWidth: sizeMap[size],
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: `1px solid ${colors.border}`,
            animation: "adminModalScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            className="admin-modal-header"
            style={{
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              padding: "18px 24px 16px",
              borderBottom: `1px solid ${colors.border}`,
              flexShrink: 0,
              gap: 16,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <h3 style={{
                fontSize: 16, fontWeight: 700, color: colors.text, margin: 0,
                letterSpacing: "-0.01em",
              }}>
                {title}
              </h3>
              {subtitle && (
                <p style={{ fontSize: 12, color: colors.textMuted, margin: "3px 0 0" }}>
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                padding: 6, borderRadius: radius.md,
                color: colors.textMuted, display: "flex",
                transition: "background 0.15s ease, color 0.15s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.surfaceMuted; e.currentTarget.style.color = colors.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textMuted; }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="admin-modal-body" style={{ flex: 1, overflowY: "auto", padding: "20px 24px", background: colors.surface }}>
            {children}
          </div>

          {/* Footer */}
          {showFooter && (
            <div
              style={{
                display: "flex", justifyContent: "flex-end", gap: 8,
                padding: "14px 24px",
                borderTop: `1px solid ${colors.border}`,
                background: colors.surfaceMuted,
                flexShrink: 0,
              }}
            >
              <button onClick={onClose} style={btnSecondary}>Cancel</button>
              {onSubmit && (
                <button onClick={onSubmit} style={btnPrimary}>{submitLabel}</button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
