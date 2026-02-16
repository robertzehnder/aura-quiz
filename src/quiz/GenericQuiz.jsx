import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById } from './data';
import './aura/AuraQuiz.css';

/* ═══════════════════════════════════════════════════
   GENERIC QUIZ ENGINE — Handles likert, choice, mbti
   ═══════════════════════════════════════════════════ */

export default function GenericQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = getQuizById(quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState('next');

  if (!quiz) {
    return (
      <div className="quiz-page">
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Quiz not found 😢</p>
          <button
            className="quiz-nav-btn quiz-nav-next"
            style={{ marginTop: 20 }}
            onClick={() => navigate('/')}
          >
            ← back home
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasCurrentAnswer = answers[currentQuestion.id] !== undefined;

  function handleAnswer(value) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }

  function handleNext() {
    if (currentIndex < totalQuestions - 1) {
      setDirection('next');
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function handleSubmit() {
    navigate(`/quiz/${quizId}/results`, { state: { answers, quizId } });
  }

  return (
    <div className="quiz-page">
      {/* Progress Section */}
      <div className="quiz-progress-section">
        <div className="quiz-progress-bar-track">
          <div
            className="quiz-progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="quiz-progress-info">
          <span className="quiz-progress-count">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="quiz-progress-answered">
            {answeredCount} answered ✨
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="quiz-question-area">
        <div
          className="quiz-question-card glass"
          key={currentIndex}
          style={{ animation: `slide-${direction} 0.4s var(--ease-bounce)` }}
        >
          <span className="question-number">
            {quiz.emoji} {quiz.title} · question {currentIndex + 1}
          </span>
          <h2 className="question-text">{currentQuestion.text}</h2>
        </div>
      </div>

      {/* Answer Options */}
      <div className="quiz-options">
        {quiz.type === 'likert' ? (
          /* Likert scale — shared options for all questions */
          quiz.likertOptions.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.value;
            return (
              <button
                key={option.value}
                className={`quiz-option glass ${isSelected ? 'quiz-option-selected' : ''}`}
                onClick={() => handleAnswer(option.value)}
              >
                <span className="option-emoji">{option.emoji}</span>
                <span className="option-label">{option.label}</span>
                {isSelected && <span className="option-check">✓</span>}
              </button>
            );
          })
        ) : quiz.type === 'mbti' ? (
          /* MBTI — binary choice per question */
          currentQuestion.options.map((option, i) => {
            const isSelected = answers[currentQuestion.id] === option.pole;
            return (
              <button
                key={i}
                className={`quiz-option glass ${isSelected ? 'quiz-option-selected' : ''}`}
                onClick={() => handleAnswer(option.pole)}
              >
                <span className="option-label">{option.text}</span>
                {isSelected && <span className="option-check">✓</span>}
              </button>
            );
          })
        ) : (
          /* Choice — unique options per question */
          currentQuestion.options.map((option, i) => {
            const isSelected = answers[currentQuestion.id] === option.category;
            return (
              <button
                key={i}
                className={`quiz-option glass ${isSelected ? 'quiz-option-selected' : ''}`}
                onClick={() => handleAnswer(option.category)}
              >
                <span className="option-label">{option.text}</span>
                {isSelected && <span className="option-check">✓</span>}
              </button>
            );
          })
        )}
      </div>

      {/* Navigation */}
      <div className="quiz-nav">
        <button
          className="quiz-nav-btn quiz-nav-prev"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← back
        </button>

        {isLastQuestion ? (
          <button
            className="quiz-nav-btn quiz-nav-submit"
            onClick={handleSubmit}
            disabled={answeredCount < totalQuestions}
          >
            see my results ✨
          </button>
        ) : (
          <button
            className="quiz-nav-btn quiz-nav-next"
            onClick={handleNext}
            disabled={!hasCurrentAnswer}
          >
            next →
          </button>
        )}
      </div>
    </div>
  );
}
