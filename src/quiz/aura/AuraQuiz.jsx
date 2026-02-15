import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import questions, { responseOptions } from './QuestionBank';
import './AuraQuiz.css';

export default function AuraQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState('next'); // for slide animation
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = useCallback((value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  }, [currentQuestion.id]);

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setDirection('next');
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    navigate('/aura/results', { state: { answers } });
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasCurrentAnswer = answers[currentQuestion.id] !== undefined;

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
          className={`quiz-question-card glass`}
          key={currentIndex}
          style={{ animation: `slide-${direction} 0.4s var(--ease-bounce)` }}
        >
          <span className="question-number">question {currentIndex + 1}</span>
          <h2 className="question-text">{currentQuestion.question}</h2>
        </div>
      </div>

      {/* Answer Options */}
      <div className="quiz-options">
        {responseOptions.map((option) => {
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
        })}
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
            reveal my aura ✨
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
