import React from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function Anonymous({ onSignIn }) {
  const handleAnonymousSignIn = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      if (onSignIn) {
        onSignIn(userCredential.user); // Call the onSignIn function if it exists
      }
    } catch (err) {
      alert(`Error with guest sign-in: ${err.message}`);
    }
  };

  return (
    <button className="secondary-btn" onClick={handleAnonymousSignIn}>
      Continue as Guest
    </button>
  );
}
