# Sophia Medical Application

A modern medical application built with React, TypeScript, and Cloudflare Workers.

## Live Deployment
- **App**: https://app.jyoung2k.org
- **API**: https://sophia-api.jyoung2k.workers.dev

**Status**: Testing production branch update

🏥 **Live Application**: [app.jyoung2k.org](https://app.jyoung2k.org)  
🌐 **Website**: [www.jyoung2k.org](https://www.jyoung2k.org)  
🔗 **API**: [sophia-api.jyoung2k.workers.dev](https://sophia-api.jyoung2k.workers.dev)

A comprehensive medical application platform built with modern web technologies, featuring AI-powered healthcare agents, patient management systems, and compliance tools. Deployed on Cloudflare's global edge network for optimal performance.

## 🚀 Live Deployment

The Sophia medical application is currently deployed and accessible at:

- **Main Application**: https://app.jyoung2k.org - React-based medical interface with AI agents
- **Marketing Site**: https://www.jyoung2k.org - Landing and information pages  
- **API Backend**: https://sophia-api.jyoung2k.workers.dev - tRPC API with database connectivity

### Features Available
- 🤖 **AI Medical Agents**: Genesis Agent, Care Manager, Quantum Agent, Patient Engagement, Compliance Agent
- 🏥 **Department Management**: Cardiology, Orthopedics, and more
- 📊 **Patient Care Plans**: Comprehensive lifecycle management
- 🔐 **Authentication**: Secure user management with Better Auth
- 📱 **Responsive Design**: Mobile-first interface with modern UI components

## What You Get

- **Performance by Default**: Bun runtime delivers exceptional speed across development and production. Your build times will thank you.
- **Type Safety Throughout**: TypeScript and tRPC create an unbreakable contract between frontend and backend. Catch errors at compile time, not in production.
- **Modern React Stack**: React 19 with TanStack Router provides type-safe navigation and powerful data fetching patterns. Tailwind CSS v4 handles styling with zero configuration.
- **Edge-Native Deployment**: Cloudflare Workers ensure your app runs close to users worldwide. Experience sub-100ms response times globally.
- **Database Ready**: Drizzle ORM with Neon PostgreSQL provides a complete data layer. Multi-tenant support included out of the box.
- **Developer Experience**: ESLint, Prettier, and VSCode configurations eliminate bikeshedding. Focus on features, not formatting.

<a href="https://reactstarter.com/s/1"><img src="https://reactstarter.com/s/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/s/2"><img src="https://reactstarter.com/s/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/s/3"><img src="https://reactstarter.com/s/3.png" height="60" /></a>

---

This project was bootstrapped with [React Starter Kit](https://github.com/kriasoft/react-starter-kit).
Be sure to join our [Discord channel](https://discord.gg/2nKEnKq) for assistance.

## Monorepo Architecture

This starter kit uses a thoughtfully organized monorepo structure that promotes code reuse and maintainability:

- [`apps/app/`](./apps/app) — React 19 application with TanStack Router, Jotai, and Tailwind CSS v4
- [`apps/web/`](./apps/web) — Astro marketing website for static site generation
- [`apps/api/`](./apps/api) — tRPC API server powered by Hono framework
- [`apps/edge/`](./apps/edge) — Cloudflare Workers entry point for edge deployment
- [`packages/core/`](./packages/core) — Shared TypeScript types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components with shadcn/ui management utilities
- [`packages/ws-protocol/`](./packages/ws-protocol) — WebSocket protocol template with type-safe messaging
- [`db/`](./db) — Database schemas, migrations, and seed data
- [`docs/`](./docs) — VitePress documentation site
- [`infra/`](./infra) — Terraform infrastructure configurations for multi-environment deployment
- [`scripts/`](./scripts) — Build automation and development tools

**Why Monorepo?** This structure enables seamless code sharing between frontend and backend, ensures type consistency across your entire stack, and simplifies dependency management. When you update a type definition, both client and server stay in sync automatically.

**Deployment Flexibility:** The API is deployed to Cloudflare Workers (via `apps/edge/`) for global edge computing, ensuring optimal performance worldwide.

## Perfect For

- **SaaS Applications**: Multi-tenant architecture with user management built-in
- **API-First Products**: tRPC provides excellent developer experience for API development
- **Global Applications**: Edge deployment ensures fast loading times worldwide
- **Team Projects**: Monorepo structure scales well with multiple developers
- **Rapid Prototyping**: Skip configuration and start building features immediately

## Technology Stack

**Core Runtime & Platform**

- [Bun](https://bun.sh/) — Lightning-fast JavaScript runtime and package manager
- [Cloudflare Workers](https://workers.cloudflare.com/) — Edge computing platform

### Frontend & UI

- [React 19](https://react.dev/) — Latest React with concurrent features
- [TanStack Router](https://tanstack.com/router) — Type-safe routing with data loading
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful, accessible components
- [Jotai](https://jotai.org/) — Atomic state management
- [Astro](https://astro.build/) — Static site generator for marketing pages

### Backend & API

- [Hono](https://hono.dev/) — Ultra-fast web framework for the edge
- [tRPC](https://trpc.io/) — End-to-end type safety for APIs
- [Better Auth](https://www.better-auth.com/) — Modern authentication solution

### Database & ORM

- [Drizzle ORM](https://orm.drizzle.team/) — TypeScript ORM with excellent DX
- [Neon PostgreSQL](https://neon.tech/) — Serverless PostgreSQL database

### Development Tools

- [Vite](https://vitejs.dev/) — Next-generation frontend tooling
- [Vitest](https://vitest.dev/) — Blazing fast unit testing
- [TypeScript](https://www.typescriptlang.org/) — Static type checking
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) — Code quality and formatting

## Prerequisites

- [Bun](https://bun.sh/) v1.2+ (replaces Node.js and npm)
- [VS Code](https://code.visualstudio.com/) with our [recommended extensions](.vscode/extensions.json)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) browser extension (recommended)
- [Cloudflare account](https://dash.cloudflare.com/sign-up) for deployment

## Quick Start

### 1. Create Your Project

[Generate a new repository](https://github.com/kriasoft/react-starter-kit/generate) from this template, then clone it locally:

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment

Update environment variables in [`.env`](./.env) and `.env.local` files as well as Wrangler configuration in [`wrangler.jsonc`](./apps/edge/wrangler.jsonc).

### 4. Start Development

Open two terminals and run these commands:

**Terminal 1 - Application (React):**

```bash
bun --filter @repo/app dev
```

**Terminal 2 - Backend:**

```bash
bun --filter @repo/edge build --watch
bun wrangler dev
```

For the marketing website:

```bash
bun --filter @repo/web dev
```

### 5. Initialize Database

```bash
# Apply database schema and migrations
bun --filter @repo/db migrate
bun --filter @repo/db seed  # Optional: add sample data
```

Open <http://localhost:5173> to see your React app running. The marketing website runs on <http://localhost:4321>. The backend API will be available at the port shown by `wrangler dev` (typically 8787).

## Production Deployment

The Sophia application is deployed using Cloudflare Workers and Pages with custom domain configuration.

### Current Deployment

```bash
# React Application (Cloudflare Pages)
cd apps/app
bun run build
wrangler pages deploy dist --project-name sophia-app

# API Worker (Cloudflare Workers)  
cd apps/api
wrangler deploy

# Web/Marketing Site (Cloudflare Pages)
cd apps/edge
wrangler pages deploy dist --project-name sophia-web
```

### Infrastructure Management

The infrastructure is managed with Terraform:

```bash
cd infra/environments/preview
terraform plan
terraform apply
```

### Custom Domain Setup

DNS records are configured via Terraform:
- `app.jyoung2k.org` → React application
- `www.jyoung2k.org` → Marketing website  
- `sophia-api.jyoung2k.workers.dev` → API backend

### Environment Variables

Configure these in `.env.local` and Cloudflare Workers:

```bash
# Database
DATABASE_URL=postgresql://...
HYPERDRIVE_ID=...

# Authentication  
BETTER_AUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Cloudflare
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ACCOUNT_ID=...
```

## Contributors 👨‍💻

<a href="https://reactstarter.com/c/1"><img src="https://reactstarter.com/c/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/2"><img src="https://reactstarter.com/c/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/3"><img src="https://reactstarter.com/c/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/4"><img src="https://reactstarter.com/c/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/5"><img src="https://reactstarter.com/c/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/6"><img src="https://reactstarter.com/c/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/7"><img src="https://reactstarter.com/c/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/8"><img src="https://reactstarter.com/c/8.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/9"><img src="https://reactstarter.com/c/9.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/10"><img src="https://reactstarter.com/c/10.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/11"><img src="https://reactstarter.com/c/11.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/12"><img src="https://reactstarter.com/c/12.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/c/13"><img src="https://reactstarter.com/c/13.png" height="60" /></a>

## Backers 💰

<a href="https://reactstarter.com/b/1"><img src="https://reactstarter.com/b/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/2"><img src="https://reactstarter.com/b/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/3"><img src="https://reactstarter.com/b/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/4"><img src="https://reactstarter.com/b/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/5"><img src="https://reactstarter.com/b/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/6"><img src="https://reactstarter.com/b/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/7"><img src="https://reactstarter.com/b/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/8"><img src="https://reactstarter.com/b/8.png" height="60" /></a>

## Related Projects

- [GraphQL API and Relay Starter Kit](https://github.com/kriasoft/graphql-starter) — monorepo template, pre-configured with GraphQL API, React, and Relay
- [Cloudflare Workers Starter Kit](https://github.com/kriasoft/cloudflare-starter-kit) — TypeScript project template for Cloudflare Workers
- [Node.js API Starter Kit](https://github.com/kriasoft/node-starter-kit) — project template, pre-configured with Node.js, GraphQL, and PostgreSQL

## How to Contribute

Anyone and everyone is welcome to [contribute](.github/CONTRIBUTING.md). Start
by checking out the list of [open issues](https://github.com/kriasoft/react-starter-kit/issues)
marked [help wanted](https://github.com/kriasoft/react-starter-kit/issues?q=label:"help+wanted").
However, if you decide to get involved, please take a moment to review the
[guidelines](.github/CONTRIBUTING.md).

## License

Copyright © 2014-present Kriasoft. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/kriasoft/react-starter-kit/blob/main/LICENSE) file.

---

<sup>Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@koistya))
and [contributors](https://github.com/kriasoft/react-starter-kit/graphs/contributors).</sup>
