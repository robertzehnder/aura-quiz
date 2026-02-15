import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { calculateAuraRankings, auraColors } from './QuestionBank';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import './ResultsPage.css';

export default function ResultsPage() {
  const [rankings, setRankings] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const answers = location.state?.answers;

  useEffect(() => {
    if (!answers || Object.keys(answers).length === 0) {
      navigate('/aura/quiz');
      return;
    }

    const calculated = calculateAuraRankings(answers);
    setRankings(calculated);

    // Dramatic reveal after a short delay
    const timer = setTimeout(() => setRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, [answers, navigate]);

  // Save results to Supabase
  const handleSave = async () => {
    if (!user || !rankings) return;

    try {
      const { error } = await supabase.from('quiz_results').upsert({
        user_id: user.id,
        quiz_type: 'aura',
        top_result: rankings[0].name,
        scores: Object.fromEntries(rankings.map((r) => [r.name, r.score])),
        answers,
        completed_at: new Date().toISOString(),
      });

      if (error) throw error;
      setSaved(true);
    } catch (err) {
      console.error('Error saving results:', err);
    }
  };

  if (!rankings) {
    return (
      <div className="results-loading">
        <div className="results-loading-orb" />
        <p>channeling your energy... ✨</p>
      </div>
    );
  }

  const topAura = rankings[0];
  const auraData = auraColors[topAura.name];

  return (
    <div className="results-page">
      {/* Reveal Animation Overlay */}
      <div
        className={`reveal-overlay ${revealed ? 'reveal-done' : ''}`}
        style={{ '--reveal-color': auraData.glow }}
      >
        <div className="reveal-orb" style={{ background: auraData.gradient }} />
        <p className="reveal-text">discovering your aura...</p>
      </div>

      {/* Results Content */}
      <div className={`results-content ${revealed ? 'results-visible' : ''}`}>
        {/* Top Result */}
        <div className="results-hero">
          <div
            className="results-aura-orb"
            style={{
              background: auraData.gradient,
              boxShadow: `0 0 60px ${auraData.glow}, 0 0 120px ${auraData.glow}`,
            }}
          />
          <div className="results-hero-text">
            <span className="results-label">your aura is</span>
            <h1
              className="results-aura-name"
              style={{
                background: auraData.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {topAura.name}
            </h1>
            <span className="results-emoji">{auraData.emoji}</span>
          </div>
          <p className="results-short-desc">{auraData.shortDesc}</p>
          <p className="results-description">{auraData.description}</p>
          <div className="results-score-badge glass">
            <span>score</span>
            <strong>{topAura.score}</strong>
            <span>/ {topAura.maxScore}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="results-actions">
          {user && !saved && (
            <button className="results-btn results-btn-save" onClick={handleSave}>
              save to profile 💾
            </button>
          )}
          {saved && (
            <span className="results-saved">✓ saved to your profile!</span>
          )}
          <button
            className="results-btn results-btn-secondary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'hide rankings' : 'see all rankings'} 📊
          </button>
        </div>

        {/* Full Rankings */}
        {showAll && (
          <div className="results-rankings">
            <h3 className="rankings-title">all 14 aura colors</h3>
            <div className="rankings-list">
              {rankings.map((aura, index) => {
                const data = auraColors[aura.name];
                const percentage = (aura.score / aura.maxScore) * 100;
                return (
                  <div key={aura.name} className="ranking-item glass">
                    <div className="ranking-position">
                      {index === 0 ? '👑' : `#${index + 1}`}
                    </div>
                    <div className="ranking-info">
                      <div className="ranking-header">
                        <span className="ranking-emoji">{data.emoji}</span>
                        <span className="ranking-name">{aura.name}</span>
                        <span className="ranking-score">
                          {aura.score}/{aura.maxScore}
                        </span>
                      </div>
                      <div className="ranking-bar-track">
                        <div
                          className="ranking-bar-fill"
                          style={{
                            width: `${percentage}%`,
                            background: data.gradient,
                            boxShadow: `0 0 8px ${data.glow}`,
                          }}
                        />
                      </div>
                      <p className="ranking-desc">{data.shortDesc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="results-nav">
          <button
            className="results-btn results-btn-ghost"
            onClick={() => navigate('/aura/quiz')}
          >
            retake quiz 🔄
          </button>
          <button
            className="results-btn results-btn-secondary"
            onClick={() => navigate('/')}
          >
            back to home
          </button>
        </div>
      </div>
    </div>
  );
}
