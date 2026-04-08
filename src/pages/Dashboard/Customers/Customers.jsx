import React, { useState } from 'react';
import './Customers.css';

// Mock customers data
const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: 'Sakib Rahman',
    email: 'sakib@example.com',
    phone: '+880 1712-345678',
    joinDate: '2023-12-15',
    totalOrders: 12,
    totalSpent: 45600,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Sakib+Rahman&background=667eea&color=fff',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    phone: '+880 1856-234567',
    joinDate: '2024-01-05',
    totalOrders: 8,
    totalSpent: 32400,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Nusrat+Jahan&background=f59e0b&color=fff',
  },
  {
    id: 3,
    name: 'Rakib Hasan',
    email: 'rakib@example.com',
    phone: '+880 1923-456789',
    joinDate: '2023-11-20',
    totalOrders: 15,
    totalSpent: 58900,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Rakib+Hasan&background=10b981&color=fff',
  },
  {
    id: 4,
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    phone: '+880 1634-567890',
    joinDate: '2024-01-10',
    totalOrders: 5,
    totalSpent: 18750,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Fatima+Khan&background=ef4444&color=fff',
  },
  {
    id: 5,
    name: 'Arif Ahmed',
    email: 'arif@example.com',
    phone: '+880 1745-678901',
    joinDate: '2023-10-08',
    totalOrders: 20,
    totalSpent: 72500,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Arif+Ahmed&background=3b82f6&color=fff',
  },
  {
    id: 6,
    name: 'Sadia Islam',
    email: 'sadia@example.com',
    phone: '+880 1567-890123',
    joinDate: '2023-09-25',
    totalOrders: 18,
    totalSpent: 65800,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Sadia+Islam&background=8b5cf6&color=fff',
  },
  {
    id: 7,
    name: 'Mahmud Ali',
    email: 'mahmud@example.com',
    phone: '+880 1812-345678',
    joinDate: '2024-01-12',
    totalOrders: 2,
    totalSpent: 6500,
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=Mahmud+Ali&background=9e9e9a&color=fff',
  },
  {
    id: 8,
    name: 'Rehana Begum',
    email: 'rehana@example.com',
    phone: '+880 1978-234567',
    joinDate: '2023-08-14',
    totalOrders: 25,
    totalSpent: 98200,
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Rehana+Begum&background=c17f3a&color=fff',
  },
];

const STATUSES = ['All', 'active', 'inactive'];

const Customers = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort customers
  let filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'All' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort
  filteredCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'orders') return b.totalOrders - a.totalOrders;
    if (sortBy === 'spent') return b.totalSpent - a.totalSpent;
    if (sortBy === 'date') return new Date(b.joinDate) - new Date(a.joinDate);
    return 0;
  });

  // Calculate stats
  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === 'active').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: Math.round(
      customers.reduce((sum, c) => sum + c.totalSpent, 0) /
        customers.reduce((sum, c) => sum + c.totalOrders, 0)
    ),
  };

  return (
    <div className='customers-page'>
      {/* Header */}
      <div className='customers-header'>
        <div>
          <h1 className='customers-title'>Customers</h1>
          <p className='customers-subtitle'>Manage your customer base • {filteredCustomers.length} customers</p>
        </div>
      </div>

      {/* Controls */}
      <div className='customers-controls'>
        <div className='customers-search'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.35-4.35' />
          </svg>
          <input
            type='text'
            placeholder='Search by name, email or phone...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='customers-search__input'
          />
        </div>

        <div className='customers-filters'>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className='customers-filter'>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='customers-filter'>
            <option value='name'>Sort by Name</option>
            <option value='orders'>Sort by Orders</option>
            <option value='spent'>Sort by Spending</option>
            <option value='date'>Sort by Join Date</option>
          </select>
        </div>
      </div>

      {/* Customers Grid */}
      <div className='customers-grid'>
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className='customer-card'>
            <div className='customer-card__header'>
              <img src={customer.avatar} alt={customer.name} className='customer-card__avatar' />
              <span className={`customer-card__status customer-card__status--${customer.status}`}>
                {customer.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className='customer-card__info'>
              <h3 className='customer-card__name'>{customer.name}</h3>
              <p className='customer-card__email'>{customer.email}</p>
              <p className='customer-card__phone'>{customer.phone}</p>
            </div>

            <div className='customer-card__stats'>
              <div className='customer-stat'>
                <span className='customer-stat__label'>Orders</span>
                <span className='customer-stat__value'>{customer.totalOrders}</span>
              </div>
              <div className='customer-stat'>
                <span className='customer-stat__label'>Total Spent</span>
                <span className='customer-stat__value'>৳{customer.totalSpent.toLocaleString()}</span>
              </div>
            </div>

            <div className='customer-card__footer'>
              <span className='customer-card__date'>Joined {new Date(customer.joinDate).toLocaleDateString('en-GB')}</span>
              <button className='customer-card__btn'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                  <circle cx='12' cy='12' r='3' />
                </svg>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className='customers-empty'>
          <svg width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
            <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
            <circle cx='9' cy='7' r='4' />
            <path d='M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' />
          </svg>
          <h3 className='customers-empty__title'>No customers found</h3>
          <p className='customers-empty__desc'>Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};

export default Customers;
