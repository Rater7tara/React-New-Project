import React from 'react';
import './Features.css';

const FEATURES = [
  {
    id: 1,
    icon: (
      <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
        <path d='M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z' />
        <path d='M8 21V7h8v14' />
      </svg>
    ),
    title: 'Free Delivery',
    desc: 'On orders over ৳1,500 — fast shipping across Bangladesh',
  },
  {
    id: 2,
    icon: (
      <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
        <path d='M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z' />
        <circle cx='12' cy='10' r='3' />
      </svg>
    ),
    title: 'Secure Payment',
    desc: 'Multiple payment options with 100% secure checkout',
  },
  {
    id: 3,
    icon: (
      <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
        <polyline points='23 4 23 10 17 10' />
        <polyline points='1 20 1 14 7 14' />
        <path d='M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15' />
      </svg>
    ),
    title: 'Easy Returns',
    desc: '7-day hassle-free return policy on all items',
  },
  {
    id: 4,
    icon: (
      <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
        <path d='M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' />
        <path d='M8 10h.01M12 10h.01M16 10h.01' />
      </svg>
    ),
    title: '24/7 Support',
    desc: 'Dedicated customer service always here to help',
  },
];

const Features = () => {
  return (
    <section className='feat-section'>
      <div className='feat-container'>
        <div className='feat-grid'>
          {FEATURES.map((feature) => (
            <div key={feature.id} className='feat-card'>
              <div className='feat-card__icon'>{feature.icon}</div>
              <h3 className='feat-card__title'>{feature.title}</h3>
              <p className='feat-card__desc'>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
