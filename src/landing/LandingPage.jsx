import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const features = [
  {
    id: 'journey',
    title: 'The Journey',
    subtitle: '25 quizzes · 5 tiers · unlock AI',
    emoji: '🗺️',
    description: 'Embark on an RPG-style quest through 25 personality quizzes. Level up, earn tokens, and unlock deep AI insights about yourself.',
    gradient: 'linear-gradient(135deg, #64FFDA, #89CFF0, #C8A2FF, #FF6B8A)',
    glowColor: 'rgba(100, 255, 218, 0.35)',
    path: '/journey',
    available: true,
    featured: true,
  },
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
    id: 'fortune',
    title: 'Zoltar',
    subtitle: 'Ask the fortune teller',
    emoji: '🎭',
    description: 'Consult the mystical Zoltar for wisdom, guidance, and cosmic insights about your future.',
    gradient: 'linear-gradient(135deg, #FFD700, #FF6B00, #C8A2FF)',
    glowColor: 'rgba(255, 215, 0, 0.4)',
    path: '/fortune',
    available: true,
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

      {/* Feature Gallery */}
      <section className="quiz-gallery">
        {features.map((item) => (
          <button
            key={item.id}
            className={`quiz-card glass ${!item.available ? 'quiz-card-locked' : ''} ${item.featured ? 'quiz-card-featured' : ''}`}
            onClick={() => item.available && navigate(item.path)}
            style={{ '--card-gradient': item.gradient, '--card-glow': item.glowColor }}
          >
            <div className="card-shimmer" />
            {item.featured && <div className="card-featured-badge">✨ new</div>}
            <div className="card-content">
              <span className="card-emoji">{item.emoji}</span>
              <h2 className="card-title">{item.title}</h2>
              <p className="card-subtitle">{item.subtitle}</p>
              <p className="card-description">{item.description}</p>
              {item.available ? (
                <span className="card-cta">{item.featured ? 'start journey →' : 'begin →'}</span>
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
