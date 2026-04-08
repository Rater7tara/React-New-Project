import React from 'react';
import './SpecialOffers.css';

const SpecialOffers = () => {
  return (
    <section className='so-section'>
      <div className='so-container'>
        <div className='so-grid'>
          {/* Large promo 1 */}
          <a href='/sale' className='so-card so-card--large so-card--dark'>
            <img
              src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80'
              alt='Summer Sale'
              className='so-card__img'
            />
            <div className='so-card__overlay' />
            <div className='so-card__content'>
              <span className='so-card__tag'>Limited Time</span>
              <h3 className='so-card__title'>
                Summer Sale
                <br />
                <em>Up to 60% Off</em>
              </h3>
              <p className='so-card__desc'>Refresh your wardrobe with handpicked summer essentials</p>
              <span className='so-card__cta'>
                Shop Sale
                <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                  <line x1='5' y1='12' x2='19' y2='12' />
                  <polyline points='12 5 19 12 12 19' />
                </svg>
              </span>
            </div>
          </a>

          {/* Small promo 1 */}
          <a href='/women/new' className='so-card so-card--light'>
            <img
              src='https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'
              alt='New Arrivals'
              className='so-card__img'
            />
            <div className='so-card__overlay' />
            <div className='so-card__content'>
              <span className='so-card__tag'>Just In</span>
              <h3 className='so-card__title'>New Arrivals</h3>
              <p className='so-card__desc'>Fresh styles added daily</p>
              <span className='so-card__cta'>
                Explore Now
                <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                  <line x1='5' y1='12' x2='19' y2='12' />
                  <polyline points='12 5 19 12 12 19' />
                </svg>
              </span>
            </div>
          </a>

          {/* Small promo 2 */}
          <a href='/accessories' className='so-card so-card--light'>
            <img
              src='https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80'
              alt='Accessories'
              className='so-card__img'
            />
            <div className='so-card__overlay' />
            <div className='so-card__content'>
              <span className='so-card__tag'>Complete Your Look</span>
              <h3 className='so-card__title'>Accessories</h3>
              <p className='so-card__desc'>The perfect finishing touch</p>
              <span className='so-card__cta'>
                Shop Now
                <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                  <line x1='5' y1='12' x2='19' y2='12' />
                  <polyline points='12 5 19 12 12 19' />
                </svg>
              </span>
            </div>
          </a>

          {/* Large promo 2 */}
          <a href='/men' className='so-card so-card--large so-card--dark'>
            <img
              src='https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1200&q=80'
              alt="Men's Collection"
              className='so-card__img'
            />
            <div className='so-card__overlay' />
            <div className='so-card__content'>
              <span className='so-card__tag'>For Him</span>
              <h3 className='so-card__title'>
                Men's Essentials
                <br />
                <em>Sharp & Modern</em>
              </h3>
              <p className='so-card__desc'>Curated pieces for the contemporary gentleman</p>
              <span className='so-card__cta'>
                Shop Men
                <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                  <line x1='5' y1='12' x2='19' y2='12' />
                  <polyline points='12 5 19 12 12 19' />
                </svg>
              </span>
            </div>
          </a>
        </div>

        {/* Newsletter CTA */}
        <div className='so-newsletter'>
          <div className='so-newsletter__content'>
            <div className='so-newsletter__icon'>
              <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                <polyline points='22,6 12,13 2,6' />
              </svg>
            </div>
            <div className='so-newsletter__text'>
              <h4 className='so-newsletter__title'>Get 10% off your first order</h4>
              <p className='so-newsletter__desc'>Subscribe to our newsletter for exclusive deals and early access</p>
            </div>
          </div>
          <form className='so-newsletter__form'>
            <input type='email' placeholder='Enter your email' className='so-newsletter__input' required />
            <button type='submit' className='so-newsletter__btn'>Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
