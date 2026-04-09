import React, { useState } from 'react';
import './Footer.css';
import cod from '../../../assets/payment/cod.png';
import visa from '../../../assets/payment/visa.png';
import card from '../../../assets/payment/card.png';
import nagad from '../../../assets/payment/nagad.png';
import bkash from '../../../assets/payment/bkash.png';
import rocket from '../../../assets/payment/rocket.png';
import mastercard from '../../../assets/payment/mastercard.png';

const LINKS = [
  {
    heading: 'Shop',
    items: [
      { label: 'Women', href: '/women' },
      { label: 'Men', href: '/men' },
      { label: 'Baby & Kids', href: '/baby-kids' },
      { label: 'Accessories', href: '/accessories' },
      { label: 'Sale', href: '/sale' },
      { label: 'New Arrivals', href: '/new' },
    ],
  },
  {
    heading: 'Help',
    items: [
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'Shipping & Returns', href: '/shipping' },
      { label: 'Track My Order', href: '/track' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Affiliates', href: '/affiliates' },
    ],
  },
];

const SOCIALS = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
        <rect x='2' y='2' width='20' height='20' rx='5' />
        <circle cx='12' cy='12' r='4' />
        <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
        <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
        <path d='M9 12a4 4 0 104 4V4a5 5 0 005 5' />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    href: '#',
    icon: (
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
        <path d='M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.18-.77 1.19-5.03 1.19-5.03s-.3-.61-.3-1.51c0-1.41.82-2.47 1.84-2.47.87 0 1.29.65 1.29 1.43 0 .87-.56 2.18-.84 3.39-.24 1.01.49 1.84 1.46 1.84 1.75 0 3.1-1.84 3.1-4.5 0-2.35-1.69-3.99-4.1-3.99-2.79 0-4.43 2.09-4.43 4.25 0 .84.32 1.74.73 2.23.07.09.08.17.06.26-.07.31-.24.98-.27 1.12-.04.18-.14.22-.33.13-1.25-.58-2.03-2.42-2.03-3.9 0-3.16 2.3-6.07 6.63-6.07 3.48 0 6.19 2.48 6.19 5.8 0 3.46-2.18 6.24-5.2 6.24-1.02 0-1.97-.53-2.3-1.15l-.62 2.38c-.23.87-.84 1.96-1.25 2.63.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z' />
      </svg>
    ),
  },
];

// Payment method icon images — loaded from src/assets/payment/
// Supported files: visa, mastercard, bkash, nagad, rocket, cod (png/jpg/svg/webp)
// Vite's import.meta.glob will eager-load whatever images you put in that folder.
const paymentImages = import.meta.glob(
  '../../../assets/payment/*.{png,jpg,jpeg,svg,webp}',
  { eager: true, import: 'default' }
);

const resolvePaymentImage = (key) => {
  const entry = Object.entries(paymentImages).find(([path]) =>
    path.toLowerCase().includes(`/${key.toLowerCase()}.`)
  );
  return entry ? entry[1] : null;
};

const PAYMENTS = [
  { name: 'Visa', key: 'visa' },
  { name: 'Mastercard', key: 'mastercard' },
  { name: 'bKash', key: 'bkash' },
  { name: 'Nagad', key: 'nagad' },
  { name: 'Rocket', key: 'rocket' },
  { name: 'COD', key: 'cod' },
].map((p) => ({ ...p, src: resolvePaymentImage(p.key) }));

const Footer = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setDone(true);
      setEmail('');
    }
  };

  return (
    <footer className='ft-root'>
      <div className='ft-main'>
        <div className='ft-brand'>
          <a href='/' className='ft-brand__logo'>
            <span className='ft-brand__dot' />
            <span className='ft-brand__name'>GlowBerry</span>
          </a>
          <p className='ft-brand__tagline'>
            Contemporary fashion for the whole family — curated with care, delivered to your door.
          </p>

          <div className='ft-newsletter'>
            <p className='ft-newsletter__label'>Get 10% off your first order</p>
            {done ? (
              <p className='ft-newsletter__done'>✓ You're subscribed! Check your inbox.</p>
            ) : (
              <form className='ft-newsletter__form' onSubmit={handleSubmit}>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                  className='ft-newsletter__input'
                />
                <button type='submit' className='ft-newsletter__btn'>Subscribe</button>
              </form>
            )}
          </div>

          <div className='ft-socials'>
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} className='ft-social' aria-label={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {LINKS.map((col) => (
          <div key={col.heading} className='ft-col'>
            <p className='ft-col__heading'>{col.heading}</p>
            <ul className='ft-col__list'>
              {col.items.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className='ft-col__link'>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='ft-bottom'>
        <p className='ft-bottom__copy'>© {new Date().getFullYear()} GlowBerry. All rights reserved.</p>
        <div className='ft-payments'>
          <span className='ft-payments__label'>We Accept:</span>
          {PAYMENTS.map((p) => (
            <div key={p.name} className='ft-payment' title={p.name}>
              {p.src ? (
                <img
                  src={p.src}
                  alt={p.name}
                  className='ft-payment__img'
                  loading='lazy'
                />
              ) : (
                <span className='ft-payment__label'>{p.name}</span>
              )}
            </div>
          ))}
        </div>
        <div className='ft-legal'>
          <a href='/privacy' className='ft-legal__link'>Privacy Policy</a>
          <a href='/terms' className='ft-legal__link'>Terms</a>
          <a href='/cookies' className='ft-legal__link'>Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;