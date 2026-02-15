import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const quizzes = [
  {
    id: 'aura',
    title: 'Aura Quiz',
    subtitle: 'Discover your energy color',
    emoji: '🔮',
    description: 'Uncover which of 14 aura colors defines your personality through 98 soul-searching questions.',
    gradient: 'linear-gradient(135deg, #FFB6C1, #E6BEFF, #89CFF0)',
    glowColor: 'rgba(200, 162, 255, 0.4)',
    path: '/aura/quiz',
    available: true,
  },
  {
    id: 'big5',
    title: 'Big 5',
    subtitle: 'Map your personality traits',
    emoji: '🧠',
    description: 'Explore the five fundamental dimensions of your personality.',
    gradient: 'linear-gradient(135deg, #89CFF0, #64FFDA, #98FF98)',
    glowColor: 'rgba(100, 255, 218, 0.4)',
    path: '/big5',
    available: false,
  },
  {
    id: 'career',
    title: 'Career Path',
    subtitle: 'Find your calling',
    emoji: '🚀',
    description: 'Discover career paths that align with your unique strengths.',
    gradient: 'linear-gradient(135deg, #FFB366, #FF9999, #FFBCD9)',
    glowColor: 'rgba(255, 179, 102, 0.4)',
    path: '/career',
    available: false,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">find yourself</span>
          </h1>
          <p className="hero-subtitle">
            discover your aura, personality, and purpose through
            <br />
            beautifully crafted quizzes ✨
          </p>
        </div>
      </section>

      {/* Quiz Gallery */}
      <section className="quiz-gallery">
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            className={`quiz-card glass ${!quiz.available ? 'quiz-card-locked' : ''}`}
            onClick={() => quiz.available && navigate(quiz.path)}
            style={{ '--card-gradient': quiz.gradient, '--card-glow': quiz.glowColor }}
          >
            <div className="card-shimmer" />
            <div className="card-content">
              <span className="card-emoji">{quiz.emoji}</span>
              <h2 className="card-title">{quiz.title}</h2>
              <p className="card-subtitle">{quiz.subtitle}</p>
              <p className="card-description">{quiz.description}</p>
              {quiz.available ? (
                <span className="card-cta">begin journey →</span>
              ) : (
                <span className="card-coming-soon">coming soon ✨</span>
              )}
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}
