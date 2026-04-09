import axiosClient from './axiosClient';

export const getAdminOrders = () => axiosClient.get('order/admin/all-orders');

export const updateOrderStatusAdmin = (orderId, status) =>
  axiosClient.put(`order/admin/${orderId}`, { status });

export const getMyOrders = () => axiosClient.get('order/my-orders');

export const getMyOrderById = (orderId) =>
  axiosClient.get(`order/my-orders/${orderId}`);

export const placeOrder = (payload) =>
  axiosClient.post('order/place-order', payload);

export default {
  getAdminOrders,
  updateOrderStatusAdmin,
  getMyOrders,
  getMyOrderById,
  placeOrder,
};
