import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const quizzes = [
    {
      title: "Aura Quiz",
      description: "Discover your aura color.",
      backgroundImage: "url('../../public/blurred-aura-image.png')", // Ensure this path exists in your project
      path: "/aura/quiz", // Correct path for Aura Quiz
    },
    {
      title: "Big 5",
      description: "Uncover your personality traits.",
      backgroundImage: "url('/assets/big5-image.jpg')", // Placeholder path, update with actual image
      path: "/big5", // Placeholder path for future quiz
    },
    {
      title: "Career Quiz",
      description: "Find your ideal career path.",
      backgroundImage: "url('/assets/career-image.jpg')", // Placeholder path, update with actual image
      path: "/career", // Placeholder path for future quiz
    },
  ];

  return (
    <div className="landing-page">
      <div className="landing-gallery">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="gallery-item"
            style={{ backgroundImage: quiz.backgroundImage }}
            onClick={() => navigate(quiz.path)} // Navigate to quiz path on click
          >
            <div className="gallery-content">
              <h2 className="gallery-title">{quiz.title}</h2>
              <p className="gallery-description">{quiz.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
