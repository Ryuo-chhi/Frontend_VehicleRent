# 🗺️ Component Hierarchy & Architecture Map

This document outlines the UI architecture, routing layouts, and component composition of the React frontend application.

---

## 1. Application Layout & Routing Tree

The application is wrapped within a single-page router and authentication context in `src/App.jsx`.

```
App (Router, AuthProvider)
├── NavBar (Header navigation & trigger login/signup modal)
├── Main Content Container (Dynamic Page Views)
│   ├── Routes (Route definitions)
│   │   ├── Route (path: "/") ──────────────► Home
│   │   │                                       └── Hero
│   │   ├── Route (path: "/vehicles") ────────► Vehicles
│   │   │                                       └── VehicleGrid
│   │   │                                             └── VehicleCard
│   │   │                                                   └── VehicleOverlay (Modal booking form)
│   │   ├── Route (path: "/about") ───────────► About
│   │   │                                       ├── FeatureCardList ──► FeatureCard
│   │   │                                       ├── AboutStat
│   │   │                                       └── DeveloperCard
│   │   ├── Route (path: "/contact") ─────────► Contact
│   │   │                                       ├── ContactCard
│   │   │                                       └── ContactForm
│   │   └── Route (path: "/dashboard") ───────► ProtectedRoute ──► Dashboard
│   │                                                                ├── Profile
│   │                                                                ├── DashboardStats (Active / Completed list)
│   │                                                                └── AdminControls (CRUD tables if Manager)
└── Footer (App footer)
```

---

## 2. Reusable UI Components System

The application separates core UI structures into reusable units:

- **Buttons & Forms:**
  - `Button.jsx`: Styled button with dynamic visual variants (Primary, Secondary, Outline, Danger).
  - `InputWithIcon.jsx`: Standardized text input box with integrated icons.
- **Display Cards:**
  - `VehicleCard.jsx`: Shows single vehicle snapshot (brand, model, class, daily rate, status badge).
  - `FeatureCard.jsx` / `FeatureCardList.jsx`: Used on the About page to showcase system capabilities.
  - `DeveloperCard.jsx`: Team members representation.
  - `ContactCard.jsx`: Informational details cards for support contact paths.
- **Form Controls:**
  - `ContactForm.jsx`: Captures support messages and processes submit inputs.

---

## 3. Session & Authentication Overlays

- **`AuthPage.jsx`**: A modal shell that dynamically toggles between authentication modes.
  - **`Login.jsx`**: Collects credentials (email/username + password) and handles submissions.
  - **`SignUp.jsx`**: Validates new user detail inputs, and signs up new profiles (includes password matching and validation rules).

---

## 4. Protected Routes & State Flow

```
   ┌────────────────────────────────────────────────────────┐
   │                     AuthContext                        │
   │   - Tracks `token`, `user`, `role` in localStorage     │
   │   - Exposes `login()`, `register()`, `logout()`        │
   └────────────────────────────────────────────────────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │    ProtectedRoute     │
                   └───────────────────────┘
                               │
                     Is user logged in?
                     ├── YES ──► Render Dashboard
                     └── NO ───► Redirect to Home / Trigger Login Modal
```

- **`AuthContext.jsx`**: Provides global access to session variables and authorization headers.
- **`ProtectedRoute.jsx`**: Secures administrative and user-restricted views (e.g. `/dashboard`), preventing direct URL access without a valid JWT token.
