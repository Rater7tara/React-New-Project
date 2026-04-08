import React from 'react';
import './DashboardHome.css';
import { Link } from 'react-router-dom';

const STATS = [
  {
    id: 1,
    label: 'Total Revenue',
    value: '৳1,24,500',
    change: '+12.5%',
    trend: 'up',
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <line x1='12' y1='1' x2='12' y2='23' />
        <path d='M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    label: 'Total Orders',
    value: '856',
    change: '+8.3%',
    trend: 'up',
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
        <line x1='3' y1='6' x2='21' y2='6' />
        <path d='M16 10a4 4 0 01-8 0' />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    label: 'Total Products',
    value: '234',
    change: '+5.2%',
    trend: 'up',
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <rect x='3' y='3' width='7' height='7' />
        <rect x='14' y='3' width='7' height='7' />
        <rect x='14' y='14' width='7' height='7' />
        <rect x='3' y='14' width='7' height='7' />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4,
    label: 'Total Customers',
    value: '1,234',
    change: '+18.2%',
    trend: 'up',
    icon: (
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M23 21v-2a4 4 0 00-3-3.87' />
        <path d='M16 3.13a4 4 0 010 7.75' />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
];

const RECENT_ORDERS = [
  { id: '#ORD-1234', customer: 'John Doe', amount: '৳3,200', status: 'Completed', date: '2 hours ago' },
  { id: '#ORD-1233', customer: 'Jane Smith', amount: '৳1,800', status: 'Processing', date: '5 hours ago' },
  { id: '#ORD-1232', customer: 'Mike Johnson', amount: '৳5,400', status: 'Pending', date: '1 day ago' },
  { id: '#ORD-1231', customer: 'Sarah Williams', amount: '৳2,100', status: 'Completed', date: '1 day ago' },
  { id: '#ORD-1230', customer: 'Tom Brown', amount: '৳4,500', status: 'Completed', date: '2 days ago' },
];

const DashboardHome = () => {
  return (
    <div className='dash-home'>
      <div className='dash-home__header'>
        <div>
          <h1 className='dash-home__title'>Dashboard Overview</h1>
          <p className='dash-home__subtitle'>Welcome back! Here's what's happening with your store today.</p>
        </div>
        <Link to='/dashboard/products/add' className='dash-home__action'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className='dash-stats'>
        {STATS.map((stat) => (
          <div key={stat.id} className='dash-stat-card'>
            <div className='dash-stat-card__gradient' style={{ background: stat.gradient }} />
            <div className='dash-stat-card__content'>
              <div className='dash-stat-card__icon' style={{ background: stat.gradient }}>
                {stat.icon}
              </div>
              <div className='dash-stat-card__details'>
                <p className='dash-stat-card__label'>{stat.label}</p>
                <h3 className='dash-stat-card__value'>{stat.value}</h3>
                <span className={`dash-stat-card__change dash-stat-card__change--${stat.trend}`}>
                  <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3'>
                    {stat.trend === 'up' ? (
                      <polyline points='18 15 12 9 6 15' />
                    ) : (
                      <polyline points='6 9 12 15 18 9' />
                    )}
                  </svg>
                  {stat.change} from last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className='dash-section'>
        <div className='dash-section__header'>
          <h2 className='dash-section__title'>Recent Orders</h2>
          <Link to='/dashboard/orders' className='dash-section__link'>View All</Link>
        </div>

        <div className='dash-table-wrap'>
          <table className='dash-table'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td className='dash-table__id'>{order.id}</td>
                  <td>{order.customer}</td>
                  <td className='dash-table__amount'>{order.amount}</td>
                  <td>
                    <span className={`dash-status dash-status--${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className='dash-table__date'>{order.date}</td>
                  <td>
                    <button className='dash-table__action'>
                      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <circle cx='11' cy='11' r='8' />
                        <line x1='21' y1='21' x2='16.65' y2='16.65' />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;
