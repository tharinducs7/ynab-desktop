import apiClient from '../utils/apiClient';

export const create = async (data: any) => {
  return apiClient.post('/suppliers', data);
};

export const update = async (id: number, data: any) => {
  return apiClient.put(`/suppliers/${id}`, data); // using POST as you instructed
};
