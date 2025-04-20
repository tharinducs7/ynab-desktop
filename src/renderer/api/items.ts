// services/items.ts
import apiClient from '../utils/apiClient';
import { buildItemFormData } from '../utils/formHelpers';

export const create = async (data: any) => {
  const formData = buildItemFormData(data);
  return apiClient.post('/items', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const update = async (id: number, data: any) => {
  const formData = buildItemFormData(data);
  formData.append('_method', 'PUT'); // Laravel-compatible PUT override
  return apiClient.post(`/items/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
