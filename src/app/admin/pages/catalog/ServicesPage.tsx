import { useState } from "react";
import {
  Plus, Cpu, Factory, Wrench, HardHat, ClipboardCheck,
  BadgeCheck, GraduationCap, Code2, Globe,
} from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, radius, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label, badge, badgeDotColor, statusTone,
} from "../../components/theme";

const ICONS: Record<string, React.ElementType> = {
  Cpu, Factory, Wrench, HardHat, ClipboardCheck, BadgeCheck, GraduationCap, Code2, Globe,
};

type Service = {
  id: number;
  title: string;
  icon: keyof typeof ICONS | string;
  desc: string;
  order: number;
  active: boolean;
};

const MOCK: Service[] = [
  { id: 1, title: "Industrial Automation", icon: "Cpu", desc: "PLC, HMI, SCADA & control system integration.", order: 1, active: true },
  { id: 2, title: "Machine Manufacturing", icon: "Factory", desc: "Custom industrial machinery design & fabrication.", order: 2, active: true },
  { id: 3, title: "Erection & Maintenance", icon: "Wrench", desc: "Installation, commissioning & preventive upkeep.", order: 3, active: true },
  { id: 4, title: "Civil Construction", icon: "HardHat", desc: "Industrial civil & structural construction works.", order: 4, active: true },
  { id: 5, title: "Survey & Consultancy", icon: "ClipboardCheck", desc: "Engineering surveys and technical consultancy.", order: 5, active: true },
  { id: 6, title: "Inspection & Certification", icon: "BadgeCheck", desc: "Third-party inspection and compliance certification.", order: 6, active: true },
  { id: 7, title: "Technological Training", icon: "GraduationCap", desc: "Hands-on automation & engineering training.", order: 7, active: true },
  { id: 8, title: "Software Development", icon: "Code2", desc: "Industrial software and monitoring dashboards.", order: 8, active: true },
  { id: 9, title: "Foreign Product Importer", icon: "Globe", desc: "Sourcing & import of genuine OEM equipment.", order: 9, active: true },
];

const EMPTY: Omit<Service, "id"> = { title: "", icon: "Cpu", desc: "", order: 0, active: true };

export function ServicesPage() {
  const [items, setItems] = useState<Service[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm({ ...EMPTY, order: items.length + 1 }); setEditId(null); setShowModal(true); };
  const openEdit = (s: Service) => {
    setForm({ title: s.title, icon: s.icon, desc: s.desc, order: s.order, active: s.active });
    setEditId(s.id); setShowModal(true);
  };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((s) => (s.id === editId ? { ...s, ...form } : s)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((s) => s.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Services</h1>
          <p style={pageSubtitle}>Manage the engineering services shown on the public site.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Service</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 60 }}>Order</th>
              <th style={{ ...th, width: 70 }}>Icon</th>
              <th style={th}>Title</th>
              <th style={th}>Description</th>
              <th style={{ ...th, textAlign: "center" }}>Status</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...items].sort((a, b) => a.order - b.order).map((s) => {
              const Icon = ICONS[s.icon] ?? Cpu;
              const tone = statusTone(s.active ? "active" : "inactive");
              return (
                <tr key={s.id}>
                  <td style={td}>{s.order}</td>
                  <td style={td}>
                    <div style={{
                      width: 36, height: 36, borderRadius: radius.md,
                      background: colors.primaryLight, color: colors.primary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={18} />
                    </div>
                  </td>
                  <td style={{ ...td, fontWeight: 600 }}>{s.title}</td>
                  <td style={{ ...td, color: colors.textMuted, maxWidth: 320 }}>{s.desc}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={badge(tone)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                      {s.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button onClick={() => openEdit(s)} style={btnTableEdit}>Edit</button>
                      <button onClick={() => setDeleteId(s.id)} style={btnTableDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal
          title={editId ? "Edit Service" : "Add Service"}
          subtitle="Configure the service card details."
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={label}>Title</label>
              <input style={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Industrial Automation" />
            </div>
            <div>
              <label style={label}>Icon</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Object.keys(ICONS).map((key) => {
                  const Icon = ICONS[key];
                  const selected = form.icon === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm({ ...form, icon: key })}
                      title={key}
                      style={{
                        width: 42, height: 42, borderRadius: radius.md,
                        border: `1px solid ${selected ? colors.primary : colors.border}`,
                        background: selected ? colors.primaryLight : colors.surface,
                        color: selected ? colors.primary : colors.textMuted,
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border 0.15s ease, background 0.15s ease",
                      }}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={label}>Short Description</label>
              <textarea rows={3} style={{ ...input, resize: "vertical" }} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Brief description shown on the service card" />
            </div>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Display Order</label>
                <input type="number" style={input} value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text, cursor: "pointer", alignSelf: "flex-end", paddingBottom: 10 }}>
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                Active
              </label>
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
