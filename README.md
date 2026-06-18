# 🚗 Vehicle Rental Management System — React Frontend

## 🎓 Project Origin & Academic Context

**VehicleRent** is a React frontend application built as a final project for **Term 2, Year 2 of Frontend course**. The primary academic objective of this project is to construct a modern, responsive user interface utilizing the **Vite** build environment, **Tailwind CSS (v4)**, and other micro-libraries (such as `react-icons` and `lucide-react`). 

It serves as the visual companion to the Vehicle Rental Management System (VRMS) backend, which originated as a Java Console-based project for the Term 2 Object-Oriented Programming (OOP) course and was later evolved into a Spring Boot REST API. Connecting these two applications brings the entire client-facing and staff-administrative workflows to life in a cohesive, end-to-end web environment.

## 📄 Project Documentation

Additional architectural and integration details are organized as follows:
- **[API Integration & Security Guide](./docs/api_integration.md):** Maps how React services connect to backend endpoints and how JWT is handled.
- **[Component Hierarchy & Architecture Map](./docs/component_hierarchy.md):** Details routing paths, page hierarchies, and user session flows.

---

## 🛠️ Technology Stack

- **Core Framework:** React 19 (built on Vite for rapid development and optimized bundling)
- **Styling:** Tailwind CSS v4 (utilizing utility-first styling and modernized configurations)
- **Routing:** React Router v7 (`react-router-dom`)
- **HTTP Client:** Axios (configured with interceptors to automatically attach JWT authorization headers)
- **Feedback & Icons:** React Hot Toast (for visual warnings and success alerts) and Lucide React / React Icons (for icons)

---

## 📁 Project Structure

```
src/
├── main.jsx                 ← Application entry point & mounting context
├── App.jsx                  ← Route definitions & Authentication Provider wrapping
├── components/              ← Reusable global components
│   ├── AuthPage.jsx         ← Dual-login/signup overlay module (Staff + Customer)
│   └── ProtectedRoute.jsx   ← Route guard checking user auth before dashboard access
├── context/                 ← React Context providers
│   └── AuthContext.jsx      ← Session holder, login/logout functions, and profile cache
├── services/                ← Backend API communication layer (Axios)
│   ├── api.js               ← Axios instance with request headers & token interceptors
│   ├── authService.js       ← Login/register pathways linking database schemas
│   ├── vehicleService.js    ← Fetching fleet inventory & sorting logic
│   └── rentalService.js     ← Submitting booking transactions & returns
├── sections/                ← UI structural blocks
│   ├── NavBar.jsx           ← Responsive header with navigation links & session controls
│   └── Footer.jsx           ← App footer
└── pages/                   ← Main routed views
    ├── Home.jsx             ← Splash landing screen
    ├── Vehicles.jsx         ← Search, filter, and vehicle booking cards grid
    ├── About.jsx            ← Project overview & team roles
    ├── Contact.jsx          ← Support/contact form
    └── Dashboard.jsx        ← Interactive admin/customer dashboard (booking logs, stats)
```

---

## 🌐 Environment Setup

The application communicates with the backend Spring Boot REST API through configuration variables. Copy the `.env.example` file to create a `.env` file in the root directory:

```bash
VITE_API_BASE=http://localhost:8080
```

* **Note:** Change this URL if the backend API is deployed on a different host or port.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn**

### 2. Installation
Install all dependencies using npm:
```bash
npm install
```

### 3. Running Locally
Start the Vite development server:
```bash
npm run dev
```
By default, the server runs at [http://localhost:5173](http://localhost:5173).

### 4. Production Build
To build the application for deployment:
```bash
npm run build
```
This generates a production-ready bundle in the `dist/` directory.

---

## 🔐 Authentication & Session Design

- **Dual-role Authentication:** Supports logins for both **Staff/Managers** (admin features) and **Customers** (view and book personal rentals) through the same interface.
- **Persistent Sessions:** User details and JSON Web Tokens (JWT) are saved securely in `localStorage`. 
- **Request Interceptor:** Every request passing through `api.js` automatically embeds the token:
  `Authorization: Bearer <JWT_TOKEN>`
- **Route Protection:** Direct URL access to private dashboards (e.g., `/dashboard`) is blocked for unauthenticated users via the `<ProtectedRoute>` component.
