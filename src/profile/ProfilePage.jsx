import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ProfilePage.css';

export default function ProfilePage({ user }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        } else {
          console.warn('No user profile found in Firestore.');
          setUserProfile({ name: 'Guest', quizzes: [] }); // Fallback data
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {userProfile.name}</h1>
      {/* Render quizzes or other user data */}
    </div>
  );
}
