import { useState, useRef, useEffect, useCallback } from 'react';
import './FortuneTeller.css';

/* ═══════════════════════════════════════════════════
   GUIDE CONFIGURATIONS
   ═══════════════════════════════════════════════════ */

const GUIDES = {
  zoltar: {
    id: 'zoltar',
    name: 'Zoltar',
    emoji: '🔮',
    signText: 'ZOLTAR',
    welcomeEmoji: '🔮',
    welcomeText: 'Ask Zoltar a question and receive mystical wisdom...',
    thinkingText: '✨ channeling the spirits...',
    speakingPlaceholder: 'Zoltar is speaking...',
    inputPlaceholder: 'Ask your question...',
    sendEmoji: '🔮',
    msgIcon: '🔮',
    voiceRate: 0.82,
    voicePitch: 0.75,
    preferredVoices: [
      'Daniel', 'Google UK English Male', 'Microsoft Mark',
      'Alex', 'Tom', 'Google US English', 'Microsoft David',
    ],
    fortunes: [
      "The stars whisper of great change coming your way... I see a new path opening before you, one that will lead to unexpected joy. Trust in the journey, even when the road seems unclear.",
      "Your aura pulses with creative energy today... A dormant talent is about to awaken within you. The universe has been preparing you for this moment longer than you know.",
      "I sense a powerful connection forming in your life... Whether love, friendship, or mentorship, this bond will transform how you see yourself. Open your heart.",
      "The crystal ball reveals abundance approaching... Not just material wealth, but richness of experience. Say yes to the next unexpected invitation that crosses your path.",
      "Beware the comfort zone, dear seeker... Your greatest growth lies just beyond the edge of what feels safe. Take the leap, the net will appear.",
      "I see duality in your energy... Two choices stand before you, and both have merit. But your intuition already knows the answer. Listen to the quiet voice within.",
      "A message from the cosmos: patience is your superpower right now... What you've been building in silence is about to bloom in ways that will astound even you.",
      "The spirits speak of an old dream you've neglected... It's not too late. In fact, this is the perfect time to dust it off and breathe new life into it. The world needs what only you can create.",
      "Your energy field is shifting... I sense you're on the verge of a personal breakthrough. The challenges you've faced recently were not obstacles, they were training.",
      "The mystic winds carry a warning and a gift... Release what no longer serves you, and make room for what does. Transformation begins with letting go.",
    ],
    fortuneEmojis: ['✨', '🌙', '💫', '🔮', '🌟', '⚡', '🌸', '🎭', '🦋', '🌊'],
    idleMessages: [
      "Ask me anything, seeker...",
      "The crystal ball awaits your question...",
      "What mysteries shall we unravel?",
      "Step closer... I sense your curiosity...",
      "The spirits are restless tonight...",
    ],
  },

  yala: {
    id: 'yala',
    name: 'Yala',
    emoji: '🐱',
    signText: 'YALA',
    welcomeEmoji: '🐱',
    welcomeText: 'Ask Yala a question... he sees things others cannot...',
    thinkingText: '🌙 consulting the moon...',
    speakingPlaceholder: 'Yala is purring his wisdom...',
    inputPlaceholder: 'Whisper your question...',
    sendEmoji: '🐾',
    msgIcon: '🐱',
    voiceRate: 0.88,
    voicePitch: 0.85,
    preferredVoices: [
      'Daniel', 'Google UK English Male', 'Microsoft Mark',
      'Alex', 'Tom', 'Google US English', 'Microsoft David',
    ],
    fortunes: [
      "I was napping and saw your future in a dream... there's a warm sunbeam of opportunity heading your way. Curl up in it and let it fill you with confidence. Good things come to those who rest.",
      "My whiskers are tingling, which means change is in the air... don't resist it. Even cats land on their feet after the highest falls. You will too, and you'll look graceful doing it.",
      "I see you carrying burdens that aren't yours to carry... set them down like I knock things off tables. Sometimes you must push things away to make room for what truly matters.",
      "The moon told me something about you last night... your intuition is sharper than you think. Trust that feeling in your gut. I always trust mine, especially around tuna.",
      "Someone is thinking about you right now... I can feel it in the way my tail twitches. This connection will bring warmth to your life, like a lap on a cold evening.",
      "You've been overthinking things, haven't you? I can tell... try doing what I do, sit in a window and just exist for a while. Clarity comes when you stop chasing it.",
      "There's a door about to open for you, but you have to sit in front of it and meow... meaning, ask for what you want. The universe rewards those who aren't afraid to be heard.",
      "I sense creative energy swirling around you like a feather toy... chase it! Play with your ideas. Not everything has to be serious. Some of the best things start as play.",
      "Your energy is shifting, I can see it in your aura... it's getting brighter, like the glow of fireflies at dusk. You're becoming who you were always meant to be. Keep going.",
      "A wise cat once said, curiosity didn't kill the cat, it made the cat wiser... keep asking questions, keep exploring. Your next adventure is closer than you think.",
    ],
    fortuneEmojis: ['🌙', '✨', '🪶', '🐾', '💫', '🌸', '🚪', '🎀', '🦋', '🌟'],
    idleMessages: [
      "Mrrrow... ask me anything...",
      "I see things others cannot...",
      "The moonlight whispers to me...",
      "My whiskers sense your curiosity...",
      "Purr... the spirits stir...",
    ],
  },
};

/* ── Voice helpers ─────────────────────────────────── */
const SYNTH = typeof window !== 'undefined' ? window.speechSynthesis : null;

function pickVoice(preferredNames) {
  if (!SYNTH) return null;
  const voices = SYNTH.getVoices();
  for (const name of preferredNames) {
    const match = voices.find((v) => v.name.includes(name) && v.lang.startsWith('en'));
    if (match) return match;
  }
  return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
}

/* ═══════════════════════════════════════════════════
   ZOLTAR CHARACTER (sub-component)
   ═══════════════════════════════════════════════════ */
function ZoltarCharacter({ isSpeaking }) {
  return (
    <div className={`fortune-teller ${isSpeaking ? 'speaking' : 'idle'}`}>
      {/* Body / Robes */}
      <div className="ft-body">
        <div className="ft-robe" />
        <div className="ft-robe-inner" />
        <div className="ft-collar" />
        <div className="ft-arm ft-arm-left" />
        <div className="ft-arm ft-arm-right" />
        <div className="ft-hand ft-hand-left" />
        <div className="ft-hand ft-hand-right" />
      </div>

      {/* Head */}
      <div className="ft-head">
        <div className="ft-turban">
          <div className="ft-turban-wrap" />
          <div className="ft-turban-jewel" />
          <div className="ft-turban-feather" />
        </div>
        <div className="ft-face">
          <div className="ft-eye ft-eye-left"><div className="ft-pupil" /></div>
          <div className="ft-eye ft-eye-right"><div className="ft-pupil" /></div>
          <div className="ft-eyebrow ft-eyebrow-left" />
          <div className="ft-eyebrow ft-eyebrow-right" />
          <div className="ft-nose" />
          <div className="ft-mustache" />
          <div className="ft-beard" />
          <div className="ft-mouth" />
        </div>
        <div className="ft-earring ft-earring-left" />
        <div className="ft-earring ft-earring-right" />
      </div>

      {/* Necklace */}
      <div className="ft-necklace">
        <div className="ft-bead" />
        <div className="ft-bead" />
        <div className="ft-bead" />
        <div className="ft-bead" />
        <div className="ft-bead" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   YALA CHARACTER (sub-component)
   ═══════════════════════════════════════════════════ */
function YalaCharacter({ isSpeaking }) {
  return (
    <div className={`yala-cat ${isSpeaking ? 'speaking' : 'idle'}`}>
      {/* Body */}
      <div className="yala-body">
        <div className="yala-fur-grey" />
        <div className="yala-fur-white" />
        {/* Tail — inside body so it's anchored to the body */}
        <div className="yala-tail">
          <div className="yala-tail-stripe" />
          <div className="yala-tail-stripe" />
          <div className="yala-tail-stripe" />
        </div>
        {/* Front paws */}
        <div className="yala-paw yala-paw-left" />
        <div className="yala-paw yala-paw-right" />
      </div>

      {/* Head */}
      <div className="yala-head">
        {/* Ears */}
        <div className="yala-ear yala-ear-left">
          <div className="yala-ear-inner" />
        </div>
        <div className="yala-ear yala-ear-right">
          <div className="yala-ear-inner" />
        </div>

        {/* Face base */}
        <div className="yala-face">
          {/* Grey fur pattern on top */}
          <div className="yala-face-grey" />
          {/* White muzzle */}
          <div className="yala-muzzle" />

          {/* Eyes */}
          <div className="yala-eye yala-eye-left">
            <div className="yala-iris">
              <div className="yala-pupil" />
            </div>
            <div className="yala-eye-shine" />
          </div>
          <div className="yala-eye yala-eye-right">
            <div className="yala-iris">
              <div className="yala-pupil" />
            </div>
            <div className="yala-eye-shine" />
          </div>

          {/* Nose */}
          <div className="yala-nose" />

          {/* Mouth */}
          <div className="yala-mouth">
            <div className="yala-mouth-line yala-mouth-left" />
            <div className="yala-mouth-line yala-mouth-right" />
          </div>

          {/* Whiskers */}
          <div className="yala-whiskers yala-whiskers-left">
            <div className="yala-whisker" />
            <div className="yala-whisker" />
            <div className="yala-whisker" />
          </div>
          <div className="yala-whiskers yala-whiskers-right">
            <div className="yala-whisker" />
            <div className="yala-whisker" />
            <div className="yala-whisker" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function FortuneTeller() {
  const [activeGuide, setActiveGuide] = useState('zoltar');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentFortuneIndex, setCurrentFortuneIndex] = useState(0);
  const [idleText, setIdleText] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voicesReady, setVoicesReady] = useState(false);
  const chatEndRef = useRef(null);
  const typingTimerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const utteranceRef = useRef(null);

  const guide = GUIDES[activeGuide];

  // Reset idle text when guide changes
  useEffect(() => {
    setIdleText(guide.idleMessages[0]);
  }, [activeGuide, guide.idleMessages]);

  // Load voices
  useEffect(() => {
    if (!SYNTH) return;
    const onVoicesChanged = () => setVoicesReady(true);
    SYNTH.addEventListener('voiceschanged', onVoicesChanged);
    if (SYNTH.getVoices().length > 0) setVoicesReady(true);
    return () => SYNTH.removeEventListener('voiceschanged', onVoicesChanged);
  }, []);

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if (SYNTH) SYNTH.cancel();
      clearInterval(typingTimerRef.current);
    };
  }, []);

  // Cycle idle messages
  useEffect(() => {
    if (isSpeaking) return;

    idleTimerRef.current = setInterval(() => {
      setIdleText((prev) => {
        const msgs = guide.idleMessages;
        const currentIdx = msgs.indexOf(prev);
        return msgs[(currentIdx + 1) % msgs.length];
      });
    }, 4000);

    return () => clearInterval(idleTimerRef.current);
  }, [isSpeaking, guide.idleMessages]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayedText]);

  /** Speak text aloud */
  const speakText = useCallback((text) => {
    if (!SYNTH || !voiceEnabled) return null;

    SYNTH.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = pickVoice(guide.preferredVoices);
    if (voice) utter.voice = voice;

    utter.rate = guide.voiceRate;
    utter.pitch = guide.voicePitch;
    utter.volume = 1;

    SYNTH.speak(utter);
    utteranceRef.current = utter;
    return utter;
  }, [voiceEnabled, guide]);

  /** Toggle voice on/off */
  const toggleVoice = useCallback(() => {
    if (SYNTH && voiceEnabled) SYNTH.cancel();
    setVoiceEnabled((prev) => !prev);
  }, [voiceEnabled]);

  /** Switch guide */
  const switchGuide = useCallback((guideId) => {
    if (guideId === activeGuide || isSpeaking) return;
    if (SYNTH) SYNTH.cancel();
    clearInterval(typingTimerRef.current);
    setActiveGuide(guideId);
    setMessages([]);
    setDisplayedText('');
    setCurrentFortuneIndex(0);
    setIsSpeaking(false);
  }, [activeGuide, isSpeaking]);

  // Typewriter effect
  const typeText = useCallback((text, onComplete) => {
    let index = 0;
    setDisplayedText('');

    typingTimerRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimerRef.current);
        onComplete?.();
      }
    }, 30);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isSpeaking) return;

    const userMessage = input.trim();
    setInput('');

    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);

    setIsSpeaking(true);
    const fortuneIdx = currentFortuneIndex % guide.fortunes.length;
    const fortune = guide.fortunes[fortuneIdx];
    const emoji = guide.fortuneEmojis[fortuneIdx];
    setCurrentFortuneIndex((prev) => prev + 1);

    setTimeout(() => {
      const utter = speakText(fortune);

      const displayFortune = `${fortune} ${emoji}`;
      typeText(displayFortune, () => {
        setMessages((prev) => [...prev, { role: 'fortune', text: displayFortune }]);
        setDisplayedText('');

        if (utter && SYNTH && SYNTH.speaking) {
          utter.onend = () => setIsSpeaking(false);
          setTimeout(() => setIsSpeaking(false), 15000);
        } else {
          setIsSpeaking(false);
        }
      });
    }, 1500);
  };

  return (
    <div className={`fortune-page guide-${activeGuide}`}>
      {/* ═══ Guide Selector ═══ */}
      <div className="guide-selector">
        {Object.values(GUIDES).map((g) => (
          <button
            key={g.id}
            className={`guide-tab ${activeGuide === g.id ? 'active' : ''}`}
            onClick={() => switchGuide(g.id)}
            disabled={isSpeaking}
          >
            <span className="guide-tab-emoji">{g.emoji}</span>
            <span className="guide-tab-name">{g.name}</span>
          </button>
        ))}
      </div>

      {/* ═══ Scene ═══ */}
      <div className="guide-scene">
        <div className="booth">
          <div className="booth-top">
            <div className="booth-sign">
              <span className="booth-sign-text">{guide.signText}</span>
            </div>
          </div>

          <div className="booth-body">
            {/* Curtains */}
            <div className="curtain curtain-left" />
            <div className="curtain curtain-right" />

            {/* Sparkles */}
            <div className="booth-sparkles">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="booth-star"
                  style={{
                    top: `${10 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Character */}
            {activeGuide === 'zoltar' ? (
              <ZoltarCharacter isSpeaking={isSpeaking} />
            ) : (
              <YalaCharacter isSpeaking={isSpeaking} />
            )}

            {/* Crystal Ball / Yarn Ball */}
            <div className={`crystal-ball ${isSpeaking ? 'active' : ''}`}>
              <div className="crystal-glow" />
              <div className="crystal-sphere" />
              <div className="crystal-highlight" />
              <div className="crystal-mist" />
              <div className="crystal-base" />
            </div>
          </div>

          <div className="booth-bottom">
            <div className="booth-trim" />
          </div>
        </div>

        {/* Speech bubble */}
        <div className={`speech-bubble ${isSpeaking || displayedText ? 'visible' : ''}`}>
          <p className="speech-text">
            {displayedText || (isSpeaking ? guide.thinkingText : idleText)}
          </p>
          {isSpeaking && <span className="speech-cursor">|</span>}
        </div>

        {/* Voice toggle */}
        <button
          className={`voice-toggle ${voiceEnabled ? 'voice-on' : 'voice-off'}`}
          onClick={toggleVoice}
          aria-label={voiceEnabled ? `Mute ${guide.name}` : `Unmute ${guide.name}`}
          title={voiceEnabled ? `Mute ${guide.name}` : `Unmute ${guide.name}`}
        >
          <span className="voice-icon">{voiceEnabled ? '🔊' : '🔇'}</span>
          <span className="voice-label">{voiceEnabled ? 'voice on' : 'voice off'}</span>
        </button>
      </div>

      {/* ═══ Chat Area ═══ */}
      <div className="fortune-chat">
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-welcome">
              <span className="chat-welcome-emoji">{guide.welcomeEmoji}</span>
              <p>{guide.welcomeText}</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
              {msg.role === 'fortune' && <span className="chat-msg-icon">{guide.msgIcon}</span>}
              <div className="chat-msg-bubble glass">
                <p>{msg.text}</p>
              </div>
              {msg.role === 'user' && <span className="chat-msg-icon">✨</span>}
            </div>
          ))}

          {isSpeaking && displayedText && (
            <div className="chat-msg chat-msg-fortune">
              <span className="chat-msg-icon">{guide.msgIcon}</span>
              <div className="chat-msg-bubble glass chat-msg-typing">
                <p>{displayedText}<span className="typing-cursor">|</span></p>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input glass"
            placeholder={isSpeaking ? guide.speakingPlaceholder : guide.inputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSpeaking}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={isSpeaking || !input.trim()}
          >
            <span>{guide.sendEmoji}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
