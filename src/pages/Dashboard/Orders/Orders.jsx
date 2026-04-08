import React, { useState } from 'react';
import './Orders.css';

// Mock orders data
const MOCK_ORDERS = [
  {
    id: 'ORD-2024-001',
    customer: 'Sakib Rahman',
    email: 'sakib@example.com',
    date: '2024-01-15',
    items: 3,
    total: 5299,
    status: 'delivered',
    paymentMethod: 'bKash',
  },
  {
    id: 'ORD-2024-002',
    customer: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    date: '2024-01-14',
    items: 2,
    total: 3998,
    status: 'processing',
    paymentMethod: 'Nagad',
  },
  {
    id: 'ORD-2024-003',
    customer: 'Rakib Hasan',
    email: 'rakib@example.com',
    date: '2024-01-14',
    items: 1,
    total: 1299,
    status: 'pending',
    paymentMethod: 'COD',
  },
  {
    id: 'ORD-2024-004',
    customer: 'Fatima Khan',
    email: 'fatima@example.com',
    date: '2024-01-13',
    items: 5,
    total: 8495,
    status: 'delivered',
    paymentMethod: 'Rocket',
  },
  {
    id: 'ORD-2024-005',
    customer: 'Arif Ahmed',
    email: 'arif@example.com',
    date: '2024-01-13',
    items: 2,
    total: 7498,
    status: 'shipped',
    paymentMethod: 'Visa',
  },
  {
    id: 'ORD-2024-006',
    customer: 'Sadia Islam',
    email: 'sadia@example.com',
    date: '2024-01-12',
    items: 4,
    total: 9896,
    status: 'processing',
    paymentMethod: 'Mastercard',
  },
  {
    id: 'ORD-2024-007',
    customer: 'Mahmud Ali',
    email: 'mahmud@example.com',
    date: '2024-01-12',
    items: 1,
    total: 1599,
    status: 'cancelled',
    paymentMethod: 'bKash',
  },
  {
    id: 'ORD-2024-008',
    customer: 'Rehana Begum',
    email: 'rehana@example.com',
    date: '2024-01-11',
    items: 3,
    total: 6297,
    status: 'delivered',
    paymentMethod: 'COD',
  },
];

const STATUSES = ['All', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b' },
  processing: { label: 'Processing', color: '#3b82f6' },
  shipped: { label: 'Shipped', color: '#8b5cf6' },
  delivered: { label: 'Delivered', color: '#10b981' },
  cancelled: { label: 'Cancelled', color: '#ef4444' },
};

const Orders = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <div className='orders-page'>
      {/* Header */}
      <div className='orders-header'>
        <div>
          <h1 className='orders-title'>Orders</h1>
          <p className='orders-subtitle'>Manage and track all customer orders • {filteredOrders.length} orders</p>
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

        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className='orders-filter'>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status === 'All' ? 'All Status' : STATUS_CONFIG[status]?.label || status}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
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
              <tr key={order.id}>
                <td>
                  <span className='orders-table__id'>{order.id}</span>
                </td>
                <td>
                  <div className='orders-table__customer'>
                    <span className='orders-table__name'>{order.customer}</span>
                    <span className='orders-table__email'>{order.email}</span>
                  </div>
                </td>
                <td className='orders-table__date'>{new Date(order.date).toLocaleDateString('en-GB')}</td>
                <td>{order.items}</td>
                <td className='orders-table__total'>৳{order.total.toLocaleString()}</td>
                <td>
                  <span className='orders-payment'>{order.paymentMethod}</span>
                </td>
                <td>
                  <span className={`orders-status orders-status--${order.status}`}>{STATUS_CONFIG[order.status]?.label}</span>
                </td>
                <td>
                  <button className='orders-action-btn' onClick={() => handleViewDetails(order)} title='View Details'>
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

      {/* Empty State */}
      {filteredOrders.length === 0 && (
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
                    <span className='order-info-value'>{selectedOrder.id}</span>
                  </div>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Date:</span>
                    <span className='order-info-value'>{new Date(selectedOrder.date).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Payment Method:</span>
                    <span className='order-info-value'>{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Total Amount:</span>
                    <span className='order-info-value order-info-value--total'>৳{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className='order-details-section'>
                <h3 className='order-details-section__title'>Customer Information</h3>
                <div className='order-details-info'>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Name:</span>
                    <span className='order-info-value'>{selectedOrder.customer}</span>
                  </div>
                  <div className='order-info-item'>
                    <span className='order-info-label'>Email:</span>
                    <span className='order-info-value'>{selectedOrder.email}</span>
                  </div>
                </div>
              </div>

              <div className='order-details-section'>
                <h3 className='order-details-section__title'>Order Status</h3>
                <div className='order-status-update'>
                  <span className={`orders-status orders-status--${selectedOrder.status}`}>
                    {STATUS_CONFIG[selectedOrder.status]?.label}
                  </span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
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
