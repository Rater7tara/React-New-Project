import axiosClient from './axiosClient';

export const getAllBanners = () => axiosClient.get('banner/all');

export const createBanner = (payload) =>
  axiosClient.post('banner/create', payload);

export const updateBanner = (bannerId, payload) =>
  axiosClient.put(`banner/update/${bannerId}`, payload);

export const deleteBanner = (bannerId) =>
  axiosClient.delete(`banner/delete/${bannerId}`);

export default {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
