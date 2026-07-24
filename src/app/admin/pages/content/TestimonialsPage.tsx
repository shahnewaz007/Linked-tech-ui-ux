import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label, badge, badgeDotColor, statusTone,
} from "../../components/theme";

type Testimonial = {
  id: number;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  active: boolean;
};

const MOCK: Testimonial[] = [
  { id: 1, name: "Tanvir Ahmed", company: "Square Pharma", role: "Plant Manager", quote: "LTL automated our packaging line flawlessly.", rating: 5, active: true },
  { id: 2, name: "Nusrat Jahan", company: "Akij Group", role: "Procurement Head", quote: "Genuine parts, delivered on time, every time.", rating: 5, active: true },
  { id: 3, name: "Rakib Hasan", company: "PRAN-RFL", role: "Maintenance Lead", quote: "Their commissioning team is highly professional.", rating: 4, active: false },
];

const EMPTY: Omit<Testimonial, "id"> = { name: "", company: "", role: "", quote: "", rating: 5, active: true };

export function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, company: t.company, role: t.role, quote: t.quote, rating: t.rating, active: t.active });
    setEditId(t.id); setShowModal(true);
  };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((t) => (t.id === editId ? { ...t, ...form } : t)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((t) => t.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Testimonials</h1>
          <p style={pageSubtitle}>Client testimonials displayed on the public site.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Testimonial</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 60 }}>S/N</th>
              <th style={th}>Client</th>
              <th style={th}>Company</th>
              <th style={th}>Quote</th>
              <th style={{ ...th, textAlign: "center" }}>Rating</th>
              <th style={{ ...th, textAlign: "center" }}>Status</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t, i) => {
              const tone = statusTone(t.active ? "active" : "inactive");
              return (
                <tr key={t.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, fontWeight: 600 }}>
                    {t.name}
                    <div style={{ fontSize: 11, fontWeight: 400, color: colors.textMuted }}>{t.role}</div>
                  </td>
                  <td style={td}>{t.company}</td>
                  <td style={{ ...td, color: colors.textMuted, maxWidth: 280 }}>{t.quote}</td>
                  <td style={{ ...td, textAlign: "center", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: colors.primary, fontWeight: 700, fontSize: 12 }}>
                      <Star size={13} fill={colors.primary} /> {t.rating}.0
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={badge(tone)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                      {t.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button onClick={() => openEdit(t)} style={btnTableEdit}>Edit</button>
                      <button onClick={() => setDeleteId(t.id)} style={btnTableDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Testimonial" : "Add Testimonial"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Client Name</label>
                <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
              </div>
              <div>
                <label style={label}>Company</label>
                <input style={input} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" />
              </div>
            </div>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Role / Designation</label>
                <input style={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Plant Manager" />
              </div>
              <div>
                <label style={label}>Rating</label>
                <select style={input} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={label}>Quote</label>
              <textarea rows={3} style={{ ...input, resize: "vertical" }} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} placeholder="Testimonial text" />
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
