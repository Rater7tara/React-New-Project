import React, { useState } from 'react';
import './Footer.css';

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

const PAYMENTS = [
  {
    name: 'Visa',
    icon: (
      <svg width='40' height='26' viewBox='0 0 48 32' fill='none'>
        <rect width='48' height='32' rx='4' fill='#1434CB'/>
        <path d='M18.5 10.5h-3.2l-2 11h2.4l2-11zm7.6 7.1l1.3-3.6.7 3.6h-2zm2.7 3.9h2.2l-1.9-11h-2c-.5 0-.9.3-1 .7l-3.6 10.3h2.5l.5-1.4h3.1l.2 1.4zm-7-3.6c0-2.9-4-3.1-4-4.4 0-.4.4-.8 1.2-.9.4 0 1.5-.1 2.8.5l.5-2.3c-.7-.3-1.6-.5-2.7-.5-2.5 0-4.3 1.3-4.3 3.2 0 1.4 1.2 2.2 2.2 2.6 1 .5 1.3.8 1.3 1.2 0 .6-.7 1-1.4 1-.9 0-1.7-.2-2.5-.5l-.5 2.4c.8.3 2 .6 3.2.6 2.7 0 4.5-1.3 4.5-3.3z' fill='white'/>
      </svg>
    ),
  },
  {
    name: 'Mastercard',
    icon: (
      <svg width='40' height='26' viewBox='0 0 48 32' fill='none'>
        <rect width='48' height='32' rx='4' fill='#252525'/>
        <circle cx='18' cy='16' r='7' fill='#EB001B'/>
        <circle cx='30' cy='16' r='7' fill='#F79E1B'/>
        <path d='M24 10.5c-1.5 1.3-2.5 3.3-2.5 5.5s1 4.2 2.5 5.5c1.5-1.3 2.5-3.3 2.5-5.5s-1-4.2-2.5-5.5z' fill='#FF5F00'/>
      </svg>
    ),
  },
  {
    name: 'bKash',
    icon: (
      <svg width='40' height='26' viewBox='0 0 48 32' fill='none'>
        <rect width='48' height='32' rx='4' fill='#E2136E'/>
        <text x='24' y='20' fontFamily='Arial' fontSize='11' fontWeight='bold' fill='white' textAnchor='middle'>bKash</text>
      </svg>
    ),
  },
  {
    name: 'Nagad',
    icon: (
      <svg width='40' height='26' viewBox='0 0 48 32' fill='none'>
        <rect width='48' height='32' rx='4' fill='#EE3124'/>
        <text x='24' y='20' fontFamily='Arial' fontSize='10' fontWeight='bold' fill='white' textAnchor='middle'>NAGAD</text>
      </svg>
    ),
  },
  {
    name: 'Rocket',
    icon: (
      <svg width='40' height='26' viewBox='0 0 48 32' fill='none'>
        <rect width='48' height='32' rx='4' fill='#8862A8'/>
        <text x='24' y='20' fontFamily='Arial' fontSize='10' fontWeight='bold' fill='white' textAnchor='middle'>Rocket</text>
      </svg>
    ),
  },
  {
    name: 'COD',
    icon: (
      <svg width='40' height='26' viewBox='0 0 48 32' fill='none'>
        <rect width='48' height='32' rx='4' fill='#2D3436'/>
        <text x='24' y='20' fontFamily='Arial' fontSize='10' fontWeight='bold' fill='white' textAnchor='middle'>COD</text>
      </svg>
    ),
  },
];

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
              {p.icon}
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