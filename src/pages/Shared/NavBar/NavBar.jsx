import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';

const MENU = [
  {
    label: 'Women',
    columns: [
      { heading: 'Clothing', links: ['Dresses', 'Tops & Blouses', 'Pants', 'Skirts', 'Outerwear'] },
      { heading: 'Occasion', links: ['Casual Wear', 'Office Wear', 'Party & Evening', 'Activewear'] },
      { heading: 'Accessories', links: ['Handbags', 'Scarves', 'Jewellery', 'Sunglasses'] },
    ],
  },
  {
    label: 'Men',
    columns: [
      { heading: 'Clothing', links: ['Shirts', 'T-Shirts', 'Pants & Chinos', 'Suits', 'Outerwear'] },
      { heading: 'Casual', links: ['Polo Shirts', 'Shorts', 'Hoodies', 'Denim'] },
      { heading: 'Accessories', links: ['Belts', 'Caps & Hats', 'Bags', 'Wallets'] },
    ],
  },
  {
    label: 'Baby & Kids',
    columns: [
      { heading: 'Baby (0–2Y)', links: ['Newborn Sets', 'Bodysuits', 'Sleepwear', 'Cardigans'] },
      { heading: 'Kids (3–10Y)', links: ['T-Shirts', 'Dresses', 'Pants', 'School Wear'] },
      { heading: 'Accessories', links: ['Hair Clips', 'Socks', 'Shoes', 'Bags'] },
    ],
  },
  {
    label: 'Accessories',
    columns: [
      { heading: 'Bags', links: ['Tote Bags', 'Shoulder Bags', 'Backpacks', 'Clutches'] },
      { heading: 'Jewellery', links: ['Necklaces', 'Earrings', 'Bracelets', 'Rings'] },
      { heading: 'More', links: ['Belts', 'Hats & Caps', 'Sunglasses', 'Scarves'] },
    ],
  },
  { label: 'Sale', columns: [] },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const leaveTimer = useRef(null);
  const { getCartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const onEnter = (label) => {
    clearTimeout(leaveTimer.current);
    setActiveMenu(label);
  };

  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const activeData = MENU.find((m) => m.label === activeMenu);

  return (
    <>
      <div className='nb-announce'>
        Free delivery on orders over ৳1,500 &nbsp;·&nbsp; New arrivals every week &nbsp;·&nbsp; Code <strong>STYLE10</strong> = 10% off
      </div>

      <header className={`nb-header${scrolled ? ' nb-header--shadow' : ''}`}>
        <div className='nb-wrap'>

          <button
            className={`nb-burger${mobileOpen ? ' nb-burger--x' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label='Menu'
          >
            <span /><span /><span />
          </button>

          <a href='/' className='nb-logo'>
            <span className='nb-logo__dot' />
            <span className='nb-logo__text'>Vougely</span>
          </a>

          <nav className='nb-nav' onMouseLeave={onLeave}>
            {MENU.map((item) => (
              <div key={item.label} className='nb-nav__item' onMouseEnter={() => onEnter(item.label)}>
                <a
                  href={`/${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`nb-nav__link${item.label === 'Sale' ? ' nb-nav__link--sale' : ''}${activeMenu === item.label ? ' nb-nav__link--on' : ''}`}
                >
                  {item.label}
                  {item.columns.length > 0 && (
                    <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                      <polyline points='6 9 12 15 18 9' />
                    </svg>
                  )}
                </a>
              </div>
            ))}

            {activeData && activeData.columns.length > 0 && (
              <div className='nb-mega' onMouseEnter={() => clearTimeout(leaveTimer.current)} onMouseLeave={onLeave}>
                <div className='nb-mega__body'>
                  <div className='nb-mega__cols'>
                    {activeData.columns.map((col) => (
                      <div key={col.heading} className='nb-mega__col'>
                        <p className='nb-mega__col-title'>{col.heading}</p>
                        <ul>
                          {col.links.map((link) => (
                            <li key={link}>
                              <a
                                href={`/${activeData.label.toLowerCase()}/${link.toLowerCase().replace(/[\s&]+/g, '-')}`}
                                className='nb-mega__link'
                              >
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className='nb-mega__promo'>
                      <p className='nb-mega__promo-tag'>New This Week</p>
                      <p className='nb-mega__promo-title'>{activeData.label}<br /><em>Collection</em></p>
                      <a href={`/${activeData.label.toLowerCase()}/new`} className='nb-mega__promo-btn'>Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </nav>

          <div className='nb-icons'>
            <div className='nb-search-wrap'>
              <button className='nb-icon-btn' onClick={() => setSearchOpen(!searchOpen)} aria-label='Search'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <circle cx='11' cy='11' r='8' />
                  <line x1='21' y1='21' x2='16.65' y2='16.65' />
                </svg>
              </button>
              {searchOpen && (
                <div className='nb-search-drop'>
                  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <circle cx='11' cy='11' r='8' />
                    <line x1='21' y1='21' x2='16.65' y2='16.65' />
                  </svg>
                  <input autoFocus type='text' placeholder='Search clothes, accessories…' />
                </div>
              )}
            </div>

            <Link to='/wishlist' className='nb-icon-btn' aria-label='Wishlist'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
              </svg>
            </Link>

            <Link to='/cart' className='nb-icon-btn' aria-label='Cart'>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
                <line x1='3' y1='6' x2='21' y2='6' />
                <path d='M16 10a4 4 0 01-8 0' />
              </svg>
              {getCartCount() > 0 && (
                <span className='nb-cart-badge'>{getCartCount()}</span>
              )}
            </Link>

            <div ref={profileRef} className='nb-profile-wrap'>
              <button className='nb-icon-btn' onClick={() => setProfileOpen(!profileOpen)} aria-label='Profile'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <circle cx='12' cy='8' r='4' />
                  <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' />
                </svg>
              </button>
              {profileOpen && (
                <div className='nb-profile-drop'>
                  <div className='nb-profile-drop__head'>
                    <div className='nb-profile-drop__av'>R</div>
                    <div>
                      <p className='nb-profile-drop__name'>Rafiq Ahmed</p>
                      <p className='nb-profile-drop__mail'>rafiq@email.com</p>
                    </div>
                  </div>
                  <div className='nb-profile-drop__sep' />
                  <a href='/dashboard' className='nb-profile-drop__row nb-profile-drop__row--dash'>
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <rect x='3' y='3' width='7' height='7' /><rect x='14' y='3' width='7' height='7' />
                      <rect x='3' y='14' width='7' height='7' /><rect x='14' y='14' width='7' height='7' />
                    </svg>
                    Dashboard
                  </a>
                  <a href='/orders' className='nb-profile-drop__row'>
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
                      <polyline points='14 2 14 8 20 8' />
                    </svg>
                    My Orders
                  </a>
                  <a href='/wishlist' className='nb-profile-drop__row'>
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
                    </svg>
                    Wishlist
                  </a>
                  <a href='/settings' className='nb-profile-drop__row'>
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <circle cx='12' cy='12' r='3' />
                      <path d='M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z' />
                    </svg>
                    Settings
                  </a>
                  <div className='nb-profile-drop__sep' />
                  <a href='/logout' className='nb-profile-drop__row nb-profile-drop__row--out'>
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4' />
                      <polyline points='16 17 21 12 16 7' />
                      <line x1='21' y1='12' x2='9' y2='12' />
                    </svg>
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {mobileOpen && <div className='nb-overlay' onClick={() => setMobileOpen(false)} />}

      <div className={`nb-drawer${mobileOpen ? ' nb-drawer--open' : ''}`}>
        <div className='nb-drawer__head'>
          <a href='/' className='nb-logo' onClick={() => setMobileOpen(false)}>
            <span className='nb-logo__dot' />
            <span className='nb-logo__text'>Vougely</span>
          </a>
          <button className='nb-drawer__close' onClick={() => setMobileOpen(false)}>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>

        <div className='nb-drawer__search'>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='11' cy='11' r='8' />
            <line x1='21' y1='21' x2='16.65' y2='16.65' />
          </svg>
          <input type='text' placeholder='Search…' />
        </div>

        <div className='nb-drawer__nav'>
          {MENU.map((item) => (
            <div key={item.label} className='nb-drawer__item'>
              <button
                className='nb-drawer__btn'
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
              >
                <span className={item.label === 'Sale' ? 'nb-drawer__btn--sale' : ''}>{item.label}</span>
                {item.columns.length > 0 && (
                  <svg
                    className={`nb-drawer__arrow${mobileExpanded === item.label ? ' nb-drawer__arrow--open' : ''}`}
                    width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                )}
              </button>
              {mobileExpanded === item.label && item.columns.length > 0 && (
                <div className='nb-drawer__sub'>
                  {item.columns.map((col) => (
                    <div key={col.heading}>
                      <p className='nb-drawer__sub-title'>{col.heading}</p>
                      {col.links.map((link) => (
                        <a
                          key={link}
                          href={`/${item.label.toLowerCase()}/${link.toLowerCase().replace(/[\s&]+/g, '-')}`}
                          className='nb-drawer__sub-link'
                          onClick={() => setMobileOpen(false)}
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='nb-drawer__foot'>
          <a href='/dashboard' className='nb-drawer__foot-link nb-drawer__foot-link--dash'>Dashboard</a>
          <a href='/orders' className='nb-drawer__foot-link'>Orders</a>
          <a href='/wishlist' className='nb-drawer__foot-link'>Wishlist</a>
          <a href='/logout' className='nb-drawer__foot-link nb-drawer__foot-link--out'>Logout</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;