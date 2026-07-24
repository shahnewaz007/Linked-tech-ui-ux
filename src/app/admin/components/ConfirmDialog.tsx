import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { colors, radius, shadow, btnSecondary, btnDanger } from "./theme";

interface ConfirmDialogProps {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <>
      <style>{`
        @keyframes confirmFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes confirmScaleIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 110,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(21,23,25,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          padding: 16,
          animation: "confirmFadeIn 0.18s ease-out",
        }}
        onClick={(e) => e.target === e.currentTarget && onCancel()}
      >
        <div
          role="alertdialog"
          aria-modal="true"
          style={{
            background: colors.surface,
            borderRadius: radius.xl,
            boxShadow: shadow.xl,
            border: `1px solid ${colors.border}`,
            width: "100%",
            maxWidth: 420,
            overflow: "hidden",
            animation: "confirmScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div style={{ padding: "24px 24px 20px", display: "flex", gap: 16 }}>
            <div
              style={{
                width: 44, height: 44, flexShrink: 0,
                borderRadius: "50%",
                background: colors.dangerBg,
                color: colors.danger,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <AlertTriangle size={22} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontSize: 16, fontWeight: 700, color: colors.text, margin: 0,
                letterSpacing: "-0.01em",
              }}>
                {title}
              </h3>
              <p style={{ fontSize: 13, color: colors.textMuted, margin: "6px 0 0", lineHeight: 1.5 }}>
                {message}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex", justifyContent: "flex-end", gap: 8,
              padding: "12px 20px",
              borderTop: `1px solid ${colors.border}`,
              background: colors.surfaceMuted,
            }}
          >
            <button onClick={onCancel} style={btnSecondary}>{cancelLabel}</button>
            <button onClick={onConfirm} style={btnDanger} autoFocus>{confirmLabel}</button>
          </div>
        </div>
      </div>
    </>
  );
}
