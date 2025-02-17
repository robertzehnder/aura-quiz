// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ProfilePage.css';

export default function ProfilePage({ user }) {
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://s3.amazonaws.com/37assets/svn/765-default-avatar.png');
  const [auraStatus, setAuraStatus] = useState('In Progress');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        console.error("User is not defined.");
        return;
      }

      try {
        console.log("Fetching user profile...");
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("User data:", data);
          setUserName(data.name || 'User');
          setProfilePicture(
            data.profilePicture || 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
          );
        } else {
          console.warn("No user profile found in Firestore.");
        }

        console.log("Fetching quiz results...");
        const quizRef = doc(db, 'quizResults', user.uid);
        const quizSnap = await getDoc(quizRef);

        if (quizSnap.exists()) {
          const quizData = quizSnap.data();
          console.log("Quiz data:", quizData);
          setAuraStatus(
            quizData.aura && quizData.aura.status === 'completed'
              ? quizData.aura.color
              : 'In Progress'
          );
        } else {
          console.warn("No quiz results found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user profile or quiz data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <h1>Welcome, {userName}</h1>
      </div>
      <div className="profile-content">
        <div className="tile aura-tile">
          <h2>Aura</h2>
          <p>{auraStatus}</p>
        </div>
        <div className="tile">
          <h2>Placeholder 2</h2>
          <p>Placeholder for quiz results</p>
        </div>
        <div className="tile">
          <h2>Placeholder 3</h2>
          <p>Placeholder for quiz results</p>
        </div>
      </div>
    </div>
  );
}