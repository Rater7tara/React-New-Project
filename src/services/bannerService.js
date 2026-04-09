import axiosClient from './axiosClient';

// Note: when sending FormData, do NOT set Content-Type manually.
// Axios + the browser will set 'multipart/form-data; boundary=...' automatically.
// Manually setting it strips the boundary and breaks server-side parsing.
const isFormData = (payload) =>
  typeof FormData !== 'undefined' && payload instanceof FormData;

const buildConfig = (payload) =>
  isFormData(payload)
    ? { headers: { 'Content-Type': undefined } }
    : undefined;

export const getAllBanners = () => axiosClient.get('banner/all');

export const createBanner = (payload) =>
  axiosClient.post('banner/create', payload, buildConfig(payload));

export const updateBanner = (bannerId, payload) =>
  axiosClient.put(`banner/update/${bannerId}`, payload, buildConfig(payload));

export const deleteBanner = (bannerId) =>
  axiosClient.delete(`banner/delete/${bannerId}`);

export default {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
