// src/utils/api.js

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // POST request for login (public route)
  login: async (username, password) => {
    const response = await fetch('/api/staffs/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Login failed');
    }

    const data = await response.json(); // returns { token, message, username, role }
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('role', data.role);
    return data;
  },

  // POST request for signup (public route)
  signup: async (fullname, username, password) => {
    const response = await fetch('/api/staffs/register-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: fullname,
        username: username,
        password: password
      })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Signup failed');
    }

    const data = await response.json();
    return data;
  },

  // Logout utility
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  },

  // Public GET (no auth header needed)
  publicGet: async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('API Request Failed');
    return response.json();
  },

  // Generic secure GET request helper
  get: async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      }
    });

    if (response.status === 401) {
      api.logout();
      window.location.reload();
      throw new Error('Unauthorized');
    }

    if (!response.ok) throw new Error('API Request Failed');
    return response.json();
  },

  // Generic secure POST request helper
  post: async (url, bodyData) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(bodyData)
    });

    if (response.status === 401) {
      api.logout();
      window.location.reload();
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'API Request Failed');
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return null;
  },

  // Generic secure DELETE request helper
  delete: async (url) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader()
      }
    });

    if (response.status === 401) {
      api.logout();
      window.location.reload();
      throw new Error('Unauthorized');
    }

    if (!response.ok) throw new Error('API Request Failed');
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return null;
  },

  // Generic secure PUT request helper
  put: async (url, bodyData) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(bodyData)
    });

    if (response.status === 401) {
      api.logout();
      window.location.reload();
      throw new Error('Unauthorized');
    }

    if (!response.ok) throw new Error('API Request Failed');
    return response.json();
  },

  // ========== DOMAIN-SPECIFIC METHODS ==========

  // Vehicles (public)
  getVehicles: () => api.publicGet('/api/vehicles'),

  // Customers
  getCustomers: () => api.get('/api/customers'),
  registerCustomer: (payload) => api.post('/api/customers', payload),

  // Rentals
  createRental: (payload) => api.post('/api/rentals', payload),
  getActiveRentals: () => api.get('/api/rentals/active'),
  getRentalHistory: () => api.get('/api/rentals/history'),
  getRevenue: () => api.get('/api/rentals/revenue'),
  returnVehicle: (rentId, payload) => api.post(`/api/rentals/${rentId}/return`, payload),

  // Maintenance
  getMaintenanceRecords: () => api.get('/api/maintenance-records'),
  sendToMaintenance: (payload) => api.post('/api/maintenance-records', payload),
  completeMaintenance: (payload) => api.post('/api/maintenance-records/complete', payload),

  // Promotions
  getPromotions: () => api.get('/api/promotions'),
  addPromotion: (payload) => api.post('/api/promotions', payload),

  // Staff
  getStaff: () => api.get('/api/staffs'),
  deleteStaff: (id) => api.delete(`/api/staffs/${id}`),
};
