import React from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className='cart-empty'>
        <div className='cart-empty__content'>
          <svg width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
            <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
            <line x1='3' y1='6' x2='21' y2='6' />
            <path d='M16 10a4 4 0 01-8 0' />
          </svg>
          <h2 className='cart-empty__title'>Your Cart is Empty</h2>
          <p className='cart-empty__desc'>Looks like you haven't added anything to your cart yet</p>
          <Link to='/' className='cart-empty__btn'>Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='cart-page'>
      <div className='cart-container'>
        <div className='cart-header'>
          <h1 className='cart-title'>Shopping Cart</h1>
          <button className='cart-clear' onClick={clearCart}>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <polyline points='3 6 5 6 21 6' />
              <path d='M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' />
            </svg>
            Clear Cart
          </button>
        </div>

        <div className='cart-content'>
          <div className='cart-items'>
            {cart.map((item) => (
              <div key={item.id} className='cart-item'>
                <div className='cart-item__img-wrap'>
                  <img src={item.image} alt={item.name} className='cart-item__img' />
                </div>

                <div className='cart-item__details'>
                  <div className='cart-item__info'>
                    <span className='cart-item__category'>{item.category}</span>
                    <h3 className='cart-item__name'>{item.name}</h3>
                    {item.size && <span className='cart-item__size'>Size: {item.size}</span>}
                  </div>

                  <div className='cart-item__actions'>
                    <div className='cart-item__quantity'>
                      <button
                        className='cart-item__qty-btn'
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className='cart-item__qty-value'>{item.quantity}</span>
                      <button
                        className='cart-item__qty-btn'
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className='cart-item__price'>
                      <span className='cart-item__price-value'>৳{(item.price * item.quantity).toLocaleString()}</span>
                      {item.quantity > 1 && (
                        <span className='cart-item__price-unit'>৳{item.price.toLocaleString()} each</span>
                      )}
                    </div>

                    <button
                      className='cart-item__remove'
                      onClick={() => removeFromCart(item.id)}
                      aria-label='Remove item'
                    >
                      <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <h2 className='cart-summary__title'>Order Summary</h2>

            <div className='cart-summary__row'>
              <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>৳{getCartTotal().toLocaleString()}</span>
            </div>

            <div className='cart-summary__row'>
              <span>Delivery</span>
              <span className='cart-summary__free'>Free</span>
            </div>

            <div className='cart-summary__divider' />

            <div className='cart-summary__row cart-summary__row--total'>
              <span>Total</span>
              <span>৳{getCartTotal().toLocaleString()}</span>
            </div>

            <Link to='/checkout' className='cart-summary__checkout'>
              Proceed to Checkout
            </Link>

            <Link to='/' className='cart-summary__continue'>
              Continue Shopping
            </Link>

            <div className='cart-summary__features'>
              <div className='cart-summary__feature'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z' />
                  <circle cx='12' cy='10' r='3' />
                </svg>
                Secure Payment
              </div>
              <div className='cart-summary__feature'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z' />
                </svg>
                Free Delivery
              </div>
              <div className='cart-summary__feature'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <polyline points='23 4 23 10 17 10' />
                  <path d='M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15' />
                </svg>
                7-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
