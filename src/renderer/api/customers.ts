import apiClient from '../utils/apiClient';

export const create = async (data: any) => {
  return apiClient.post('/customers', data);
};

export const update = async (id: number, data: any) => {
  return apiClient.put(`/customers/${id}`, data); // using POST as you instructed
};
