import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './AuthForm.css';

export default function Login({ onSignIn }) {
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  return (
    <div className="auth-container">
      <h2>Find Your Aura ✨🌈</h2>
      {showSignUp ? (
        <SignUp onSwitchToSignIn={() => setShowSignUp(false)} onSignIn={onSignIn} />
      ) : (
        <SignIn onSwitchToSignUp={() => setShowSignUp(true)} onSignIn={onSignIn} />
      )}
    </div>
  );
}
