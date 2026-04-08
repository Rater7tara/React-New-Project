import React, { useState } from 'react';
import '../Login/Login.css'; // Reuse the same styles
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    console.log('Register:', formData);
  };

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <div className='auth-visual'>
          <img
            src='https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80'
            alt='Fashion'
            className='auth-visual__img'
          />
          <div className='auth-visual__overlay' />
          <div className='auth-visual__content'>
            <Link to='/' className='auth-logo'>
              <span className='auth-logo__dot' />
              <span className='auth-logo__text'>Vougely</span>
            </Link>
            <h2 className='auth-visual__title'>Join Vougely</h2>
            <p className='auth-visual__desc'>
              Create your account and discover curated fashion for every occasion
            </p>
          </div>
        </div>

        <div className='auth-form-wrap'>
          <div className='auth-form-container'>
            <div className='auth-header'>
              <h1 className='auth-title'>Create Account</h1>
              <p className='auth-subtitle'>
                Already have an account?{' '}
                <Link to='/login' className='auth-link'>Sign in</Link>
              </p>
            </div>

            <form className='auth-form' onSubmit={handleSubmit}>
              <div className='auth-input-group'>
                <label className='auth-label'>Full Name</label>
                <div className='auth-input-wrap'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
                    <circle cx='12' cy='7' r='4' />
                  </svg>
                  <input
                    type='text'
                    name='name'
                    className='auth-input'
                    placeholder='Enter your full name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='auth-input-group'>
                <label className='auth-label'>Email Address</label>
                <div className='auth-input-wrap'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                    <polyline points='22,6 12,13 2,6' />
                  </svg>
                  <input
                    type='email'
                    name='email'
                    className='auth-input'
                    placeholder='you@example.com'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='auth-input-group'>
                <label className='auth-label'>Password</label>
                <div className='auth-input-wrap'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                    <path d='M7 11V7a5 5 0 0110 0v4' />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    className='auth-input'
                    placeholder='Create a strong password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type='button'
                    className='auth-toggle-password'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                        <circle cx='12' cy='12' r='3' />
                      </svg>
                    ) : (
                      <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24' />
                        <line x1='1' y1='1' x2='23' y2='23' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className='auth-input-group'>
                <label className='auth-label'>Confirm Password</label>
                <div className='auth-input-wrap'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
                    <path d='M7 11V7a5 5 0 0110 0v4' />
                  </svg>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    className='auth-input'
                    placeholder='Confirm your password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type='button'
                    className='auth-toggle-password'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                        <circle cx='12' cy='12' r='3' />
                      </svg>
                    ) : (
                      <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24' />
                        <line x1='1' y1='1' x2='23' y2='23' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <label className='auth-checkbox'>
                <input
                  type='checkbox'
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span className='auth-checkbox__mark' />
                <span className='auth-checkbox__label'>
                  I agree to the <Link to='/terms' className='auth-link'>Terms</Link> and{' '}
                  <Link to='/privacy' className='auth-link'>Privacy Policy</Link>
                </span>
              </label>

              <button type='submit' className='auth-submit'>
                Create Account
              </button>

              <div className='auth-divider'>
                <span>Or sign up with</span>
              </div>

              <div className='auth-social'>
                <button type='button' className='auth-social-btn'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
                    <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
                    <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
                    <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
                  </svg>
                  Google
                </button>
                <button type='button' className='auth-social-btn'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                  </svg>
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
