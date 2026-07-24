import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, radius, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label, badge, badgeDotColor, statusTone,
} from "../../components/theme";

type Brand = { id: number; name: string; active: boolean };

const MOCK: Brand[] = [
  { id: 1, name: "Siemens", active: true },
  { id: 2, name: "Schneider Electric", active: true },
  { id: 3, name: "ABB", active: true },
  { id: 4, name: "Mitsubishi Electric", active: true },
  { id: 5, name: "Omron", active: true },
  { id: 6, name: "Delta", active: true },
  { id: 7, name: "Danfoss", active: false },
  { id: 8, name: "Festo", active: true },
];

const EMPTY = { name: "", active: true };

export function BrandPage() {
  const [items, setItems] = useState<Brand[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (b: Brand) => { setForm({ name: b.name, active: b.active }); setEditId(b.id); setShowModal(true); };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((b) => (b.id === editId ? { ...b, ...form } : b)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((b) => b.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Brands</h1>
          <p style={pageSubtitle}>World-class manufacturer brands supplied by LTL.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Brand</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 60 }}>S/N</th>
              <th style={{ ...th, width: 70 }}>Logo</th>
              <th style={th}>Name</th>
              <th style={{ ...th, textAlign: "center" }}>Status</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b, i) => {
              const tone = statusTone(b.active ? "active" : "inactive");
              return (
                <tr key={b.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={td}>
                    <div style={{
                      width: 36, height: 36, borderRadius: radius.md,
                      background: colors.surfaceMuted, border: `1px solid ${colors.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center", color: colors.textMuted,
                    }}>
                      <Building2 size={16} />
                    </div>
                  </td>
                  <td style={{ ...td, fontWeight: 600 }}>{b.name}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={badge(tone)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                      {b.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button onClick={() => openEdit(b)} style={btnTableEdit}>Edit</button>
                      <button onClick={() => setDeleteId(b.id)} style={btnTableDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Brand" : "Add Brand"} onClose={() => setShowModal(false)} onSubmit={handleSubmit} size="sm">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={label}>Brand Name</label>
              <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Siemens" />
            </div>
            <div>
              <label style={label}>Logo</label>
              <input type="file" accept="image/*" style={{ ...input, padding: "7px 10px" }} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text, cursor: "pointer" }}>
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Active
            </label>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
