# Sophia v2 Scratchpad

## Completed/Active Tasks

- [x] Login page UI created using shadcn/ui (login-02), with Google login button, right-side placeholder, and better-auth integration scaffolded.
- [x] SSO button added to login page (placeholder, ready for future logic)
- [x] Sophia logo (SVG) placed and resized at top left of page, responsive
- [x] Favicon and branding updated (SVG favicon, logo usage)
- [x] Custom breakpoints (3xl, 4xl) fully integrated in Tailwind config (JS)
- [x] Removed sign-up and invitation text; replaced with SSO button
- [x] Removed helper text and email placeholder for a cleaner login form
- [x] Login page is a true gate before the app UI (blocks all routes until login)
- [x] All changes follow best practices for modern React, Tailwind, and monorepo structure
- [x] TanStack Router Devtools import and package updated to @tanstack/react-router-devtools (deprecation warning resolved)
- [x] npm workspace protocol error (EUNSUPPORTEDPROTOCOL) acknowledged and resolved by using Bun for dependency management
- [x] React error (object as child) in login form fixed: error rendering now only displays strings

## Running Todos

- [in_progress] Email login integration: Set up better-auth to work with the login page (email/password flow first, with error handling)
- [ ] SSO/Google login integration: Add Google login via better-auth after email login is working
- [ ] Build invitation flow (backend + UI for invite-only onboarding)
- [ ] Authenticated app shell (show dashboard after login, session management)
- [ ] Accessibility & UX polish (focus states, ARIA, error feedback)
- [ ] Add unit/integration tests for login and UI
- [ ] Ensure mobile responsiveness for all breakpoints, including 3xl/4xl

## Error/Warning Itemization (to resolve one at a time)

1. [x] React error: "Objects are not valid as a React child (found: object with keys {status, statusText})" — Fix error rendering in login form to only display strings.
2. [ ] Better Auth 500 error: `/api/auth/get-session` returns 500 (Internal Server Error) — Check API implementation, backend status, and Vite proxy/API_ORIGIN config.
