import React from 'react';
import './InstagramFeed.css';

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    likes: '2.4k',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    likes: '3.1k',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
    likes: '1.8k',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    likes: '2.9k',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    likes: '4.2k',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    likes: '3.7k',
  },
];

const InstagramFeed = () => {
  return (
    <section className='ig-section'>
      <div className='ig-container'>
        <div className='ig-header'>
          <div className='ig-header__icon'>
            <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
              <rect x='2' y='2' width='20' height='20' rx='5' />
              <circle cx='12' cy='12' r='4' />
              <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
            </svg>
          </div>
          <h2 className='ig-header__title'>
            Follow Us <em>@GlowBerry</em>
          </h2>
          <p className='ig-header__desc'>
            Get inspired by our community — tag us to be featured
          </p>
        </div>

        <div className='ig-grid'>
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='ig-post'
            >
              <img src={post.image} alt={`Instagram post ${post.id}`} className='ig-post__img' />
              <div className='ig-post__overlay'>
                <div className='ig-post__info'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor' stroke='none'>
                    <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
                  </svg>
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='ig-follow'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'>
            <rect x='2' y='2' width='20' height='20' rx='5' />
            <circle cx='12' cy='12' r='4' />
            <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
          </svg>
          Follow @GlowBerry on Instagram
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;
