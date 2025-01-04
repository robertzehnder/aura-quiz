// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
  if (!user) {
    // If no user, redirect to /auth
    return <Navigate to="/auth" replace />;
  }
  // Otherwise, render the protected page
  return children;
}
