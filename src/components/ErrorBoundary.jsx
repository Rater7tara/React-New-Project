import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <div className="error-boundary__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h2 className="error-boundary__title">Oops! Something Went Wrong</h2>
            <p className="error-boundary__desc">
              We encountered an unexpected error. Please try refreshing the page or return to the homepage.
            </p>

            <div className="error-boundary__actions">
              <button
                onClick={() => window.location.reload()}
                className="error-boundary__btn error-boundary__btn--primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                Reload Page
              </button>
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="error-boundary__btn error-boundary__btn--secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Go to Homepage
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary__details">
                <summary className="error-boundary__details-summary">
                  View Error Details (Development Mode)
                </summary>
                <div className="error-boundary__details-content">
                  <p className="error-boundary__details-label">Error:</p>
                  <pre className="error-boundary__details-pre">{this.state.error.toString()}</pre>
                  {this.state.errorInfo && (
                    <>
                      <p className="error-boundary__details-label">Component Stack:</p>
                      <pre className="error-boundary__details-pre">{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;