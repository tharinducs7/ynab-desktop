import apiClient from '../utils/apiClient';

export const createCategory = async (data: any) => {
  return apiClient.post('/categories', data);
};

export const updateCategory = async (id: number, data: any) => {
  return apiClient.put(`/categories/${id}`, data);
};

export const getCategories = async () => {
  return apiClient.get('/categories');
};

export const getCategoryById = async (id: number) => {
  return apiClient.get(`/categories/${id}`);
};

export const getParentCategories = async () => {
  return apiClient.get('/categories-parents');
};

export const deleteCategory = async (id: number) => {
  return apiClient.delete(`/categories/${id}`);
};
