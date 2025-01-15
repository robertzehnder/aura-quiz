import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './AuthForm.css';

export default function SignIn({ onSwitchToSignUp, onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onSignIn?.(userCredential.user);
    } catch (err) {
      alert(`Error signing in: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <div className="input-container">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="primary-btn">Sign In</button>
      <p>
        Don’t have an account?{' '}
        <button type="button" className="link-btn" onClick={onSwitchToSignUp}>
          Sign Up
        </button>
      </p>
    </form>
  );
}
