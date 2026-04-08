import React, { useState, useEffect, useCallback } from 'react';
import './Banner.css';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80',
    tag: "Women's Collection",
    headline: "Dress for the\nMoment",
    sub: 'Fresh styles for every occasion — elegant, effortless, yours.',
    cta: 'Shop Women',
    ctaLink: '/women',
    ghost: 'View Lookbook',
    ghostLink: '/women/lookbook',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1600&q=80',
    tag: "Men's Edit",
    headline: "Sharp Lines,\nClean Look",
    sub: 'Curated essentials for the modern man — built to impress.',
    cta: 'Shop Men',
    ctaLink: '/men',
    ghost: 'New Arrivals',
    ghostLink: '/men/new',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600&q=80',
    tag: 'Baby & Kids',
    headline: "Little Looks,\nBig Smiles",
    sub: 'Soft fabrics and adorable designs for your tiny ones.',
    cta: 'Shop Baby',
    ctaLink: '/baby-kids',
    ghost: 'Size Guide',
    ghostLink: '/size-guide',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=80',
    tag: 'Accessories',
    headline: "The Detail\nMakes It",
    sub: 'Bags, jewellery, scarves — the finishing touch to every look.',
    cta: 'Shop Accessories',
    ctaLink: '/accessories',
    ghost: 'New In',
    ghostLink: '/accessories/new',
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [dir, setDir] = useState('next');
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index, direction) => {
    if (index === current) return;
    setDir(direction);
    setPrevIndex(current);
    setCurrent(index);
    setTimeout(() => setPrevIndex(null), 650);
  }, [current]);

  const goNext = useCallback(() => {
    goTo((current + 1) % SLIDES.length, 'next');
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, 'prev');
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [goNext, paused]);

  return (
    <section
      className='bn-root'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prevIndex;

        return (
          <div
            key={slide.id}
            className={`bn-slide${isActive ? ` bn-slide--in-${dir}` : ''}${isPrev ? ` bn-slide--out-${dir}` : ''}${!isActive && !isPrev ? ' bn-slide--hidden' : ''}`}
          >
            <img src={slide.image} alt={slide.tag} className='bn-slide__img' />
            <div className='bn-slide__overlay' />
            <div className='bn-slide__content'>
              <span className='bn-slide__tag'>{slide.tag}</span>
              <h1 className='bn-slide__headline'>
                {slide.headline.split('\n').map((line, j) => (
                  <span key={j} className='bn-slide__line'>{line}</span>
                ))}
              </h1>
              <p className='bn-slide__sub'>{slide.sub}</p>
              <div className='bn-slide__btns'>
                <a href={slide.ctaLink} className='bn-btn-fill'><span>{slide.cta}</span></a>
                <a href={slide.ghostLink} className='bn-btn-ghost'>{slide.ghost}</a>
              </div>
            </div>
          </div>
        );
      })}

      <button className='bn-arrow bn-arrow--left' onClick={goPrev} aria-label='Previous'>
        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
          <polyline points='15 18 9 12 15 6' />
        </svg>
      </button>

      <button className='bn-arrow bn-arrow--right' onClick={goNext} aria-label='Next'>
        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
          <polyline points='9 18 15 12 9 6' />
        </svg>
      </button>

      <div className='bn-dots'>
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            className={`bn-dot${i === current ? ' bn-dot--active' : ''}`}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {!paused && <div key={current} className='bn-progress' />}

      <div className='bn-counter'>
        <span className='bn-counter__cur'>{String(current + 1).padStart(2, '0')}</span>
        <span className='bn-counter__sep'>/</span>
        <span className='bn-counter__tot'>{String(SLIDES.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default Banner;