import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './aura/AuraQuiz.css';
import './GenericResults.css';

/* ═══════════════════════════════════════════════════
   ZODIAC QUIZ — Birthday Input → Zodiac Profile
   ═══════════════════════════════════════════════════ */

const ZODIAC_SIGNS = [
  { name: 'Capricorn', emoji: '♑', element: 'Earth', dates: 'Dec 22 – Jan 19', start: [12, 22], end: [1, 19], gradient: 'linear-gradient(135deg, #708090, #89CFF0)', color: '#708090', description: 'You\'re a Capricorn — ambitious, disciplined, and endlessly hardworking. You climb every mountain with patience and determination. Your persistence is legendary, and your success is inevitable.', traits: ['Ambitious', 'Disciplined', 'Patient', 'Responsible', 'Strategic'] },
  { name: 'Aquarius', emoji: '♒', element: 'Air', dates: 'Jan 20 – Feb 18', start: [1, 20], end: [2, 18], gradient: 'linear-gradient(135deg, #89CFF0, #C8A2FF)', color: '#89CFF0', description: 'You\'re an Aquarius — innovative, independent, and brilliantly unconventional. You see the future before it arrives and champion progress in everything you do. You\'re the visionary the world needs.', traits: ['Innovative', 'Independent', 'Humanitarian', 'Intellectual', 'Unique'] },
  { name: 'Pisces', emoji: '♓', element: 'Water', dates: 'Feb 19 – Mar 20', start: [2, 19], end: [3, 20], gradient: 'linear-gradient(135deg, #E6BEFF, #89CFF0)', color: '#E6BEFF', description: 'You\'re a Pisces — deeply intuitive, creative, and spiritually connected. You feel the world on a level others can\'t comprehend. Your empathy and imagination are your superpowers.', traits: ['Intuitive', 'Creative', 'Compassionate', 'Dreamy', 'Spiritual'] },
  { name: 'Aries', emoji: '♈', element: 'Fire', dates: 'Mar 21 – Apr 19', start: [3, 21], end: [4, 19], gradient: 'linear-gradient(135deg, #FF4444, #FF6B00)', color: '#FF4444', description: 'You\'re an Aries — bold, passionate, and fearlessly courageous. You were born to lead, to blaze trails, and to inspire others with your unstoppable energy. You don\'t follow paths — you create them.', traits: ['Bold', 'Energetic', 'Courageous', 'Passionate', 'Competitive'] },
  { name: 'Taurus', emoji: '♉', element: 'Earth', dates: 'Apr 20 – May 20', start: [4, 20], end: [5, 20], gradient: 'linear-gradient(135deg, #98FF98, #64FFDA)', color: '#98FF98', description: 'You\'re a Taurus — grounded, sensual, and unshakably reliable. You appreciate life\'s pleasures and build things that last. Your patience and strength are your greatest gifts.', traits: ['Reliable', 'Patient', 'Sensual', 'Determined', 'Loyal'] },
  { name: 'Gemini', emoji: '♊', element: 'Air', dates: 'May 21 – Jun 20', start: [5, 21], end: [6, 20], gradient: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#FFD700', description: 'You\'re a Gemini — quick-witted, versatile, and endlessly curious. Your mind moves at lightning speed, and your gift for communication makes you the most interesting person in any room.', traits: ['Curious', 'Versatile', 'Communicative', 'Quick-witted', 'Social'] },
  { name: 'Cancer', emoji: '♋', element: 'Water', dates: 'Jun 21 – Jul 22', start: [6, 21], end: [7, 22], gradient: 'linear-gradient(135deg, #FFB6C1, #E6BEFF)', color: '#FFB6C1', description: 'You\'re a Cancer — deeply nurturing, fiercely protective, and emotionally intelligent. Your intuition is your superpower, and the love you give creates safe harbors for everyone around you.', traits: ['Nurturing', 'Intuitive', 'Protective', 'Empathetic', 'Loyal'] },
  { name: 'Leo', emoji: '♌', element: 'Fire', dates: 'Jul 23 – Aug 22', start: [7, 23], end: [8, 22], gradient: 'linear-gradient(135deg, #FFD700, #FF8C00)', color: '#FFD700', description: 'You\'re a Leo — radiant, generous, and born to shine. Your natural charisma lights up every room, and your big heart matches your big presence. You rule with warmth and inspire with courage.', traits: ['Charismatic', 'Generous', 'Confident', 'Creative', 'Warm'] },
  { name: 'Virgo', emoji: '♍', element: 'Earth', dates: 'Aug 23 – Sep 22', start: [8, 23], end: [9, 22], gradient: 'linear-gradient(135deg, #64FFDA, #98FF98)', color: '#64FFDA', description: 'You\'re a Virgo — analytical, thoughtful, and endlessly helpful. Your eye for detail catches what everyone else misses, and your desire to improve the world makes you invaluable.', traits: ['Analytical', 'Helpful', 'Detail-oriented', 'Practical', 'Thoughtful'] },
  { name: 'Libra', emoji: '♎', element: 'Air', dates: 'Sep 23 – Oct 22', start: [9, 23], end: [10, 22], gradient: 'linear-gradient(135deg, #FFB6C1, #E6BEFF)', color: '#FFB6C1', description: 'You\'re a Libra — harmonious, charming, and deeply fair-minded. You see beauty in everything and create balance wherever you go. Your grace and diplomacy make the world more beautiful.', traits: ['Diplomatic', 'Charming', 'Fair', 'Social', 'Aesthetic'] },
  { name: 'Scorpio', emoji: '♏', element: 'Water', dates: 'Oct 23 – Nov 21', start: [10, 23], end: [11, 21], gradient: 'linear-gradient(135deg, #4B0082, #FF6B8A)', color: '#4B0082', description: 'You\'re a Scorpio — intense, magnetic, and transformative. You feel everything at maximum volume and your penetrating insight sees through every facade. You are the most powerful force for transformation in the zodiac.', traits: ['Intense', 'Passionate', 'Perceptive', 'Determined', 'Magnetic'] },
  { name: 'Sagittarius', emoji: '♐', element: 'Fire', dates: 'Nov 22 – Dec 21', start: [11, 22], end: [12, 21], gradient: 'linear-gradient(135deg, #FF8C00, #FFD700)', color: '#FF8C00', description: 'You\'re a Sagittarius — adventurous, optimistic, and philosophically brilliant. You chase horizons, seek truth, and live life as one grand adventure. Your enthusiasm is absolutely contagious.', traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Free-spirited', 'Honest'] },
];

function getZodiacSign(month, day) {
  for (const sign of ZODIAC_SIGNS) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (sm > em) {
      // wraps around year (Capricorn)
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign;
    } else {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign;
      if (month > sm && month < em) return sign;
    }
  }
  return ZODIAC_SIGNS[0]; // fallback
}

export default function ZodiacQuiz() {
  const navigate = useNavigate();
  const [birthday, setBirthday] = useState('');
  const [result, setResult] = useState(null);

  function handleReveal() {
    if (!birthday) return;
    const date = new Date(birthday + 'T12:00:00');
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setResult(getZodiacSign(month, day));
  }

  if (result) {
    return (
      <div className="generic-results-page">
        <section className="gr-hero" style={{ '--gr-gradient': result.gradient }}>
          <div className="gr-hero-glow" />
          <div className="gr-hero-emoji" style={{ fontSize: '5rem' }}>{result.emoji}</div>
          <h1 className="gr-hero-name">{result.name}</h1>
          <p className="gr-hero-quiz">♈ Zodiac Profile · {result.element} sign · {result.dates}</p>
        </section>

        <section className="gr-description glass">
          <p>{result.description}</p>
        </section>

        <section className="gr-traits">
          {result.traits.map((trait, i) => (
            <span key={i} className="gr-trait glass" style={{ animationDelay: `${i * 0.08}s` }}>
              {trait}
            </span>
          ))}
        </section>

        <section className="gr-actions">
          <button className="gr-action glass" onClick={() => navigate('/')}>
            ← back to journey
          </button>
          <button className="gr-action gr-retake glass" onClick={() => setResult(null)}>
            change birthday ↻
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="quiz-page" style={{ justifyContent: 'center' }}>
      <div className="quiz-question-card glass" style={{ textAlign: 'center', padding: '40px 28px' }}>
        <span className="question-number">♈ zodiac profile</span>
        <h2 className="question-text" style={{ marginBottom: 24 }}>when were you born?</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 24 }}>
          Enter your birthday to discover your zodiac sign and cosmic identity
        </p>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          style={{
            width: '100%',
            maxWidth: 280,
            padding: '14px 20px',
            borderRadius: 16,
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            background: 'rgba(255, 255, 255, 0.06)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            textAlign: 'center',
            outline: 'none',
            margin: '0 auto',
            display: 'block',
          }}
        />
      </div>
      <div className="quiz-nav" style={{ justifyContent: 'center' }}>
        <button
          className="quiz-nav-btn quiz-nav-submit"
          onClick={handleReveal}
          disabled={!birthday}
        >
          reveal my sign ✨
        </button>
      </div>
    </div>
  );
}
