import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./Quiz.css";

export default function Quiz({ user, questionBank }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnswers = async () => {
      if (!questionBank || questionBank.length === 0) {
        console.error("Question bank is undefined or empty.");
        setLoading(false);
        return;
      }

      if (user) {
        const docRef = doc(db, "quizResults", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAnswers(data.answers || Array(questionBank.length).fill(null));
          setSelectedOption(data.answers?.[0] || 0);
        } else {
          const emptyAnswers = Array(questionBank.length).fill(null);
          setAnswers(emptyAnswers);
          setSelectedOption(0);
        }
      } else {
        const emptyAnswers = Array(questionBank.length).fill(null);
        setAnswers(emptyAnswers);
        setSelectedOption(0);
      }

      setLoading(false);
    };

    fetchAnswers();
  }, [user, questionBank]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption;

    setAnswers(updatedAnswers);

    if (user) {
      try {
        const docRef = doc(db, "quizResults", user.uid);
        await setDoc(docRef, { answers: updatedAnswers }, { merge: true });
        console.log(`Answer for question ${currentQuestion + 1} saved to Firestore.`);
      } catch (error) {
        console.error("Error saving answer:", error.message);
      }
    } else {
      localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
      console.log("Answer saved to localStorage.");
    }

    if (currentQuestion < questionBank.length - 1) {
      setSelectedOption(updatedAnswers[currentQuestion + 1] || 0);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizSubmit(updatedAnswers);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleQuizSubmit = async (finalAnswers) => {
    if (user) {
      try {
        const docRef = doc(db, "quizResults", user.uid);
        await setDoc(
          docRef,
          {
            answers: finalAnswers,
            aura: { status: "completed", timestamp: new Date() },
          },
          { merge: true }
        );
        console.log("Quiz Completed. Submitting final results.");
        navigate("/results");
      } catch (error) {
        console.error("Error submitting quiz:", error.message);
      }
    } else {
      localStorage.setItem("quizAnswers", JSON.stringify(finalAnswers));
      console.log("Quiz completed. Answers saved to localStorage.");
      alert("Create an account to save your quiz progress!");
      navigate("/auth");
    }
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="question-panel">
        <h3 className="question-header">QUESTION {currentQuestion + 1}</h3>
        <p className="question-body">{questionBank[currentQuestion]?.question}</p>
        <form onSubmit={handleFormSubmit} className="options-container">
          {questionBank[currentQuestion]?.options.map((option, idx) => (
            <div
              key={idx}
              className={`option-card ${selectedOption === idx + 1 ? "selected" : ""}`}
              onClick={() => handleOptionChange(idx + 1)}
            >
              {option}
            </div>
          ))}
          <button type="submit" className="submit-btn">
            {currentQuestion === questionBank.length - 1 ? "Submit Quiz" : "Next Question"}
          </button>
        </form>
      </div>
      <div className="navigation-panel">
        <h4>NAVIGATE</h4>
        <div className="nav-button">
          {questionBank.map((_, idx) => (
            <button
              key={idx}
              className={`btn ${idx === currentQuestion ? "active" : ""}`}
              onClick={() => {
                setCurrentQuestion(idx);
                setSelectedOption(answers[idx] || 0);
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
