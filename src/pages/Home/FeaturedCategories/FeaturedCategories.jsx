import React from 'react';
import './FeaturedCategories.css';

const CATEGORIES = [
  {
    id: 1,
    name: 'Women',
    tagline: 'Elegant & Timeless',
    image: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    link: '/women',
    items: '2,340+ Items',
  },
  {
    id: 2,
    name: 'Men',
    tagline: 'Sharp & Modern',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    link: '/men',
    items: '1,850+ Items',
  },
  {
    id: 3,
    name: 'Baby & Kids',
    tagline: 'Soft & Adorable',
    image: 'https://images.unsplash.com/photo-1617331140180-e8262094733a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGtpZHN8ZW58MHx8MHx8fDA%3D',
    link: '/baby-kids',
    items: '980+ Items',
  },
  {
    id: 4,
    name: 'Accessories',
    tagline: 'Perfect Details',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80',
    link: '/accessories',
    items: '1,240+ Items',
  },
];

const FeaturedCategories = () => {
  return (
    <section className='fc-section'>
      <div className='fc-container'>
        <div className='fc-header'>
          <div className='fc-header__tag'>Shop by Category</div>
          <h2 className='fc-header__title'>
            Find Your <em>Perfect Style</em>
          </h2>
          <p className='fc-header__sub'>
            Explore our curated collections — contemporary fashion for every member of your family
          </p>
        </div>

        <div className='fc-grid'>
          {CATEGORIES.map((cat, index) => (
            <a
              key={cat.id}
              href={cat.link}
              className={`fc-card fc-card--${index === 0 || index === 3 ? 'large' : 'small'}`}
            >
              <img src={cat.image} alt={cat.name} className='fc-card__img' />
              <div className='fc-card__overlay' />
              <div className='fc-card__content'>
                <span className='fc-card__items'>{cat.items}</span>
                <h3 className='fc-card__name'>{cat.name}</h3>
                <p className='fc-card__tagline'>{cat.tagline}</p>
                <span className='fc-card__cta'>
                  Explore Now
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                    <line x1='5' y1='12' x2='19' y2='12' />
                    <polyline points='12 5 19 12 12 19' />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
