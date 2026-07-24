import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label, badge, badgeDotColor, statusTone,
} from "../../components/theme";

type Category = { id: number; name: string; products: number; active: boolean };

const MOCK: Category[] = [
  { id: 1, name: "Automation & Control", products: 22, active: true },
  { id: 2, name: "Power & Drives", products: 18, active: true },
  { id: 3, name: "Measurement & Sensors", products: 14, active: true },
  { id: 4, name: "Electrical Distribution", products: 11, active: true },
  { id: 5, name: "Mechanical Components", products: 9, active: true },
  { id: 6, name: "Pneumatic & Hydraulic", products: 7, active: false },
  { id: 7, name: "Safety & Protection", products: 5, active: true },
];

const EMPTY = { name: "", active: true };

export function CategoryPage() {
  const [items, setItems] = useState<Category[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (c: Category) => { setForm({ name: c.name, active: c.active }); setEditId(c.id); setShowModal(true); };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((c) => (c.id === editId ? { ...c, ...form } : c)));
    else setItems((p) => [...p, { id: Date.now(), products: 0, ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((c) => c.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Product Categories</h1>
          <p style={pageSubtitle}>Organize products into browsable categories.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Category</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 60 }}>S/N</th>
              <th style={th}>Name</th>
              <th style={{ ...th, textAlign: "center" }}>Products</th>
              <th style={{ ...th, textAlign: "center" }}>Status</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c, i) => {
              const tone = statusTone(c.active ? "active" : "inactive");
              return (
                <tr key={c.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{c.name}</td>
                  <td style={{ ...td, textAlign: "center" }}>{c.products}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={badge(tone)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button onClick={() => openEdit(c)} style={btnTableEdit}>Edit</button>
                      <button onClick={() => setDeleteId(c.id)} style={btnTableDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Category" : "Add Category"} onClose={() => setShowModal(false)} onSubmit={handleSubmit} size="sm">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={label}>Category Name</label>
              <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Automation & Control" />
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
