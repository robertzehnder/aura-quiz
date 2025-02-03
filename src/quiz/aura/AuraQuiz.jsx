import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import "./AuraQuiz.css";
import auraQuestionBank from "./QuestionBank"; // Import question bank

const responseOptions = [
  "This does not describe me",
  "I am very seldom like this",
  "I am sometimes like this",
  "I am often like this",
  "This is me!",
];

const AuraQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate(); // Initialize navigation

  const currentQuestion = auraQuestionBank[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  console.log("Rendering question:", currentQuestion.question);
  console.log("Current question index:", currentQuestionIndex);
  console.log("Selected answers state:", selectedAnswers);

  const handleAnswerClick = (index) => {
    console.log(`✅ Answer selected: ${responseOptions[index]} (index ${index}) for question ${currentQuestionIndex}`);

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: index,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < auraQuestionBank.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("🎉 Quiz completed:", selectedAnswers);
      navigate("/quiz/aura/results", { state: { answers: selectedAnswers } }); // Navigate to results page with data
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="aura-quiz-page">
      {/* Question Section */}
      <div className="aura-question-section">
        <div className="aura-progress-bar-container">
          <div
            className="aura-progress-bar"
            style={{
              width: `${((currentQuestionIndex + 1) / auraQuestionBank.length) * 100}%`,
            }}
          ></div>
          <span className="aura-question-progress">{`Question ${currentQuestionIndex + 1} of ${auraQuestionBank.length}`}</span>
        </div>
        <div className="aura-quiz-question">{currentQuestion.question}</div>
      </div>

      {/* Answer Section */}
      <div className="aura-answer-section">
        {responseOptions.map((option, index) => (
          <div
            key={index}
            className={`aura-quiz-option ${selectedAnswers[currentQuestionIndex] === index ? "selected" : ""}`}
            onClick={() => handleAnswerClick(index)}
          >
            <button>
              {selectedAnswers[currentQuestionIndex] === index && <span className="checkmark">✔</span>}
            </button>
            <span className="answer-text">{option}</span>
          </div>
        ))}
      </div>

      {/* Navigation Toolbar */}
      <div className="aura-navigation-toolbar">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={handlePreviousQuestion}
        >
          Previous
        </button>
        <button
          onClick={handleNextQuestion}
        >
          {currentQuestionIndex === auraQuestionBank.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default AuraQuiz;