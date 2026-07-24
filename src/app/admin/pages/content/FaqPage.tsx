import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label,
} from "../../components/theme";

type Faq = { id: number; question: string; answer: string; position: number };

const MOCK: Faq[] = [
  { id: 1, question: "What industries does LTL serve?", answer: "We serve pharmaceuticals, FMCG, textiles, steel, cement and more.", position: 1 },
  { id: 2, question: "Do you supply genuine OEM parts?", answer: "Yes, we supply only genuine parts from world-class manufacturers.", position: 2 },
  { id: 3, question: "Do you provide after-sales support?", answer: "We offer 24/7 support, maintenance and commissioning services.", position: 3 },
];

const EMPTY = { question: "", answer: "", position: 0 };

export function FaqPage() {
  const [items, setItems] = useState<Faq[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm({ ...EMPTY, position: items.length + 1 }); setEditId(null); setShowModal(true); };
  const openEdit = (f: Faq) => { setForm({ question: f.question, answer: f.answer, position: f.position }); setEditId(f.id); setShowModal(true); };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((f) => (f.id === editId ? { ...f, ...form } : f)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((f) => f.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>FAQ</h1>
          <p style={pageSubtitle}>Frequently asked questions shown on the public site.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add FAQ</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 80 }}>Position</th>
              <th style={th}>Question</th>
              <th style={th}>Answer</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...items].sort((a, b) => a.position - b.position).map((f) => (
              <tr key={f.id}>
                <td style={td}>{f.position}</td>
                <td style={{ ...td, fontWeight: 600, maxWidth: 280 }}>{f.question}</td>
                <td style={{ ...td, color: colors.textMuted, maxWidth: 360 }}>{f.answer}</td>
                <td style={{ ...td, textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: 6 }}>
                    <button onClick={() => openEdit(f)} style={btnTableEdit}>Edit</button>
                    <button onClick={() => setDeleteId(f.id)} style={btnTableDelete}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit FAQ" : "Add FAQ"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={label}>Question</label>
              <textarea rows={2} style={{ ...input, resize: "vertical" }} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Question" />
            </div>
            <div>
              <label style={label}>Answer</label>
              <textarea rows={4} style={{ ...input, resize: "vertical" }} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Answer" />
            </div>
            <div style={{ maxWidth: 160 }}>
              <label style={label}>Position</label>
              <input type="number" style={input} value={form.position} onChange={(e) => setForm({ ...form, position: Number(e.target.value) })} />
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
