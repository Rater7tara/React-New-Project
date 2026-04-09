import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import './Orders.css';
import orderService from '../../../services/orderService';
import { successToast, errorToast } from '../../../utils/toastStyles';

const STATUSES = ['All', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b' },
  processing: { label: 'Processing', color: '#3b82f6' },
  shipped: { label: 'Shipped', color: '#8b5cf6' },
  delivered: { label: 'Delivered', color: '#10b981' },
  cancelled: { label: 'Cancelled', color: '#ef4444' },
};

const normalizeOrder = (order) => {
  if (!order) return null;
  const id = order._id || order.id;
  const customerName =
    order.user?.name ||
    order.shippingAddress?.fullName ||
    order.customer ||
    '—';
  const customerEmail =
    order.user?.email || order.shippingAddress?.email || order.email || '—';
  const itemsCount = Array.isArray(order.items)
    ? order.items.reduce((sum, it) => sum + (it.quantity || 1), 0)
    : order.items || 0;
  return {
    ...order,
    _normalizedId: id,
    _customerName: customerName,
    _customerEmail: customerEmail,
    _itemsCount: itemsCount,
    _total: order.totalAmount ?? order.total ?? 0,
    _date: order.createdAt || order.date || null,
    _status: (order.status || 'pending').toLowerCase(),
    _paymentMethod: order.paymentMethod || '—',
  };
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await orderService.getAdminOrders();
      const payload = res?.data;
      const list =
        payload?.data?.orders ||
        payload?.data ||
        payload?.orders ||
        (Array.isArray(payload) ? payload : []);
      const normalized = (Array.isArray(list) ? list : [])
        .map(normalizeOrder)
        .filter(Boolean);
      setOrders(normalized);
    } catch (err) {
      console.error('Failed to load orders:', err);
      setError(err?.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();
    return orders.filter((order) => {
      const matchesSearch =
        !s ||
        (order._normalizedId || '').toLowerCase().includes(s) ||
        (order._customerName || '').toLowerCase().includes(s) ||
        (order._customerEmail || '').toLowerCase().includes(s);
      const matchesStatus =
        selectedStatus === 'All' || order._status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o._status === 'pending').length,
      processing: orders.filter((o) => o._status === 'processing').length,
      delivered: orders.filter((o) => o._status === 'delivered').length,
    };
  }, [orders]);

  const handleViewDetails = (order) => setSelectedOrder(order);
  const handleCloseDetails = () => setSelectedOrder(null);

  const handleUpdateStatus = async (orderId, newStatus) => {
    const prev = orders;
    setUpdatingId(orderId);
    setOrders((list) =>
      list.map((o) =>
        o._normalizedId === orderId ? { ...o, _status: newStatus, status: newStatus } : o
      )
    );
    if (selectedOrder && selectedOrder._normalizedId === orderId) {
      setSelectedOrder({ ...selectedOrder, _status: newStatus, status: newStatus });
    }
    try {
      await orderService.updateOrderStatusAdmin(orderId, newStatus);
      toast.success(`Status updated to ${newStatus}`, successToast);
    } catch (err) {
      console.error('Status update failed:', err);
      setOrders(prev);
      toast.error(
        err?.response?.data?.message || 'Failed to update status',
        errorToast
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (d) => {
    if (!d) return '—';
    try {
      return new Date(d).toLocaleDateString('en-GB');
    } catch {
      return '—';
    }
  };

  return (
    <div className='orders-page'>
      <div className='orders-header'>
        <div>
          <h1 className='orders-title'>Orders</h1>
          <p className='orders-subtitle'>
            Manage and track all customer orders • {filteredOrders.length} of {orders.length}
          </p>
        </div>
        <button
          type='button'
          className='orders-refresh'
          onClick={fetchOrders}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className='orders-stats'>
        <div className='orders-stat'>
          <span className='orders-stat__label'>Total</span>
          <span className='orders-stat__value'>{stats.total}</span>
        </div>
        <div className='orders-stat'>
          <span className='orders-stat__label'>Pending</span>
          <span className='orders-stat__value'>{stats.pending}</span>
        </div>
        <div className='orders-stat'>
          <span className='orders-stat__label'>Processing</span>
          <span className='orders-stat__value'>{stats.processing}</span>
        </div>
        <div className='orders-stat'>
          <span className='orders-stat__label'>Delivered</span>
          <span className='orders-stat__value'>{stats.delivered}</span>
        </div>
      </div>

      {/* Controls */}
      <div className='orders-controls'>
        <div className='orders-search'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.35-4.35' />
          </svg>
          <input
            type='text'
            placeholder='Search by order ID, customer name or email...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='orders-search__input'
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className='orders-filter'
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status === 'All' ? 'All Status' : STATUS_CONFIG[status]?.label || status}
            </option>
          ))}
        </select>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className='orders-empty'>
          <p>Loading orders...</p>
        </div>
      )}

      {!loading && error && (
        <div className='orders-empty'>
          <h3 className='orders-empty__title'>Failed to load</h3>
          <p className='orders-empty__desc'>{error}</p>
          <button
            type='button'
            className='orders-refresh'
            onClick={fetchOrders}
            style={{ marginTop: 16 }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Orders Table */}
      {!loading && !error && filteredOrders.length > 0 && (
        <div className='orders-table-wrap'>
          <table className='orders-table'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._normalizedId}>
                  <td>
                    <span className='orders-table__id'>
                      {order._normalizedId?.slice(-8)}
                    </span>
                  </td>
                  <td>
                    <div className='orders-table__customer'>
                      <span className='orders-table__name'>{order._customerName}</span>
                      <span className='orders-table__email'>{order._customerEmail}</span>
                    </div>
                  </td>
                  <td className='orders-table__date'>{formatDate(order._date)}</td>
                  <td>{order._itemsCount}</td>
                  <td className='orders-table__total'>
                    ৳{Number(order._total).toLocaleString()}
                  </td>
                  <td>
                    <span className='orders-payment'>{order._paymentMethod}</span>
                  </td>
                  <td>
                    <span className={`orders-status orders-status--${order._status}`}>
                      {STATUS_CONFIG[order._status]?.label || order._status}
                    </span>
                  </td>
                  <td>
                    <button
                      className='orders-action-btn'
                      onClick={() => handleViewDetails(order)}
                      title='View Details'
                    >
                      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                        <circle cx='12' cy='12' r='3' />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredOrders.length === 0 && (
        <div className='orders-empty'>
          <svg width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
            <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
            <polyline points='14 2 14 8 20 8' />
          </svg>
          <h3 className='orders-empty__title'>No orders found</h3>
          <p className='orders-empty__desc'>Try adjusting your search or filter</p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className='order-details-modal'>
          <div className='order-details-overlay' onClick={handleCloseDetails} />
          <div className='order-details-container'>
            <div className='order-details-header'>
              <h2 className='order-details-title'>Order Details</h2>
              <button className='order-details-close' onClick={handleCloseDetails}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </button>
            </div>

            <div className='order-details-content'>
              <div className='order-details-section'>
                <h3 className='order-details-section__title'>Order Information</h3>
                <div className='order-details-info'>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Order ID:</span>
                    <span className='order-info-value'>{selectedOrder._normalizedId}</span>
                  </div>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Date:</span>
                    <span className='order-info-value'>{formatDate(selectedOrder._date)}</span>
                  </div>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Payment Method:</span>
                    <span className='order-info-value'>{selectedOrder._paymentMethod}</span>
                  </div>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Total Amount:</span>
                    <span className='order-info-value order-info-value--total'>
                      ৳{Number(selectedOrder._total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className='order-details-section'>
                <h3 className='order-details-section__title'>Customer Information</h3>
                <div className='order-details-info'>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Name:</span>
                    <span className='order-info-value'>{selectedOrder._customerName}</span>
                  </div>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Email:</span>
                    <span className='order-info-value'>{selectedOrder._customerEmail}</span>
                  </div>
                  {selectedOrder.shippingAddress && (
                    <>
                      <div className='order-info-item'>
                        <span className='order-info-label'>Phone:</span>
                        <span className='order-info-value'>
                          {selectedOrder.shippingAddress.phone || '—'}
                        </span>
                      </div>
                      <div className='order-info-item'>
                        <span className='order-info-label'>Address:</span>
                        <span className='order-info-value'>
                          {[
                            selectedOrder.shippingAddress.address,
                            selectedOrder.shippingAddress.city,
                            selectedOrder.shippingAddress.postalCode,
                            selectedOrder.shippingAddress.country,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className='order-details-section'>
                <h3 className='order-details-section__title'>Order Status</h3>
                <div className='order-status-update'>
                  <span className={`orders-status orders-status--${selectedOrder._status}`}>
                    {STATUS_CONFIG[selectedOrder._status]?.label || selectedOrder._status}
                  </span>
                  <select
                    value={selectedOrder._status}
                    onChange={(e) =>
                      handleUpdateStatus(selectedOrder._normalizedId, e.target.value)
                    }
                    disabled={updatingId === selectedOrder._normalizedId}
                    className='order-status-select'
                  >
                    {Object.keys(STATUS_CONFIG).map((status) => (
                      <option key={status} value={status}>
                        {STATUS_CONFIG[status].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
