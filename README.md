# MediPortal

Web portal for booking doctor appointments. Patients choose a hospital and department, pick a doctor and an available time slot, and book it. Admins manage hospitals and doctors from a separate panel.

This repository contains the Angular frontend only. It talks to a separate REST API (see [Backend](#backend)).

> Work in progress: some screens (admin patients, admin appointments, hospital details) are still placeholders.

## Features

- **Authentication**: login and registration with JWT. The token is stored in `localStorage` and attached to API requests by an HTTP interceptor.
- **Role-based access**: route guards protect the app and the admin area. Menu items are shown or hidden by an `appPermittedIf` directive based on the user's modules and permissions.
- **Hospitals**: browse hospitals with pagination.
- **Appointment booking**: select department, hospital and doctor, load available time slots, and book an appointment.
- **Admin panel** (`/admin`):
  - Dashboard with a monthly calendar (angular-calendar)
  - Create and edit hospitals
  - Doctor list with pagination and a detail view
- **Profile**: user profile page with role-based menu sections.
- **Contact form** and about page.
- **Translations**: English and Azerbaijani via ngx-translate (`src/assets/i18n`).

## Tech stack

- Angular 20 (standalone components and lazy-loaded modules)
- Angular Material and CDK
- ngx-translate
- angular-calendar with date-fns
- RxJS
- jwt-decode, SweetAlert2
- Karma and Jasmine for unit tests

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
npm start
```

Then open `http://localhost:4200/`.

### Backend

The app expects the API at `http://localhost:4000/`. To change it, edit `src/environments/environment.ts`:

```ts
export const url = {
    baseUrl: 'http://localhost:4000/'
}
```

Endpoints used include `api/auth/login`, `api/auth/register`, `api/hospital`, `api/departments`, `api/doctors`, `api/doctors/getTimeSlots` and `api/appointments`.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the dev server at `localhost:4200` |
| `npm run build` | Production build into `dist/` |
| `npm run watch` | Development build in watch mode |
| `npm test` | Run unit tests with Karma |

## Project structure

```
src/app/
├── modules/          # Feature areas
│   ├── admin/        # Admin panel (dashboard, hospitals, doctors, ...)
│   ├── auth/         # Login and registration
│   ├── bookAppointment/
│   ├── hospital/
│   ├── home/
│   ├── profile/
│   ├── about/
│   └── contact/
├── shared/           # Navbar, sidebar, grid view, error and 404 pages
├── interceptors/     # JWT auth interceptor
├── directives/       # permittedIf directive
├── auth.guard.ts     # Requires login
└── admin-guard.ts    # Requires the Admin module
```
