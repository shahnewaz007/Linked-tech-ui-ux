import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, radius, shadow, pageTitle, pageSubtitle, btnPrimary, input, label, badge,
} from "../../components/theme";

type GalleryItem = { id: number; title: string; category: string; image?: string };

const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&h=400&fit=crop&q=80`;

const MOCK: GalleryItem[] = [
  { id: 1, title: "PLC Panel Integration", category: "Automation", image: IMG("1581091226825-a6a2a5aee158") },
  { id: 2, title: "Conveyor Line Erection", category: "Erection", image: IMG("1565043666747-69f6646db940") },
  { id: 3, title: "Factory Civil Works", category: "Construction", image: IMG("1504328345606-18bbc8c9d7d1") },
  { id: 4, title: "Motor Drive Commissioning", category: "Automation", image: IMG("1581092160562-40aa08e78837") },
  { id: 5, title: "Boiler Inspection", category: "Inspection", image: IMG("1581092918056-0c4c3acd3789") },
  { id: 6, title: "Training Workshop", category: "Training", image: IMG("1521737604893-d14cc237f11d") },
];

const EMPTY = { title: "", category: "" };

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (g: GalleryItem) => { setForm({ title: g.title, category: g.category }); setEditId(g.id); setShowModal(true); };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((g) => (g.id === editId ? { ...g, ...form } : g)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((g) => g.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Gallery</h1>
          <p style={pageSubtitle}>Project photos showcased on the public site.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Image</button>
      </div>

      <div className="admin-card-grid">
        {items.map((g) => (
          <div key={g.id} style={{
            background: colors.surface, border: `1px solid ${colors.border}`,
            borderRadius: radius.lg, overflow: "hidden", boxShadow: shadow.sm,
          }}>
            <img
              src={g.image ?? IMG("1581091226825-a6a2a5aee158")}
              alt={g.title}
              style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: colors.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.title}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                <span style={badge("primary")}>{g.category}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button onClick={() => openEdit(g)} title="Edit" style={{
                    width: 30, height: 30, borderRadius: radius.sm, border: `1px solid ${colors.border}`,
                    background: colors.surface, color: colors.textMuted, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}><Pencil size={14} /></button>
                  <button onClick={() => setDeleteId(g.id)} title="Delete" style={{
                    width: 30, height: 30, borderRadius: radius.sm, border: `1px solid ${colors.dangerBg}`,
                    background: colors.dangerBg, color: colors.danger, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Image" : "Add Image"} onClose={() => setShowModal(false)} onSubmit={handleSubmit} size="sm">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={label}>Title</label>
              <input style={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Image title" />
            </div>
            <div>
              <label style={label}>Category / Tag</label>
              <input style={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Automation" />
            </div>
            <div>
              <label style={label}>Image</label>
              <input type="file" accept="image/*" style={{ ...input, padding: "7px 10px" }} />
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
