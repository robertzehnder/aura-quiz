import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './AuthForm.css';

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-header">
          <span className="auth-emoji">{showSignUp ? '🌟' : '✨'}</span>
          <h1 className="auth-title gradient-text">
            {showSignUp ? 'join the journey' : 'welcome back'}
          </h1>
          <p className="auth-subtitle">
            {showSignUp
              ? 'create your account to save your aura results'
              : 'sign in to continue your self-discovery'}
          </p>
        </div>

        {showSignUp ? (
          <SignUp onSwitchToSignIn={() => setShowSignUp(false)} />
        ) : (
          <SignIn onSwitchToSignUp={() => setShowSignUp(true)} />
        )}
      </div>
    </div>
  );
}
