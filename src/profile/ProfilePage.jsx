import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ProfilePage.css';

export default function ProfilePage({ user }) {
  const [profileData, setProfileData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.warn('No user profile found in Firestore.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    const fetchQuizResults = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'quizResults', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setQuizData(docSnap.data());
        } else {
          console.warn('No quiz results found in Firestore.');
        }
      } catch (error) {
        console.error('Error fetching quiz results:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchQuizResults();
  }, [user]);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  const handleAuraClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const goToQuiz = () => {
    navigate('/quiz');
  };

  const goToResults = () => {
    navigate('/results');
  };

  const auraColor = quizData?.aura?.color?.toLowerCase() || 'lightgray';
  const textColor = ['yellow', 'lightyellow', 'pink', 'lightpink'].includes(auraColor) ? '#000000' : '#FFFFFF';
  const textShadow = textColor === '#FFFFFF' ? '0 1px 2px rgba(0, 0, 0, 0.8)' : '0 1px 2px rgba(255, 255, 255, 0.8)';

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={profileData?.photoURL || 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'}
          alt="User Avatar"
          className="profile-avatar"
        />
        <h1>Welcome, {profileData?.displayName || 'User'}</h1>
      </div>
      <div className="tiles">
        <div
          className="tile aura"
          onClick={handleAuraClick}
          style={{ backgroundColor: auraColor, color: textColor, textShadow }}
        >
          <h3>Aura</h3>
          <p>{quizData?.aura?.color || 'In Progress'}</p>
        </div>
        <div className="tile">
          <h3>Placeholder 2</h3>
          <p>Placeholder for quiz results</p>
        </div>
        <div className="tile">
          <h3>Placeholder 3</h3>
          <p>Placeholder for quiz results</p>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={closePopup}>
              ✖
            </button>
            <h2>Aura Quiz Options</h2>
            <p>What would you like to do?</p>
            <div className="popup-buttons">
              <button onClick={goToResults} className="view-results">
                View Results
              </button>
              <button onClick={goToQuiz} className="edit-quiz">
                Edit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
