import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label, badge, badgeDotColor, statusTone,
} from "../../components/theme";

export type UserRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
  active: boolean;
};

const EMPTY: Omit<UserRow, "id"> = { name: "", email: "", phone: "", designation: "", active: true };

export function UserManager({
  roleLabel,
  seed,
}: {
  roleLabel: string;
  seed: UserRow[];
}) {
  const [items, setItems] = useState<UserRow[]>(seed);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (u: UserRow) => {
    setForm({ name: u.name, email: u.email, phone: u.phone, designation: u.designation, active: u.active });
    setEditId(u.id); setShowModal(true);
  };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((u) => (u.id === editId ? { ...u, ...form } : u)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((u) => u.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>{roleLabel} Users</h1>
          <p style={pageSubtitle}>Manage {roleLabel.toLowerCase()} accounts and their access.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add {roleLabel}</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 60 }}>S/N</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Phone</th>
              <th style={th}>Designation</th>
              <th style={{ ...th, textAlign: "center" }}>Status</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u, i) => {
              const tone = statusTone(u.active ? "active" : "inactive");
              return (
                <tr key={u.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{u.name}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>{u.phone}</td>
                  <td style={td}>{u.designation}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={badge(tone)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                      {u.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button onClick={() => openEdit(u)} style={btnTableEdit}>Edit</button>
                      <button onClick={() => setDeleteId(u.id)} style={btnTableDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr><td style={{ ...td, textAlign: "center", color: colors.textMuted }} colSpan={7}>No users yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal
          title={editId ? `Edit ${roleLabel}` : `Add ${roleLabel}`}
          subtitle="Fill in the account details below."
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Full Name</label>
                <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
              </div>
              <div>
                <label style={label}>Designation</label>
                <input style={input} value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Manager" />
              </div>
            </div>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Email</label>
                <input type="email" style={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@linkedtechbd.com" />
              </div>
              <div>
                <label style={label}>Phone</label>
                <input style={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+8801XXXXXXXXX" />
              </div>
            </div>
            {!editId && (
              <div>
                <label style={label}>Password</label>
                <input type="password" style={input} placeholder="Set a password" />
              </div>
            )}
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text, cursor: "pointer" }}>
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Active account
            </label>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
