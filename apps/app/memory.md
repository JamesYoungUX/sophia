# Debugging Memory: Auth/Session Issue (August 2025)

## Current State

- Frontend (`sophia-app`) is deployed via Cloudflare Pages at `app.jyoung2k.org`.
- API Worker is deployed at `api.jyoung2k.org` (custom domain, Cloudflare Worker).
- Environment variable `VITE_API_URL` is set to `https://api.jyoung2k.org` in the Cloudflare Pages dashboard for the frontend project.
- All code references to the API base URL use `import.meta.env.VITE_API_URL` (no hardcoded workers.dev URLs in codebase).
- Session cookie is set correctly for `.jyoung2k.org` with `SameSite=None`, `Secure`, and `HttpOnly`.

## Problem

- Despite all the above, the deployed frontend is still making API requests to `https://sophia-api.jyoung2k.workers.dev` instead of `https://api.jyoung2k.org`.
- This causes the session cookie not to be sent, so authentication always fails and the user is routed to the login page.

## Key Findings

- Cloudflare Pages environment variable is set correctly and deployment is successful.
- Purging cache, hard refresh, and incognito mode do not resolve the issue.
- No hardcoded references to workers.dev in the frontend codebase.
- The build output (JS bundle) may still contain the old domain, suggesting the env var is not being injected at build time.

## Next Steps

1. **Add a debug log to the frontend** (e.g., in `index.tsx`):
   ```js
   console.log("VITE_API_URL at runtime:", import.meta.env.VITE_API_URL);
   ```

   - Deploy and check the browser console in production.
   - If it prints `undefined` or is empty, the env var is not being injected.
2. **Search for fallbacks in code** (e.g., `|| "https://sophia-api.jyoung2k.workers.dev"`).
3. **Check the built JS bundle** in the deployed app for any references to the workers.dev domain.
4. **Ensure all API calls use `import.meta.env.VITE_API_URL`** and not any other variable or fallback.

## If Issue Persists

- Double-check Cloudflare Pages project settings and build logs for variable injection.
- Share screenshots of env var settings and build logs if further help is needed.

---

**This file summarizes the current debugging state and next steps. Use it to quickly resume troubleshooting after a restart.**

