/* eslint-disable import/prefer-default-export */
// utils/formHelpers.ts
export const buildItemFormData = (data: any): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key === 'images' && Array.isArray(data.images)) {
      data.images.forEach((file: File) => {
        formData.append('images[]', file);
      });
    } else if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  return formData;
};
