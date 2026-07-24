# Admin Panel — UI/UX Plan

**Project:** Linked Technologies Ltd (LTL)
**Reference design:** Dolphin Japan admin panel (same layout, components, responsiveness & interaction patterns)
**Phase:** 1 — UI with mock data (current focus)
**Phase 2:** REST API integration (after UI is confirmed)

> The goal is a **1:1 structural clone** of the Dolphin Japan admin panel — the same
> standalone layout, sidebar behaviour, header, tables, modals, cards, badges and
> responsive breakpoints — **re-skinned to the Linked Technologies theme** and with
> **modules that match LTL's business** (industrial engineering, automation, product
> supply, and inquiry handling) instead of car export.

---

## 1. Design Language & Theme Mapping

The reference panel uses a blue exporter theme. We re-skin it with the LTL brand
palette already used across the public site (orange `#F2911B`, tech-black `#151719`,
steel-gray `#707375`, off-white `#F7F9FA`). Structure, spacing, radii and shadows stay identical.

### Color token mapping (reference → LTL)

| Token | Reference (Dolphin) | LTL value | Usage |
|-------|--------------------|-----------|-------|
| `primary` | `#0589d9` | **`#F2911B`** | Buttons, active states, links, chart accent |
| `primaryDark` | `#0470b8` | **`#d97d10`** | Hover on primary buttons |
| `primaryLight` | `#e0f2fe` | **`#FDECD6`** | Edit button bg, primary badge bg, soft fills |
| `bg` (content) | `#f8fafc` | **`#F7F9FA`** | Main content background |
| `surface` | `#ffffff` | `#ffffff` | Cards, tables, modals, header |
| `border` | `#e2e8f0` | **`#e2e5e8`** | Card / table / input borders |
| `sidebar` | `#0f172a` | **`#151719`** | Sidebar background (tech black) |
| `sidebarActive` | `rgba(5,137,217,.12)` | **`rgba(242,145,27,.14)`** | Active nav row |
| `sidebarActiveBorder` | `#0589d9` | **`#F2911B`** | Active nav left rule |
| `text` | `#0f172a` | **`#151719`** | Primary text |
| `textMuted` | `#64748b` | **`#5a5d60`** | Secondary text |
| `textSubtle` | `#94a3b8` | **`#707375`** | Steel-gray captions |
| `success` / `successBg` | `#16a34a` / `#dcfce7` | keep | Active / replied / paid |
| `warning` / `warningBg` | `#f59e0b` / `#fef3c7` | keep | Pending / new |
| `info` / `infoBg` | `#0ea5e9` / `#e0f2fe` | `#2a7fa6` / `#e0f2fe` | In-progress |
| `danger` / `dangerBg` | `#dc2626` / `#fee2e2` | keep | Delete / rejected / failed |

### Typography
- **Body / UI:** `Inter` (matches the clean dashboard feel of the reference).
- **Page titles / section headers:** `Roboto Slab` (LTL heading font) — optional accent.
- **Micro-labels / uppercase eyebrows / table headers:** `DM Mono` letter-spaced caps.

### Tokens (radius / shadow)
Reuse the reference scale exactly: `radius {sm6, md8, lg12, xl16, pill999}`,
`shadow {sm, md, lg, xl}`. Same soft, modern elevation.

---

## 2. Layout Architecture (identical to reference)

```
/admin                → AdminLayout (standalone — NO public navbar / footer)
  ├─ Sidebar (fixed, dark #151719, collapsible)
  ├─ Header  (white, 60px: hamburger · page title · search · notifications · user menu)
  └─ Content (scrollable, #F7F9FA)  → <Outlet />
```

- **Standalone shell:** the admin area does not render the public site Header/Footer.
- **Sidebar:** brand row (LTL logo mark + "Linked Technologies / Admin Panel"),
  grouped nav with expandable sections, active highlighting with orange left rule,
  footer version line.
- **Header:** hamburger (toggles drawer on mobile / collapse on desktop), dynamic
  page title from the route, global search field, notification bell, and a user
  dropdown (profile, view site, logout).

### Responsive behaviour (same breakpoints as reference)

| Range | Sidebar | Notes |
|-------|---------|-------|
| `< 768px` (mobile) | Off-canvas **overlay drawer** + backdrop; body scroll-locked when open | Header shows hamburger that opens the drawer |
| `768–1023px` (tablet) | **Collapsed** icon-only rail (68px); labels on hover tooltip | Auto-collapses |
| `≥ 1024px` (desktop) | **Full** sidebar (240px), expandable groups | Hamburger toggles collapse |
| `≥ 1536px` (wide/4K) | Content max-width container, larger gaps | Grids scale up |

- Stat grid: 4 cols → 2 cols (`<1280`) → 1 col (`<480`).
- All tables wrap in a horizontal-scroll container on small screens.
- Modals: centered on desktop, near-full-screen sheet on `<640px`.

---

## 3. Sidebar Navigation Structure

```
Dashboard
Permissions
▸ Users
    Admins
    Editors
▸ Catalog
    Services
    Products
    Product Categories
    Brands
▸ Content
    Gallery
    Events
    Testimonials
    FAQ
    Team Members
Inquiries                (tabs: All · Service · Product · General)
▸ Settings
    Branches
    Company Info
```

Icons (lucide): Dashboard `LayoutDashboard`, Permissions `Shield`, Users `Users`,
Catalog `Package`, Services `Wrench`, Products `Boxes`, Categories `Layers`,
Brands `BadgeCheck`, Content `LayoutGrid`, Gallery `Image`, Events `CalendarDays`,
Testimonials `Quote`, FAQ `HelpCircle`, Team `UserSquare`, Inquiries `MessageSquare`,
Settings `Settings`, Branches `Building2`, Company Info `Info`.

---

## 4. Module Specifications

Every list module follows the reference pattern: **page header (title + "Add New")**,
**white card table** (S/N, data columns, Action = Edit | Delete), **AdminModal** for
add/edit, and **ConfirmDialog** for delete. All data is mock React state in Phase 1.

---

### 4.1 Dashboard
**Stat cards (4-col grid):**
- Total Products
- Total Services
- New Inquiries (pending)
- Gallery Projects

**Sections:**
- **Inquiries by Area of Interest** — horizontal bar chart (Services vs Products vs General).
- **Inquiry Volume** — week / month / year bar-chart tabs.
- **Recent Inquiries** — mini table (Name · Interest · Subject · Date · Status badge).

---

### 4.2 Role Permissions
**Roles:** Super Admin · Admin · Editor
*(Super Admin column always fully checked & disabled.)*

**Permission matrix (module × role checkboxes):**

| Module | Super Admin | Admin | Editor |
|--------|:-:|:-:|:-:|
| Dashboard | ✓ | ✓ | ✓ |
| User Management | ✓ | ✓ | ✗ |
| Services | ✓ | ✓ | ✓ |
| Products / Categories / Brands | ✓ | ✓ | ✓ |
| Gallery | ✓ | ✓ | ✓ |
| Events | ✓ | ✓ | ✓ |
| Testimonials | ✓ | ✓ | ✓ |
| FAQ | ✓ | ✓ | ✓ |
| Team Members | ✓ | ✓ | ✗ |
| Inquiries | ✓ | ✓ | ✓ |
| Branches | ✓ | ✓ | ✗ |
| Company Info | ✓ | ✓ | ✗ |

---

### 4.3 Users (Admins · Editors)
**Table columns:** S/N · Name · Email · Phone · Role · Is Active? · Action

**Add / Edit modal fields:**
- Name *(text)*
- Email *(email)*
- Phone *(text)*
- Designation *(text)*
- Is Active *(checkbox)*
- Password *(password — Add only)*
- Module Permissions *(checklist — Admin/Editor scope)*

---

### 4.4 Services (CRUD)
Manages the 9 engineering services shown on the public **Services** page.

**Table columns:** S/N · Icon · Title · Order · Is Active? · Action
**Modal fields:**
- Title *(text)* — e.g. "Industrial Automation"
- Icon *(select from lucide set: Cpu, Factory, Wrench, HardHat, ClipboardCheck, BadgeCheck, GraduationCap, Code2, Globe …)*
- Short Description *(textarea)*
- Display Order *(number)*
- Is Active *(checkbox)*

---

### 4.5 Product Categories (CRUD)
**Table columns:** S/N · Name · Products Count · Is Active? · Action
**Modal fields:** Name *(text)* · Is Active *(checkbox)*
*(e.g. Automation, Power & Drives, Measurement, Distribution, Mechanical, Fluid Power, Safety, Spare Parts)*

---

### 4.6 Brands (CRUD)
World-class manufacturer brands LTL supplies.
**Table columns:** S/N · Logo · Name · Is Active? · Action
**Modal fields:** Name *(text)* · Logo *(file upload)* · Is Active *(checkbox)*

---

### 4.7 Products (CRUD)
Public **Products** page catalog items.

**Table columns:** S/N · Name · Category · Brand · Featured? · Is Active? · Action
**Modal fields:**
- Name *(text)*
- Category *(select)*
- Brand *(select)*
- Icon *(select — used by the branded product card)*
- Short Description *(textarea)*
- Spec Tags *(tag input, e.g. PLC / HMI / SCADA)*
- Image *(file upload — optional)*
- Is Featured *(checkbox)*
- Is Active *(checkbox)*

---

### 4.8 Gallery (CRUD)
Project gallery shown on the site.
**Fields:** Title · Category / Tag · Image *(file upload)*
**View:** responsive image card grid with title, category chip, delete button.

---

### 4.9 Events (CRUD)
Public **Event** page items / company news.
**Table columns:** S/N · Title · Date · Location · Is Active? · Action
**Modal fields:** Title · Date *(date picker)* · Location · Description *(textarea)* · Cover Image *(file)* · Is Active *(checkbox)*

---

### 4.10 Testimonials (CRUD)
**Table columns:** S/N · Client Name · Company · Rating · Is Active? · Action
**Modal fields:** Client Name · Company · Role · Quote *(textarea)* · Rating *(1–5 select)* · Is Active *(checkbox)*

---

### 4.11 FAQ (CRUD)
**Fields:** Question *(textarea)* · Answer *(textarea)* · Position *(number)*
**Table columns:** S/N · Question (truncated) · Answer (truncated) · Position · Action

---

### 4.12 Team Members (CRUD)
About-page team / leadership.
**Table columns:** S/N · Photo · Name · Role · Order · Action
**Modal fields:** Name · Role · Photo *(file)* · Display Order *(number)* · Is Active *(checkbox)*

---

### 4.13 Inquiries *(from the public unified Contact form)*
Single list of all contact-form submissions, with **tabs / filter** by Area of
Interest: **All · Service · Product · General**.

**Table columns:** S/N · Name · Company · Interest · Subject · Email · Phone · Date · Status · Action (View | Delete)
**View modal (read-only):** First Name, Last Name, Company/Industry, Designation,
Email, Phone, Area of Interest, Subject, Message, Submitted date, Status selector
(New → In Progress → Replied → Closed).

---

### 4.14 Branches (CRUD)
The 3 company offices on the Contact page.
**Table columns:** S/N · Name · Address · Phone · Action
**Modal fields:** Name · Address *(textarea)* · Phone · Emails *(multi)* · Map URL · Is Active *(checkbox)*
*(Corporate Office · Dhaka Factory · Gazipur Factory)*

---

### 4.15 Company Info / Site Settings
Single settings form (not a table).
**Fields:** Company name · Tagline · Primary phone(s) · Email(s) · WhatsApp number ·
Opening hours · Address · Social links (YouTube/Facebook/LinkedIn) · Logo · Favicon.

---

## 5. Reusable Component Patterns (mirror the reference)

- **`admin/components/theme.ts`** — design tokens + ready-made style objects:
  `colors`, `radius`, `shadow`, `card`, `cardPad`, `pageTitle`, `sectionTitle`,
  `btnPrimary/Secondary/Danger/Ghost`, `btnTableEdit/Delete`, `input`, `label`,
  `table/th/td/tdMuted`, `badge(tone)`, `statusTone(status)`.
- **`AdminModal`** — centered dialog, Escape-to-close, backdrop blur, size `sm|md|lg|xl`,
  sticky header + footer (Cancel / Save), mobile full-sheet.
- **`ConfirmDialog`** — small delete confirmation ("Are you sure?" · Cancel / Delete).
- **List page skeleton** — page header (title + Add New), scrollable white table card,
  zebra rows, Edit/Delete action buttons, empty-state row.
- **Badges** — pill status chips with dot; tones auto-mapped via `statusTone()`.
- **Stat card** — icon tile, big number, label, subtle trend caption.

---

## 6. File Structure (to be created under the LTL project)

```
src/app/admin/
├── AdminLayout.tsx                 ← Sidebar + Header + <Outlet/>
├── components/
│   ├── theme.ts                    ← LTL-themed design tokens
│   ├── AdminModal.tsx
│   └── ConfirmDialog.tsx
└── pages/
    ├── DashboardPage.tsx
    ├── PermissionsPage.tsx
    ├── users/
    │   ├── AdminUsersPage.tsx
    │   └── EditorUsersPage.tsx
    ├── catalog/
    │   ├── ServicesPage.tsx
    │   ├── ProductsPage.tsx
    │   ├── CategoryPage.tsx
    │   └── BrandPage.tsx
    ├── content/
    │   ├── GalleryPage.tsx
    │   ├── EventsPage.tsx
    │   ├── TestimonialsPage.tsx
    │   ├── FaqPage.tsx
    │   └── TeamPage.tsx
    ├── InquiryListPage.tsx
    └── settings/
        ├── BranchesPage.tsx
        └── CompanyInfoPage.tsx

src/styles/admin.css                ← responsive utilities (admin-main, grids, header)
```

---

## 7. Routing Plan

```
/admin                       → DashboardPage
/admin/permissions           → PermissionsPage
/admin/users/admin           → AdminUsersPage
/admin/users/editor          → EditorUsersPage
/admin/catalog/services      → ServicesPage
/admin/catalog/products      → ProductsPage
/admin/catalog/categories    → CategoryPage
/admin/catalog/brands        → BrandPage
/admin/content/gallery       → GalleryPage
/admin/content/events        → EventsPage
/admin/content/testimonials  → TestimonialsPage
/admin/content/faq           → FaqPage
/admin/content/team          → TeamPage
/admin/inquiries             → InquiryListPage
/admin/settings/branches     → BranchesPage
/admin/settings/company      → CompanyInfoPage
```

The project currently uses `BrowserRouter` with inline `<Routes>` in `App.tsx`.
The admin area will be mounted as a sibling route tree that renders `AdminLayout`
(standalone, without the public `Header`/`Footer`), e.g. `"/admin/*"`.

---

## 8. Implementation Phases

### Phase 1 — UI + Mock Data (current)
- [ ] LTL-themed `theme.ts` tokens
- [ ] Standalone `AdminLayout` (responsive sidebar + header), isolated from public site
- [ ] `AdminModal` + `ConfirmDialog`
- [ ] All modules with mock data in local React state
- [ ] Full CRUD modals (add / edit / delete confirmation)
- [ ] Role Permissions matrix
- [ ] Dashboard with stats, charts and recent inquiries
- [ ] Full responsiveness (mobile drawer / tablet rail / desktop / 4K)

### Phase 2 — REST API Integration
- [ ] Replace mock arrays with data fetching (React Query / SWR)
- [ ] `VITE_API_BASE_URL` in `.env`
- [ ] Loading skeletons + error toasts
- [ ] File-upload endpoints (Gallery, Brands, Products, Events, Team, Logo)
- [ ] Pagination + server-side search/filter for large lists (Products, Inquiries)

### Phase 3 — Auth & Role Guards
- [ ] `/admin/login` page
- [ ] JWT-protected routes; redirect when unauthenticated
- [ ] Role-based UI (hide/show actions per permissions)
- [ ] Session timeout handling

---

## 9. Notes / Decisions

- **No "Customer" role** (unlike the reference) — LTL is a B2B inquiry site with no
  end-customer accounts. Roles are Super Admin · Admin · Editor.
- **Orders/Payments modules are omitted** — LTL has no e-commerce checkout; the
  equivalent business object is the **Inquiry** (service / product / general).
- **Products are catalog/category items**, not stock units, so there is no complex
  per-unit spec form like the reference "Car" module (kept intentionally simpler).
- Everything else (layout, responsiveness, tables, modals, badges, tokens) is a
  faithful re-skin of the Dolphin Japan admin panel in LTL colors.
