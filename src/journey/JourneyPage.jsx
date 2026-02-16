import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIERS, QUIZZES } from './journeyData';
import './JourneyPage.css';

/* ═══════════════════════════════════════════════════
   JOURNEY PAGE — Animated RPG Roadmap
   ═══════════════════════════════════════════════════ */

/* Floating particle for background ambiance */
function Particle({ delay, tier }) {
  const style = {
    animationDelay: `${delay}s`,
    left: `${Math.random() * 100}%`,
    '--particle-color': tier?.bgAccent || '#C8A2FF',
  };
  return <div className="journey-particle" style={style} />;
}

/* Single quiz node on the winding path */
function QuestNode({ quiz, index, tier, isActive, onClick }) {
  const side = index % 2 === 0 ? 'left' : 'right';
  const isLocked = !quiz.available && !quiz.completed;

  return (
    <div
      className={`quest-node quest-node-${side} ${quiz.completed ? 'completed' : ''} ${isLocked ? 'locked' : ''} ${isActive ? 'active' : ''}`}
      style={{
        '--node-gradient': quiz.gradient,
        '--delay': `${index * 0.1}s`,
        '--tier-accent': tier.bgAccent,
      }}
    >
      {/* Connection line to path */}
      <div className="quest-connector" />

      {/* The node card */}
      <button
        className="quest-card glass"
        onClick={() => onClick(quiz)}
        disabled={isLocked}
      >
        {/* Shimmer effect */}
        <div className="quest-shimmer" />

        {/* Status badge */}
        <div className="quest-status">
          {quiz.completed ? (
            <span className="quest-badge completed">✓</span>
          ) : quiz.available ? (
            <span className="quest-badge available">
              <span className="badge-pulse" />
            </span>
          ) : (
            <span className="quest-badge locked">🔒</span>
          )}
        </div>

        {/* Content */}
        <div className="quest-content">
          <span className="quest-emoji">{quiz.emoji}</span>
          <h3 className="quest-title">{quiz.title}</h3>
          <p className="quest-subtitle">{quiz.subtitle}</p>
          <div className="quest-meta">
            <span className="quest-time">⏱ {quiz.estimatedTime}</span>
            <span className="quest-count">
              {quiz.questionCount === 'Input' ? '📝' : '❓'} {quiz.questionCount}
              {quiz.questionCount !== 'Input' ? ' Qs' : ''}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

/* Tier milestone marker on the path */
function TierGate({ tier, quizzes, onClick }) {
  const completedCount = quizzes.filter((q) => q.completed).length;
  const totalCount = quizzes.length;
  const isUnlocked = completedCount === totalCount;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <button className="tier-gate" onClick={() => onClick(tier)} style={{ '--tier-gradient': tier.gradient, '--tier-glow': tier.glowColor, '--tier-accent': tier.bgAccent }}>
      <div className="tier-gate-glow" />

      {/* Ornamental top */}
      <div className="tier-gate-ornament">
        <div className="tier-gate-gem" />
      </div>

      <div className="tier-gate-content">
        <span className="tier-gate-emoji">{tier.emoji}</span>
        <h2 className="tier-gate-name">{tier.name}</h2>
        <p className="tier-gate-subtitle">{tier.subtitle}</p>

        {/* Progress ring */}
        <div className="tier-progress-ring">
          <svg viewBox="0 0 60 60">
            <circle className="ring-bg" cx="30" cy="30" r="26" />
            <circle
              className="ring-fill"
              cx="30"
              cy="30"
              r="26"
              style={{
                strokeDasharray: `${2 * Math.PI * 26}`,
                strokeDashoffset: `${2 * Math.PI * 26 * (1 - progress / 100)}`,
              }}
            />
          </svg>
          <span className="ring-text">{completedCount}/{totalCount}</span>
        </div>

        {/* Reward preview */}
        <div className="tier-reward-preview">
          <span className="reward-tokens">🪙 {tier.unlockReward.tokens}</span>
          <span className="reward-name">{tier.unlockReward.title}</span>
        </div>
      </div>

      <span className="tier-gate-cta">
        {isUnlocked ? '✨ claim reward →' : 'view tier →'}
      </span>
    </button>
  );
}

export default function JourneyPage() {
  const navigate = useNavigate();
  const roadmapRef = useRef(null);
  const [visibleNodes, setVisibleNodes] = useState(new Set());
  const [activeQuiz, setActiveQuiz] = useState(null);

  /* Intersection observer for scroll-triggered animations */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleNodes((prev) => new Set([...prev, entry.target.dataset.idx]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const nodes = roadmapRef.current?.querySelectorAll('[data-idx]');
    nodes?.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  function handleQuizClick(quiz) {
    if (quiz.available) {
      navigate(quiz.path);
    } else {
      setActiveQuiz(quiz);
    }
  }

  function handleTierClick(tier) {
    navigate(`/journey/tier/${tier.id}`);
  }

  return (
    <div className="journey-page">
      {/* Hero */}
      <section className="journey-hero">
        <div className="journey-hero-content">
          <h1 className="journey-title">
            <span className="gradient-text">the journey</span>
          </h1>
          <p className="journey-subtitle">
            25 quizzes · 5 tiers · unlock AI insights along the way
          </p>

          {/* Token display */}
          <div className="journey-token-bar glass">
            <span className="token-icon">🪙</span>
            <span className="token-count">0</span>
            <span className="token-label">AI tokens</span>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="journey-roadmap" ref={roadmapRef}>
        {/* The winding path SVG */}
        <div className="roadmap-path-line" />

        {/* Ambient particles */}
        {TIERS.map((tier, ti) =>
          Array.from({ length: 3 }, (_, pi) => (
            <Particle key={`p-${ti}-${pi}`} delay={ti * 2 + pi * 0.7} tier={tier} />
          ))
        )}

        {TIERS.map((tier) => {
          const tierQuizzes = QUIZZES.filter((q) => q.tier === tier.id);
          return (
            <div key={tier.id} className="tier-section" data-tier={tier.id}>
              {/* Tier gate / milestone */}
              <div data-idx={`tier-${tier.id}`} className={`tier-gate-wrapper ${visibleNodes.has(`tier-${tier.id}`) ? 'visible' : ''}`}>
                <TierGate tier={tier} quizzes={tierQuizzes} onClick={handleTierClick} />
              </div>

              {/* Quest nodes for this tier */}
              <div className="tier-quests">
                {tierQuizzes.map((quiz, qi) => (
                  <div
                    key={quiz.id}
                    data-idx={`quiz-${quiz.id}`}
                    className={`quest-node-wrapper ${visibleNodes.has(`quiz-${quiz.id}`) ? 'visible' : ''}`}
                  >
                    <QuestNode
                      quiz={quiz}
                      index={qi}
                      tier={tier}
                      isActive={activeQuiz?.id === quiz.id}
                      onClick={handleQuizClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* End of journey marker */}
        <div data-idx="journey-end" className={`journey-end ${visibleNodes.has('journey-end') ? 'visible' : ''}`}>
          <div className="journey-end-orb">
            <span>🌟</span>
          </div>
          <h2 className="journey-end-title gradient-text">you've found yourself</h2>
          <p className="journey-end-text">Complete all 25 quizzes to unlock the ultimate AI deep research report</p>
        </div>
      </section>

      {/* Quiz preview modal */}
      {activeQuiz && (
        <div className="quest-preview-overlay" onClick={() => setActiveQuiz(null)}>
          <div className="quest-preview glass" onClick={(e) => e.stopPropagation()} style={{ '--node-gradient': activeQuiz.gradient }}>
            <button className="quest-preview-close" onClick={() => setActiveQuiz(null)}>✕</button>
            <div className="quest-preview-header">
              <span className="quest-preview-emoji">{activeQuiz.emoji}</span>
              <h2>{activeQuiz.title}</h2>
              <p className="quest-preview-subtitle">{activeQuiz.subtitle}</p>
            </div>
            <p className="quest-preview-desc">{activeQuiz.description}</p>
            <div className="quest-preview-stats">
              <div className="stat">
                <span className="stat-value">{activeQuiz.estimatedTime}</span>
                <span className="stat-label">estimated</span>
              </div>
              <div className="stat">
                <span className="stat-value">{activeQuiz.questionCount}</span>
                <span className="stat-label">{activeQuiz.questionCount === 'Input' ? 'input' : 'questions'}</span>
              </div>
              <div className="stat">
                <span className="stat-value">Tier {activeQuiz.tier}</span>
                <span className="stat-label">{TIERS[activeQuiz.tier - 1]?.name}</span>
              </div>
            </div>
            {activeQuiz.available ? (
              <button className="quest-preview-cta" onClick={() => navigate(activeQuiz.path)}>
                begin quest →
              </button>
            ) : (
              <div className="quest-preview-locked">
                <span>🔒</span>
                <p>Complete previous quizzes to unlock</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
