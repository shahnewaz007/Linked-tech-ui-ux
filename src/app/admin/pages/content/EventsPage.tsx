import { useState } from "react";
import { Plus } from "lucide-react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  colors, pageTitle, pageSubtitle, btnPrimary, btnTableEdit, btnTableDelete,
  table, th, td, input, label, badge, badgeDotColor, statusTone,
} from "../../components/theme";

type EventItem = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  active: boolean;
};

const MOCK: EventItem[] = [
  { id: 1, title: "Industrial Automation Expo 2026", date: "2026-08-14", location: "ICCB, Dhaka", description: "Showcasing our latest automation solutions.", active: true },
  { id: 2, title: "Factory Safety Training Drive", date: "2026-07-30", location: "Gazipur Factory", description: "Hands-on safety and compliance workshop.", active: true },
  { id: 3, title: "OEM Partner Meet", date: "2026-06-18", location: "Corporate Office", description: "Annual partner and supplier gathering.", active: false },
];

const EMPTY: Omit<EventItem, "id"> = { title: "", date: "", location: "", description: "", active: true };

export function EventsPage() {
  const [items, setItems] = useState<EventItem[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (ev: EventItem) => {
    setForm({ title: ev.title, date: ev.date, location: ev.location, description: ev.description, active: ev.active });
    setEditId(ev.id); setShowModal(true);
  };
  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((e) => (e.id === editId ? { ...e, ...form } : e)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };
  const handleDelete = () => { setItems((p) => p.filter((e) => e.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Events</h1>
          <p style={pageSubtitle}>Company events and news published on the site.</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}><Plus size={15} /> Add Event</button>
      </div>

      <div className="admin-table-wrap">
        <table style={table}>
          <thead>
            <tr>
              <th style={{ ...th, width: 60 }}>S/N</th>
              <th style={th}>Title</th>
              <th style={th}>Date</th>
              <th style={th}>Location</th>
              <th style={{ ...th, textAlign: "center" }}>Status</th>
              <th style={{ ...th, width: 150, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e, i) => {
              const tone = statusTone(e.active ? "active" : "inactive");
              return (
                <tr key={e.id}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{e.title}</td>
                  <td style={td}>{e.date}</td>
                  <td style={{ ...td, color: colors.textMuted }}>{e.location}</td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <span style={badge(tone)}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone) }} />
                      {e.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      <button onClick={() => openEdit(e)} style={btnTableEdit}>Edit</button>
                      <button onClick={() => setDeleteId(e.id)} style={btnTableDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Event" : "Add Event"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={label}>Title</label>
              <input style={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
            </div>
            <div className="admin-modal-2col">
              <div>
                <label style={label}>Date</label>
                <input type="date" style={input} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label style={label}>Location</label>
                <input style={input} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Venue" />
              </div>
            </div>
            <div>
              <label style={label}>Description</label>
              <textarea rows={3} style={{ ...input, resize: "vertical" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Event details" />
            </div>
            <div>
              <label style={label}>Cover Image</label>
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
