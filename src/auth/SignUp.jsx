import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './AuthForm.css';

export default function SignUp({ onSwitchToSignIn, onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      onSignIn?.(userCredential.user);
    } catch (err) {
      alert(`Error signing up: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
        <label htmlFor="displayName">Full Name</label>
        <input
          type="text"
          id="displayName"
          placeholder="Enter your full name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
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
      <button type="submit" className="primary-btn">Sign Up</button>
      <p>
        Already have an account?{' '}
        <button type="button" className="link-btn" onClick={onSwitchToSignIn}>
          Sign In
        </button>
      </p>
    </form>
  );
}
