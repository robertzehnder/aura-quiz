import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import './AuthForm.css';

const db = getFirestore();

export default function SignUp({ onSwitchToSignIn, onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [successMessage, setSuccessMessage] = useState({}); // Tracks success messages

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateFullName = (name) => name.trim().length > 0;

  const validateUsername = async (username) => {
    if (username.trim().length === 0) return false;
    const usersQuery = query(
      collection(db, 'users'),
      where('username', '==', username)
    );
    const querySnapshot = await getDocs(usersQuery);
    if (querySnapshot.empty) {
      setSuccessMessage((prev) => ({ ...prev, username: 'Username available' }));
      return true;
    } else {
      setSuccessMessage((prev) => ({ ...prev, username: '' }));
      return false;
    }
  };

  const validatePassword = (password) => password.length >= 6;

  const handleInputBlur = async (field, value) => {
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
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      // Save username to Firestore
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        username,
        email,
        displayName,
      });
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
          onBlur={(e) => handleInputBlur('email', e.target.value)}
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
          onChange={(e) => setDisplayName(e.target.value)}
          onBlur={(e) => handleInputBlur('displayName', e.target.value)}
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
          onChange={(e) => setUsername(e.target.value)}
          onBlur={(e) => handleInputBlur('username', e.target.value)}
          className={valid.username === false ? 'invalid' : valid.username ? 'valid' : ''}
        />
        {errors.username && <small className="error-message">{errors.username}</small>}
        {successMessage.username && (
          <small className="success-message">{successMessage.username}</small>
        )}
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => handleInputBlur('password', e.target.value)}
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
