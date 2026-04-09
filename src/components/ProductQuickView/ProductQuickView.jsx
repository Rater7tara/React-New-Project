import React, { useState } from 'react';
import './ProductQuickView.css';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const ProductQuickView = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize }, quantity);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      duration: 2500,
      position: 'bottom-right',
      style: {
        background: '#1a1a2e',
        color: '#fff',
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: '500',
        borderRadius: '12px',
        padding: '14px 20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.08)',
      },
    });
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) return;
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist!`, {
      icon: '❤️',
      duration: 2500,
      position: 'bottom-right',
      style: {
        background: '#1a1a2e',
        color: '#fff',
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: '500',
        borderRadius: '12px',
        padding: '14px 20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.08)',
      },
    });
  };

  if (!product) return null;

  return (
    <>
      <div className='pqv-overlay' onClick={onClose} />
      <div className='pqv-modal'>
        <button className='pqv-close' onClick={onClose} aria-label='Close'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </button>

        <div className='pqv-content'>
          <div className='pqv-image-wrap'>
            <img src={product.image} alt={product.name} className='pqv-image' />
            {product.badge && (
              <span className={`pqv-badge pqv-badge--${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            )}
          </div>

          <div className='pqv-details'>
            <span className='pqv-category'>{product.category}</span>
            <h2 className='pqv-name'>{product.name}</h2>

            <div className='pqv-price'>
              <span className='pqv-price__current'>৳{product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <>
                  <span className='pqv-price__old'>৳{product.oldPrice.toLocaleString()}</span>
                  <span className='pqv-price__save'>
                    Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <div className='pqv-rating'>
              <div className='pqv-stars'>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width='14' height='14' viewBox='0 0 24 24' fill='#f5a623' stroke='#f5a623' strokeWidth='1'>
                    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                  </svg>
                ))}
              </div>
              <span className='pqv-rating__text'>4.8 (124 reviews)</span>
            </div>

            <p className='pqv-description'>
              Premium quality {product.name.toLowerCase()} crafted with attention to detail.
              Made from high-quality materials for lasting comfort and style. Perfect for any occasion.
            </p>

            <div className='pqv-size'>
              <label className='pqv-size__label'>Size:</label>
              <div className='pqv-size__options'>
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`pqv-size__btn${selectedSize === size ? ' pqv-size__btn--active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className='pqv-quantity'>
              <label className='pqv-quantity__label'>Quantity:</label>
              <div className='pqv-quantity__controls'>
                <button
                  className='pqv-quantity__btn'
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className='pqv-quantity__value'>{quantity}</span>
                <button
                  className='pqv-quantity__btn'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className='pqv-actions'>
              <button className='pqv-btn-cart' onClick={handleAddToCart}>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <path d='M16 10a4 4 0 01-8 0' />
                </svg>
                Add to Cart
              </button>
              <button
                className={`pqv-btn-wish${isInWishlist(product.id) ? ' pqv-btn-wish--active' : ''}`}
                onClick={handleWishlist}
                aria-label='Add to wishlist'
              >
                <svg width='20' height='20' viewBox='0 0 24 24' fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='2'>
                  <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
                </svg>
              </button>
            </div>

            <div className='pqv-features'>
              <div className='pqv-feature'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z' />
                </svg>
                Free Delivery
              </div>
              <div className='pqv-feature'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <polyline points='23 4 23 10 17 10' />
                  <path d='M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15' />
                </svg>
                7-Day Returns
              </div>
              <div className='pqv-feature'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z' />
                  <circle cx='12' cy='10' r='3' />
                </svg>
                Secure Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductQuickView;
