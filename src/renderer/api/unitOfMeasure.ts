import apiClient from '../utils/apiClient';

export const createUnitOfMeasure = async (data: any) => {
  return apiClient.post('/unit_of_measures', data);
};

export const updateUnitOfMeasure = async (id: number, data: any) => {
  return apiClient.put(`/unit_of_measures/${id}`, data); // using POST as you instructed
};
