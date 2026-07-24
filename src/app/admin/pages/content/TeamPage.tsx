import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label, badge, badgeDotColor, statusTone,
} from "../../components/theme";

type Member = { id: number; name: string; role: string; order: number; active: boolean };

const MOCK: Member[] = [
  { id: 1, name: "Rafiqul Islam", role: "Managing Director", order: 1, active: true },
  { id: 2, name: "Shahida Akter", role: "Head of Operations", order: 2, active: true },
  { id: 3, name: "Mahbub Alam", role: "Chief Engineer", order: 3, active: true },
  { id: 4, name: "Tania Rahman", role: "Project Coordinator", order: 4, active: false },
];

const EMPTY: Omit<Member, "id"> = { name: "", role: "", order: 0, active: true };

export function TeamPage() {
  const [items, setItems] = useState<Member[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm({ ...EMPTY, order: items.length + 1 }); setEditId(null); setShowModal(true); };
  const openEdit = (m: Member) => {
    setForm({ name: m.name, role: m.role, order: m.order, active: m.active });
    setEditId(m.id); setShowModal(true);
  };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((m) => (m.id === editId ? { ...m, ...form } : m)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((m) => m.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Team Members</h1>
          <p style={pageSubtitle}>Leadership and team shown on the About page.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Member</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 70 }}>Order</th>
              <th style={{ ...th, width: 70 }}>Photo</th>
              <th style={th}>Name</th>
              <th style={th}>Role</th>
              <th style={{ ...th, textAlign: "center" }}>Status</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...items].sort((a, b) => a.order - b.order).map((m) => {
              const tone = statusTone(m.active ? "active" : "inactive");
              return (
                <tr key={m.id}>
                  <td style={td}>{m.order}</td>
                  <td style={td}>
                    <img
                      src={`https://i.pravatar.cc/80?img=${m.id + 10}`}
                      alt={m.name}
                      style={{
                        width: 38, height: 38, borderRadius: "50%",
                        objectFit: "cover", border: `1px solid ${colors.border}`, display: "block",
                      }}
                    />
                  </td>
                  <td style={{ ...td, fontWeight: 600 }}>{m.name}</td>
                  <td style={{ ...td, color: colors.textMuted }}>{m.role}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={badge(tone)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                      {m.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button onClick={() => openEdit(m)} style={btnTableEdit}>Edit</button>
                      <button onClick={() => setDeleteId(m.id)} style={btnTableDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Member" : "Add Member"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Name</label>
                <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
              </div>
              <div>
                <label style={label}>Role</label>
                <input style={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Chief Engineer" />
              </div>
            </div>
            <div>
              <label style={label}>Photo</label>
              <input type="file" accept="image/*" style={{ ...input, padding: "7px 10px" }} />
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
