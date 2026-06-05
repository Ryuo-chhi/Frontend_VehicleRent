import api from './api';

const rentalService = {
  createRental: async (rentalData) => {
    const response = await api.post('/rentals', rentalData);
    return response.data;
  },

  returnVehicle: async (id, returnData) => {
    const response = await api.post(`/rentals/${id}/return`, returnData);
    return response.data;
  },

  getActiveRentals: async () => {
    const response = await api.get('/rentals/active');
    return response.data;
  },

  getRentalHistory: async () => {
    const response = await api.get('/rentals/history');
    return response.data;
  },

  getRevenue: async () => {
    const response = await api.get('/rentals/revenue');
    return response.data;
  }
};

export default rentalService;
