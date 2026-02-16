import { useNavigate } from 'react-router-dom';
import { TIERS, QUIZZES } from '../journey/journeyData';
import './QuizzesPage.css';

/* ═══════════════════════════════════════════════════
   QUIZZES PAGE — Browse & Take Quizzes
   ═══════════════════════════════════════════════════ */

export default function QuizzesPage() {
  const navigate = useNavigate();

  function handleQuizClick(quiz) {
    navigate(quiz.path);
  }

  return (
    <div className="quizzes-page">
      {/* Hero */}
      <section className="quizzes-hero">
        <h1 className="quizzes-title">
          <span className="gradient-text">all quizzes</span>
        </h1>
        <p className="quizzes-subtitle">
          take any quiz anytime — no unlocking required ✨
        </p>
      </section>

      {/* Quizzes by tier */}
      {TIERS.map((tier) => {
        const tierQuizzes = QUIZZES.filter((q) => q.tier === tier.id);
        return (
          <section key={tier.id} className="quizzes-tier-section">
            <div className="quizzes-tier-header" style={{ '--tier-gradient': tier.gradient, '--tier-glow': tier.glowColor }}>
              <span className="quizzes-tier-emoji">{tier.emoji}</span>
              <div>
                <h2 className="quizzes-tier-name">{tier.name}</h2>
                <p className="quizzes-tier-subtitle">{tier.subtitle}</p>
              </div>
            </div>

            <div className="quizzes-grid">
              {tierQuizzes.map((quiz) => (
                <button
                  key={quiz.id}
                  className="quizzes-card glass"
                  style={{ '--card-gradient': quiz.gradient }}
                  onClick={() => handleQuizClick(quiz)}
                >
                  <div className="quizzes-card-shimmer" />
                  <div className="quizzes-card-content">
                    <span className="quizzes-card-emoji">{quiz.emoji}</span>
                    <h3 className="quizzes-card-title">{quiz.title}</h3>
                    <p className="quizzes-card-subtitle">{quiz.subtitle}</p>
                    <div className="quizzes-card-meta">
                      <span>⏱ {quiz.estimatedTime}</span>
                      <span>
                        {quiz.questionCount === 'Input' ? '📝 Input' : `❓ ${quiz.questionCount}`}
                      </span>
                    </div>
                    <span className="quizzes-card-cta">begin →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
