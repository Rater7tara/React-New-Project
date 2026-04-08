import React, { useState } from 'react';
import './DashboardLayout.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/dashboard',
    icon: (
      <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <rect x='3' y='3' width='7' height='7' />
        <rect x='14' y='3' width='7' height='7' />
        <rect x='14' y='14' width='7' height='7' />
        <rect x='3' y='14' width='7' height='7' />
      </svg>
    ),
  },
  {
    id: 'products',
    label: 'Products',
    path: '/dashboard/products',
    icon: (
      <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
        <line x1='3' y1='6' x2='21' y2='6' />
        <path d='M16 10a4 4 0 01-8 0' />
      </svg>
    ),
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/dashboard/orders',
    icon: (
      <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
        <polyline points='14 2 14 8 20 8' />
        <line x1='16' y1='13' x2='8' y2='13' />
        <line x1='16' y1='17' x2='8' y2='17' />
        <polyline points='10 9 9 9 8 9' />
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'Customers',
    path: '/dashboard/customers',
    icon: (
      <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M23 21v-2a4 4 0 00-3-3.87' />
        <path d='M16 3.13a4 4 0 010 7.75' />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/dashboard/settings',
    icon: (
      <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <circle cx='12' cy='12' r='3' />
        <path d='M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z' />
      </svg>
    ),
  },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className='dashboard'>
      {/* Sidebar */}
      <aside className={`dashboard-sidebar${sidebarOpen ? ' dashboard-sidebar--open' : ''}`}>
        <div className='dashboard-sidebar__header'>
          <Link to='/' className='dashboard-logo'>
            <span className='dashboard-logo__dot' />
            <span className='dashboard-logo__text'>GlowBerry</span>
          </Link>
          <button
            className='dashboard-sidebar__toggle'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          </button>
        </div>

        <nav className='dashboard-nav'>
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`dashboard-nav__item${isActive(item.path) ? ' dashboard-nav__item--active' : ''}`}
            >
              <span className='dashboard-nav__icon'>{item.icon}</span>
              <span className='dashboard-nav__label'>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className='dashboard-sidebar__footer'>
          <div className='dashboard-user'>
            <div className='dashboard-user__avatar'>A</div>
            <div className='dashboard-user__info'>
              <p className='dashboard-user__name'>Admin User</p>
              <p className='dashboard-user__role'>Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className='dashboard-main'>
        {/* Top Bar */}
        <header className='dashboard-topbar'>
          <button
            className='dashboard-mobile-toggle'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          </button>

          <div className='dashboard-topbar__search'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
            <input type='text' placeholder='Search products, orders...' />
          </div>

          <div className='dashboard-topbar__actions'>
            <button className='dashboard-topbar__btn'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9' />
                <path d='M13.73 21a2 2 0 01-3.46 0' />
              </svg>
              <span className='dashboard-topbar__badge'>3</span>
            </button>

            <div className='dashboard-topbar__profile'>
              <button
                className='dashboard-topbar__profile-btn'
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className='dashboard-topbar__avatar'>A</div>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className='dashboard-content'>
          <Outlet />
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className='dashboard-overlay'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
