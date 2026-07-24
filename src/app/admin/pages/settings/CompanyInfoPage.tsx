import { useState } from "react";
import { Check, Building2, Share2, Phone } from "lucide-react";
import {
  colors, radius, card, pageTitle, pageSubtitle, sectionTitle, btnPrimary, input, label,
} from "../../components/theme";

const initial = {
  companyName: "Linked Technologies Ltd",
  tagline: "Engineering Excellence in Industrial Automation",
  phonePrimary: "+8801920200477",
  phoneSecondary: "+880255667788",
  emailPrimary: "info@linkedtechbd.com",
  emailSecondary: "sales@linkedtechbd.com",
  whatsapp: "+8801920200477",
  hours: "Sat – Thu, 9:00 AM – 6:00 PM",
  address: "House 12, Road 5, Banani, Dhaka-1213, Bangladesh",
  youtube: "https://youtube.com/@linkedtech",
  facebook: "https://facebook.com/linkedtech",
  linkedin: "https://linkedin.com/company/linkedtech",
};

const cardStyle: React.CSSProperties = { ...card, padding: 20, marginBottom: 20 };

function SectionHead({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
      <div style={{
        width: 38, height: 38, borderRadius: radius.md, background: colors.primaryLight,
        color: colors.primary, display: "flex", alignItems: "center", justifyContent: "center",
      }}><Icon size={18} /></div>
      <div>
        <h2 style={sectionTitle}>{title}</h2>
        <p style={{ fontSize: 12, color: colors.textMuted, margin: "2px 0 0" }}>{desc}</p>
      </div>
    </div>
  );
}

export function CompanyInfoPage() {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 style={pageTitle}>Company Info</h1>
          <p style={pageSubtitle}>Global site settings, contact details and social links.</p>
        </div>
        <button style={btnPrimary}><Check size={15} /> Save Settings</button>
      </div>

      {/* Identity */}
      <div style={cardStyle}>
        <SectionHead icon={Building2} title="Company Identity" desc="Name, tagline and address." />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="admin-modal-2col">
            <div>
              <label style={label}>Company Name</label>
              <input style={input} value={form.companyName} onChange={set("companyName")} />
            </div>
            <div>
              <label style={label}>Tagline</label>
              <input style={input} value={form.tagline} onChange={set("tagline")} />
            </div>
          </div>
          <div>
            <label style={label}>Address</label>
            <input style={input} value={form.address} onChange={set("address")} />
          </div>
          <div className="admin-modal-2col">
            <div>
              <label style={label}>Logo</label>
              <input type="file" accept="image/*" style={{ ...input, padding: "7px 10px" }} />
            </div>
            <div>
              <label style={label}>Favicon</label>
              <input type="file" accept="image/*" style={{ ...input, padding: "7px 10px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div style={cardStyle}>
        <SectionHead icon={Phone} title="Contact Details" desc="Phone numbers, emails and working hours." />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="admin-modal-2col">
            <div>
              <label style={label}>Primary Phone</label>
              <input style={input} value={form.phonePrimary} onChange={set("phonePrimary")} />
            </div>
            <div>
              <label style={label}>Secondary Phone</label>
              <input style={input} value={form.phoneSecondary} onChange={set("phoneSecondary")} />
            </div>
          </div>
          <div className="admin-modal-2col">
            <div>
              <label style={label}>Primary Email</label>
              <input style={input} value={form.emailPrimary} onChange={set("emailPrimary")} />
            </div>
            <div>
              <label style={label}>Secondary Email</label>
              <input style={input} value={form.emailSecondary} onChange={set("emailSecondary")} />
            </div>
          </div>
          <div className="admin-modal-2col">
            <div>
              <label style={label}>WhatsApp Number</label>
              <input style={input} value={form.whatsapp} onChange={set("whatsapp")} />
            </div>
            <div>
              <label style={label}>Working Hours</label>
              <input style={input} value={form.hours} onChange={set("hours")} />
            </div>
          </div>
        </div>
      </div>

      {/* Social */}
      <div style={{ ...cardStyle, marginBottom: 0 }}>
        <SectionHead icon={Share2} title="Social Links" desc="Links shown in the site footer." />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="admin-modal-2col">
            <div>
              <label style={label}>YouTube</label>
              <input style={input} value={form.youtube} onChange={set("youtube")} />
            </div>
            <div>
              <label style={label}>Facebook</label>
              <input style={input} value={form.facebook} onChange={set("facebook")} />
            </div>
          </div>
          <div style={{ maxWidth: "calc(50% - 6px)" }}>
            <label style={label}>LinkedIn</label>
            <input style={input} value={form.linkedin} onChange={set("linkedin")} />
          </div>
        </div>
      </div>
    </div>
  );
}
