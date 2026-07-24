import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";
// ── Admin panel ──────────────────────────────────────────
import { AdminLayout } from "./admin/AdminLayout";
import { DashboardPage as AdminDashboardPage } from "./admin/pages/DashboardPage";
import { PermissionsPage as AdminPermissionsPage } from "./admin/pages/PermissionsPage";
import { AdminUsersPage } from "./admin/pages/users/AdminUsersPage";
import { EditorUsersPage } from "./admin/pages/users/EditorUsersPage";
import { ServicesPage as AdminServicesPage } from "./admin/pages/catalog/ServicesPage";
import { ProductsPage as AdminProductsPage } from "./admin/pages/catalog/ProductsPage";
import { CategoryPage as AdminCategoryPage } from "./admin/pages/catalog/CategoryPage";
import { BrandPage as AdminBrandPage } from "./admin/pages/catalog/BrandPage";
import { GalleryPage as AdminGalleryPage } from "./admin/pages/content/GalleryPage";
import { EventsPage as AdminEventsPage } from "./admin/pages/content/EventsPage";
import { TestimonialsPage as AdminTestimonialsPage } from "./admin/pages/content/TestimonialsPage";
import { FaqPage as AdminFaqPage } from "./admin/pages/content/FaqPage";
import { TeamPage as AdminTeamPage } from "./admin/pages/content/TeamPage";
import { BranchesPage as AdminBranchesPage } from "./admin/pages/settings/BranchesPage";
import { CompanyInfoPage as AdminCompanyInfoPage } from "./admin/pages/settings/CompanyInfoPage";
import {
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Youtube,
  Wrench,
  Cpu,
  Package,
  CheckCircle2,
  Shield,
  Headphones,
  Users,
  CalendarCheck,
  BadgeCheck,
  Handshake,
  Quote,
  ArrowUpRight,
  Building2,
  Award,
  TrendingUp,
  Factory,
  Cog,
  Gauge,
  Layers,
  Home as HomeIcon,
  HardHat,
  ClipboardCheck,
  GraduationCap,
  Code2,
  Globe,
  Building,
  Zap,
  Boxes,
  Activity,
  Truck,
} from "lucide-react";

/* ─── constants ─────────────────────────────────── */
const WHATSAPP_URL = "https://wa.me/8801920200477";

const NAV_LINKS: {
  label: string;
  to?: string;
  section?: string;
}[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Gallery", to: "/gallery" },
  { label: "Event", to: "/event" },
  { label: "Contact", to: "/contact" },
];

const CAPABILITIES = [
  {
    Icon: Wrench,
    title: "Industrial Projects",
    subtitle: "Civil · MEP · EPC",
    desc: "LTL features a highly skilled engineering team equipped with modern tools and machinery, capable of delivering end-to-end industrial projects. We offer comprehensive solutions across Civil Engineering, MEP, and EPC services.",
    href: "#services",
  },
  {
    Icon: Cpu,
    title: "Machine Modification",
    subtitle: "Mechanical · Automation · Firmware",
    desc: "We deliver advanced technological solutions for industrial challenges, transforming them into Mechanical, Automation, and Firmware solutions. Our expert team leverages modern tools and techniques to optimize performance, efficiency, and productivity for every machine.",
    href: "#services",
  },
  {
    Icon: Package,
    title: "Hardware Supply",
    subtitle: "High-Quality Components",
    desc: "We are committed to high-quality products and reliable after-sales support. Our vision is to deliver efficient, durable, and customized solutions with the highest level of customer satisfaction for every industrial client.",
    href: "#products",
  },
];

const TRUST_METRICS = [
  { Icon: CheckCircle2, num: 10, suffix: "+", label: "Years of Experience" },
  { Icon: Headphones, text: "24/7", label: "Technical Support" },
  { Icon: Users, text: "Expert", label: "Engineering Team" },
  { Icon: Shield, num: 100, suffix: "%", label: "Project Commitment" },
];

const VALUE_PILLARS = [
  {
    Icon: Headphones,
    title: "Always Open For You",
    desc: "Our expert service teams are available 24/7 to provide technical support. We are dedicated to delivering exceptional after-sales service, as we believe it is key to building long-term relationships. Your satisfaction is our priority, and we strive to exceed your expectations at every opportunity.",
  },
  {
    Icon: Handshake,
    title: "Unbeatable Prices",
    desc: "Our main vision is to develop strong relationships with our clients, prioritizing trust over financial gain. We believe good relationships are essential for long-term business success. Give us a chance to demonstrate our professionalism.",
  },
  {
    Icon: BadgeCheck,
    title: "Professionally Qualified",
    desc: "LINKED TECHNOLOGIES LTD boasts self-supported expert technical teams equipped with modern tools and technology. Our innovative, energetic, and dedicated teams are committed to exceeding customer satisfaction. We continuously strive to enhance our services to meet evolving needs.",
  },
];

const SERVICE_LIST = [
  "Industrial Automation",
  "Civil and Construction Works",
  "Industrial Project Handling",
  "Importer and Supplier of Industrial Spares",
  "Industrial Machine Manufacturer",
  "Modification and Maintenance",
];

const GALLERY_ITEMS = [
  {
    title: "PLC & SCADA Automation",
    tag: "Automation",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Civil & Structural Works",
    tag: "Construction",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Machine Retrofitting",
    tag: "Modification",
    img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "MEP Installations",
    tag: "Engineering",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Control Panel Assembly",
    tag: "Electrical",
    img: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Preventive Maintenance",
    tag: "Service",
    img: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800&h=800&fit=crop&auto=format",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "LTL delivered our plant automation upgrade ahead of schedule. Their engineering team's attention to detail and round-the-clock support kept our production line running without a single unplanned stoppage.",
    name: "Operations Director",
    company: "Textile Manufacturing Group",
  },
  {
    quote:
      "From civil works to PLC integration, they handled our EPC project end to end. Genuine components, transparent pricing, and a team that genuinely understands industrial reliability.",
    name: "Project Manager",
    company: "Food & Beverage Processing",
  },
  {
    quote:
      "The retrofit of our legacy machinery extended its life by years. Professional, responsive, and technically excellent — LTL is now our first call for any automation challenge.",
    name: "Plant Head",
    company: "Packaging Industries Ltd.",
  },
];

/* ─── About page data ────────────────────────────── */
const ABOUT_VALUES = [
  {
    Icon: Handshake,
    title: "Our Quality Commitment",
    desc: "Our main vision is to develop strong, lasting relationships with our clients — prioritizing trust over financial gain. We believe good relationships are the foundation of long-term business success and deliver quality without compromise.",
  },
  {
    Icon: BadgeCheck,
    title: "Professional Standards",
    desc: "LINKED TECHNOLOGIES LTD is powered by self-supported expert technical teams equipped with modern tools and technology. Our innovative, energetic and dedicated engineers are committed to exceeding customer satisfaction.",
  },
  {
    Icon: TrendingUp,
    title: "Value Creation",
    desc: "We create value through prompt service and convenient products. Quality service is a core requirement we continuously enhance — assured through the robust quality systems built into our organization.",
  },
];

const INFRASTRUCTURE = [
  {
    Icon: Factory,
    title: "Modern Machinery",
    desc: "A well-equipped engineering setup with modern tools and machinery capable of executing end-to-end industrial projects.",
  },
  {
    Icon: Cog,
    title: "Advanced Techniques",
    desc: "Mechanical, automation and firmware expertise applied with technologically advanced engineering methods.",
  },
  {
    Icon: Layers,
    title: "World-Class Components",
    desc: "Industrial equipment sourced from world-class manufacturers — selected for high quality at a justified price.",
  },
  {
    Icon: Gauge,
    title: "Quality Systems",
    desc: "Continuous quality enhancement backed by rigorous internal quality systems and dependable after-sales support.",
  },
];

const ABOUT_STATS = [
  { num: 10, suffix: "+", label: "Years of Experience" },
  { num: 100, suffix: "%", label: "Project Commitment" },
  { num: 24, suffix: "/7", label: "Technical Support" },
  { num: 50, suffix: "+", label: "Skilled Engineers" },
];

/* Full engineering service catalogue (mirrors ltl-bd.com/services). */
const SERVICES = [
  {
    Icon: Cpu,
    title: "Industrial Automation",
    desc: "Increasing production has driven the demand for advanced technology. To support this, LTL has established a robust automation platform in Bangladesh for our growing industry. We work with world-renowned brands as per customer demand. Our expert automation engineering team excels in integrating human and machine interfaces.",
  },
  {
    Icon: Factory,
    title: "Machine Manufacturing",
    desc: "We are manufacturing various industrial tools and machineries as per customer demand. We have a solid reputation in this field with a well-decorated factory that includes separate electrical, mechanical workshops, and an automation lab. If you are considering importing any foreign machine, consult with us first. We might offer you a better solution.",
  },
  {
    Icon: Wrench,
    title: "Erection & Maintenance",
    desc: "For new industrial projects, erection, and maintenance, LINKED TECHNOLOGIES LTD is your right choice for complete solutions in one place. We have highly trained technicians, engineers, and modern tools for handling various erection works and industrial maintenance.",
  },
  {
    Icon: HardHat,
    title: "Civil Construction",
    desc: "LINKED TECHNOLOGIES LTD. has a dedicated department for handling civil construction and steel building projects. We work on multi-storied buildings, roads, and factories, collaborating with SHAH CEMENT and HOLCIM CEMENT for ready concrete mixtures. We ensure standard, safe, and long-lasting infrastructure for your growing industry.",
  },
  {
    Icon: ClipboardCheck,
    title: "Survey & Consultancy",
    desc: "We provide external audit facilitation and certification for your industry's processes, systems, and critical equipment. Authorized by the Ministry of Power, Energy & Mineral Resources (MPEMR) Bangladesh, we adhere to the latest international standards and use modern technologies.",
  },
  {
    Icon: BadgeCheck,
    title: "Inspection & Certification",
    desc: "We provide inspection, testing and certification of the most widely used measuring instruments and critical equipment in the industry. We follow the instructions of Equipments manufacturer, international industrial standards and the Law of Bangladesh Government. We are an institution approved by the Ministry of Industry of Bangladesh Government and we have many skills and reputation in all these activities.",
  },
  {
    Icon: GraduationCap,
    title: "Technological Training",
    desc: "For the advancement of Bangladesh's manpower and economic development, LINKED TECHNOLOGIES LTD has launched significant industrial training programs. We offer modern labs, training tools, and dedicated skilled trainers to enhance the skills of our young generation.",
  },
  {
    Icon: Code2,
    title: "Software Development",
    desc: "For more efficient interfacing between Man and Machine the softwares is very much essentials. Keeping this in mind, day by day we are improving our computer Lab by modern equipments and technologies. Depending on the needs of the time, we offer any type of applications and software to our customers. Our innovative software developers are highly skilled on different platforms as Android, IOS, Windows and Linux.",
  },
  {
    Icon: Globe,
    title: "Foreign Product Importer",
    desc: "From abroad we import all types of products that are not available in Bangladesh. According to the demand of our valued customer, we import all types of industrial and domestic goods at the earliest time by our multiple gateways. We have approved gateways on airways, waterways and land routes with expert management system. For more details please feel free to contact with our 24 hrs help center.",
  },
];

/* Company branch directory for the Contact page. */
const BRANCHES = [
  {
    Icon: Building2,
    name: "Corporate Office",
    address: "27 Taherbag lane, Wary, Nobabpur, Dhaka-1100.",
    phone: "+8801993781118",
    emails: ["info@ltl-bd.com", "help.ltlbd@gmail.com"],
  },
  {
    Icon: Factory,
    name: "Dhaka Factory",
    address: "26 Taherbag lane, Wary, Nobabpur, Dhaka-1100.",
    phone: "+8801993781118",
    emails: ["info@ltl-bd.com", "help.ltlbd@gmail.com"],
  },
  {
    Icon: Building,
    name: "Gazipur Factory",
    address: "138/A Autchpara, Tongi, Gazipur-1710.",
    phone: "+8801993781118",
    emails: ["info@ltl-bd.com", "help.ltlbd@gmail.com"],
  },
];

/* Industrial product catalogue supplied & imported by LTL. */
const PRODUCTS = [
  {
    Icon: Cpu,
    name: "PLC & Automation Controllers",
    category: "Automation",
    desc: "Programmable logic controllers, HMIs and SCADA hardware from world-renowned brands for reliable machine and process control.",
    tags: ["PLC", "HMI", "SCADA"],
  },
  {
    Icon: Gauge,
    name: "VFDs & Motor Drives",
    category: "Power & Drives",
    desc: "Variable frequency drives and soft starters engineered for precise speed control, energy savings and long service life.",
    tags: ["VFD", "Soft Starter", "Inverter"],
  },
  {
    Icon: Activity,
    name: "Sensors & Instrumentation",
    category: "Measurement",
    desc: "Proximity, temperature, pressure and flow sensors with accurate measuring instruments for demanding industrial environments.",
    tags: ["Proximity", "Pressure", "Flow"],
  },
  {
    Icon: Zap,
    name: "Electrical Panels & Switchgear",
    category: "Distribution",
    desc: "Custom control panels, distribution boards and motor control centres built to national and international safety standards.",
    tags: ["Control Panel", "MCC", "Switchgear"],
  },
  {
    Icon: Cog,
    name: "Industrial Motors & Gearboxes",
    category: "Mechanical",
    desc: "Energy-efficient electric motors and precision gear reducers matched to your load, duty cycle and performance targets.",
    tags: ["Motors", "Gearbox", "Couplings"],
  },
  {
    Icon: Wrench,
    name: "Pneumatic & Hydraulic Systems",
    category: "Fluid Power",
    desc: "Valves, cylinders, compressors and complete fluid-power assemblies for automated motion and material handling.",
    tags: ["Valves", "Cylinders", "Compressors"],
  },
  {
    Icon: HardHat,
    name: "Safety & Protection Equipment",
    category: "Safety",
    desc: "Safety relays, light curtains, emergency systems and personal protective equipment to keep your workforce and plant secure.",
    tags: ["Safety Relay", "Light Curtain", "PPE"],
  },
  {
    Icon: Boxes,
    name: "OEM Spares & Components",
    category: "Spare Parts",
    desc: "Genuine OEM spare parts, bearings and consumables imported through our approved air, sea and land gateways.",
    tags: ["Bearings", "Genuine Parts", "Consumables"],
  },
];

/* ─── Hooks ──────────────────────────────────────── */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0.08) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Animated count-up for numeric metrics; starts when scrolled into view. */
function useCountUp(target: number, suffix = "", duration = 1600) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(`0${suffix}`);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setDisplay(`${target}${suffix}`);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${Math.round(eased * target)}${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix, duration]);
  return { ref, display };
}

/** Tracks which section is currently in view for scroll-spy nav. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

/* ─── Reveal wrapper ─────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const ref = useReveal<HTMLElement>();
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}


/* ─── Header ─────────────────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onLanding = location.pathname === "/";
  const sectionIds = useMemo(
    () =>
      onLanding ? ["home", "services", "about", "gallery"] : [],
    [onLanding],
  );
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNav = useCallback(
    (
      e: React.MouseEvent,
      item: { to?: string; section?: string },
    ) => {
      // Allow open-in-new-tab / modified clicks to behave natively
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      setOpen(false);
      if (item.to) {
        navigate(item.to);
        window.scrollTo({ top: 0, behavior: "auto" });
      } else if (item.section) {
        if (onLanding) {
          scrollToSection(item.section);
        } else {
          navigate("/");
          // Wait for the landing route to mount before scrolling
          setTimeout(() => scrollToSection(item.section!), 80);
        }
      }
    },
    [navigate, onLanding, scrollToSection],
  );

  const hrefFor = (item: { to?: string; section?: string }) =>
    item.to ?? `/#${item.section}`;

  const isActive = (item: { to?: string; section?: string }) => {
    if (item.to && item.to !== "/") return location.pathname === item.to;
    if (item.to === "/") return onLanding && activeSection === "home";
    if (item.section) return onLanding && activeSection === item.section;
    return false;
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#151719]/96 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-[#151719]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNav(e, { to: "/" })}
            className="flex items-center gap-3 rounded-sm"
            aria-label="Linked Technologies Ltd — home"
          >
            <img
              src="/images/logo.png"
              alt=""
              className="w-10 h-10 object-contain flex-shrink-0"
            />
            <p
              className="text-white text-[15px] sm:text-base font-medium leading-none tracking-[0.045em] uppercase whitespace-nowrap"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Linked Technologies Ltd
            </p>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Primary"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={hrefFor(l)}
                onClick={(e) => handleNav(e, l)}
                aria-current={isActive(l) ? "page" : undefined}
                className={`relative text-sm px-3 py-2 rounded-sm transition-colors duration-150 tracking-wide after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-[#F2911B] after:transition-transform after:duration-200 ${
                  isActive(l)
                    ? "text-[#F2911B] after:scale-x-100"
                    : "text-[#d0d2d4] hover:text-[#F2911B] after:scale-x-0"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#F2911B] hover:bg-[#d97d10] text-white text-sm font-semibold px-5 py-2.5 rounded-sm transition-colors duration-150"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <MessageCircle size={15} aria-hidden="true" />
              Quick WhatsApp Inquiry
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2 -mr-2 rounded-sm"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu (animated) */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden bg-[#151719] transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[560px] opacity-100 border-t border-white/10" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2">
          <nav className="flex flex-col gap-0 mb-4" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={hrefFor(l)}
                onClick={(e) => handleNav(e, l)}
                aria-current={isActive(l) ? "page" : undefined}
                className={`text-base py-3.5 border-b border-white/8 rounded-sm transition-colors ${
                  isActive(l)
                    ? "text-[#F2911B]"
                    : "text-[#d0d2d4] hover:text-[#F2911B]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#F2911B] text-white text-base font-semibold py-3.5 w-full rounded-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Quick WhatsApp Inquiry
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#151719]"
    >
      {/* Background image — right portion */}
      <div className="absolute inset-0 lg:left-[36%] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1400&h=900&fit=crop&auto=format"
          alt="Industrial automation factory with orange robotic machinery"
          className="w-full h-full object-cover opacity-55 animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151719] via-[#151719]/85 to-transparent" />
        <div className="absolute inset-0 bg-[#151719]/25" />
      </div>

      {/* Left orange rule */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F2911B] hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="w-full lg:w-7/12">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#F2911B]" />
            <span
              className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Industrial Engineering &amp; Automation
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] mb-6 tracking-tight max-w-3xl"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Your Industrial Engineering &amp; <span className="text-[#F2911B]">Automation</span> Experts
          </h1>

          {/* Value prop */}
          <p
            className="text-[#c2c5c8] text-lg leading-relaxed mb-5 max-w-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Over{" "}
            <span className="text-white font-semibold">10 years</span> delivering
            end-to-end industrial project execution, machine retrofitting, and
            premium hardware supply across Bangladesh and the region.
          </p>

          {/* Key points */}
          <ul className="mb-10 space-y-2.5">
            {[
              "Civil, MEP & EPC project management",
              "PLC/SCADA automation & machine retrofits",
              "Genuine OEM spares & components",
            ].map((pt) => (
              <li
                key={pt}
                className="flex items-center gap-2.5 text-[15px] text-[#c2c5c8]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <ChevronRight size={16} className="text-[#F2911B] flex-shrink-0" aria-hidden="true" />
                {pt}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 bg-[#F2911B] hover:bg-[#d97d10] text-white font-semibold px-7 py-3.5 rounded-sm transition-colors duration-150 text-sm tracking-wide shadow-lg shadow-[#F2911B]/20"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Explore Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/8801920200477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-[#F2911B] hover:bg-[#F2911B]/10 text-white hover:text-[#F2911B] font-semibold px-7 py-3.5 rounded-sm transition-colors duration-150 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Chat with an Engineer
            </a>
          </div>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 text-[#8b8e91] hover:text-[#F2911B] transition-colors"
      >
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Scroll
        </span>
        <ChevronDown size={18} className="animate-bounce-slow" aria-hidden="true" />
      </a>

      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#151719] to-transparent pointer-events-none" />
    </section>
  );
}

/* ─── Trust Ribbon ───────────────────────────────── */
function Metric({
  num,
  suffix = "",
  text,
  className = "text-white",
  sizeClass = "text-2xl",
}: {
  num?: number;
  suffix?: string;
  text?: string;
  className?: string;
  sizeClass?: string;
}) {
  const { ref, display } = useCountUp(num ?? 0, suffix);
  return (
    <p
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={`${className} ${sizeClass} font-bold leading-none mb-1`}
      style={{ fontFamily: "'Roboto Slab', serif" }}
    >
      {typeof num === "number" ? display : text}
    </p>
  );
}

function TrustRibbon() {
  return (
    <section className="bg-[#5f6265]" aria-label="Key metrics">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/15">
          {TRUST_METRICS.map(({ Icon, num, suffix, text, label }) => (
            <div key={label} className="flex items-center gap-4 py-6 px-6 lg:px-8">
              <Icon size={26} className="text-[#F2911B] flex-shrink-0" aria-hidden="true" />
              <div>
                <Metric num={num} suffix={suffix} text={text} />
                <p
                  className="text-white/90 text-xs tracking-wide uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Core Capabilities ──────────────────────────── */
function Capabilities() {
  return (
    <section id="services" className="bg-[#F7F9FA] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <Reveal className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F2911B]" />
            <span
              className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              What We Do
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight max-w-lg"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Core Capabilities
          </h2>
          <p
            className="text-[#5a5d60] mt-3 max-w-xl text-base leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Three integrated service pillars — from project inception to
            component-level support — engineered for industrial reliability.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#e2e5e8] rounded-sm overflow-hidden">
          {CAPABILITIES.map(({ Icon, title, subtitle, desc, href }, i) => (
            <Reveal
              key={title}
              delay={i * 110}
              className="card-hover-dark bg-white p-8 group flex flex-col"
            >
              <div className="mb-6">
                <div className="card-hover-dark-icon w-12 h-12 rounded-sm border border-[#F2911B]/30 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#F2911B]" aria-hidden="true" />
                </div>
                <p
                  className="card-hover-dark-copy text-[10px] tracking-[0.18em] uppercase text-[#5a5d60] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {subtitle}
                </p>
                <h3
                  className="card-hover-dark-title text-lg font-bold text-[#151719]"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {title}
                </h3>
              </div>
              <p
                className="card-hover-dark-copy text-sm text-[#5a5d60] leading-relaxed flex-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {desc}
              </p>
              <a
                href={href}
                className="inline-flex items-center gap-1.5 text-[#F2911B] text-sm font-semibold mt-6 rounded-sm group/link"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Learn More
                <ArrowRight
                  size={14}
                  className="translate-x-0 group-hover/link:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Welcome / Intro ────────────────────────────── */
function Welcome() {
  const navigate = useNavigate();
  return (
    <section id="about" className="bg-white py-24 border-t border-[#e2e5e8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading + text */}
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Who We Are
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight mb-7"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Welcome to{" "}
              <span className="text-[#F2911B]">Linked Technologies</span> Ltd
            </h2>
            <p
              className="text-[#5a5d60] leading-relaxed mb-5 text-base"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Linked Technologies Limited is one of the most reputed organizations
              in Bangladesh for different kinds of industrial automation works,
              electro-mechanical &amp; electrical engineering works, plant erection
              &amp; maintenance, man-machine customization, etc. It has
              self-supported expertise technical teams with modern tools &amp;
              technology.
            </p>
            <p
              className="text-[#5a5d60] leading-relaxed mb-8 text-base"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We use industrial equipment from some world-class manufacturers in
              Bangladesh — selected for their high-quality products at a justified
              price. We believe that high-quality products &amp; services are the
              most important factors for developing our industrial sector.
            </p>
            <p
              className="text-[#5a5d60] leading-relaxed mb-10 text-base"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              The company enjoys a good reputation for quality product sales and
              after-sales services, innovation, productivity and customer support.
              LTL is looking forward to providing efficient customer service,
              better technology and continuous support to the local market.
            </p>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "auto" });
              }}
              className="inline-flex items-center gap-2 bg-[#151719] hover:bg-[#F2911B] text-white font-semibold px-7 py-3.5 rounded-sm text-sm tracking-wide transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <CalendarCheck size={16} aria-hidden="true" />
              Book Your Visit
            </a>
          </Reveal>

          {/* Right: image + stat strip */}
          <Reveal delay={120} className="relative">
            <div className="absolute -right-4 -top-4 w-2/3 h-2/3 border border-[#F2911B]/15 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1730584474338-aa8d9d186bf7?w=800&h=580&fit=crop&auto=format"
              alt="Engineer working on industrial machinery on the factory floor"
              loading="lazy"
              className="w-full h-[380px] object-cover relative z-10 rounded-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2911B] z-10" />

            {/* Stat card */}
            <div className="absolute -bottom-6 -left-5 bg-[#F2911B] p-5 rounded-sm shadow-xl z-20">
              <p
                className="text-white text-3xl font-bold leading-none"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                10+
              </p>
              <p
                className="text-white/90 text-xs tracking-wide mt-1 uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Years of Excellence
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Value Propositions ─────────────────────────── */
function ValueProps() {
  return (
    <section className="bg-[#F7F9FA] py-24 border-t border-[#e2e5e8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F2911B]" />
            <span
              className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Why Choose LTL
            </span>
            <div className="h-px w-8 bg-[#F2911B]" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight mb-4"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Offering the Best Solution
            <br />
            <span className="text-[#F2911B]">for Your Industry</span>
          </h2>
          <p
            className="text-[#5a5d60] text-base leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We have ensured business excellence for a long time — trusted to
            provide a full range of engineering and related services for some of
            the largest and most complex technology, upstream, government and
            non-government projects. Our streamlined engineering process
            consistently delivers results in the most difficult and challenging
            situations using technologically advanced methods.
          </p>
        </Reveal>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PILLARS.map(({ Icon, title, desc }, i) => (
            <Reveal
              key={title}
              delay={i * 110}
              className="card-hover-light border border-[#e2e5e8] bg-white p-8 rounded-sm group"
            >
              <div className="card-hover-light-icon w-12 h-12 rounded-sm bg-[#F2911B]/10 flex items-center justify-center mb-5">
                <Icon size={22} className="text-[#F2911B]" aria-hidden="true" />
              </div>
              <h3
                className="text-lg font-bold text-[#151719] mb-3"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm text-[#5a5d60] leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience & Services List ─────────────────── */
function ExperienceBlock() {
  return (
    <section className="bg-white py-24 border-t border-[#e2e5e8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: headline + statement */}
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Our Experience
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight mb-6"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Over{" "}
              <span className="text-[#F2911B]">10 Years</span>
              <br />
              of Experience
            </h2>
            <p
              className="text-[#5a5d60] leading-relaxed mb-6 text-base"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We are committed to creating value for customers through our prompt
              services and convenient products. We consider quality service as a
              core requirement that needs continuous enhancement — assured through
              the quality systems we have built into our organization.
            </p>
            <a
              href="https://wa.me/8801920200477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F2911B] hover:bg-[#d97d10] text-white font-semibold px-7 py-3.5 rounded-sm text-sm tracking-wide transition-colors duration-150"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Inquire Now
            </a>
          </Reveal>

          {/* Right: service checklist */}
          <Reveal delay={120} className="bg-[#F7F9FA] p-8 rounded-sm border border-[#e2e5e8]">
            <p
              className="text-[#F2911B] text-xs tracking-[0.2em] uppercase mb-5 font-semibold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Our Services
            </p>
            <ul className="space-y-0 divide-y divide-[#e2e5e8]">
              {SERVICE_LIST.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-4 py-4 group"
                >
                  <span
                    className="text-[#F2911B] text-xs font-bold w-6 flex-shrink-0"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px w-5 bg-[#F2911B]/40 flex-shrink-0" />
                  <span
                    className="text-[#151719] group-hover:text-[#F2911B] text-sm font-medium transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-[#F2911B] ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Marquee ───────────────────────────── */
function ServicesStrip() {
  const services = [
    "Industrial Automation",
    "Civil & Construction",
    "MEP Engineering",
    "EPC Contracts",
    "PLC/SCADA Integration",
    "Machine Modification",
    "Servo Drive Commissioning",
    "Industrial Spares Supply",
    "Preventive Maintenance",
    "Firmware Solutions",
  ];

  return (
    <div className="bg-[#F2911B] py-3.5 overflow-hidden group" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
        {[...services, ...services].map((s, i) => (
          <span
            key={i}
            className="text-white text-xs font-semibold tracking-[0.15em] uppercase mx-8 flex items-center gap-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {s}
            <span className="text-white/40 text-base">·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation: none; } }
      `}</style>
    </div>
  );
}

/* ─── Gallery / Portfolio ────────────────────────── */
function Gallery() {
  return (
    <section id="gallery" className="bg-[#151719] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F2911B]" />
            <span
              className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Our Work
            </span>
            <div className="h-px w-8 bg-[#F2911B]" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Projects &amp; <span className="text-[#F2911B]">Capabilities</span>
          </h2>
          <p
            className="text-[#b6b9bc] text-base leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A glimpse of the industrial projects, installations and engineering
            work delivered by our teams across Bangladesh.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_ITEMS.map(({ title, tag, img }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 100}
              className="group relative aspect-square overflow-hidden rounded-sm bg-[#1e2124]"
            >
              <img
                src={img}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151719] via-[#151719]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-1 group-hover:translate-y-0 transition-transform">
                <span
                  className="inline-block text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-[#F2911B] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {tag}
                </span>
                <h3
                  className="text-white text-sm md:text-base font-semibold leading-snug"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {title}
                </h3>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-[#F2911B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={16} className="text-white" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────── */
function Testimonials() {
  return (
    <section className="bg-white py-24 border-t border-[#e2e5e8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F2911B]" />
            <span
              className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Client Voices
            </span>
            <div className="h-px w-8 bg-[#F2911B]" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Trusted by Industry <span className="text-[#F2911B]">Leaders</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, name, company }, i) => (
            <Reveal
              key={name + company}
              delay={i * 110}
              className="card-hover-light relative bg-[#F7F9FA] border border-[#e2e5e8] rounded-sm p-8 flex flex-col"
            >
              <Quote
                size={32}
                className="text-[#F2911B]/25 mb-4"
                aria-hidden="true"
              />
              <p
                className="text-[#3f4245] text-[15px] leading-relaxed flex-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {quote}
              </p>
              <div className="mt-6 pt-5 border-t border-[#e2e5e8] flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#F2911B]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 size={18} className="text-[#F2911B]" aria-hidden="true" />
                </div>
                <div>
                  <p
                    className="text-[#151719] text-sm font-bold leading-tight"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    {name}
                  </p>
                  <p
                    className="text-[#5a5d60] text-xs"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {company}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────── */
function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFooterNav = (
    e: React.MouseEvent,
    item: { to?: string; section?: string },
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (item.to) {
      navigate(item.to);
      window.scrollTo({ top: 0, behavior: "auto" });
    } else if (item.section) {
      const scroll = () =>
        document
          .getElementById(item.section!)
          ?.scrollIntoView({ behavior: "smooth" });
      if (location.pathname === "/") scroll();
      else {
        navigate("/");
        setTimeout(scroll, 80);
      }
    }
  };

  return (
    <footer className="bg-[#151719] border-t-4 border-[#F2911B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/logo.png"
                alt=""
                className="w-10 h-10 object-contain flex-shrink-0"
              />
              <p
                className="text-white text-base font-medium leading-none tracking-[0.045em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Linked Technologies Ltd
              </p>
            </div>
            <p
              className="text-[#9ca1a4] text-sm leading-relaxed mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Industrial engineering and automation specialists delivering
              excellence across Bangladesh since 2014. Quality products &amp;
              services drive our nation's industrial growth.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/15 rounded-sm hover:border-[#F2911B] flex items-center justify-center text-[#9ca1a4] hover:text-[#F2911B] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://wa.me/8801920200477"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/15 rounded-sm hover:border-[#F2911B] flex items-center justify-center text-[#9ca1a4] hover:text-[#F2911B] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white text-xs tracking-[0.18em] uppercase mb-5 font-semibold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.to ?? `/#${l.section}`}
                    onClick={(e) => handleFooterNav(e, l)}
                    className="text-[#9ca1a4] hover:text-[#F2911B] text-sm transition-colors flex items-center gap-1.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <ChevronRight size={12} className="flex-shrink-0" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-white text-xs tracking-[0.18em] uppercase mb-5 font-semibold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex gap-3">
                <MapPin size={15} className="text-[#F2911B] flex-shrink-0 mt-0.5" />
                <span
                  className="text-[#9ca1a4] text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  27 Taherbag Lane, Wary,
                  <br />
                  Nobabpur, Dhaka-1100
                  <br />
                  Bangladesh
                </span>
              </li>
              {/* Phone lines */}
              <li className="flex gap-3 items-start">
                <Phone size={15} className="text-[#F2911B] flex-shrink-0 mt-0.5" />
                <div style={{ fontFamily: "'Inter', sans-serif" }}>
                  {[
                    "+880 1920-200477",
                    "+880 1534-529763",
                    "+880 1711-958082",
                    "+880 1914-295640",
                  ].map((num) => (
                    <a
                      key={num}
                      href={`tel:${num.replace(/\s|-/g, "")}`}
                      className="text-[#9ca1a4] hover:text-[#F2911B] text-sm block transition-colors leading-6"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </li>
              {/* Emails */}
              <li className="flex gap-3 items-start">
                <Mail size={15} className="text-[#F2911B] flex-shrink-0 mt-0.5" />
                <div style={{ fontFamily: "'Inter', sans-serif" }}>
                  <a
                    href="mailto:info@ltl-bd.com"
                    className="text-[#9ca1a4] hover:text-[#F2911B] text-sm block transition-colors leading-6"
                  >
                    info@ltl-bd.com
                  </a>
                  <a
                    href="mailto:help.ltlbd@gmail.com"
                    className="text-[#9ca1a4] hover:text-[#F2911B] text-sm block transition-colors leading-6"
                  >
                    help.ltlbd@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours + Emergency */}
          <div>
            <h4
              className="text-white text-xs tracking-[0.18em] uppercase mb-5 font-semibold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Opening Hours
            </h4>
            <div className="flex gap-3 mb-6">
              <Clock size={15} className="text-[#F2911B] flex-shrink-0 mt-0.5" />
              <div style={{ fontFamily: "'Inter', sans-serif" }}>
                <p className="text-white text-sm font-medium mb-1">
                  Saturday — Thursday
                </p>
                <p className="text-[#9ca1a4] text-sm">09:00 AM – 06:00 PM</p>
                <p className="text-[#8b8e91] text-xs mt-1">Friday: Closed</p>
              </div>
            </div>

            {/* Emergency CTA */}
            <div className="border border-[#F2911B]/25 bg-[#F2911B]/6 p-4">
              <p
                className="text-[#F2911B] text-xs font-semibold mb-1 uppercase tracking-wide"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                24/7 Emergency Support
              </p>
              <p
                className="text-[#9ca1a4] text-xs leading-relaxed mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Critical plant downtime? Our on-call engineers are available
                around the clock via WhatsApp.
              </p>
              <a
                href="https://wa.me/8801920200477"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#F2911B] text-xs font-semibold hover:underline"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <MessageCircle size={12} />
                Message Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[#9ca1a4] text-xs text-center sm:text-left"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Copyright © 2026 — All Rights Reserved —{" "}
            <span className="text-white font-medium">LINKED TECHNOLOGIES LTD</span>
          </p>
          <div
            className="flex items-center gap-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <a
              href="#"
              className="text-[#9ca1a4] hover:text-[#F2911B] text-xs transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#9ca1a4] hover:text-[#F2911B] text-xs transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Scroll progress bar ────────────────────────── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-[#F2911B]"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

/* ─── Floating WhatsApp CTA ──────────────────────── */
function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="https://wa.me/8801920200477"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-xl shadow-black/25 transition-all duration-300 hover:scale-110 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <MessageCircle size={26} className="text-white" aria-hidden="true" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping-slow" />
    </a>
  );
}

/* ─── About: team photo with graceful fallback ──── */
const TEAM_FALLBACK =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=700&fit=crop&auto=format";

function TeamPhoto({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState("/images/team-photo.jpg");
  return (
    <img
      src={src}
      onError={() => src !== TEAM_FALLBACK && setSrc(TEAM_FALLBACK)}
      alt="The Linked Technologies Ltd engineering team in front of the company banner"
      loading="lazy"
      className={className}
    />
  );
}

/* ─── About Page ─────────────────────────────────── */
function AboutPage() {
  const navigate = useNavigate();
  return (
    <main>
      {/* ── Page Banner ─────────────────────────── */}
      <section className="relative bg-[#151719] overflow-hidden pt-[110px] pb-20 lg:pt-32 lg:pb-24">
        {/* team imagery is deliberately subdued so the hero remains editorial and legible */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: `url("${TEAM_FALLBACK}")` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#151719]/90 via-[#151719]/76 to-[#151719]/55 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#151719]/55 via-transparent to-[#151719]/15 pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F2911B] hidden lg:block" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol
              className="flex items-center gap-2 text-xs text-[#8b8e91]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  className="inline-flex items-center gap-1 hover:text-[#F2911B] transition-colors rounded-sm"
                >
                  <HomeIcon size={13} aria-hidden="true" />
                  Home
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} />
              </li>
              <li className="text-[#F2911B]" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#F2911B]" />
                <span
                  className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Who We Are
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.07] tracking-tight max-w-4xl"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                About <span className="text-[#F2911B]">Linked</span>
                <br className="hidden md:block" /> Technologies Ltd
              </h1>
              <div className="mt-7 flex items-start gap-4 max-w-2xl">
                <div className="w-1 self-stretch min-h-12 bg-[#F2911B] shrink-0" />
                <p
                  className="text-[#c5c8ca] text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Setting the standard for engineering excellence, industrial
                  automation and quality-driven project delivery across Bangladesh.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-4 border border-white/15 bg-[#1b1e20]/90 p-6 lg:p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-16 bg-[#F2911B]" />
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p
                    className="text-[#F2911B] text-[11px] tracking-[0.16em] uppercase"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Built in Bangladesh
                  </p>
                  <p
                    className="text-white text-2xl font-bold leading-tight mt-3"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    Engineering that keeps industry moving.
                  </p>
                </div>
                <Factory
                  size={28}
                  strokeWidth={1.5}
                  className="text-[#F2911B] shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <p
                    className="text-white text-xl font-bold"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    Est. 2014
                  </p>
                  <p className="mt-1 text-[#9fa3a6] text-[11px] uppercase tracking-[0.1em]">
                    Dhaka, Bangladesh
                  </p>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <p
                    className="text-white text-xl font-bold"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    24/7
                  </p>
                  <p className="mt-1 text-[#9fa3a6] text-[11px] uppercase tracking-[0.1em]">
                    Technical support
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Intro: photo + overview + stats ─────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="relative order-2 lg:order-1">
              <div className="absolute -left-4 -top-4 w-2/3 h-2/3 border border-[#F2911B]/15 pointer-events-none" />
              <TeamPhoto className="w-full h-[420px] object-cover relative z-10 rounded-sm bg-[#e2e5e8]" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2911B] z-10" />
              <div className="absolute -bottom-6 -right-5 bg-[#F2911B] p-5 rounded-sm shadow-xl z-20">
                <p
                  className="text-white text-3xl font-bold leading-none"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  Est. 2014
                </p>
                <p
                  className="text-white/90 text-xs tracking-wide mt-1 uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Dhaka, Bangladesh
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#F2911B]" />
                <span
                  className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Our Story
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight mb-6"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Engineering Authority You Can Trust
              </h2>
              <p
                className="text-[#5a5d60] leading-relaxed mb-5 text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Linked Technologies Limited is one of the most reputed
                organizations in Bangladesh for industrial automation,
                electro-mechanical &amp; electrical engineering, plant erection
                &amp; maintenance and man-machine customization — powered by
                self-supported expert technical teams with modern tools &amp;
                technology.
              </p>
              <p
                className="text-[#5a5d60] leading-relaxed mb-8 text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We use industrial equipment from world-class manufacturers,
                selected for high quality at a justified price. Our reputation is
                built on quality product sales, dependable after-sales service,
                innovation, productivity and continuous customer support.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#e2e5e8] rounded-sm overflow-hidden border border-[#e2e5e8]">
                {ABOUT_STATS.map((s) => (
                  <div key={s.label} className="bg-white px-3 py-5 text-center">
                    <Metric
                      num={s.num}
                      suffix={s.suffix}
                      className="text-[#151719]"
                      sizeClass="text-[26px]"
                    />
                    <p
                      className="text-[#5a5d60] text-[11px] font-normal tracking-[0.045em] uppercase mt-3 leading-[1.3]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Vision & Core Values ────────────────── */}
      <section className="bg-[#F7F9FA] py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Vision &amp; Values
              </span>
              <div className="h-px w-8 bg-[#F2911B]" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              The Principles That <span className="text-[#F2911B]">Drive Us</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_VALUES.map(({ Icon, title, desc }, i) => (
              <Reveal
                key={title}
                delay={i * 110}
                className="card-hover-light relative bg-white border border-[#e2e5e8] rounded-sm p-8 group"
              >
                <span
                  className="absolute top-6 right-7 text-4xl font-bold text-[#151719]/12 group-hover:text-[#F2911B]/25 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="card-hover-light-icon w-12 h-12 rounded-sm bg-[#F2911B]/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[#F2911B]" aria-hidden="true" />
                </div>
                <h3
                  className="text-lg font-bold text-[#151719] mb-3"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm text-[#5a5d60] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission statement band ──────────────── */}
      <section className="bg-[#151719] py-20 border-t-4 border-[#F2911B]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <span
              className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Our Engineering Approach
            </span>
            <h2
              className="text-2xl md:text-3xl lg:text-[2.4rem] font-bold text-white leading-snug mt-5 mb-6"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Offering the Best Solution{" "}
              <span className="text-[#F2911B]">for Your Industry</span>
            </h2>
            <p
              className="text-[#b6b9bc] text-lg leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We have ensured business excellence for a long time — trusted to
              provide a full range of engineering and related services for some
              of the largest and most complex technology, upstream, government
              and non-government projects. Our streamlined engineering process
              consistently delivers sound results in the most difficult and
              challenging situations using technologically advanced engineering
              methods.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Three Corporate Pillars ─────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Why Choose LTL
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Built on Three Corporate Pillars
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#e2e5e8] rounded-sm overflow-hidden">
            {VALUE_PILLARS.map(({ Icon, title, desc }, i) => (
              <Reveal
                key={title}
                delay={i * 110}
                className="card-hover-dark about-pillar-card bg-white p-8 group"
              >
                <div className="card-hover-dark-icon about-pillar-icon w-12 h-12 rounded-sm border border-[#F2911B]/30 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[#F2911B]" aria-hidden="true" />
                </div>
                <h3
                  className="card-hover-dark-title about-pillar-title text-lg font-bold text-[#151719] mb-3"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {title}
                </h3>
                <p
                  className="card-hover-dark-copy about-pillar-copy text-sm text-[#5a5d60] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Operational Summary / Capabilities ──── */}
      <section className="bg-[#F7F9FA] py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                What We Deliver
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Our Core Operational Focus
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAPABILITIES.map(({ Icon, title, subtitle, desc }, i) => (
              <Reveal
                key={title}
                delay={i * 110}
                className="card-hover-light about-focus-card bg-white border border-[#e2e5e8] rounded-sm p-8 group flex flex-col"
              >
                <div className="card-hover-light-icon about-focus-icon w-12 h-12 rounded-sm bg-[#F2911B]/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#F2911B]" aria-hidden="true" />
                </div>
                <p
                  className="text-[10px] tracking-[0.18em] uppercase text-[#5a5d60] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {subtitle}
                </p>
                <h3
                  className="text-lg font-bold text-[#151719] mb-3"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm text-[#5a5d60] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Infrastructure & Capabilities ───────── */}
      <section className="bg-white py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#F2911B]" />
                <span
                  className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Infrastructure
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight mb-6"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Modern Tools, Machinery &amp; World-Class Components
              </h2>
              <p
                className="text-[#5a5d60] leading-relaxed mb-6 text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Our engineering teams are self-supported with modern tools and
                machinery, enabling us to deliver end-to-end industrial projects
                with precision. We combine advanced techniques across mechanical,
                automation and firmware domains to optimize performance,
                efficiency and productivity.
              </p>
              <p
                className="text-[#5a5d60] leading-relaxed text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Every component we supply is sourced from world-class
                manufacturers and backed by robust quality systems — ensuring
                durable, reliable and customized solutions for every industrial
                client.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INFRASTRUCTURE.map(({ Icon, title, desc }, i) => (
                <Reveal
                  key={title}
                  delay={i * 90}
                  className="card-hover-light bg-[#F7F9FA] border border-[#e2e5e8] rounded-sm p-6"
                >
                  <div className="card-hover-light-icon w-11 h-11 rounded-sm bg-[#F2911B]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#F2911B]" aria-hidden="true" />
                  </div>
                  <h3
                    className="text-base font-bold text-[#151719] mb-2"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm text-[#5a5d60] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner (light gray surface) ─────── */}
      <section className="bg-[#e9edf0] py-16 border-y border-[#dce0e4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2
                className="text-2xl md:text-3xl font-bold text-[#151719] leading-tight mb-3"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Looking for a reliable engineering partner?
              </h2>
              <p
                className="text-[#5a5d60] text-base leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Schedule a facility visit with us and see our engineering
                capabilities, quality standards and expert teams first-hand.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F2911B] hover:bg-[#d97d10] text-white font-semibold px-8 py-4 rounded-sm text-sm tracking-wide transition-colors duration-200 ease-out shadow-lg shadow-[#F2911B]/20 flex-shrink-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Book Your Visit via WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ─── Reusable dark page banner ──────────────────── */
function PageBanner({
  eyebrow,
  title,
  subtitle,
  crumb,
  image,
  highlights,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  crumb: string;
  image?: string;
  highlights?: { Icon: typeof Cpu; label: string }[];
  aside?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <section className="relative bg-[#151719] overflow-hidden pt-[124px] pb-20 lg:pt-36 lg:pb-24">
      {/* subtle industrial photo */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.22] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: `url("${image}")` }}
        />
      )}
      {/* structural grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* directional wash for contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#151719] via-[#151719]/92 to-[#151719]/70 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#151719] via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F2911B] hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol
            className="flex items-center gap-2 text-xs text-[#8b8e91]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
                className="inline-flex items-center gap-1 hover:text-[#F2911B] transition-colors rounded-sm"
              >
                <HomeIcon size={13} aria-hidden="true" />
                Home
              </a>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li className="text-[#F2911B]" aria-current="page">
              {crumb}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Main heading column */}
          <div className={aside ? "lg:col-span-7" : "lg:col-span-12"}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {eyebrow}
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.06] tracking-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              {title}
            </h1>
            <div className="mt-7 flex items-start gap-4 max-w-2xl">
              <div className="w-1 self-stretch min-h-12 bg-[#F2911B] shrink-0" />
              <p
                className="text-[#c5c8ca] text-base md:text-lg leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {subtitle}
              </p>
            </div>

            {highlights && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {highlights.map(({ Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.04] px-4 py-2 rounded-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Icon size={15} className="text-[#F2911B]" aria-hidden="true" />
                    <span className="text-[#d7dadd] text-[13px] font-medium">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Optional aside panel */}
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

/* ─── Services Page ──────────────────────────────── */
function ServicesPage() {
  const navigate = useNavigate();

  const inquire = (service: string) => {
    navigate(`/contact?service=${encodeURIComponent(service)}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <main>
      <PageBanner
        crumb="Services"
        eyebrow="What We Offer"
        image="https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1400&h=900&fit=crop&auto=format"
        title={
          <>
            Which Service Do{" "}
            <span className="text-[#F2911B]">You Need?</span>
          </>
        }
        subtitle="We believe that efficient and expert collaboration produces the best results, and we have built our entire Engineering Service on this principle. Together, we can transform challenges into opportunities and bring your visions to life."
        highlights={[
          { Icon: Layers, label: "9 Core Engineering Services" },
          { Icon: Award, label: "10+ Years of Expertise" },
          { Icon: Headphones, label: "24/7 Technical Support" },
        ]}
        aside={
          <div className="relative border border-white/12 bg-[#1b1e20]/85 p-7 lg:p-8">
            <div className="absolute top-0 left-0 h-1 w-16 bg-[#F2911B]" />
            <div className="flex items-baseline gap-3">
              <span
                className="text-[#F2911B] text-5xl font-bold leading-none"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                09
              </span>
              <span
                className="text-white text-lg font-bold leading-tight"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Engineering
                <br />
                disciplines
              </span>
            </div>
            <p
              className="text-[#a9adb0] text-sm leading-relaxed mt-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              From automation and manufacturing to civil works, certification and
              software — delivered under one accountable roof.
            </p>
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#F2911B]" aria-hidden="true" />
              <span
                className="text-[#d7dadd] text-[13px] font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                One partner, complete accountability
              </span>
            </div>
          </div>
        }
      />

      <section className="bg-[#F7F9FA] py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Our Capabilities
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              A Complete Engineering Service Portfolio
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SERVICES.map(({ Icon, title, desc }, i) => (
              <Reveal
                key={title}
                delay={(i % 3) * 110}
                className="card-hover-light group flex flex-col bg-white border border-[#e2e5e8] rounded-sm p-8"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="card-hover-light-icon w-12 h-12 rounded-sm bg-[#F2911B]/10 flex items-center justify-center">
                    <Icon size={22} className="text-[#F2911B]" aria-hidden="true" />
                  </div>
                  <span
                    className="text-[#dfe3e6] text-3xl font-bold leading-none"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2
                  className="text-xl font-bold text-[#151719] mb-3"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {title}
                </h2>
                <p
                  className="text-sm text-[#5a5d60] leading-relaxed mb-6 flex-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {desc}
                </p>
                <button
                  type="button"
                  onClick={() => inquire(title)}
                  className="group/btn mt-auto inline-flex items-center justify-center gap-2 w-full border border-[#707375]/40 hover:border-[#F2911B] hover:bg-[#F2911B] text-[#151719] hover:text-white font-semibold px-5 py-3 rounded-sm text-[13px] tracking-wide transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Inquire About This Service
                  <ArrowRight
                    size={15}
                    className="group-hover/btn:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#e9edf0] py-16 border-y border-[#dce0e4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2
                className="text-2xl md:text-3xl font-bold text-[#151719] leading-tight mb-3"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Not sure which service fits your requirement?
              </h2>
              <p
                className="text-[#5a5d60] text-base leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Tell us about your challenge and our engineering experts will
                recommend the right solution for your industry.
              </p>
            </div>
            <button
              type="button"
              onClick={() => inquire("")}
              className="inline-flex items-center gap-2 bg-[#F2911B] hover:bg-[#d97d10] text-white font-semibold px-8 py-4 rounded-sm text-sm tracking-wide transition-colors duration-200 shadow-lg shadow-[#F2911B]/20 flex-shrink-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contact Our Experts
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ─── Contact Page ───────────────────────────────── */
function ContactPage() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);

  const preset = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const product = params.get("product") ?? "";
    const service = params.get("service") ?? "";
    if (product) {
      return {
        interest: "Product Inquiry",
        subject: `Product Inquiry: ${product}`,
      };
    }
    const valid = [
      ...SERVICES.map((s) => s.title),
      "Product Inquiry",
      "General Inquiry",
    ];
    return { interest: valid.includes(service) ? service : "", subject: "" };
  }, [location.search]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    designation: "",
    email: "",
    phone: "",
    interest: preset.interest,
    subject: preset.subject,
    message: "",
  });

  useEffect(() => {
    setForm((f) => ({
      ...f,
      interest: preset.interest,
      ...(preset.subject ? { subject: preset.subject } : {}),
    }));
  }, [preset]);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const lines = [
      "New inquiry from LTL website:",
      fullName ? `Name: ${fullName}` : "",
      form.company ? `Company: ${form.company}` : "",
      form.designation ? `Designation: ${form.designation}` : "",
      form.email ? `Email: ${form.email}` : "",
      form.phone ? `Phone: ${form.phone}` : "",
      form.interest ? `Area of Interest: ${form.interest}` : "",
      form.subject ? `Subject: ${form.subject}` : "",
      "",
      form.message,
    ].filter(Boolean);
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const fieldBase =
    "w-full bg-white border border-[#e2e5e8] rounded-sm px-4 py-3 text-[15px] text-[#151719] placeholder:text-[#9da0a3] focus:border-[#F2911B] focus:ring-2 focus:ring-[#F2911B]/20 outline-none transition-colors";
  const labelBase =
    "block text-[13px] font-semibold text-[#151719] mb-1.5";

  return (
    <main>
      <PageBanner
        crumb="Contact"
        eyebrow="Get in Touch"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop&auto=format"
        title={
          <>
            Let&apos;s Build Something{" "}
            <span className="text-[#F2911B]">Together</span>
          </>
        }
        subtitle="Just drop your message and our experts will connect you soon. Whether it's an engineering service or a product enquiry, reach us across our corporate office and manufacturing hubs in Dhaka and Gazipur."
        aside={
          <div className="relative border border-white/12 bg-[#1b1e20]/85 p-6 lg:p-7">
            <div className="absolute top-0 left-0 h-1 w-16 bg-[#F2911B]" />
            <p
              className="text-[#F2911B] text-[11px] tracking-[0.18em] uppercase mb-5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Talk to us directly
            </p>
            <ul className="space-y-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              <li className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-sm bg-[#F2911B]/12 flex items-center justify-center flex-shrink-0">
                  <Phone size={17} className="text-[#F2911B]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#8b8e91] text-[11px] uppercase tracking-[0.1em]">
                    Call us
                  </p>
                  <a
                    href="tel:+8801920200477"
                    className="text-white text-sm font-medium hover:text-[#F2911B] transition-colors"
                  >
                    +880 1920-200477
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-sm bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={17} className="text-[#25D366]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#8b8e91] text-[11px] uppercase tracking-[0.1em]">
                    WhatsApp
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm font-medium hover:text-[#25D366] transition-colors"
                  >
                    Chat with an engineer
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-sm bg-[#F2911B]/12 flex items-center justify-center flex-shrink-0">
                  <Mail size={17} className="text-[#F2911B]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[#8b8e91] text-[11px] uppercase tracking-[0.1em]">
                    Email us
                  </p>
                  <a
                    href="mailto:info@ltl-bd.com"
                    className="text-white text-sm font-medium hover:text-[#F2911B] transition-colors"
                  >
                    info@ltl-bd.com
                  </a>
                </div>
              </li>
            </ul>
            <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2.5">
              <Clock size={15} className="text-[#F2911B]" aria-hidden="true" />
              <span
                className="text-[#d7dadd] text-[13px] font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Open Saturday — Thursday
              </span>
            </div>
          </div>
        }
      />

      {/* Inquiry engine */}
      <section className="bg-[#F7F9FA] py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <Reveal className="bg-white border border-[#e2e5e8] rounded-sm p-8">
              {submitted ? (
                <div
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-14 h-14 rounded-sm bg-[#25D366]/12 flex items-center justify-center mb-4">
                    <MessageCircle size={28} className="text-[#25D366]" aria-hidden="true" />
                  </div>
                  <h3
                    className="text-xl font-bold text-[#151719] mb-2"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    Opening WhatsApp…
                  </h3>
                  <p
                    className="text-[#5a5d60] text-sm max-w-xs"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Your message has been prepared. Please confirm and send it in
                    WhatsApp to reach our experts instantly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#F2911B] text-sm font-semibold hover:underline"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    className="text-lg font-bold text-[#151719] leading-snug mb-1"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    Just drop your message, our experts will connect you soon.
                  </h2>
                  <p
                    className="text-[#5a5d60] text-sm mb-6"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Fields marked <span className="text-[#F2911B]">*</span> are
                    required.
                  </p>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="c-first" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                          First Name <span className="text-[#F2911B]">*</span>
                        </label>
                        <input
                          id="c-first"
                          type="text"
                          required
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={update("firstName")}
                          placeholder="First name"
                          className={fieldBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="c-last" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                          Last Name <span className="text-[#F2911B]">*</span>
                        </label>
                        <input
                          id="c-last"
                          type="text"
                          required
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={update("lastName")}
                          placeholder="Last name"
                          className={fieldBase}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="c-company" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                          Company / Industry
                        </label>
                        <input
                          id="c-company"
                          type="text"
                          autoComplete="organization"
                          value={form.company}
                          onChange={update("company")}
                          placeholder="Company or industry"
                          className={fieldBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="c-designation" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                          Designation
                        </label>
                        <input
                          id="c-designation"
                          type="text"
                          autoComplete="organization-title"
                          value={form.designation}
                          onChange={update("designation")}
                          placeholder="Your role"
                          className={fieldBase}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="c-email" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                          E-mail Address <span className="text-[#F2911B]">*</span>
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="you@company.com"
                          className={fieldBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="c-phone" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                          Phone Number <span className="text-[#F2911B]">*</span>
                        </label>
                        <input
                          id="c-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="+880 ..."
                          className={fieldBase}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="c-interest" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                        Area of Interest
                      </label>
                      <div className="relative">
                        <select
                          id="c-interest"
                          value={form.interest}
                          onChange={update("interest")}
                          className={`${fieldBase} appearance-none pr-10 cursor-pointer`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <option value="">Select an area…</option>
                          <optgroup label="Engineering Services">
                            {SERVICES.map((s) => (
                              <option key={s.title} value={s.title}>
                                {s.title}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Other">
                            <option value="Product Inquiry">Product Inquiry</option>
                            <option value="General Inquiry">General Inquiry</option>
                          </optgroup>
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#707375]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="c-subject" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                        Subject <span className="text-[#F2911B]">*</span>
                      </label>
                      <input
                        id="c-subject"
                        type="text"
                        required
                        value={form.subject}
                        onChange={update("subject")}
                        placeholder="Brief subject of your inquiry"
                        className={fieldBase}
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="c-message" className={labelBase} style={{ fontFamily: "'Inter', sans-serif" }}>
                        Message <span className="text-[#F2911B]">*</span>
                      </label>
                      <textarea
                        id="c-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Tell us about your project, requirement or product need..."
                        className={`${fieldBase} resize-y`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#F2911B] hover:bg-[#d97d10] text-white font-semibold px-7 py-4 rounded-sm text-sm tracking-wide transition-colors duration-200 shadow-lg shadow-[#F2911B]/20"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <MessageCircle size={18} aria-hidden="true" />
                      Submit via WhatsApp Chat
                    </button>
                  </form>
                </>
              )}
            </Reveal>

            {/* Branch directory */}
            <Reveal delay={120} className="flex flex-col gap-4">
              {BRANCHES.map(({ Icon, name, address, phone, emails }) => (
                <div
                  key={name}
                  className="card-hover-light bg-white border border-[#e2e5e8] rounded-sm p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="card-hover-light-icon w-11 h-11 rounded-sm bg-[#F2911B]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#F2911B]" aria-hidden="true" />
                    </div>
                    <h3
                      className="text-base font-bold text-[#151719]"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      {name}
                    </h3>
                  </div>
                  <ul className="space-y-2.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <li className="flex gap-3">
                      <MapPin size={15} className="text-[#707375] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-[#5a5d60] text-sm leading-relaxed">{address}</span>
                    </li>
                    <li className="flex gap-3">
                      <Phone size={15} className="text-[#707375] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="text-[#5a5d60] hover:text-[#F2911B] text-sm transition-colors"
                      >
                        {phone}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Mail size={15} className="text-[#707375] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="flex flex-wrap gap-x-2 text-sm">
                        {emails.map((em, idx) => (
                          <a
                            key={em}
                            href={`mailto:${em}`}
                            className="text-[#5a5d60] hover:text-[#F2911B] transition-colors"
                          >
                            {em}
                            {idx < emails.length - 1 ? " /" : ""}
                          </a>
                        ))}
                      </span>
                    </li>
                  </ul>
                </div>
              ))}

              {/* Map */}
              <div className="min-h-[220px] rounded-sm overflow-hidden border border-[#e2e5e8]">
                <iframe
                  title="Linked Technologies Ltd location map"
                  src="https://www.google.com/maps?q=Nobabpur,Dhaka-1100,Bangladesh&output=embed"
                  className="w-full h-full min-h-[220px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Products Page ──────────────────────────────── */
function ProductsPage() {
  const navigate = useNavigate();

  const inquire = (product: string) => {
    navigate(`/contact?product=${encodeURIComponent(product)}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <main>
      <PageBanner
        crumb="Products"
        eyebrow="What We Supply"
        image="https://images.unsplash.com/photo-1730584474338-aa8d9d186bf7?w=1400&h=900&fit=crop&auto=format"
        title={
          <>
            Industrial Products &amp;{" "}
            <span className="text-[#F2911B]">Genuine Spares</span>
          </>
        }
        subtitle="From automation controllers to genuine OEM spares, we source high-quality industrial products from world-class manufacturers — imported through our approved air, sea and land gateways and delivered nationwide."
        highlights={[
          { Icon: BadgeCheck, label: "Genuine OEM Parts" },
          { Icon: Globe, label: "World-Class Brands" },
          { Icon: Truck, label: "Nationwide Supply" },
        ]}
        aside={
          <div className="relative border border-white/12 bg-[#1b1e20]/85 p-7 lg:p-8">
            <div className="absolute top-0 left-0 h-1 w-16 bg-[#F2911B]" />
            <div className="flex items-center gap-3 mb-4">
              <Package size={26} strokeWidth={1.5} className="text-[#F2911B]" aria-hidden="true" />
              <p
                className="text-white text-lg font-bold leading-tight"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Can&apos;t find a product?
              </p>
            </div>
            <p
              className="text-[#a9adb0] text-sm leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              If it isn&apos;t available in Bangladesh, we import it. Tell us the
              make, model or specification and our sourcing team will handle the
              rest.
            </p>
            <button
              type="button"
              onClick={() => inquire("Custom Product Sourcing")}
              className="mt-6 inline-flex items-center gap-2 bg-[#F2911B] hover:bg-[#d97d10] text-white font-semibold px-5 py-3 rounded-sm text-[13px] tracking-wide transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Request a Product
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        }
      />

      {/* Product grid */}
      <section className="bg-[#F7F9FA] py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Product Range
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Everything Your Plant Needs, Under One Roof
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {PRODUCTS.map(({ Icon, name, category, desc, tags }, i) => (
              <Reveal
                key={name}
                delay={(i % 4) * 90}
                className="card-hover-light group flex flex-col bg-white border border-[#e2e5e8] rounded-sm overflow-hidden"
              >
                {/* Branded icon header */}
                <div className="relative h-36 overflow-hidden bg-[#151719] flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-[0.07] pointer-events-none"
                    aria-hidden="true"
                    style={{
                      backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                      backgroundSize: "26px 26px",
                    }}
                  />
                  <div
                    className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#F2911B]/25 blur-2xl pointer-events-none"
                    aria-hidden="true"
                  />
                  <Icon
                    size={46}
                    strokeWidth={1.3}
                    className="relative z-10 text-[#F2911B] transition-transform duration-[500ms] ease-out group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/10 text-white text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm backdrop-blur-sm"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F2911B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[500ms] ease-out" />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="text-base font-bold text-[#151719] mb-2 leading-snug"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    {name}
                  </h3>
                  <p
                    className="text-[13px] text-[#5a5d60] leading-relaxed mb-4 flex-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] text-[#5a5d60] bg-[#F7F9FA] border border-[#e2e5e8] px-2 py-0.5 rounded-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => inquire(name)}
                    className="group/btn mt-auto inline-flex items-center justify-center gap-2 w-full border border-[#707375]/40 hover:border-[#F2911B] hover:bg-[#F2911B] text-[#151719] hover:text-white font-semibold px-4 py-2.5 rounded-sm text-[13px] tracking-wide transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Inquire Now
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why source from LTL */}
      <section className="bg-white py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#F2911B]" />
                <span
                  className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Why Source From LTL
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight mb-6"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Quality Products, Justified Prices, Dependable Support
              </h2>
              <p
                className="text-[#5a5d60] leading-relaxed text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We work with world-renowned brands as per customer demand and
                stand behind every product with dependable after-sales service.
                Our multiple approved gateways on airways, waterways and land
                routes let us deliver even hard-to-find items at the earliest
                time.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  Icon: BadgeCheck,
                  title: "Genuine & Certified",
                  desc: "Authentic products sourced directly from approved manufacturers.",
                },
                {
                  Icon: Globe,
                  title: "Global Sourcing",
                  desc: "Approved air, sea and land gateways for reliable imports.",
                },
                {
                  Icon: Headphones,
                  title: "After-Sales Support",
                  desc: "Round-the-clock technical assistance from our help centre.",
                },
                {
                  Icon: Award,
                  title: "10+ Years Trusted",
                  desc: "A solid reputation for quality product sales since 2014.",
                },
              ].map(({ Icon, title, desc }, i) => (
                <Reveal
                  key={title}
                  delay={i * 90}
                  className="card-hover-light bg-[#F7F9FA] border border-[#e2e5e8] rounded-sm p-6"
                >
                  <div className="card-hover-light-icon w-11 h-11 rounded-sm bg-[#F2911B]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#F2911B]" aria-hidden="true" />
                  </div>
                  <h3
                    className="text-base font-bold text-[#151719] mb-2"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm text-[#5a5d60] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#e9edf0] py-16 border-y border-[#dce0e4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2
                className="text-2xl md:text-3xl font-bold text-[#151719] leading-tight mb-3"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Need a quotation or a specific product?
              </h2>
              <p
                className="text-[#5a5d60] text-base leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Share your requirement and our sourcing team will get back to you
                with availability, pricing and lead time.
              </p>
            </div>
            <button
              type="button"
              onClick={() => inquire("")}
              className="inline-flex items-center gap-2 bg-[#F2911B] hover:bg-[#d97d10] text-white font-semibold px-8 py-4 rounded-sm text-sm tracking-wide transition-colors duration-200 shadow-lg shadow-[#F2911B]/20 flex-shrink-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Request a Quote
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ─── Gallery Page ───────────────────────────────── */
const PORTFOLIO_ITEMS = [
  {
    title: "PLC & SCADA Automation",
    tag: "Automation",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Civil & Structural Works",
    tag: "Construction",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Machine Retrofitting",
    tag: "Modification",
    img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "MEP Installations",
    tag: "Engineering",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Control Panel Assembly",
    tag: "Electrical",
    img: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Preventive Maintenance",
    tag: "Service",
    img: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Conveyor Line Erection",
    tag: "Construction",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Drive & Motor Commissioning",
    tag: "Automation",
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=800&fit=crop&auto=format",
  },
  {
    title: "Boiler & Utility Inspection",
    tag: "Service",
    img: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&h=800&fit=crop&auto=format",
  },
];

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PORTFOLIO_ITEMS.map((p) => p.tag)))],
    [],
  );
  const visible =
    filter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((p) => p.tag === filter);

  return (
    <main>
      <PageBanner
        crumb="Gallery"
        eyebrow="Our Work"
        image="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&h=900&fit=crop&auto=format"
        title={
          <>
            Projects &amp; <span className="text-[#F2911B]">Capabilities</span>
          </>
        }
        subtitle="A glimpse of the industrial projects, installations and engineering work delivered by our teams across Bangladesh — from automation and civil works to machine retrofitting and preventive maintenance."
        highlights={[
          { Icon: Factory, label: "50+ Delivered Projects" },
          { Icon: Layers, label: "6 Engineering Domains" },
          { Icon: BadgeCheck, label: "Nationwide Coverage" },
        ]}
      />

      <section className="bg-[#F7F9FA] py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Portfolio
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Engineering Work That Speaks for Itself
            </h2>
          </Reveal>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-sm text-[13px] font-semibold tracking-wide transition-colors duration-200 border ${
                    active
                      ? "bg-[#F2911B] border-[#F2911B] text-white"
                      : "bg-white border-[#e2e5e8] text-[#5a5d60] hover:border-[#F2911B] hover:text-[#F2911B]"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {visible.map(({ title, tag, img }, i) => (
              <Reveal
                key={title}
                delay={(i % 3) * 90}
                className="group relative aspect-square overflow-hidden rounded-sm bg-[#1e2124]"
              >
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151719] via-[#151719]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-1 group-hover:translate-y-0 transition-transform">
                  <span
                    className="inline-block text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-[#F2911B] mb-1"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {tag}
                  </span>
                  <h3
                    className="text-white text-sm md:text-base font-semibold leading-snug"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    {title}
                  </h3>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-[#F2911B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={16} className="text-white" aria-hidden="true" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <GalleryEventCTA
        heading="Have a project in mind?"
        text="From concept to commissioning, our engineering teams deliver industrial projects end to end. Let's discuss how we can bring your vision to life."
      />
    </main>
  );
}

/* ─── Event Page ─────────────────────────────────── */
const EVENTS = [
  {
    day: "14",
    month: "AUG",
    year: "2026",
    title: "Industrial Automation Expo 2026",
    time: "10:00 AM – 6:00 PM",
    location: "Int'l Convention City, Dhaka",
    category: "Exhibition",
    status: "Upcoming",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format",
    desc: "Join Linked Technologies at the country's largest automation expo. Explore live demonstrations of our PLC, SCADA and drive solutions on our exhibition floor.",
  },
  {
    day: "05",
    month: "SEP",
    year: "2026",
    title: "PLC & SCADA Hands-on Workshop",
    time: "9:30 AM – 4:00 PM",
    location: "LTL Training Center, Gazipur",
    category: "Workshop",
    status: "Upcoming",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop&auto=format",
    desc: "A practical, engineer-led session covering PLC programming, HMI configuration and SCADA integration for plant maintenance teams. Limited seats available.",
  },
  {
    day: "22",
    month: "OCT",
    year: "2026",
    title: "Energy Efficiency & Drives Seminar",
    time: "11:00 AM – 2:00 PM",
    location: "Radisson Blu, Dhaka",
    category: "Seminar",
    status: "Upcoming",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&auto=format",
    desc: "Discover how modern VFDs and motor control strategies reduce energy consumption across manufacturing plants, with real case studies from our projects.",
  },
  {
    day: "18",
    month: "MAR",
    year: "2026",
    title: "Factory Safety & Compliance Meetup",
    time: "10:00 AM – 1:00 PM",
    location: "LTL Corporate Office, Dhaka",
    category: "Meetup",
    status: "Past",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format",
    desc: "An industry roundtable on machine safety, guarding standards and inspection best practices — attended by plant heads from leading manufacturers.",
  },
  {
    day: "27",
    month: "JAN",
    year: "2026",
    title: "Smart Manufacturing Conference",
    time: "9:00 AM – 5:00 PM",
    location: "BICC, Dhaka",
    category: "Conference",
    status: "Past",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&auto=format",
    desc: "Our engineering team presented on Industry 4.0 adoption and shared a roadmap for digitalizing legacy production lines through phased automation.",
  },
  {
    day: "09",
    month: "DEC",
    year: "2025",
    title: "Preventive Maintenance Bootcamp",
    time: "9:30 AM – 3:30 PM",
    location: "LTL Training Center, Gazipur",
    category: "Workshop",
    status: "Past",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop&auto=format",
    desc: "A focused bootcamp on predictive and preventive maintenance workflows, condition monitoring, and spare-parts planning for industrial equipment.",
  },
];

function EventPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");
  const visible = EVENTS.filter((ev) => ev.status === tab);

  const register = (title: string) => {
    navigate(`/contact?event=${encodeURIComponent(title)}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <main>
      <PageBanner
        crumb="Event"
        eyebrow="What's Happening"
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&h=900&fit=crop&auto=format"
        title={
          <>
            Events &amp; <span className="text-[#F2911B]">Exhibitions</span>
          </>
        }
        subtitle="Meet our engineers, explore live demonstrations, and stay ahead of the curve. From expos and seminars to hands-on workshops — here's where Linked Technologies is engaging the industry."
        highlights={[
          { Icon: CalendarCheck, label: "Regular Industry Events" },
          { Icon: Users, label: "Expert-Led Sessions" },
          { Icon: GraduationCap, label: "Hands-on Workshops" },
        ]}
      />

      <section className="bg-[#F7F9FA] py-24 border-t border-[#e2e5e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F2911B]" />
              <span
                className="text-[#F2911B] text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Calendar
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#151719] leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Upcoming &amp; Recent Events
            </h2>
          </Reveal>

          {/* Tabs */}
          <div className="inline-flex p-1 bg-white border border-[#e2e5e8] rounded-sm mb-10">
            {(["Upcoming", "Past"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-sm text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                  tab === t
                    ? "bg-[#F2911B] text-white"
                    : "text-[#5a5d60] hover:text-[#F2911B]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Event grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visible.map((ev, i) => (
              <Reveal
                key={ev.title}
                delay={(i % 3) * 90}
                className="card-hover-light group flex flex-col bg-white border border-[#e2e5e8] rounded-sm overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ev.img}
                    alt={ev.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151719]/70 via-transparent to-transparent" />
                  {/* Date badge */}
                  <div className="absolute top-4 left-4 bg-[#F2911B] text-white text-center px-3 py-2 rounded-sm shadow-lg shadow-black/20">
                    <div
                      className="text-2xl font-bold leading-none"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      {ev.day}
                    </div>
                    <div
                      className="text-[10px] tracking-[0.18em] mt-0.5"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {ev.month}
                    </div>
                  </div>
                  {/* Status pill */}
                  <span
                    className={`absolute top-4 right-4 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm ${
                      ev.status === "Upcoming"
                        ? "bg-[#16a34a] text-white"
                        : "bg-[#5a5d60] text-white"
                    }`}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {ev.status}
                  </span>
                  <span
                    className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 bg-white/10 text-white text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm backdrop-blur-sm"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {ev.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-lg font-bold text-[#151719] leading-snug mb-4"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    {ev.title}
                  </h3>
                  <div
                    className="space-y-2 mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <div className="flex items-center gap-2.5 text-[13px] text-[#5a5d60]">
                      <CalendarCheck size={15} className="text-[#F2911B] shrink-0" aria-hidden="true" />
                      {ev.day} {ev.month} {ev.year}
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-[#5a5d60]">
                      <Clock size={15} className="text-[#F2911B] shrink-0" aria-hidden="true" />
                      {ev.time}
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-[#5a5d60]">
                      <MapPin size={15} className="text-[#F2911B] shrink-0" aria-hidden="true" />
                      {ev.location}
                    </div>
                  </div>
                  <p
                    className="text-sm text-[#5a5d60] leading-relaxed mb-6 flex-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {ev.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => register(ev.title)}
                    disabled={ev.status === "Past"}
                    className={`group/btn mt-auto inline-flex items-center justify-center gap-2 w-full font-semibold px-5 py-3 rounded-sm text-[13px] tracking-wide transition-colors duration-200 ${
                      ev.status === "Past"
                        ? "border border-[#e2e5e8] text-[#a9adb0] cursor-not-allowed"
                        : "border border-[#707375]/40 hover:border-[#F2911B] hover:bg-[#F2911B] text-[#151719] hover:text-white"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {ev.status === "Past" ? "Event Concluded" : "Register Interest"}
                    {ev.status !== "Past" && (
                      <ArrowRight
                        size={15}
                        className="group-hover/btn:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="text-center py-16">
              <CalendarCheck
                size={40}
                className="text-[#cfd4d8] mx-auto mb-4"
                aria-hidden="true"
              />
              <p
                className="text-[#5a5d60] text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                No {tab.toLowerCase()} events at the moment. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <GalleryEventCTA
        heading="Want to host or attend an event with us?"
        text="Reach out to our team to learn about upcoming sessions, request a private workshop, or partner with Linked Technologies on an industry event."
      />
    </main>
  );
}

/* ─── Shared CTA for Gallery / Event pages ───────── */
function GalleryEventCTA({ heading, text }: { heading: string; text: string }) {
  const navigate = useNavigate();
  return (
    <section className="bg-[#e9edf0] py-16 border-y border-[#dce0e4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#151719] leading-tight mb-3"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              {heading}
            </h2>
            <p
              className="text-[#5a5d60] text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {text}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
            className="inline-flex items-center gap-2 bg-[#F2911B] hover:bg-[#d97d10] text-white font-semibold px-8 py-4 rounded-sm text-sm tracking-wide transition-colors duration-200 shadow-lg shadow-[#F2911B]/20 flex-shrink-0"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Contact Our Team
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Landing page ───────────────────────────────── */
function LandingPage() {
  return (
    <main>
      <Hero />
      <TrustRibbon />
      <Capabilities />
      <Welcome />
      <ValueProps />
      <Gallery />
      <ServicesStrip />
      <ExperienceBlock />
      <Testimonials />
    </main>
  );
}

/* ─── Scroll to top on route change ──────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/* ─── App ────────────────────────────────────────── */
export default function App() {
  const location = useLocation();

  // Admin panel runs as a standalone shell (no public header/footer).
  if (location.pathname.startsWith("/admin")) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="permissions" element={<AdminPermissionsPage />} />
          <Route path="users/admin" element={<AdminUsersPage />} />
          <Route path="users/editor" element={<EditorUsersPage />} />
          <Route path="catalog/services" element={<AdminServicesPage />} />
          <Route path="catalog/products" element={<AdminProductsPage />} />
          <Route path="catalog/categories" element={<AdminCategoryPage />} />
          <Route path="catalog/brands" element={<AdminBrandPage />} />
          <Route path="content/gallery" element={<AdminGalleryPage />} />
          <Route path="content/events" element={<AdminEventsPage />} />
          <Route path="content/testimonials" element={<AdminTestimonialsPage />} />
          <Route path="content/faq" element={<AdminFaqPage />} />
          <Route path="content/team" element={<AdminTeamPage />} />
          <Route path="settings/branches" element={<AdminBranchesPage />} />
          <Route path="settings/company" element={<AdminCompanyInfoPage />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
