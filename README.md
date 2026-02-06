# Calendly_Frontend

Frontend for a Calendly-like scheduling application. Built with React and Vite, this project provides pages and UI for user authentication, creating schedules and availabilities, listing meetings, and a public scheduling flow.

## Folder Structure

    ├── App.css
    ├── App.jsx
    ├── assets
    │   └── react.svg
    ├── AuthProvider.jsx
    ├── components
    │   └── ui
    │       ├── avatar.jsx
    │       ├── badge.jsx
    │       ├── button.jsx
    │       ├── card.jsx
    │       ├── drawer.jsx
    │       ├── input.jsx
    │       ├── popover.jsx
    │       ├── select.jsx
    │       ├── separator.jsx
    │       ├── sheet.jsx
    │       ├── sidebar.jsx
    │       ├── skeleton.jsx
    │       ├── tabs.jsx
    │       └── tooltip.jsx
    ├── config
    │   └── index.js
    ├── context
    │   └── AppContext.jsx
    ├── CustomComponents
    │   ├── AvailibilityList.jsx
    │   ├── EmptyState.jsx
    │   ├── GoogleButton.jsx
    │   ├── MeetingItem.jsx
    │   ├── ScheduleCreate.jsx
    │   ├── ScheduleDrawer.jsx
    │   ├── ScheduleDrawerSection.jsx
    │   └── ScheduleListing.jsx
    ├── hooks
    │   ├── ErrorHandler
    │   │   └── useErrorHandler.jsx
    │   └── use-mobile.js
    ├── index.css
    ├── lib
    │   └── utils.js
    ├── main.jsx
    ├── navbar
    │   └── Navbar.jsx
    ├── Pages
    │   ├── Availability.jsx
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Meetings.jsx
    │   ├── PageNotFound.jsx
    │   ├── Profile.jsx
    │   ├── Public.jsx
    │   ├── Redirect.jsx
    │   ├── Register.jsx
    │   └── Scheduling.jsx
    ├── redux
    │   ├── availabilitySlice.js
    │   ├── meetingSlice.js
    │   ├── scheduleSlice.js
    │   └── store.js
    ├── RouteManager
    │   ├── ProtectedRoute.jsx
    │   └── RouteManager.jsx
    ├── Routes
    │   └── routes.js
    ├── services
    │   ├── auth.services.js
    │   ├── availability.services.js
    │   ├── meeting.service.js
    │   ├── schedule.services.js
    │   └── user.services.js
    ├── sidebar
    │   └── AppSidebar.jsx
    └── validations
        └── joi.validate.js

## Features

- User authentication (email/password + Google OAuth button)
- Schedule creation and management
- Availability management
- Meeting booking and listing
- Redux Toolkit for client state (schedules, availability, meetings)
- Design-system primitives under `src/components/ui`

## Tech stack

- React (JSX)
- Vite
- Redux Toolkit
- React Router
- Joi (form validation)
- ESLint

## Quick start

From the project root (`Calendly_Frontend/`):

# install dependencies

npm install

# start dev server (Vite)

npm run dev

# build for production

npm run build

## Environment / configuration

- The frontend expects a backend API. Check `src/config/index.js` for configuration. Typical values you may need to set in your environment or in .env file:

- API_BASE_URL — base URL of your backend API

- If tokens or cookies are used by `AuthProvider.jsx`, ensure the backend CORS and cookie settings allow the frontend origin.

## Project structure (important parts)

- `src/main.jsx` — app entry, mounts React and registers providers (Auth, Redux store, App context)
- `src/App.jsx` — app-level layout and primary router outlet
- `src/RouteManager/` — route wiring and `ProtectedRoute` component
- `src/Pages/` — route-level pages: `Home`, `Login`, `Register`, `Availability`, `Meetings`, `Scheduling`, `Profile`, `Public`, etc.
- `src/CustomComponents/` — scheduling components and UI composites (ScheduleCreate, ScheduleDrawer, MeetingItem, GoogleButton, etc.)
- `src/components/ui/` — design-system primitives (button, input, card, popover...)
- `src/redux/` — Redux Toolkit store and slices (`availabilitySlice`, `meetingSlice`, `scheduleSlice`)
- `src/services/` — API client wrappers for auth, schedules, availability, meetings, and user
- `src/validations/joi.validate.js` — Joi schemas and helpers used for form validation

## Authentication

Authentication is handled by `src/AuthProvider.jsx` and `src/services/auth.services.js`. `AuthProvider` exposes user state and login/logout helpers and is used by `ProtectedRoute.jsx` to guard private pages. Google sign-in is exposed via `src/CustomComponents/GoogleButton.jsx`.

## State & data flow

- UI actions call functions from `src/services/*` to send HTTP requests to the backend.
- Responses are fed into Redux slices or local component state.
- Redux contains the canonical client state for schedules, availability, and meetings.
- The app uses `src/context/AppContext.jsx` for UI-level cross-cutting state not stored in Redux.
