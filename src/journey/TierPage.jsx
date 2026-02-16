import { useParams, useNavigate } from 'react-router-dom';
import { getTierById, getQuizzesByTier, TIERS } from './journeyData';
import './TierPage.css';

/* ═══════════════════════════════════════════════════
   TIER PAGE — Detail Screen for Each Tier
   ═══════════════════════════════════════════════════ */

function QuizRow({ quiz, index, onClick }) {
  const isLocked = !quiz.available && !quiz.completed;

  return (
    <button
      className={`tier-quiz-row glass ${quiz.completed ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
      style={{ '--row-gradient': quiz.gradient, '--row-delay': `${index * 0.08}s` }}
      onClick={() => onClick(quiz)}
      disabled={isLocked}
    >
      {/* Number */}
      <div className="tier-quiz-number">
        {quiz.completed ? (
          <span className="number-check">✓</span>
        ) : (
          <span className="number-text">{index + 1}</span>
        )}
      </div>

      {/* Info */}
      <div className="tier-quiz-info">
        <div className="tier-quiz-header">
          <span className="tier-quiz-emoji">{quiz.emoji}</span>
          <h3 className="tier-quiz-title">{quiz.title}</h3>
        </div>
        <p className="tier-quiz-desc">{quiz.description}</p>
        <div className="tier-quiz-meta">
          <span>⏱ {quiz.estimatedTime}</span>
          <span>
            {quiz.questionCount === 'Input' ? '📝 Input' : `❓ ${quiz.questionCount} Qs`}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="tier-quiz-status">
        {quiz.completed ? (
          <span className="status-complete">✨</span>
        ) : quiz.available ? (
          <span className="status-play">▶</span>
        ) : (
          <span className="status-lock">🔒</span>
        )}
      </div>
    </button>
  );
}

export default function TierPage() {
  const { tierId } = useParams();
  const navigate = useNavigate();

  const tier = getTierById(Number(tierId));
  const quizzes = getQuizzesByTier(Number(tierId));
  const completedCount = quizzes.filter((q) => q.completed).length;
  const progress = quizzes.length > 0 ? (completedCount / quizzes.length) * 100 : 0;

  /* Navigation between tiers */
  const prevTier = TIERS.find((t) => t.id === Number(tierId) - 1);
  const nextTier = TIERS.find((t) => t.id === Number(tierId) + 1);

  if (!tier) {
    return (
      <div className="tier-page">
        <div className="tier-not-found">
          <p>Tier not found</p>
          <button onClick={() => navigate('/')} className="tier-back-btn glass">
            ← back to journey
          </button>
        </div>
      </div>
    );
  }

  function handleQuizClick(quiz) {
    if (quiz.available) {
      navigate(quiz.path);
    }
  }

  return (
    <div className="tier-page" style={{ '--tier-gradient': tier.gradient, '--tier-glow': tier.glowColor, '--tier-accent': tier.bgAccent }}>
      {/* Background accent orbs */}
      <div className="tier-bg-orb tier-bg-orb-1" />
      <div className="tier-bg-orb tier-bg-orb-2" />

      {/* Back button */}
      <button className="tier-back-btn glass" onClick={() => navigate('/')}>
        ← journey map
      </button>

      {/* Hero banner */}
      <section className="tier-hero">
        <div className="tier-hero-badge">
          <span className="tier-hero-emoji">{tier.emoji}</span>
        </div>

        <div className="tier-hero-info">
          <span className="tier-hero-label">tier {tier.id} of 5</span>
          <h1 className="tier-hero-title">{tier.name}</h1>
          <p className="tier-hero-subtitle">{tier.subtitle}</p>
          <p className="tier-hero-desc">{tier.description}</p>
        </div>

        {/* Progress bar */}
        <div className="tier-hero-progress">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-label">
            <span>{completedCount} of {quizzes.length} completed</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </section>

      {/* Reward card */}
      <section className="tier-reward-card glass">
        <div className="tier-reward-icon">
          <span>🪙</span>
          <span className="tier-reward-amount">{tier.unlockReward.tokens}</span>
        </div>
        <div className="tier-reward-info">
          <h3 className="tier-reward-title">{tier.unlockReward.title}</h3>
          <p className="tier-reward-desc">{tier.unlockReward.description}</p>
        </div>
        <div className={`tier-reward-status ${completedCount === quizzes.length ? 'unlocked' : 'locked'}`}>
          {completedCount === quizzes.length ? '✨ Claim' : `${quizzes.length - completedCount} to go`}
        </div>
      </section>

      {/* Quest list */}
      <section className="tier-quest-list">
        <h2 className="tier-quest-list-title">quests</h2>
        {quizzes.map((quiz, index) => (
          <QuizRow key={quiz.id} quiz={quiz} index={index} onClick={handleQuizClick} />
        ))}
      </section>

      {/* Tier navigation */}
      <section className="tier-nav">
        {prevTier ? (
          <button className="tier-nav-btn glass" onClick={() => navigate(`/journey/tier/${prevTier.id}`)}>
            <span className="tier-nav-emoji">{prevTier.emoji}</span>
            <span className="tier-nav-label">← {prevTier.name}</span>
          </button>
        ) : (
          <div />
        )}
        {nextTier ? (
          <button className="tier-nav-btn glass" onClick={() => navigate(`/journey/tier/${nextTier.id}`)}>
            <span className="tier-nav-label">{nextTier.name} →</span>
            <span className="tier-nav-emoji">{nextTier.emoji}</span>
          </button>
        ) : (
          <div />
        )}
      </section>
    </div>
  );
}
