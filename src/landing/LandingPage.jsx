import React from "react";
import "./landingPage.css";

const LandingPage = () => {
  const quizzes = [
    {
      title: "Aura Quiz",
      description: "Discover your aura color.",
      backgroundImage: "url('../../public/blurred-aura-image.png')", // Replace with actual image path
    },
    {
      title: "Big 5",
      description: "Uncover your personality traits.",
      backgroundImage: "url('/path/to/big5-image.jpg')", // Replace with actual image path
    },
    {
      title: "Career Quiz",
      description: "Find your ideal career path.",
      backgroundImage: "url('/path/to/career-image.jpg')", // Replace with actual image path
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
