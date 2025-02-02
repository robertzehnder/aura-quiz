import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import getDoc
import { auth, db } from '../firebaseConfig';
import './AuthForm.css';

export default function SignUp({ onSwitchToSignIn, onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (name) => {
    return name.trim().length > 0;
  };

  const validateUsername = async (username) => {
    if (username.trim().length === 0) return false;
    const usernameDoc = doc(db, 'users', username);
    const docSnapshot = await getDoc(usernameDoc);
    return !docSnapshot.exists();
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Add more criteria if needed
  };

  const handleInputChange = async (field, value) => {
    let isValid = false;
    let error = '';

    if (field === 'email') {
      isValid = validateEmail(value);
      error = isValid ? '' : 'Invalid email format';
    } else if (field === 'displayName') {
      isValid = validateFullName(value);
      error = isValid ? '' : 'Full name cannot be empty';
    } else if (field === 'username') {
      isValid = await validateUsername(value);
      error = isValid ? '' : 'Username already taken';
    } else if (field === 'password') {
      isValid = validatePassword(value);
      error = isValid ? '' : 'Password must be at least 6 characters';
    }

    setValid((prev) => ({ ...prev, [field]: isValid }));
    setErrors((prev) => ({ ...prev, [field]: error }));

    if (field === 'email') setEmail(value);
    else if (field === 'displayName') setDisplayName(value);
    else if (field === 'username') setUsername(value);
    else if (field === 'password') setPassword(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });

      // Add user profile to Firestore
      const userData = {
        name: displayName,
        email,
        username,
        quizzes: [], // Initialize with an empty array for quizzes
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);

      onSignIn?.(userCredential.user);
    } catch (err) {
      console.error('Error signing up:', err);
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
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={valid.email === false ? 'invalid' : valid.email ? 'valid' : ''}
        />
        {errors.email && <small className="error-message">{errors.email}</small>}
      </div>
      <div className="input-container">
        <label htmlFor="displayName">Full Name</label>
        <input
          type="text"
          id="displayName"
          placeholder="Enter your full name"
          value={displayName}
          onChange={(e) => handleInputChange('displayName', e.target.value)}
          className={valid.displayName === false ? 'invalid' : valid.displayName ? 'valid' : ''}
        />
        {errors.displayName && <small className="error-message">{errors.displayName}</small>}
      </div>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          className={valid.username === false ? 'invalid' : valid.username ? 'valid' : ''}
        />
        {errors.username && <small className="error-message">{errors.username}</small>}
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className={valid.password === false ? 'invalid' : valid.password ? 'valid' : ''}
        />
        {errors.password && <small className="error-message">{errors.password}</small>}
      </div>
      <button
        type="submit"
        className="primary-btn"
        disabled={Object.values(valid).some((value) => value === false || value === undefined)}
      >
        Sign Up
      </button>
      <p>
        Already have an account?{' '}
        <button type="button" className="link-btn" onClick={onSwitchToSignIn}>
          Sign In
        </button>
      </p>
    </form>
  );
}
