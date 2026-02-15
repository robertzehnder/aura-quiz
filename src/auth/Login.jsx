import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './AuthForm.css';

export default function Login() {
  const location = useLocation();
  const redirectState = location.state || {};
  // If coming from results page, default to sign up
  const [showSignUp, setShowSignUp] = useState(!!redirectState.from);

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
              ? redirectState.from
                ? 'create an account to save your aura results'
                : 'create your account to save your aura results'
              : 'sign in to continue your self-discovery'}
          </p>
        </div>

        {showSignUp ? (
          <SignUp
            onSwitchToSignIn={() => setShowSignUp(false)}
            redirectState={redirectState}
          />
        ) : (
          <SignIn
            onSwitchToSignUp={() => setShowSignUp(true)}
            redirectState={redirectState}
          />
        )}
      </div>
    </div>
  );
}
