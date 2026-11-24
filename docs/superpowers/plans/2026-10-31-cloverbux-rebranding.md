# CloverBux Rebranding (Emerald Charcoal) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the entire application from BlackRedRoblox to cloverbux, establishing a cohesive Emerald Charcoal design system across all pages and components.

**Architecture:** Update CSS variables in Tailwind/globals.css to the deep charcoal (#121614) and vivid emerald (#00B869) palette. Introduce a crisp vector SVG CloverLogo component based on the provided branding mark. Systematically update Navbar, Hero, Game Catalog, Checkout Wizard, Order Tracking, Admin, and Footer components to use the new branding and emerald charcoal styles.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Lucide Icons, TypeScript.

## Global Constraints
- Brand name: `cloverbux` (lowercase wordmark `clover` in charcoal/white + `bux` in emerald `#00B869`).
- Palette: Background `#121614` / `#0f1311`, Surface `#171c19` / `#1c231f`, Border `#28332c`, Accent Emerald `#00B869` / `#10B981` (Tailwind `emerald-500` / `emerald-600`), Text `#F3F4F6` and `#9CA3AF`.
- No lingering `BlackRedRoblox`, `BlackRed`, or red theme borders/backgrounds on standard UI elements.
- Clean TypeScript and Next.js build (`npm run build` must succeed).

---

### Task 1: Design Tokens & CSS Variable Updates

**Files:**
- Modify: `src/app/globals.css`
- Modify: `package.json`

**Interfaces:**
- Consumes: CSS theme tokens in Tailwind v4 `@theme inline`
- Produces: Global CSS variables `--background: #121614`, `--card: #171c19`, `--primary: #00b869`, `--border: #28332c`, etc.

- [ ] **Step 1: Update `package.json` name to `cloverbux`**
- [ ] **Step 2: Update CSS variables in `src/app/globals.css` to dark Emerald Charcoal theme**
- [ ] **Step 3: Verify CSS syntax and package.json validity**

---

### Task 2: Vector Logo Component (`CloverLogo.tsx`)

**Files:**
- Create: `src/components/ui/CloverLogo.tsx`

**Interfaces:**
- Produces: `export function CloverLogo({ variant, className, iconClassName }: CloverLogoProps)`
  - `variant`: `"full"` (symbol + text wordmark) | `"icon"` (symbol only)

- [ ] **Step 1: Implement `src/components/ui/CloverLogo.tsx` with precision SVG geometric 4-leaf clover petals, stem, and `cloverbux` wordmark**
- [ ] **Step 2: Export and test import**

---

### Task 3: Navbar & Layout Rebranding

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `CloverLogo` from `src/components/ui/CloverLogo.tsx`
- Produces: Clean sticky navbar with deep charcoal surface, subtle border, CloverLogo, and emerald CTA button; updated site metadata in `layout.tsx`.

- [ ] **Step 1: Replace BlackRedRoblox and red borders in `src/components/Navbar.tsx` with `CloverLogo` and emerald/charcoal styling**
- [ ] **Step 2: Update document title, description, and metadata in `src/app/layout.tsx`**
- [ ] **Step 3: Verify rendering**

---

### Task 4: Hero, Game Catalog, Trust, and Footer Sections

**Files:**
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/GameCatalogGrid.tsx`
- Modify: `src/components/TrustSection.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `CloverLogo`, Tailwind emerald/charcoal utility classes
- Produces: Homepage sections matching the Emerald Charcoal theme with no red theme remnants.

- [ ] **Step 1: Update `src/components/HeroSection.tsx` banner styling and glow to emerald**
- [ ] **Step 2: Update `src/components/GameCatalogGrid.tsx` category badges, card borders, and hover glow to emerald**
- [ ] **Step 3: Update `src/components/TrustSection.tsx` icons and accent text to emerald**
- [ ] **Step 4: Update `src/components/Footer.tsx` with `CloverLogo`, emerald links, and cloverbux copyright**

---

### Task 5: Checkout Wizard & Order Flow

**Files:**
- Modify: `src/components/checkout/DynamicCheckoutWizard.tsx`
- Modify: `src/app/order/[id]/page.tsx`
- Modify: `src/app/cek-order/page.tsx`
- Modify: `src/app/aktivasi/page.tsx`

**Interfaces:**
- Consumes: Emerald Charcoal UI components
- Produces: Consistent emerald progress indicators, package selection cards, and order tracking timeline.

- [ ] **Step 1: Replace red progress bar, selected package card borders, and CTA buttons in `DynamicCheckoutWizard.tsx` with emerald/charcoal**
- [ ] **Step 2: Update `src/app/order/[id]/page.tsx` status badges, timeline nodes, and WhatsApp contact message with cloverbux branding**
- [ ] **Step 3: Update `src/app/cek-order/page.tsx` search and card accents**
- [ ] **Step 4: Update `src/app/aktivasi/page.tsx` metadata and styling**

---

### Task 6: Admin Panel, Notifications, & Services

**Files:**
- Modify: `src/components/admin/AdminHeader.tsx`
- Modify: `src/app/admin/login/page.tsx`
- Modify: `src/services/defaults.ts`
- Modify: `src/services/telegram.ts`

**Interfaces:**
- Produces: CloverBux admin dashboard header, login branding, and default message templates.

- [ ] **Step 1: Update `src/components/admin/AdminHeader.tsx` brand name and logo badge to cloverbux**
- [ ] **Step 2: Update `src/app/admin/login/page.tsx` heading and branding**
- [ ] **Step 3: Update store name defaults in `src/services/defaults.ts` and `src/services/telegram.ts`**

---

### Task 7: Full Verification & Build Check

**Files:**
- Entire codebase

- [ ] **Step 1: Search codebase for any remaining `BlackRedRoblox` or unwanted red styling**
- [ ] **Step 2: Run `npm run build` to verify zero TypeScript or Next.js build errors**

