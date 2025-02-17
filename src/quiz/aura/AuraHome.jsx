import React, { useState } from "react";
import AuraQuiz from "./AuraQuiz"; // Ensure correct import

const AuraHome = ({ questionBank, user }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answerIndex, questionIndex) => {
    console.log(`Recording answer: ${answerIndex} for question ${questionIndex}`);
    
    // Save the answer
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));

    // Move to the next question
    if (questionIndex < questionBank.length - 1) {
      setCurrentQuestionIndex(questionIndex + 1);
    } else {
      console.log("🎉 Quiz finished! Answers:", answers);
      // Navigate to results or perform another action
    }
  };

  return (
    <AuraQuiz
      questionBank={questionBank}
      currentQuestionIndex={currentQuestionIndex}
      onAnswer={handleAnswer} // ✅ Pass the function properly
    />
  );
};

export default AuraHome;