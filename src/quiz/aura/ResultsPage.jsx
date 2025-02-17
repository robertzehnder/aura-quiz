import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResultsPage.css';

export default function ResultsPage() {
  const [topResult, setTopResult] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || {};

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      const calculatedResults = calculateAuraRankings(answers);
      setTopResult(calculatedResults[0]); // Only store the highest-ranked aura
    }
  }, [answers]);

  if (!topResult) {
    return <div className="loading">Processing Results...</div>;
  }

  return (
    <div className="results-page">
      <h1>Results</h1>
      <h2>Your Highest Ranked Aura: {topResult.name}</h2>
      <p>{auraDescriptions[topResult.name] || "No description available."}</p>

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

  Object.entries(answers).forEach(([index, answer]) => {
    const aura = questionToAuraMapping[index % questionToAuraMapping.length];
    auraScores[aura] += answer; // Increment score for the corresponding aura
  });

  return Object.entries(auraScores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score);
}