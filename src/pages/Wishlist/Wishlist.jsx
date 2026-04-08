import React from 'react';
import './Wishlist.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };

  const handleRemove = (itemId) => {
    removeFromWishlist(itemId);
  };

  if (wishlist.length === 0) {
    return (
      <div className='wishlist-empty'>
        <div className='wishlist-empty__content'>
          <svg width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
            <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
          </svg>
          <h2 className='wishlist-empty__title'>Your Wishlist is Empty</h2>
          <p className='wishlist-empty__desc'>Save your favorite items here for later</p>
          <Link to='/' className='wishlist-empty__btn'>Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='wishlist-page'>
      <div className='wishlist-container'>
        <div className='wishlist-header'>
          <h1 className='wishlist-title'>My Wishlist</h1>
          <p className='wishlist-count'>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className='wishlist-grid'>
          {wishlist.map((item) => (
            <div key={item.id} className='wishlist-card'>
              <button
                className='wishlist-card__remove'
                onClick={() => handleRemove(item.id)}
                aria-label='Remove from wishlist'
              >
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </button>

              {item.badge && (
                <span className={`wishlist-card__badge wishlist-card__badge--${item.badge.toLowerCase()}`}>
                  {item.badge}
                </span>
              )}

              <div className='wishlist-card__img-wrap'>
                <img src={item.image} alt={item.name} className='wishlist-card__img' />
              </div>

              <div className='wishlist-card__info'>
                <span className='wishlist-card__category'>{item.category}</span>
                <h3 className='wishlist-card__name'>{item.name}</h3>
                <div className='wishlist-card__price'>
                  <span className='wishlist-card__current'>৳{item.price.toLocaleString()}</span>
                  {item.oldPrice && (
                    <span className='wishlist-card__old'>৳{item.oldPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>

              <button
                className='wishlist-card__cart'
                onClick={() => handleAddToCart(item)}
              >
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <path d='M16 10a4 4 0 01-8 0' />
                </svg>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
