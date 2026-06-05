import api from './api';

const vehicleService = {
  getAllVehicles: async () => {
    const response = await api.get('/vehicles');
    return response.data;
  },

  getVehicleById: async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  createCar: async (carData) => {
    const response = await api.post('/vehicles/cars', carData);
    return response.data;
  },

  createMoto: async (motoData) => {
    const response = await api.post('/vehicles/motos', motoData);
    return response.data;
  },

  deleteVehicle: async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  }
};

export default vehicleService;
