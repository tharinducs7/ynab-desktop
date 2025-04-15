// renderer/utils/apiClient.ts
import httpClient from './httpClient';

/**
 * A wrapper around the httpClient providing common CRUD operations.
 */
const apiClient = {
  get: async (url: string, config: object = {}) => {
    return httpClient.get(url, config);
  },

  post: async (url: string, data: any, config: object = {}) => {
    return httpClient.post(url, data, config);
  },

  put: async (url: string, data: any, config: object = {}) => {
    return httpClient.put(url, data, config);
  },

  patch: async (url: string, data: any, config: object = {}) => {
    return httpClient.patch(url, data, config);
  },

  delete: async (url: string, config: object = {}) => {
    return httpClient.delete(url, config);
  },
};

export default apiClient;

// import apiClient from '../utils/apiClient';

// async function fetchUsers() {
//   try {
//     const response = await apiClient.get('/users');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// }

// export { fetchUsers };
