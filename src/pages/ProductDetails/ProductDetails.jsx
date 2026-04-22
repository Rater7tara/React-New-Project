import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductDetails.css';
import { useCart } from '../../context/CartContext';
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
    description: 'Elevate your wardrobe with this luxurious silk midi dress. Featuring a flattering silhouette and a smooth, flowing fabric that drapes beautifully. Perfect for evening events, date nights, or any occasion where you want to make a statement.',
    material: '100% Mulberry Silk',
    colors: ['#1c1c1a', '#c17f3a', '#8b2252'],
    sku: 'WD-SILK-001',
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
    description: 'A lightweight, breathable linen shirt perfect for warm weather. Relaxed fit with a classic collar design that transitions seamlessly from casual to semi-formal settings. The natural texture of premium linen adds character to any outfit.',
    material: '100% European Linen',
    colors: ['#f7f7f5', '#d8d8d5', '#5a7d9a'],
    sku: 'MS-LIN-002',
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
    description: 'Adorable and comfortable cotton jumpsuit for little ones. Soft, breathable fabric keeps kids cool during play. Easy snap buttons for quick changes. Machine washable and built to withstand active adventures.',
    material: '100% Organic Cotton',
    colors: ['#f5ebe0', '#ffd6e0', '#b5d8cc'],
    sku: 'KD-COT-003',
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
    description: 'Handcrafted leather crossbody bag with adjustable strap and secure magnetic closure. Multiple interior compartments keep your essentials organized. The timeless design pairs effortlessly with any look, from casual weekends to polished workdays.',
    material: 'Full-Grain Leather',
    colors: ['#8b5e3c', '#1c1c1a', '#c17f3a'],
    sku: 'AC-LTH-004',
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
    description: 'A sophisticated wool blazer tailored for a modern, feminine fit. Structured shoulders and a single-button closure create a sharp silhouette. Fully lined for comfort. An essential piece for building a refined, versatile wardrobe.',
    material: 'Italian Wool Blend',
    colors: ['#1c1c1a', '#5a5a56', '#c17f3a'],
    sku: 'WD-WOL-005',
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
    description: 'Classic denim jacket with a modern twist. Medium wash with subtle distressing for an effortlessly cool look. Sturdy metal buttons and reinforced stitching ensure lasting quality. Layer it over tees, hoodies, or button-downs for instant style.',
    material: 'Premium Japanese Denim',
    colors: ['#4a6fa5', '#1c1c1a', '#8b7d6b'],
    sku: 'MS-DNM-006',
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
    description: 'Cozy knit cardigan for little ones, perfect for layering during cooler months. Soft yarn with gentle stretch for easy movement. Cute button details add charm. A wardrobe essential that combines warmth with style.',
    material: 'Soft Merino Wool Blend',
    colors: ['#f5ebe0', '#ffd6e0', '#b5c8a5'],
    sku: 'KD-KNT-007',
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
    description: 'Delicate gold-plated necklace featuring a minimalist pendant design. Hypoallergenic and tarnish-resistant for everyday wear. The adjustable chain length makes it perfect for layering or wearing on its own. Arrives in a premium gift box.',
    material: '18K Gold-Plated Sterling Silver',
    colors: ['#c17f3a', '#e8d5b7', '#f5f5f5'],
    sku: 'AC-GLD-008',
  },
];

const TOAST_STYLE = {
  background: '#1a1a2e',
  color: '#fff',
  fontFamily: "'Outfit', system-ui, sans-serif",
  fontWeight: '500',
  borderRadius: '12px',
  padding: '14px 20px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.08)',
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoaded, setImageLoaded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === Number(id));

  const relatedProducts = product
    ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setImageLoaded(false);
  }, [id]);

  if (!product) {
    return (
      <section className="pd-section">
        <div className="pd-container pd-not-found">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button className="pd-back-btn" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, color: selectedColor }, quantity);
    toast.success(`${product.name} added to cart!`, {
      icon: '\uD83D\uDED2',
      duration: 2500,
      position: 'bottom-right',
      style: TOAST_STYLE,
    });
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) return;
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist!`, {
      icon: '\u2764\uFE0F',
      duration: 2500,
      position: 'bottom-right',
      style: TOAST_STYLE,
    });
  };

  return (
    <section className="pd-section">
      <div className="pd-container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link to="/" className="pd-breadcrumb__link">Home</Link>
          <span className="pd-breadcrumb__sep">/</span>
          <span className="pd-breadcrumb__link">{product.category}</span>
          <span className="pd-breadcrumb__sep">/</span>
          <span className="pd-breadcrumb__current">{product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="pd-main">
          {/* Image Section */}
          <div className="pd-gallery">
            <div className={`pd-gallery__main${imageLoaded ? ' pd-gallery__main--loaded' : ''}`}>
              {product.badge && (
                <span className={`pd-badge pd-badge--${product.badge.toLowerCase()}`}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="pd-discount-tag">-{discount}%</span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="pd-gallery__img"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            {/* Thumbnail-like image variants */}
            <div className="pd-gallery__thumbs">
              {[product.image, product.image, product.image].map((img, i) => (
                <div
                  key={i}
                  className={`pd-gallery__thumb${i === 0 ? ' pd-gallery__thumb--active' : ''}`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="pd-details">
            <div className="pd-details__top">
              <span className="pd-details__category">{product.category}</span>
              {product.isNew && <span className="pd-details__new-tag">New Arrival</span>}
            </div>

            <h1 className="pd-details__name">{product.name}</h1>

            {/* Rating */}
            <div className="pd-rating">
              <div className="pd-rating__stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < 4 ? '#f5a623' : 'none'} stroke="#f5a623" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="pd-rating__text">4.8</span>
              <span className="pd-rating__count">(124 reviews)</span>
            </div>

            {/* Price */}
            <div className="pd-price">
              <span className="pd-price__current">{'\u09F3'}{product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="pd-price__old">{'\u09F3'}{product.oldPrice.toLocaleString()}</span>
              )}
              {discount > 0 && (
                <span className="pd-price__save">Save {discount}%</span>
              )}
            </div>

            {/* Color Selector */}
            <div className="pd-color">
              <label className="pd-label">
                Color: <span className="pd-label__value">
                  {selectedColor === 0 ? 'Default' : `Variant ${selectedColor + 1}`}
                </span>
              </label>
              <div className="pd-color__options">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`pd-color__btn${selectedColor === i ? ' pd-color__btn--active' : ''}`}
                    style={{ '--swatch-color': color }}
                    onClick={() => setSelectedColor(i)}
                    aria-label={`Color ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="pd-size">
              <label className="pd-label">
                Size: <span className="pd-label__value">{selectedSize}</span>
              </label>
              <div className="pd-size__options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`pd-size__btn${selectedSize === size ? ' pd-size__btn--active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="pd-cart-row">
              <div className="pd-quantity__controls">
                <button
                  className="pd-quantity__btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="pd-quantity__value">{quantity}</span>
                <button
                  className="pd-quantity__btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button className="pd-btn-cart" onClick={handleAddToCart}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                Add to Cart
              </button>
              <button
                className={`pd-btn-wish${isInWishlist(product.id) ? ' pd-btn-wish--active' : ''}`}
                onClick={handleWishlist}
                aria-label="Add to wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="pd-features">
              <div className="pd-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <path d="M16 8h4l3 3v5a2 2 0 01-2 2h-1" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Free Delivery</span>
              </div>
              <div className="pd-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                <span>7-Day Returns</span>
              </div>
              <div className="pd-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="pd-meta">
              <div className="pd-meta__item">
                <span className="pd-meta__label">SKU:</span>
                <span className="pd-meta__value">{product.sku}</span>
              </div>
              <div className="pd-meta__item">
                <span className="pd-meta__label">Material:</span>
                <span className="pd-meta__value">{product.material}</span>
              </div>
              <div className="pd-meta__item">
                <span className="pd-meta__label">Category:</span>
                <span className="pd-meta__value">{product.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="pd-tabs">
          <div className="pd-tabs__nav">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button
                key={tab}
                className={`pd-tabs__btn${activeTab === tab ? ' pd-tabs__btn--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="pd-tabs__content">
            {activeTab === 'description' && (
              <div className="pd-tab-panel">
                <p>{product.description}</p>
                <ul className="pd-tab-panel__list">
                  <li>Premium quality materials sourced from trusted suppliers</li>
                  <li>Designed for comfort and style in everyday wear</li>
                  <li>Easy care instructions - machine washable</li>
                  <li>Available in multiple sizes and colors</li>
                </ul>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="pd-tab-panel">
                <div className="pd-review">
                  <div className="pd-review__header">
                    <div className="pd-review__avatar">S</div>
                    <div>
                      <strong className="pd-review__name">Sarah K.</strong>
                      <div className="pd-review__stars">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f5a623" stroke="#f5a623" strokeWidth="1">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="pd-review__text">Absolutely love this! The quality exceeded my expectations. Fits perfectly and the material feels premium. Will definitely order more.</p>
                </div>
                <div className="pd-review">
                  <div className="pd-review__header">
                    <div className="pd-review__avatar">A</div>
                    <div>
                      <strong className="pd-review__name">Ahmed R.</strong>
                      <div className="pd-review__stars">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < 4 ? '#f5a623' : 'none'} stroke="#f5a623" strokeWidth="1">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="pd-review__text">Great product for the price. Shipping was fast and the packaging was excellent. The color is exactly as shown in the pictures.</p>
                </div>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="pd-tab-panel">
                <div className="pd-shipping-info">
                  <div className="pd-shipping-row">
                    <strong>Standard Delivery</strong>
                    <span>3-5 business days - Free on orders above {'\u09F3'}2,000</span>
                  </div>
                  <div className="pd-shipping-row">
                    <strong>Express Delivery</strong>
                    <span>1-2 business days - {'\u09F3'}150</span>
                  </div>
                  <div className="pd-shipping-row">
                    <strong>Returns</strong>
                    <span>Easy 7-day return policy. Items must be unused with original tags.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pd-related">
            <h2 className="pd-related__title">
              You May Also <em>Like</em>
            </h2>
            <div className="pd-related__grid">
              {relatedProducts.map((rp) => (
                <Link to={`/product/${rp.id}`} key={rp.id} className="pd-related__card">
                  <div className="pd-related__img-wrap">
                    <img src={rp.image} alt={rp.name} className="pd-related__img" />
                    {rp.badge && (
                      <span className={`pd-badge pd-badge--${rp.badge.toLowerCase()}`}>
                        {rp.badge}
                      </span>
                    )}
                  </div>
                  <div className="pd-related__info">
                    <span className="pd-related__cat">{rp.category}</span>
                    <h3 className="pd-related__name">{rp.name}</h3>
                    <div className="pd-related__price">
                      <span>{'\u09F3'}{rp.price.toLocaleString()}</span>
                      {rp.oldPrice && (
                        <span className="pd-related__old">{'\u09F3'}{rp.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
