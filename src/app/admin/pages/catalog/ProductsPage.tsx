import { useState } from "react";
import { Plus, Boxes } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, radius, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label, badge, badgeDotColor, statusTone,
} from "../../components/theme";

const CATEGORIES = [
  "Automation & Control", "Power & Drives", "Measurement & Sensors",
  "Electrical Distribution", "Mechanical Components", "Pneumatic & Hydraulic", "Safety & Protection",
];
const BRANDS = ["Siemens", "Schneider Electric", "ABB", "Mitsubishi Electric", "Omron", "Delta", "Danfoss", "Festo"];

type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  tags: string;
  featured: boolean;
  active: boolean;
};

const MOCK: Product[] = [
  { id: 1, name: "PLC & Automation Controllers", category: "Automation & Control", brand: "Siemens", tags: "PLC, HMI, SCADA", featured: true, active: true },
  { id: 2, name: "VFDs & Motor Drives", category: "Power & Drives", brand: "ABB", tags: "VFD, Inverter", featured: true, active: true },
  { id: 3, name: "Industrial Sensors", category: "Measurement & Sensors", brand: "Omron", tags: "Proximity, Photoelectric", featured: false, active: true },
  { id: 4, name: "Control & Distribution Panels", category: "Electrical Distribution", brand: "Schneider Electric", tags: "MCC, PDB", featured: false, active: true },
  { id: 5, name: "Industrial Motors", category: "Mechanical Components", brand: "Siemens", tags: "AC Motor, Gearbox", featured: true, active: true },
  { id: 6, name: "Pneumatic Components", category: "Pneumatic & Hydraulic", brand: "Festo", tags: "Cylinder, Valve", featured: false, active: true },
  { id: 7, name: "Safety Relays & Guards", category: "Safety & Protection", brand: "Omron", tags: "Safety, E-Stop", featured: false, active: false },
  { id: 8, name: "OEM Spare Parts", category: "Automation & Control", brand: "Mitsubishi Electric", tags: "Genuine, Spares", featured: false, active: true },
];

const EMPTY: Omit<Product, "id"> = {
  name: "", category: CATEGORIES[0], brand: BRANDS[0], tags: "", featured: false, active: true,
};

export function ProductsPage() {
  const [items, setItems] = useState<Product[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [desc, setDesc] = useState("");

  const openAdd = () => { setForm(EMPTY); setDesc(""); setEditId(null); setShowModal(true); };
  const openEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, brand: p.brand, tags: p.tags, featured: p.featured, active: p.active });
    setEditId(p.id); setShowModal(true);
  };
  const handleSubmit = () => {
    if (editId) setItems((prev) => prev.map((p) => (p.id === editId ? { ...p, ...form } : p)));
    else setItems((prev) => [...prev, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((x) => x.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Products</h1>
          <p style={pageSubtitle}>Manage the product catalog shown on the public site.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Product</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 60 }}>S/N</th>
              <th style={{ ...th, width: 60 }}>Icon</th>
              <th style={th}>Name</th>
              <th style={th}>Category</th>
              <th style={th}>Brand</th>
              <th style={{ ...th, textAlign: "center" }}>Featured</th>
              <th style={{ ...th, textAlign: "center" }}>Status</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => {
              const tone = statusTone(p.active ? "active" : "inactive");
              return (
                <tr key={p.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={td}>
                    <div style={{
                      width: 36, height: 36, borderRadius: radius.md,
                      background: colors.primaryLight, color: colors.primary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Boxes size={18} />
                    </div>
                  </td>
                  <td style={{ ...td, fontWeight: 600, maxWidth: 240 }}>{p.name}</td>
                  <td style={{ ...td, color: colors.textMuted }}>{p.category}</td>
                  <td style={td}>{p.brand}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    {p.featured
                      ? <span style={badge("primary")}>Featured</span>
                      : <span style={{ color: colors.textSubtle, fontSize: 12 }}>—</span>}
                  </td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={badge(tone)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                      {p.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button onClick={() => openEdit(p)} style={btnTableEdit}>Edit</button>
                      <button onClick={() => setDeleteId(p.id)} style={btnTableDelete}>Delete</button>
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
          title={editId ? "Edit Product" : "Add Product"}
          subtitle="Configure the product catalog entry."
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          size="lg"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={label}>Product Name</label>
              <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. VFDs & Motor Drives" />
            </div>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Category</label>
                <select style={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={label}>Brand</label>
                <select style={input} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}>
                  {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={label}>Short Description</label>
              <textarea rows={3} style={{ ...input, resize: "vertical" }} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Brief description shown on the product card" />
            </div>
            <div>
              <label style={label}>Spec Tags <span style={{ color: colors.textSubtle, fontWeight: 400 }}>(comma-separated)</span></label>
              <input style={input} value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="e.g. PLC, HMI, SCADA" />
            </div>
            <div>
              <label style={label}>Product Image <span style={{ color: colors.textSubtle, fontWeight: 400 }}>(optional)</span></label>
              <input type="file" accept="image/*" style={{ ...input, padding: "7px 10px" }} />
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text, cursor: "pointer" }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text, cursor: "pointer" }}>
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
