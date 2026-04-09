import axiosClient from './axiosClient';

export const getAllProducts = () => axiosClient.get('product/all');

export const getProductById = (productId) =>
  axiosClient.get(`product/${productId}`);

export const createProduct = (payload) =>
  axiosClient.post('product/create', payload);

export const updateProduct = (productId, payload) =>
  axiosClient.put(`product/update/${productId}`, payload);

export const deleteProduct = (productId) =>
  axiosClient.delete(`product/delete/${productId}`);

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
