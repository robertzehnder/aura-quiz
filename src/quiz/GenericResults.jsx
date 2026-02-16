import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getQuizById } from './data';
import './GenericResults.css';

/* ═══════════════════════════════════════════════════
   GENERIC RESULTS — Display quiz results
   ═══════════════════════════════════════════════════ */

/* Scoring helpers */
function calculateScores(quiz, answers) {
  if (quiz.type === 'mbti') {
    return calculateMBTI(quiz, answers);
  }

  const scores = {};
  quiz.questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer === undefined) return;

    if (quiz.type === 'likert') {
      scores[q.category] = (scores[q.category] || 0) + answer;
    } else {
      // Choice — answer IS the category
      scores[answer] = (scores[answer] || 0) + 1;
    }
  });
  return scores;
}

function calculateMBTI(quiz, answers) {
  const dims = { EI: { E: 0, I: 0 }, SN: { S: 0, N: 0 }, TF: { T: 0, F: 0 }, JP: { J: 0, P: 0 } };

  quiz.questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer && dims[q.dimension]) {
      dims[q.dimension][answer] = (dims[q.dimension][answer] || 0) + 1;
    }
  });

  const type = [
    dims.EI.E >= dims.EI.I ? 'E' : 'I',
    dims.SN.S >= dims.SN.N ? 'S' : 'N',
    dims.TF.T >= dims.TF.F ? 'T' : 'F',
    dims.JP.J >= dims.JP.P ? 'J' : 'P',
  ].join('');

  return { type, dimensions: dims };
}

function getTopResult(quiz, scores) {
  if (quiz.type === 'mbti') {
    return quiz.results[scores.type] || Object.values(quiz.results)[0];
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topKey = sorted[0]?.[0];
  return { key: topKey, ...quiz.results[topKey] };
}

export default function GenericResults() {
  const { quizId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const quiz = getQuizById(quizId);
  const answers = location.state?.answers || {};

  if (!quiz) {
    return (
      <div className="generic-results-page">
        <p style={{ color: 'var(--text-muted)' }}>Quiz not found</p>
        <button className="results-action glass" onClick={() => navigate('/')}>← home</button>
      </div>
    );
  }

  const scores = calculateScores(quiz, answers);
  const result = getTopResult(quiz, scores);
  const isSpectrum = quiz.scoringType === 'spectrum';
  const isMBTI = quiz.type === 'mbti';

  // Score entries for bar chart (not MBTI)
  const scoreEntries = isMBTI ? [] : Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const maxScore = scoreEntries.length > 0 ? scoreEntries[0][1] : 1;

  return (
    <div className="generic-results-page">
      {/* Hero result */}
      <section className="gr-hero" style={{ '--gr-gradient': result?.gradient || quiz.gradient }}>
        <div className="gr-hero-glow" />
        <div className="gr-hero-emoji">{result?.emoji || quiz.emoji}</div>
        <h1 className="gr-hero-name">{result?.name || 'Your Result'}</h1>
        {isMBTI && <p className="gr-hero-type">{scores.type}</p>}
        <p className="gr-hero-quiz">{quiz.emoji} {quiz.title}</p>
      </section>

      {/* Description */}
      <section className="gr-description glass">
        <p>{result?.description || 'Thanks for completing this quiz!'}</p>
      </section>

      {/* Traits */}
      {result?.traits && (
        <section className="gr-traits">
          {result.traits.map((trait, i) => (
            <span key={i} className="gr-trait glass" style={{ animationDelay: `${i * 0.08}s` }}>
              {trait}
            </span>
          ))}
        </section>
      )}

      {/* Score Breakdown */}
      <section className="gr-breakdown glass">
        <h3 className="gr-breakdown-title">
          {isSpectrum ? 'your spectrum' : isMBTI ? 'your dimensions' : 'your breakdown'}
        </h3>

        {isMBTI ? (
          <div className="gr-mbti-dims">
            {Object.entries(scores.dimensions).map(([dim, poles]) => {
              const [left, right] = dim.split('');
              const total = (poles[left] || 0) + (poles[right] || 0);
              const leftPct = total > 0 ? ((poles[left] || 0) / total) * 100 : 50;
              return (
                <div key={dim} className="gr-mbti-row">
                  <span className={`gr-mbti-pole ${leftPct > 50 ? 'active' : ''}`}>{left}</span>
                  <div className="gr-mbti-track">
                    <div className="gr-mbti-fill" style={{ width: `${leftPct}%`, background: 'var(--gr-gradient)' }} />
                  </div>
                  <span className={`gr-mbti-pole ${leftPct <= 50 ? 'active' : ''}`}>{right}</span>
                  <span className="gr-mbti-pct">{Math.round(Math.max(leftPct, 100 - leftPct))}%</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="gr-bars">
            {scoreEntries.map(([key, score]) => {
              const rd = quiz.results[key];
              const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
              return (
                <div key={key} className="gr-bar-row">
                  <div className="gr-bar-label">
                    <span>{rd?.emoji || ''} {rd?.name || key}</span>
                    <span className="gr-bar-value">{score}</span>
                  </div>
                  <div className="gr-bar-track">
                    <div
                      className="gr-bar-fill"
                      style={{ width: `${pct}%`, background: rd?.gradient || quiz.gradient }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Actions */}
      <section className="gr-actions">
        <button className="gr-action glass" onClick={() => navigate('/')}>
          ← back to journey
        </button>
        <button className="gr-action gr-retake glass" onClick={() => navigate(`/quiz/${quizId}`)}>
          retake quiz ↻
        </button>
      </section>
    </div>
  );
}
