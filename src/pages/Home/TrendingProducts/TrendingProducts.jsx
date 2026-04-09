import React, { useState } from 'react';
import './TrendingProducts.css';
import { useCart } from '../../../context/CartContext';
import ProductQuickView from '../../../components/ProductQuickView/ProductQuickView';
import toast from 'react-hot-toast';

const PRODUCTS = [
  {
    id: 1,
    name: 'Silk Midi Dress',
    category: 'Women',
    price: 3299,
    oldPrice: 4999,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    badge: 'Sale',
    isNew: false,
  },
  {
    id: 2,
    name: 'Linen Shirt',
    category: 'Men',
    price: 1899,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    badge: 'New',
    isNew: true,
  },
  {
    id: 3,
    name: 'Cotton Jumpsuit',
    category: 'Kids',
    price: 1499,
    oldPrice: 2199,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80',
    badge: 'Sale',
    isNew: false,
  },
  {
    id: 4,
    name: 'Leather Crossbody',
    category: 'Accessories',
    price: 2899,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    badge: 'Bestseller',
    isNew: false,
  },
  {
    id: 5,
    name: 'Wool Blazer',
    category: 'Women',
    price: 5499,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80',
    badge: 'New',
    isNew: true,
  },
  {
    id: 6,
    name: 'Denim Jacket',
    category: 'Men',
    price: 2699,
    oldPrice: 3499,
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80',
    badge: 'Sale',
    isNew: false,
  },
  {
    id: 7,
    name: 'Knit Cardigan',
    category: 'Kids',
    price: 1299,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=600&q=80',
    badge: 'New',
    isNew: true,
  },
  {
    id: 8,
    name: 'Gold Necklace',
    category: 'Accessories',
    price: 1899,
    oldPrice: 2599,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    badge: 'Sale',
    isNew: false,
  },
];

const TrendingProducts = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const filters = ['All', 'Women', 'Men', 'Kids', 'Accessories'];

  const filteredProducts = filter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  const handleAddToCart = (product) => {
    addToCart(product);
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

  const handleWishlist = (product) => {
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

  return (
    <section className='tp-section'>
      <div className='tp-container'>
        <div className='tp-header'>
          <div className='tp-header__left'>
            <div className='tp-header__tag'>This Week's Picks</div>
            <h2 className='tp-header__title'>
              Trending <em>Right Now</em>
            </h2>
          </div>
          <div className='tp-filters'>
            {filters.map(f => (
              <button
                key={f}
                className={`tp-filter${filter === f ? ' tp-filter--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className='tp-grid'>
          {filteredProducts.map(product => (
            <div key={product.id} className='tp-product'>
              <div className='tp-product__img-wrap'>
                <img src={product.image} alt={product.name} className='tp-product__img' />
                {product.badge && (
                  <span className={`tp-product__badge tp-product__badge--${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </span>
                )}
                <div className='tp-product__actions'>
                  <button
                    className={`tp-product__icon${isInWishlist(product.id) ? ' tp-product__icon--active' : ''}`}
                    onClick={() => handleWishlist(product)}
                    aria-label='Add to wishlist'
                  >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='2'>
                      <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
                    </svg>
                  </button>
                  <button
                    className='tp-product__icon'
                    onClick={() => setSelectedProduct(product)}
                    aria-label='Quick view'
                  >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <circle cx='11' cy='11' r='8' />
                      <line x1='21' y1='21' x2='16.65' y2='16.65' />
                    </svg>
                  </button>
                </div>
                <button
                  className='tp-product__cart'
                  onClick={() => handleAddToCart(product)}
                >
                  <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
                    <line x1='3' y1='6' x2='21' y2='6' />
                    <path d='M16 10a4 4 0 01-8 0' />
                  </svg>
                  Add to Cart
                </button>
              </div>
              <div className='tp-product__info'>
                <span className='tp-product__cat'>{product.category}</span>
                <h3 className='tp-product__name'>{product.name}</h3>
                <div className='tp-product__price'>
                  <span className='tp-product__current'>৳{product.price.toLocaleString()}</span>
                  {product.oldPrice && (
                    <span className='tp-product__old'>৳{product.oldPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='tp-footer'>
          <a href='/shop' className='tp-view-all'>
            View All Products
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <line x1='5' y1='12' x2='19' y2='12' />
              <polyline points='12 5 19 12 12 19' />
            </svg>
          </a>
        </div>
      </div>

      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default TrendingProducts;
