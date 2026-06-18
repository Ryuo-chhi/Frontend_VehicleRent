# 🌐 API Integration & Security Guide

This document describes how the React frontend interacts with the Spring Boot REST API, explaining the networking architecture, request security, session tracking, and endpoint integration.

---

## 1. Connection Architecture

All backend communication flows through a centralized Axios client defined in `src/services/api.js`.

- **Base URL Configuration:** Configured to map target endpoints at `/api` (e.g. `http://localhost:8080/api`).
- **Standard Format:** Requests and responses default to the `application/json` format.

---

## 2. JWT Request Interceptor

To secure requests, the Axios instance intercepts every outgoing HTTP call and automatically injects the user's active session token.

```javascript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

- **Storage:** Upon successful authentication, the JSON Web Token (JWT) is stored in `localStorage` as `token`.
- **Header Structure:** The token is embedded as a standard HTTP Authorization header:
  `Authorization: Bearer <jwt_token>`

---

## 3. Session Eviction (401 Response Interceptor)

If a request fails with an HTTP Status Code `401 Unauthorized` (e.g., token expired, modified, or revoked), the Axios response interceptor automatically triggers a session cleanup:

```javascript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      // Triggers UI logouts or redirects
    }
    return Promise.reject(error);
  }
);
```

---

## 4. Endpoints Mapping Checklist

### 🔑 Authentication Service (`authService.js`)

| Action | HTTP Method | Endpoint | Payload / Parameters |
|---|---|---|---|
| Staff Login | `POST` | `/staffs/login` | `{ username, password }` |
| Customer Login | `POST` | `/customers/login` | `{ email, password }` |
| Customer Register | `POST` | `/customers/register` | `{ name, email, password, phone, ... }` |
| Staff Register | `POST` | `/staffs/register` | `{ username, password, role, ... }` |
| Logout | `POST` | `/staffs/logout` | *None* |

### 🚗 Vehicle Service (`vehicleService.js`)

| Action | HTTP Method | Endpoint | Payload / Parameters |
|---|---|---|---|
| Fetch Fleet | `GET` | `/vehicles` | *None* (Returns all Cars + Motos) |
| Get Vehicle details | `GET` | `/vehicles/{id}` | *Path ID* |
| Create Car | `POST` | `/vehicles/cars` | `{ brand, model, dailyRate, seats, ... }` |
| Create Moto | `POST` | `/vehicles/motos` | `{ brand, model, dailyRate, helmet, ... }` |
| Delete Vehicle | `DELETE` | `/vehicles/{id}` | *Path ID* |

### 📅 Rental Service (`rentalService.js`)

| Action | HTTP Method | Endpoint | Payload / Parameters |
|---|---|---|---|
| Book Vehicle | `POST` | `/rentals` | `{ vehicleId, customerId, rentDays, ... }` |
| Process Return | `POST` | `/rentals/{id}/return` | `{ extraDays, damageFee, returnDate }` |
| Fetch Active Rents | `GET` | `/rentals/active` | *None* |
| Fetch Rental History | `GET` | `/rentals/history` | *None* |
| Get Revenue Stats | `GET` | `/rentals/revenue` | *None* |

---

## 🛡️ Role-Based Route Protection

Endpoints are secured in the Spring Boot backend via role-based rules:
- **Managers / Admin:** Full CRUD access on `/api/vehicles`, `/api/staff`, and stats.
- **Staff:** View vehicles, manage customers, execute rentals (`/api/rentals`), and process returns.
- **Customers:** Access allowed for `/api/vehicles` (viewing) and `/api/customers` endpoints. Access to booking functions checks their specific customer context.
