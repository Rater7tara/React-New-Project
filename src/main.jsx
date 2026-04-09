import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import React from "react";
import AuthProvider from "./providers/AuthProvider.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <div className="bg-base-100">
            <RouterProvider router={router} />
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              gutter={12}
              toastOptions={{
                duration: 2500,
                style: {
                  background: '#1a1a2e',
                  color: '#fff',
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: '500',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  zIndex: 999999,
                },
              }}
              containerStyle={{
                zIndex: 999999,
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
