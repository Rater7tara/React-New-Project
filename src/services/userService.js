import axiosClient from './axiosClient';

export const getAllUsers = () => axiosClient.get('user/all');

export const getMyProfile = () => axiosClient.get('user/profile');

export const updateMyProfile = (payload) =>
  axiosClient.put('user/profile', payload);

export const updateUserRole = (userId, role) =>
  axiosClient.patch(`user/users/${userId}/role`, { role });

export const toggleBlockUser = (userId) =>
  axiosClient.patch(`user/block/${userId}`);

export const deleteUser = (userId) =>
  axiosClient.delete(`user/delete/${userId}`);

export default {
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  updateUserRole,
  toggleBlockUser,
  deleteUser,
};
