# ExamOracle AI Architecture Audit

## Existing Prototype Inventory

Detected components: AuthScreen, Sidebar, TopNav, BottomNav, Toast, Badge, Skeleton, ProgressBar, Modal, StatCard, CourseCard, PredictionCard, UploadCenter, RiskMeter.

Detected pages: Auth, Dashboard, Courses, Upload Center, AI Predictions, Study Planner, Profile, Settings.

Reusable logic: design tokens, risk colors, file colors, byte formatting, upload validation, page metadata, theme switching, mock auth, mock course analysis, chart transforms, task toggling.

## Key Issues Found

- Monolithic rendering: one client component owned all pages, state, styles, icons, mock data, and routing.
- Performance: Recharts and all screens loaded eagerly; inline functions and style objects caused avoidable re-renders; chart data was recalculated in render paths.
- Responsiveness: two-column grids were used on small screens; chart labels had fixed widths; content was capped at 640px on desktop; modal and nav controls could collide at narrow widths.
- State management: auth, theme, server data, uploads, courses, files, and planner tasks were mixed together with no persistence or cache strategy.
- Data layer: API behavior was simulated directly in UI code, with no environment-based service boundary.
- Accessibility: limited focus treatment, no route semantics, icon-only controls missing consistent labels, and no reduced-motion handling.

## Migration Phases Executed

1. Foundation: created Next.js App Router, TypeScript, Tailwind, global design tokens, shared UI primitives, and domain types.
2. Data architecture: added env-based Axios client, service modules, Zod validators, React Query hooks, Zustand store, localStorage/IndexedDB support, and upload abstractions.
3. Feature extraction: split auth, dashboard, courses, upload, predictions, planner, profile, and settings into route-driven feature modules.
4. SaaS hardening: added route shell, mobile bottom nav, responsive grids, lazy chart imports, validation, empty states, upload progress, and preserved ExamOracle's visual identity.

## Next Hardening Pass

- Replace fallback mock responses with real backend endpoints as they become available.
- Add NextAuth providers and JWT refresh endpoint details once backend auth is finalized.
- Add Playwright visual regression checks at 320, 375, 390, 414, 768, 1024, and 1440px.
- Add integration tests for upload validation, course creation, prediction route states, and offline persistence.
