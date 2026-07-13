# Linked Technologies UI/UX Design Guidelines

Purpose: this document defines strict design and UX rules for all future pages so every new screen matches the current website theme, motion system, typography, and usability standards.

How to use with AI: treat this as a required spec, not a suggestion. If a generated design conflicts with this file, this file wins.

## 1) Theme Alignment (Do Not Drift)

Always preserve the existing visual identity.

- Brand primary: #F2911B (orange)
- Dark base: #151719
- Light base: #F7F9FA
- Border neutral: #e2e5e8
- Body text on light bg: #5a5d60
- Body text on dark bg: #b6b9bc or lighter

Rules:

- Do not replace the orange/charcoal palette unless explicitly requested.
- Keep contrast high enough for WCAG AA (normal text >= 4.5:1).
- Avoid low-contrast gray text on dark backgrounds.
- Keep the current industrial-professional aesthetic: sharp, confident, clean.

## 2) Typography System

Use the same font families already used in the project.

- Headings: Roboto Slab
- Body/UI text: Inter
- Eyebrow labels and micro labels: DM Mono

Recommended size scale:

- H1: 40-58px desktop, 32-40px mobile
- H2: 30-40px desktop, 26-32px mobile
- H3: 18-24px
- Body large: 18px
- Body default: 16px
- Body compact: 15px
- Caption/meta: 12-13px
- Tiny mono labels: 10-11px uppercase with letter spacing

Readability rules:

- Base body line-height: around 1.6
- Avoid long unbroken paragraphs; chunk content into short blocks
- Keep paragraph width readable (roughly 55-75 characters where practical)

## 3) Spacing, Layout, and Responsiveness

- Use max container width consistent with current pages: max-w-7xl with horizontal padding.
- Section vertical rhythm: typically py-24 on desktop, reduce on smaller screens if needed.
- Prefer Flex/Grid layouts; avoid absolute positioning unless decorative.
- Keep a consistent small radius style: rounded-sm for cards/buttons/inputs.

Responsive requirements:

- Design mobile-first behavior for all new sections.
- Ensure no text clipping or overlap at 390px width.
- Keep tap targets at least 44px for touch interactions.

## 4) Component and Interaction Guidelines

Buttons:

- Primary CTA: orange fill (#F2911B), white text, hover darkens slightly.
- Secondary CTA: subtle border + hover tint, never stronger than primary.
- One clear primary action per section.

Cards:

- Use subtle border and mild shadow/lift on hover.
- Prefer smooth lift and shadow over aggressive color inversions.

Navigation:

- Keep scroll-spy active state logic for page sections.
- Preserve desktop and mobile nav behavior parity.

Forms:

- Labels are mandatory; placeholders are not labels.
- Keep visible focus styles and clear error/success states.
- Use semantic input types (email, tel, etc.).

## 5) Motion and Animation System

Use purposeful, lightweight motion only.

- Scroll reveal: fade + translateY, smooth easing
- Stagger cards by roughly 80-120ms
- Count-up only for numeric stats
- Hero ambient motion can be slow/subtle (example: gentle zoom)

Motion constraints:

- Respect prefers-reduced-motion and disable non-essential animation.
- Do not use flashy or distracting continuous animations.
- Keep transition durations mostly in the 150-600ms range.

## 6) Icon Guidelines

- Use Lucide icon style consistently.
- Typical icon sizes:
  - Inline/action icons: 14-18px
  - Feature icons in cards: 20-24px
  - Emphasis icons: 26-32px
- Decorative icons should have aria-hidden=true.
- Icons must always support text, not replace clear labels.

## 7) Accessibility and UX Best Practices

Must-haves on every page:

- Logical heading hierarchy (H1 -> H2 -> H3)
- Keyboard-focus visible states (:focus-visible)
- Landmark structure (header, main, footer)
- Sufficient color contrast in every section
- Clear interactive states: default, hover, focus, active, disabled

UX principles:

- Prioritize scanability: concise copy, meaningful section headings
- Keep user journey obvious: value -> proof -> action
- Avoid overcrowding: use whitespace to separate content groups
- Keep consistency across pages in spacing, typography, icon style, and CTA patterns

## 8) Page Composition Blueprint (Recommended)

For any new page, follow this structure where relevant:

1. Intro/Hero with clear page purpose and 1 primary CTA
2. Key information blocks (services/features/content)
3. Trust elements (stats, testimonials, logos, case snippets)
4. Conversion section (contact/action block)
5. Footer

## 9) Implementation Rules for AI

When generating new page UI:

1. Reuse existing section patterns before inventing new visual styles.
2. Reuse existing color tokens and typography choices.
3. Include responsive behavior and focus states in first implementation.
4. Add only meaningful animations.
5. Validate desktop + mobile readability and contrast before finalizing.

Definition of done for a new page:

- Theme-aligned visuals
- Responsive at mobile and desktop
- Accessible focus/contrast/semantics
- Clear hierarchy and CTA
- No style drift from existing pages
