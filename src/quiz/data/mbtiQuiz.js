export default {
  id: 'mbti',
  title: 'Myers-Briggs',
  subtitle: 'Your 4-letter type',
  emoji: '🧩',
  gradient: 'linear-gradient(135deg, #E6BEFF, #C8A2FF, #FF69B4)',
  type: 'mbti',
  questions: [
    // E/I dimension
    { id: 1, text: 'At a party, you\'re more likely to:', dimension: 'EI', options: [
      { text: 'Mingle with many people, including strangers', pole: 'E' },
      { text: 'Talk deeply with one or two people you know', pole: 'I' },
    ]},
    { id: 2, text: 'After a long day, you recharge by:', dimension: 'EI', options: [
      { text: 'Going out with friends or calling someone', pole: 'E' },
      { text: 'Having quiet time alone or with one close person', pole: 'I' },
    ]},
    { id: 3, text: 'When working on a project, you prefer:', dimension: 'EI', options: [
      { text: 'Brainstorming with a group, bouncing ideas around', pole: 'E' },
      { text: 'Working independently, then sharing your finished work', pole: 'I' },
    ]},
    { id: 4, text: 'You\'re energized more by:', dimension: 'EI', options: [
      { text: 'The outer world — people, activities, experiences', pole: 'E' },
      { text: 'The inner world — ideas, reflections, imagination', pole: 'I' },
    ]},
    { id: 5, text: 'In a conversation, you tend to:', dimension: 'EI', options: [
      { text: 'Think out loud and process by talking', pole: 'E' },
      { text: 'Think carefully before speaking', pole: 'I' },
    ]},
    { id: 6, text: 'You feel most like yourself when:', dimension: 'EI', options: [
      { text: 'Surrounded by people and activity', pole: 'E' },
      { text: 'In a calm, quiet environment', pole: 'I' },
    ]},
    // S/N dimension
    { id: 7, text: 'When learning something new, you prefer:', dimension: 'SN', options: [
      { text: 'Practical, hands-on examples and step-by-step instructions', pole: 'S' },
      { text: 'Understanding the big picture and underlying theory first', pole: 'N' },
    ]},
    { id: 8, text: 'You\'re more interested in:', dimension: 'SN', options: [
      { text: 'What\'s real and present — facts, details, experience', pole: 'S' },
      { text: 'What\'s possible — patterns, theories, future potential', pole: 'N' },
    ]},
    { id: 9, text: 'When reading, you prefer:', dimension: 'SN', options: [
      { text: 'Realistic stories or practical non-fiction', pole: 'S' },
      { text: 'Fantasy, sci-fi, or abstract/philosophical works', pole: 'N' },
    ]},
    { id: 10, text: 'You\'d describe yourself as more:', dimension: 'SN', options: [
      { text: 'Down-to-earth and practical', pole: 'S' },
      { text: 'Imaginative and conceptual', pole: 'N' },
    ]},
    { id: 11, text: 'When giving directions, you:', dimension: 'SN', options: [
      { text: 'Give specific, detailed step-by-step instructions', pole: 'S' },
      { text: 'Describe the general idea and let them figure out details', pole: 'N' },
    ]},
    { id: 12, text: 'You trust more in:', dimension: 'SN', options: [
      { text: 'Direct experience and proven methods', pole: 'S' },
      { text: 'Gut feelings and flashes of insight', pole: 'N' },
    ]},
    // T/F dimension
    { id: 13, text: 'When making a tough decision, you rely more on:', dimension: 'TF', options: [
      { text: 'Logical analysis and objective criteria', pole: 'T' },
      { text: 'How it will affect people and what feels right', pole: 'F' },
    ]},
    { id: 14, text: 'You value more in a friend:', dimension: 'TF', options: [
      { text: 'Honesty and intellectual respect', pole: 'T' },
      { text: 'Warmth and emotional support', pole: 'F' },
    ]},
    { id: 15, text: 'When giving feedback, you prioritize:', dimension: 'TF', options: [
      { text: 'Being truthful and constructive, even if it stings', pole: 'T' },
      { text: 'Being kind and encouraging, even if I soften the truth', pole: 'F' },
    ]},
    { id: 16, text: 'In an argument, you\'re more focused on:', dimension: 'TF', options: [
      { text: 'Who\'s right — logic and fairness matter most', pole: 'T' },
      { text: 'How everyone feels — harmony matters most', pole: 'F' },
    ]},
    { id: 17, text: 'You\'re more moved by:', dimension: 'TF', options: [
      { text: 'A brilliant, well-crafted argument', pole: 'T' },
      { text: 'A genuine, heartfelt story', pole: 'F' },
    ]},
    { id: 18, text: 'When a coworker makes a mistake:', dimension: 'TF', options: [
      { text: 'I point it out objectively — it needs to be fixed', pole: 'T' },
      { text: 'I consider their feelings first and approach gently', pole: 'F' },
    ]},
    // J/P dimension
    { id: 19, text: 'Your daily life is more:', dimension: 'JP', options: [
      { text: 'Structured with plans, schedules, and lists', pole: 'J' },
      { text: 'Flexible and spontaneous — I go with the flow', pole: 'P' },
    ]},
    { id: 20, text: 'When a deadline is approaching, you:', dimension: 'JP', options: [
      { text: 'Finished early — I planned ahead', pole: 'J' },
      { text: 'Powered through at the last minute — I work best under pressure', pole: 'P' },
    ]},
    { id: 21, text: 'You prefer:', dimension: 'JP', options: [
      { text: 'Having things decided and settled', pole: 'J' },
      { text: 'Keeping options open as long as possible', pole: 'P' },
    ]},
    { id: 22, text: 'Your workspace is typically:', dimension: 'JP', options: [
      { text: 'Organized — everything in its place', pole: 'J' },
      { text: 'A bit chaotic — but I know where everything is', pole: 'P' },
    ]},
    { id: 23, text: 'When traveling, you:', dimension: 'JP', options: [
      { text: 'Plan an itinerary in advance', pole: 'J' },
      { text: 'Wing it and see where the day takes me', pole: 'P' },
    ]},
    { id: 24, text: 'You feel more comfortable when:', dimension: 'JP', options: [
      { text: 'Things are predictable and under control', pole: 'J' },
      { text: 'Life is full of surprises and new possibilities', pole: 'P' },
    ]},
  ],
  results: {
    'INTJ': { name: 'INTJ — The Architect', emoji: '🏗️', color: '#4B0082', gradient: 'linear-gradient(135deg, #4B0082, #89CFF0)', description: 'Strategic, independent, and fiercely analytical. You see the world as a complex system to be understood and optimized. Your mind works like a chess master — always thinking five moves ahead.', traits: ['Strategic', 'Independent', 'Analytical', 'Visionary', 'Determined'] },
    'INTP': { name: 'INTP — The Logician', emoji: '🔬', color: '#89CFF0', gradient: 'linear-gradient(135deg, #89CFF0, #64FFDA)', description: 'A brilliant, abstract thinker who lives in the world of ideas. You question everything, love theoretical puzzles, and your mind is a beautiful labyrinth of interconnected thoughts.', traits: ['Logical', 'Innovative', 'Curious', 'Abstract', 'Independent'] },
    'ENTJ': { name: 'ENTJ — The Commander', emoji: '👑', color: '#FF4444', gradient: 'linear-gradient(135deg, #FF4444, #FFD700)', description: 'Bold, strategic, and born to lead. You see inefficiency as a personal challenge and have the charisma and willpower to drive massive change. People naturally follow your vision.', traits: ['Commanding', 'Strategic', 'Efficient', 'Confident', 'Ambitious'] },
    'ENTP': { name: 'ENTP — The Debater', emoji: '⚡', color: '#FFA500', gradient: 'linear-gradient(135deg, #FFA500, #FFD700)', description: 'Quick-witted, curious, and intellectually fearless. You love a good debate, see every problem from twelve angles, and thrive on challenging the status quo with your infectious energy.', traits: ['Innovative', 'Quick-witted', 'Charismatic', 'Resourceful', 'Bold'] },
    'INFJ': { name: 'INFJ — The Advocate', emoji: '🌙', color: '#C8A2FF', gradient: 'linear-gradient(135deg, #C8A2FF, #89CFF0)', description: 'The rarest type — deeply intuitive, compassionate, and driven by a quiet inner vision. You understand people on a profound level and are guided by an unshakeable sense of purpose.', traits: ['Insightful', 'Principled', 'Compassionate', 'Private', 'Visionary'] },
    'INFP': { name: 'INFP — The Mediator', emoji: '🦋', color: '#E6BEFF', gradient: 'linear-gradient(135deg, #E6BEFF, #FFB6C1)', description: 'An idealistic dreamer with a rich inner world. You feel everything deeply, champion authenticity, and use your creativity to make the world more beautiful and just.', traits: ['Idealistic', 'Creative', 'Empathetic', 'Authentic', 'Passionate'] },
    'ENFJ': { name: 'ENFJ — The Protagonist', emoji: '✨', color: '#FF69B4', gradient: 'linear-gradient(135deg, #FF69B4, #FFD700)', description: 'Charismatic, empathetic, and inspiring. You have a natural gift for bringing out the best in others and leading with your heart. People are drawn to your warmth and vision.', traits: ['Charismatic', 'Empathetic', 'Inspiring', 'Altruistic', 'Organized'] },
    'ENFP': { name: 'ENFP — The Campaigner', emoji: '🌈', color: '#FFB6C1', gradient: 'linear-gradient(135deg, #FFB6C1, #FFD700)', description: 'A free spirit full of enthusiasm, creativity, and genuine warmth. You see possibility everywhere, connect with people instantly, and live life as a grand, beautiful adventure.', traits: ['Enthusiastic', 'Creative', 'Sociable', 'Free-spirited', 'Warm'] },
    'ISTJ': { name: 'ISTJ — The Logistician', emoji: '📋', color: '#4488CC', gradient: 'linear-gradient(135deg, #4488CC, #64FFDA)', description: 'Responsible, thorough, and utterly dependable. You honor your commitments, value tradition, and build structures that stand the test of time. You\'re the backbone of every organization.', traits: ['Responsible', 'Dependable', 'Thorough', 'Practical', 'Loyal'] },
    'ISFJ': { name: 'ISFJ — The Defender', emoji: '🛡️', color: '#64FFDA', gradient: 'linear-gradient(135deg, #64FFDA, #98FF98)', description: 'Warm, dedicated, and deeply caring. You protect those you love with quiet strength and remember every detail about the people important to you. Your loyalty is legendary.', traits: ['Caring', 'Observant', 'Loyal', 'Patient', 'Supportive'] },
    'ESTJ': { name: 'ESTJ — The Executive', emoji: '🏛️', color: '#FFD700', gradient: 'linear-gradient(135deg, #FFD700, #FF8C00)', description: 'A natural organizer who values order, hard work, and honesty. You lead by example, build reliable systems, and create stability for everyone around you.', traits: ['Organized', 'Honest', 'Dedicated', 'Strong-willed', 'Direct'] },
    'ESFJ': { name: 'ESFJ — The Consul', emoji: '🤝', color: '#FF69B4', gradient: 'linear-gradient(135deg, #FF69B4, #FFB6C1)', description: 'Warm, social, and attentive to others\' needs. You create community wherever you go, remember everyone\'s birthdays, and make sure no one feels left out.', traits: ['Caring', 'Social', 'Loyal', 'Traditional', 'Practical'] },
    'ISTP': { name: 'ISTP — The Virtuoso', emoji: '🔧', color: '#708090', gradient: 'linear-gradient(135deg, #708090, #89CFF0)', description: 'Cool, analytical, and endlessly hands-on. You understand how things work at a fundamental level and can troubleshoot anything. Your quiet competence speaks volumes.', traits: ['Practical', 'Observant', 'Analytical', 'Versatile', 'Cool-headed'] },
    'ISFP': { name: 'ISFP — The Adventurer', emoji: '🎨', color: '#98FF98', gradient: 'linear-gradient(135deg, #98FF98, #FFB6C1)', description: 'A gentle, artistic soul who experiences life through beauty and sensation. You live in the present moment, express yourself through art and action, and cherish your freedom.', traits: ['Artistic', 'Sensitive', 'Charming', 'Adventurous', 'Peaceful'] },
    'ESTP': { name: 'ESTP — The Entrepreneur', emoji: '🎯', color: '#FF8C00', gradient: 'linear-gradient(135deg, #FF8C00, #FF4444)', description: 'Bold, energetic, and perceptive. You live on the edge, think on your feet, and thrive in high-pressure situations. You\'re the person everyone wants in a crisis.', traits: ['Energetic', 'Perceptive', 'Bold', 'Direct', 'Sociable'] },
    'ESFP': { name: 'ESFP — The Entertainer', emoji: '🎭', color: '#FF69B4', gradient: 'linear-gradient(135deg, #FF69B4, #FFD700)', description: 'The life of every party — spontaneous, fun-loving, and generous with your energy. You make people feel alive and bring joy to even the most mundane moments.', traits: ['Spontaneous', 'Energetic', 'Fun-loving', 'Generous', 'Practical'] },
  },
};
