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
            <Toaster />
            <RouterProvider router={router} />
          </div>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
