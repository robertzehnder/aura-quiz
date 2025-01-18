import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './AuthForm.css';

export default function Login({ onSignIn }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="auth-container">
      <h1>Sign In 🧑‍💻</h1>
      {showSignUp ? (
        <SignUp onSwitchToSignIn={() => setShowSignUp(false)} onSignIn={onSignIn} />
      ) : (
        <SignIn onSwitchToSignUp={() => setShowSignUp(true)} onSignIn={onSignIn} />
      )}
    </div>
  );
}
