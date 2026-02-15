import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { calculateAuraRankings, auraColors } from './QuestionBank';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import './ResultsPage.css';

const APP_URL = 'https://aura-quiz.vercel.app';


export default function ResultsPage() {
  const [rankings, setRankings] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const answers = location.state?.answers;
  const shareCardRef = useRef(null);

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

  // Export share card as image
  const handleExport = useCallback(async () => {
    if (!shareCardRef.current || exporting) return;
    setExporting(true);

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        logging: false,
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );

      const file = new File([blob], 'my-aura-result.png', { type: 'image/png' });

      // Try native share (works on mobile for Instagram/TikTok stories)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'My Aura Result ✨',
          text: `I got ${rankings[0].name}! Discover your aura:`,
          files: [file],
        });
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'my-aura-result.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Export error:', err);
      }
    } finally {
      setExporting(false);
    }
  }, [exporting, rankings]);

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
  const topThree = rankings.slice(0, 3);

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
          {/* Share to social */}
          <button
            className="results-btn results-btn-share"
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? 'creating...' : 'share to story 📸'}
          </button>

          {/* Save / Create Account */}
          {user ? (
            !saved ? (
              <button className="results-btn results-btn-save" onClick={handleSave}>
                save to profile 💾
              </button>
            ) : (
              <span className="results-saved">✓ saved to your profile!</span>
            )
          ) : (
            <button
              className="results-btn results-btn-save"
              onClick={() => navigate('/auth', { state: { from: '/aura/results', answers } })}
            >
              create account to save ✨
            </button>
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

      {/* ═══ Hidden Share Card (captured by html2canvas) ═══ */}
      <div className="share-card-wrapper" aria-hidden="true">
        <div className="share-card" ref={shareCardRef}>
          {/* Background gradient */}
          <div
            className="share-card-bg"
            style={{ background: `linear-gradient(160deg, #0d0221 0%, ${auraData.hex}22 40%, #0d0221 100%)` }}
          />

          {/* Decorative orbs */}
          <div
            className="share-card-orb share-card-orb-1"
            style={{ background: `radial-gradient(circle, ${auraData.glow}, transparent 70%)` }}
          />
          <div
            className="share-card-orb share-card-orb-2"
            style={{ background: `radial-gradient(circle, ${auraData.glow.replace('0.5', '0.35')}, transparent 70%)` }}
          />

          {/* Content */}
          <div className="share-card-content">
            {/* Header */}
            <div className="share-card-header">
              <span
                className="share-card-app-name"
                style={{ color: auraData.hex }}
              >
                find yourself ✨
              </span>
              <span className="share-card-subtitle">aura quiz results</span>
            </div>

            {/* Aura Orb */}
            <div
              className="share-card-aura-orb"
              style={{
                background: auraData.gradient,
                boxShadow: `0 0 40px ${auraData.glow}, 0 0 80px ${auraData.glow}`,
              }}
            />

            {/* Result */}
            <div className="share-card-result">
              <span className="share-card-label">my aura is</span>
              <span
                className="share-card-aura-name"
                style={{ color: auraData.hex }}
              >
                {topAura.name}
              </span>
              <span className="share-card-emoji">{auraData.emoji}</span>
              <span className="share-card-desc">{auraData.shortDesc}</span>
            </div>

            {/* Top 3 */}
            <div className="share-card-top3">
              {topThree.map((aura, i) => {
                const data = auraColors[aura.name];
                return (
                  <div key={aura.name} className="share-card-rank">
                    <span className="share-card-rank-pos">{i === 0 ? '👑' : `#${i + 1}`}</span>
                    <span className="share-card-rank-emoji">{data.emoji}</span>
                    <span className="share-card-rank-name">{aura.name}</span>
                    <span className="share-card-rank-score">{aura.score}/{aura.maxScore}</span>
                  </div>
                );
              })}
            </div>

            {/* QR Code + CTA */}
            <div className="share-card-footer">
              <div className="share-card-qr">
                <QRCodeSVG
                  value={APP_URL}
                  size={120}
                  bgColor="transparent"
                  fgColor="rgba(255,255,255,0.85)"
                  level="M"
                />
              </div>
              <div className="share-card-cta">
                <span className="share-card-cta-text">discover your aura</span>
                <span className="share-card-cta-url">aura-quiz.vercel.app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
