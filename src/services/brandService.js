import axiosClient from './axiosClient';

export const getAllBrands = () => axiosClient.get('brand/all');

export const createBrand = (payload) =>
  axiosClient.post('brand/create', payload);

export const updateBrand = (brandId, payload) =>
  axiosClient.put(`brand/update/${brandId}`, payload);

export const deleteBrand = (brandId) =>
  axiosClient.delete(`brand/delete/${brandId}`);

export default {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
