// Login.jsx
import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Anonymous from './Anonymous';
import './AuthForm.css';

export default function Login({ onSignIn }) {
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    // Add auth-page class to body when component is mounted
    document.body.classList.add('auth-page');

    // Cleanup: remove class when component is unmounted
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  return (
    <div className="auth-container">
      <h2>Find Your Aura ✨🌈</h2>
      {showSignUp ? (
        <SignUp
          onSwitchToSignIn={() => setShowSignUp(false)}
          onSignIn={onSignIn} // Pass the onSignIn prop
        />
      ) : (
        <SignIn
          onSwitchToSignUp={() => setShowSignUp(true)}
          onSignIn={onSignIn} // Pass the onSignIn prop
        />
      )}
      <Anonymous onSignIn={onSignIn} /> {/* Pass the onSignIn prop */}
    </div>
  );
}
