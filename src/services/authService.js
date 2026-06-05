import api from './api';

const authService = {
  staffLogin: async (username, password) => {
    const response = await api.post('/staffs/login', { username, password });
    return response.data;
  },

  customerLogin: async (email, password) => {
    const response = await api.post('/customers/login', { email, password });
    return response.data;
  },

  customerRegister: async (customerData) => {
    const response = await api.post('/customers/register', customerData);
    return response.data;
  },

  staffRegister: async (staffData) => {
    // Note: Assuming regular staff registration here. Manager requires different endpoint/permissions.
    const response = await api.post('/staffs/register', staffData);
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/staffs/logout');
    } catch (e) {
      // Ignore if it fails
    }
  }
};

export default authService;
