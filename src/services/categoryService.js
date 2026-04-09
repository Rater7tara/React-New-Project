import axiosClient from './axiosClient';

export const getAllCategories = () => axiosClient.get('category/all');

export const createCategory = (payload) =>
  axiosClient.post('category/create', payload);

export const updateCategory = (categoryId, payload) =>
  axiosClient.put(`category/update/${categoryId}`, payload);

export const deleteCategory = (categoryId) =>
  axiosClient.delete(`category/delete/${categoryId}`);

export default {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
