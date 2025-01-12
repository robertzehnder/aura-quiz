import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ResultsPage.css';

export default function ResultsPage({ user }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedAuras, setExpandedAuras] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'quizResults', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setResults(data);
        }
      } catch (error) {
        console.error('Error fetching results:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  useEffect(() => {
    if (results) {
      updateAuraRanking();
    }
  }, [results]);

  const updateAuraRanking = async () => {
    const auraRankings = calculateAuraRankings(results.answers);
    const topAura = auraRankings[0]?.name;

    if (topAura && results.aura.color !== topAura) {
      try {
        const docRef = doc(db, 'quizResults', user.uid);
        await setDoc(docRef, { aura: { status: 'completed', color: topAura } }, { merge: true });
        setResults((prev) => ({ ...prev, aura: { ...prev.aura, color: topAura } }));
      } catch (error) {
        console.error('Error updating aura ranking:', error.message);
      }
    }
  };

  const toggleExpand = (auraName) => {
    setExpandedAuras((prevState) => ({
      ...prevState,
      [auraName]: !prevState[auraName],
    }));
  };

  if (loading) {
    return <div className="loading">Loading Results...</div>;
  }

  if (!results) {
    return (
      <div className="error">
        <h2>No Results Found</h2>
        <button onClick={() => navigate('/profile')}>Return to Profile</button>
      </div>
    );
  }

  const auraRankings = calculateAuraRankings(results.answers);

  return (
    <div className="results-page">
      <h1>Results</h1>
      <h2>Your Highest Ranked Aura: {results.aura?.color || 'N/A'}</h2>
      <p>{auraDescriptions[results.aura?.color]}</p>

      <div className="rankings">
        <h3>Rankings</h3>
        <ul>
          {auraRankings.map((aura, idx) => (
            <li key={idx}>
              <span>
                {idx + 1}. {aura.name}: {aura.score}
              </span>
              <button
                className="expand-btn"
                onClick={() => toggleExpand(aura.name)}
              >
                {expandedAuras[aura.name] ? 'Collapse' : 'Expand'}
              </button>
              {expandedAuras[aura.name] && (
                <div className="aura-description">
                  {auraDescriptions[aura.name] || 'No description available.'}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button className="return-btn" onClick={() => navigate('/profile')}>
        Return to Profile
      </button>
    </div>
  );
}

// Aura descriptions
const auraDescriptions = {
  MentalTan: 'Mental Tan individuals are analytical and logical thinkers.',
  Violet: 'Violet people are creative and spiritual.',
  Green: 'Green individuals are practical and ambitious.',
  Lavender: 'Lavender individuals are dreamy and whimsical.',
  Magenta: 'Magenta people are vibrant and unconventional.',
  Blue: 'Blue individuals are empathetic and supportive.',
  NurturingTan: 'Nurturing Tan individuals are caring and dependable.',
  Crystal: 'Crystal individuals are calm and reflective.',
  Orange: 'Orange individuals are adventurous and energetic.',
  PhysicalTan: 'Physical Tan individuals are practical and grounded.',
  LovingTan: 'Loving Tan individuals are warm and nurturing.',
  Indigo: 'Indigo people are intuitive and wise.',
  Red: 'Red individuals are passionate and energetic.',
  Yellow: 'Yellow individuals are cheerful and creative.',
};

// Calculate aura rankings based on answers
function calculateAuraRankings(answers) {
  const auraScores = {
    MentalTan: 0,
    Violet: 0,
    Green: 0,
    Lavender: 0,
    Magenta: 0,
    Blue: 0,
    NurturingTan: 0,
    Crystal: 0,
    Orange: 0,
    PhysicalTan: 0,
    LovingTan: 0,
    Indigo: 0,
    Red: 0,
    Yellow: 0,
  };

  const questionToAuraMapping = [
    'MentalTan', 'Violet', 'Green', 'Lavender', 'Magenta', 'Blue',
    'NurturingTan', 'Crystal', 'Orange', 'PhysicalTan', 'LovingTan',
    'Indigo', 'Red', 'Yellow',
  ];

  answers.forEach((answer, index) => {
    const aura = questionToAuraMapping[index % questionToAuraMapping.length];
    auraScores[aura] += answer; // Increment score for the corresponding aura
  });

  return Object.entries(auraScores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score);
}
