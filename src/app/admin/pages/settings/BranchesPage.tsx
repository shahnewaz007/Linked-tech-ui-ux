import { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, radius, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label,
} from "../../components/theme";

type Branch = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
};

const MOCK: Branch[] = [
  { id: 1, name: "Corporate Office", address: "House 12, Road 5, Banani, Dhaka-1213", phone: "+8801920200477", email: "info@linkedtechbd.com", mapUrl: "" },
  { id: 2, name: "Dhaka Factory", address: "Tejgaon Industrial Area, Dhaka-1208", phone: "+8801711223344", email: "dhaka@linkedtechbd.com", mapUrl: "" },
  { id: 3, name: "Gazipur Factory", address: "Konabari, Gazipur-1346", phone: "+8801811556677", email: "gazipur@linkedtechbd.com", mapUrl: "" },
];

const EMPTY: Omit<Branch, "id"> = { name: "", address: "", phone: "", email: "", mapUrl: "" };

export function BranchesPage() {
  const [items, setItems] = useState<Branch[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (b: Branch) => {
    setForm({ name: b.name, address: b.address, phone: b.phone, email: b.email, mapUrl: b.mapUrl });
    setEditId(b.id); setShowModal(true);
  };
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
          <h1 style={pageTitle}>Branches</h1>
          <p style={pageSubtitle}>Company offices and factories shown on the Contact page.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Branch</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 60 }}>S/N</th>
              <th style={th}>Name</th>
              <th style={th}>Address</th>
              <th style={th}>Phone</th>
              <th style={th}>Email</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b, i) => (
              <tr key={b.id}>
                <td style={td}>{i + 1}</td>
                <td style={{ ...td, fontWeight: 600 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 30, height: 30, borderRadius: radius.md, background: colors.primaryLight,
                      color: colors.primary, display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}><MapPin size={15} /></span>
                    {b.name}
                  </span>
                </td>
                <td style={{ ...td, color: colors.textMuted, maxWidth: 280 }}>{b.address}</td>
                <td style={td}>{b.phone}</td>
                <td style={{ ...td, color: colors.textMuted }}>{b.email}</td>
                <td style={{ ...td, textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: 6 }}>
                    <button onClick={() => openEdit(b)} style={btnTableEdit}>Edit</button>
                    <button onClick={() => setDeleteId(b.id)} style={btnTableDelete}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Branch" : "Add Branch"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={label}>Branch Name</label>
              <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Corporate Office" />
            </div>
            <div>
              <label style={label}>Address</label>
              <textarea rows={2} style={{ ...input, resize: "vertical" }} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address" />
            </div>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Phone</label>
                <input style={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+8801XXXXXXXXX" />
              </div>
              <div>
                <label style={label}>Email</label>
                <input type="email" style={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="branch@linkedtechbd.com" />
              </div>
            </div>
            <div>
              <label style={label}>Map URL <span style={{ color: colors.textSubtle, fontWeight: 400 }}>(optional)</span></label>
              <input style={input} value={form.mapUrl} onChange={(e) => setForm({ ...form, mapUrl: e.target.value })} placeholder="Google Maps embed URL" />
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
