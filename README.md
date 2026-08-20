# Cashless Landing Page

A responsive, bilingual landing page for **Cashless**, designed to introduce the Cashless ecosystem, direct users to the mobile applications, and provide controlled access to investor resources.

The interface focuses on a minimal fintech aesthetic, subtle motion, responsive behavior, and a clear user journey across desktop and mobile devices.

## Live Website

https://cashless-landing-page.vercel.app

---

## Overview

The Cashless Landing Page serves as a lightweight entry point into the Cashless ecosystem.

The experience includes:

- Cashless brand animation
- English and French language support
- App Store and Google Play access
- Responsive desktop and mobile layouts
- Subtle interface animations and micro-interactions
- Investor access flow
- Protected investor area
- Reduced-motion accessibility support

The visual direction is intentionally minimal, with the Cashless animation acting as the primary visual element and subtle abstract line artwork providing background depth.

---

## Objectives

The project was designed to:

- Present Cashless through a clean and modern digital experience
- Provide a responsive interface across desktop and mobile devices
- Support both English and French audiences
- Direct users toward the Cashless mobile applications
- Provide a structured entry point for investors
- Maintain fast loading and lightweight frontend behavior
- Use restrained motion to make the interface feel polished without overwhelming the content

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- CSS Modules
- React Icons

### Backend

- Next.js Route Handlers
- Server-side environment variables
- HttpOnly cookies
- HMAC-signed investor sessions

### Deployment

- Vercel

No external animation framework is required.

Animations and interactions are implemented using CSS and lightweight React/JavaScript behavior.

---

## Design Principles

The interface follows several core principles:

**Minimalism**  
Only elements that contribute to the user journey are given visual prominence.

**Hierarchy**  
The Cashless animation acts as the primary visual, followed by the headline, supporting copy, application CTAs, and investor access.

**Motion with purpose**  
Animations reinforce hierarchy and interaction rather than functioning as decoration.

**Responsive consistency**  
Desktop and mobile layouts adapt independently while maintaining the same Cashless identity.

**Accessibility**  
Motion preferences, semantic HTML, keyboard-accessible controls, and responsive typography are considered throughout the interface.

---

## Author

**Emma Da Silva**

Junior Full-Stack Developer

GitHub: `emma-dasilva-dev`

---

## Status

Active development.

## Investor portal configuration

The investor portal calls the admin backend only from Next.js route handlers;
these values must stay server-side and must not be prefixed with `NEXT_PUBLIC_`.

```env
CASHLESS_ADMIN_API_URL=https://your-admin-api.example.com
CASHLESS_ADMIN_CLIENT_TOKEN=the-same-server-client-token-as-the-admin-backend
INVESTOR_SESSION_SECRET=a-long-random-secret
```

An administrator creates a one-time invitation through
`POST /api/v1/investor-portal/invitations` with an admin bearer token and an
`x-app-source: web` header. The response contains the code once; only its hash
is stored by the backend. The investor uses the code on `/investors` and is
then kept on the landing page at `/investors/portal`.
