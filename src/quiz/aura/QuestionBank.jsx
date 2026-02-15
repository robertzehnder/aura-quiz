// ═══════════════════════════════════════════════════
// QUESTION BANK — Personality Spectrums Aura Quiz
// 98 questions mapped to 14 aura colors (7 per color)
// ═══════════════════════════════════════════════════

export const responseOptions = [
  { label: 'not me at all', value: 1, emoji: '🌑' },
  { label: 'rarely me', value: 2, emoji: '🌘' },
  { label: 'sometimes me', value: 3, emoji: '🌗' },
  { label: 'often me', value: 4, emoji: '🌖' },
  { label: 'this is SO me', value: 5, emoji: '🌕' },
];

// Question-to-aura color mapping (from Score.jsx's authoritative source)
// Each aura has 7 questions mapped to it by question ID
export const auraQuestionMapping = {
  'Mental Tan':    [1, 15, 29, 43, 57, 71, 85],
  'Violet':        [2, 16, 30, 44, 58, 72, 86],
  'Green':         [3, 17, 31, 45, 59, 73, 87],
  'Lavender':      [4, 18, 32, 46, 60, 74, 88],
  'Magenta':       [5, 19, 33, 47, 61, 75, 89],
  'Blue':          [6, 20, 34, 48, 62, 76, 90],
  'Nurturing Tan': [7, 21, 35, 49, 63, 77, 91],
  'Crystal':       [8, 22, 36, 50, 64, 78, 92],
  'Orange':        [9, 23, 37, 51, 65, 79, 93],
  'Physical Tan':  [10, 24, 38, 52, 66, 80, 94],
  'Loving Tan':    [11, 25, 39, 53, 67, 81, 95],
  'Indigo':        [12, 26, 40, 54, 68, 82, 96],
  'Red':           [13, 27, 41, 55, 69, 83, 97],
  'Yellow':        [14, 28, 42, 56, 70, 84, 98],
};

// Aura color definitions with cotton-candy hex colors + descriptions
export const auraColors = {
  'Red': {
    hex: '#FF6B8A',
    gradient: 'linear-gradient(135deg, #FF6B8A, #FF8E9E)',
    glow: 'rgba(255, 107, 138, 0.5)',
    emoji: '🔴',
    shortDesc: 'Passionate & physically grounded',
    description: 'Physical and sexual expression is the hallmark of a Red. The key to success for Reds is to act on what they know about physical reality and the tangible environment. Reds are literal in their interpretation of what goes on around them. They pursue life with gusto, verve, and courage. Their gift is the respect and the awe they have for the majesty and the might of nature.',
  },
  'Orange': {
    hex: '#FFB366',
    gradient: 'linear-gradient(135deg, #FFB366, #FFD093)',
    glow: 'rgba(255, 179, 102, 0.5)',
    emoji: '🟠',
    shortDesc: 'Fearless & boundary-pushing',
    description: 'Orange is the color for individuals who need to test their own physical limitations against the environment. Fearless, powerful, heedless of their own personal safety, they shake their fists in the face of God. The challenge for Oranges is to deal with our increasingly complex society.',
  },
  'Yellow': {
    hex: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700, #FFEB80)',
    glow: 'rgba(255, 215, 0, 0.5)',
    emoji: '🟡',
    shortDesc: 'Joyful & creatively alive',
    description: 'Yellows are those people most affected by the body\'s sensitive biochemical balance. Yellows need to learn to recognize and act on the signals their bodies send them. The best way for Yellows to measure their own success is by the amount of joy they are experiencing in life.',
  },
  'Green': {
    hex: '#64FFDA',
    gradient: 'linear-gradient(135deg, #64FFDA, #A8FFE8)',
    glow: 'rgba(100, 255, 218, 0.5)',
    emoji: '🟢',
    shortDesc: 'Analytical & intellectually intense',
    description: 'Intellectually intense, and able to pare an idea to the bone—these are attributes of an analytical Green. Greens measure their own worth by their ability to be productive, generating countless ideas and projects, and by their creative ability to devise innovative, workable solutions to problems.',
  },
  'Blue': {
    hex: '#89CFF0',
    gradient: 'linear-gradient(135deg, #89CFF0, #B8E4FF)',
    glow: 'rgba(137, 207, 240, 0.5)',
    emoji: '🔵',
    shortDesc: 'Nurturing & deeply empathetic',
    description: 'Blues embody the characteristics of nurturing and caretaking. They are the color most concerned with helping other people. Service is a form of altruism, a giving of oneself—the art of anticipating the needs of other human beings and ministering to those needs while allowing individuals to maintain their dignity.',
  },
  'Indigo': {
    hex: '#A8A2FF',
    gradient: 'linear-gradient(135deg, #A8A2FF, #C8C2FF)',
    glow: 'rgba(168, 162, 255, 0.5)',
    emoji: '🟣',
    shortDesc: 'Intuitive & spiritually evolved',
    description: 'A new color—Indigo—has emerged, with skills, talents, and physical characteristics significantly different from those of the other colors. As the needs of the whole shift, changes need to be made in the parts that make up that whole. Indigos carry this evolutionary energy.',
  },
  'Violet': {
    hex: '#C8A2FF',
    gradient: 'linear-gradient(135deg, #C8A2FF, #E0C8FF)',
    glow: 'rgba(200, 162, 255, 0.5)',
    emoji: '💜',
    shortDesc: 'Visionary & purpose-driven',
    description: 'Violets are the color most nearly aligned with the psychic, emotional, and spiritual balance in operation on the planet at this time. They have not only the opportunity but also the resources to make their lives count for something, to make a significant difference to our collective future.',
  },
  'Lavender': {
    hex: '#E6BEFF',
    gradient: 'linear-gradient(135deg, #E6BEFF, #F0D8FF)',
    glow: 'rgba(230, 190, 255, 0.5)',
    emoji: '🪻',
    shortDesc: 'Dreamy & imaginative',
    description: 'Dreamer, drifter, fantasizer—these are the words that best describe Lavenders. They first see the shifting layers of shape, form, and pattern that make up designs. The Lavenders dissolve and recombine these designs to create new structures and concepts.',
  },
  'Magenta': {
    hex: '#FF69B4',
    gradient: 'linear-gradient(135deg, #FF69B4, #FF99CC)',
    glow: 'rgba(255, 105, 180, 0.5)',
    emoji: '💗',
    shortDesc: 'Vibrant & unconventional',
    description: 'The key to understanding Magenta is their unwillingness to conform to the expectations and norms set by society. These individuals seek to express their individuality by using, with creativity and flair, the belongings and raw materials at their disposal.',
  },
  'Crystal': {
    hex: '#E0F7FA',
    gradient: 'linear-gradient(135deg, #E0F7FA, #F0FCFF)',
    glow: 'rgba(224, 247, 250, 0.5)',
    emoji: '🔮',
    shortDesc: 'Healing & luminously calm',
    description: 'Crystals are natural healers. They utilize energy to transform light into healing rays. They become the medium or the conduit through which healing passes. They are able to increase their personal, physical power to the point where they are able to cleanse the minds and souls so that physical healing can follow.',
  },
  'Mental Tan': {
    hex: '#D4A574',
    gradient: 'linear-gradient(135deg, #D4A574, #E8C89E)',
    glow: 'rgba(212, 165, 116, 0.5)',
    emoji: '🧠',
    shortDesc: 'Logical & methodically brilliant',
    description: 'The key to happiness and success for a Mental Tan is understanding the process of intuition. They must journey from cold logic into the unknown of metaphysics. They can accomplish this task only if they are willing to become risk takers.',
  },
  'Physical Tan': {
    hex: '#C4956A',
    gradient: 'linear-gradient(135deg, #C4956A, #D8B48E)',
    glow: 'rgba(196, 149, 106, 0.5)',
    emoji: '🏔️',
    shortDesc: 'Grounded & security-oriented',
    description: 'Physical Tans are one of the three Eclipse Colors. An eclipse means the individual has two bands of color that completely surround the body, one outside the other. These two colors are interpreted as one color, creating a unique blend of traits.',
  },
  'Nurturing Tan': {
    hex: '#B8D4E3',
    gradient: 'linear-gradient(135deg, #B8D4E3, #D4E8F3)',
    glow: 'rgba(184, 212, 227, 0.5)',
    emoji: '💙',
    shortDesc: 'Caring & dependable',
    description: 'Nurturing Tans are another Eclipse Color. The color closest to their body is Mental Tan. Outside the Mental Tan and completely encircling their body is a band of Blue, adding deep empathy and care to their analytical nature.',
  },
  'Loving Tan': {
    hex: '#FFB6C1',
    gradient: 'linear-gradient(135deg, #FFB6C1, #FFD4DB)',
    glow: 'rgba(255, 182, 193, 0.5)',
    emoji: '💕',
    shortDesc: 'Warm & unconditionally loving',
    description: 'Loving Tan is distinguished by an eclipse of Red, adding the component of unconditional love. Loving Tans are bright and inquisitive and have a deep love for people, combining intellectual curiosity with heartfelt warmth.',
  },
};

// The 98 questions
const questions = [
  { id: 1, question: 'You are methodical in your thinking.' },
  { id: 2, question: 'You have a strong inner desire to make your mark on the world.' },
  { id: 3, question: 'You resent emotional and domestic demands made on you.' },
  { id: 4, question: 'Esoteric spiritual or political philosophies have a great emotional and intellectual appeal for you.' },
  { id: 5, question: 'You seek the unusual or the avant-garde.' },
  { id: 6, question: 'You cry easily.' },
  { id: 7, question: 'You are not judgemental or critical of the ways in which others express their emotions or feelings.' },
  { id: 8, question: 'You are at ease in any environment where healing is the primary activity or occupation.' },
  { id: 9, question: 'When faced with a dangerous task, you carefully plan how to handle any crisis that may arise.' },
  { id: 10, question: 'You are a loner.' },
  { id: 11, question: 'When solving problems, you are able to visualize all the steps and the solution at the same time.' },
  { id: 12, question: 'You have no biases about sexuality, heterosexuality, bisexuality, or homosexuality.' },
  { id: 13, question: 'You prefer working at jobs that are physically demanding.' },
  { id: 14, question: 'You react physically (with sweaty palms, for example) before you respond to a situation mentally or emotionally.' },
  { id: 15, question: 'As a leader, you solicit lots of detailed information from others in order to make decisions.' },
  { id: 16, question: 'Social get-togethers such as cocktail parties bore you.' },
  { id: 17, question: 'You prefer occupations that have unlimited financial opportunity, such as sales.' },
  { id: 18, question: 'When you have money, you spend it; when you don\'t, you don\'t.' },
  { id: 19, question: 'You are a nonconformist.' },
  { id: 20, question: 'You have a hard time saying no when people ask you to do them a favor.' },
  { id: 21, question: 'You organize projects by creating systems.' },
  { id: 22, question: 'You depend on other people for clues on how you should act in various social situations.' },
  { id: 23, question: 'You meet physical challenges without fear.' },
  { id: 24, question: 'You are slow to choose friends.' },
  { id: 25, question: 'You do not require emotional loyalty to effectively mentor someone.' },
  { id: 26, question: 'In school, you learn most effectively in an unstructured environment.' },
  { id: 27, question: 'For you, sex is for physical pleasure.' },
  { id: 28, question: 'When you find yourself in a tense situation, you want to run away or pretend it does not exist.' },
  { id: 29, question: 'You have difficulty sharing your emotions and feelings with others.' },
  { id: 30, question: 'You would rather be the theorist of a project, and leave the building of the working model to someone else.' },
  { id: 31, question: 'You diagnose problems by recognizing patterns.' },
  { id: 32, question: 'You are a dreamer who likes to live in fantasies you create.' },
  { id: 33, question: 'You are a spontaneous person.' },
  { id: 34, question: 'The experience of God\'s love is the spiritual force in your life.' },
  { id: 35, question: 'You look for ways to improve your community.' },
  { id: 36, question: 'You rarely show your deepest feelings.' },
  { id: 37, question: 'You prefer activities that allow you to demonstrate physical prowess.' },
  { id: 38, question: 'You evaluate objects by how solid or substantial they feel.' },
  { id: 39, question: 'You are attracted to religions with strong theological structures that allow for personal interpretation.' },
  { id: 40, question: 'You lead by forcing others to rethink and reexamine old beliefs, values, and ways of doing things.' },
  { id: 41, question: 'When you lose your temper, you get over it quickly.' },
  { id: 42, question: 'You are not cynical.' },
  { id: 43, question: 'You like social activities that combine business and pleasure.' },
  { id: 44, question: 'You are not "free and easy" when spending your money on others.' },
  { id: 45, question: 'You see God as the "brain" that created the universe.' },
  { id: 46, question: 'You express your sexuality creatively, intuitively, and experimentally.' },
  { id: 47, question: 'You are attracted to products that have unusual or unexpected design features.' },
  { id: 48, question: 'When looking for a job, you have difficulty asking for the salary you deserve.' },
  { id: 49, question: 'You feel that raising a well-educated child is the greatest contribution you can make to your community.' },
  { id: 50, question: 'You enjoy reading biographies and diaries that describe the lives of real people.' },
  { id: 51, question: 'You prefer individual competition rather than team effort.' },
  { id: 52, question: 'You are slow to commit to any belief system.' },
  { id: 53, question: 'You eagerly seek to please those you love and care about.' },
  { id: 54, question: 'You perceive spirituality to be in everything you do.' },
  { id: 55, question: 'If you have enough money to buy the necessities, you are happy.' },
  { id: 56, question: 'You experience God as the physical sensation of the joy of being alive.' },
  { id: 57, question: 'You prefer a spiritual belief system that relies on a foundation of laws and principles.' },
  { id: 58, question: 'You lead by telling people what to do.' },
  { id: 59, question: 'You prefer a few specially chosen friends who stimulate you intellectually.' },
  { id: 60, question: 'Your artistic pursuits often keep you indoors.' },
  { id: 61, question: 'You form loose friendships that are not encumbered with bonds of expectation.' },
  { id: 62, question: 'You feel more comfortable sharing the leadership by being co-chairperson.' },
  { id: 63, question: 'You financially support community groups and programs that benefit society.' },
  { id: 64, question: 'Your source of personal power is your ability to mentally retreat inward.' },
  { id: 65, question: 'You are not interested in organized religion or other belief systems.' },
  { id: 66, question: 'You are meticulous in following instructions given to you by your supervisor.' },
  { id: 67, question: 'You prefer social gatherings where you have an opportunity to talk to many different people.' },
  { id: 68, question: 'You need to be awakened slowly from a sound sleep to avoid being irritable or in physical pain.' },
  { id: 69, question: 'When playing a team sport, you rally the team when the chips are down.' },
  { id: 70, question: 'You like parties.' },
  { id: 71, question: 'To you, money is security.' },
  { id: 72, question: 'You feel compelled to do something significant with your life.' },
  { id: 73, question: 'You find great satisfaction in assisting people by giving ideas and information.' },
  { id: 74, question: 'You prefer a somewhat isolated existence rather than one in which you would have to conform to society\'s expectations.' },
  { id: 75, question: 'When you see something that you like, you choose to have your fantasy now and pay later.' },
  { id: 76, question: 'You do not enjoy endurance sports such as cross-country running, skiing or weight-lifting.' },
  { id: 77, question: 'You feel that spiritual principles must have practical application in the real world.' },
  { id: 78, question: 'You prefer quiet, introspective, spiritual disciplines.' },
  { id: 79, question: 'You prefer to work for a commission, or even as a freelancer, rather than for a regular, fixed salary.' },
  { id: 80, question: 'You believe that to be a good leader, you must first be a good follower.' },
  { id: 81, question: 'You have difficulty managing money effectively.' },
  { id: 82, question: 'You cannot be coerced into doing something in which you are not interested.' },
  { id: 83, question: 'You experience spirituality when you physically participate in a worship service.' },
  { id: 84, question: 'You lead others with enthusiasm because you enjoy being with people.' },
  { id: 85, question: 'You enjoy working with mechanical devices such as computers, calculators, and stereo equipment.' },
  { id: 86, question: 'Possessions are important to you as stepping-stones to power and influence.' },
  { id: 87, question: 'To you, ideas are things, not mental abstractions.' },
  { id: 88, question: 'You see ideas as three-dimensional patterns.' },
  { id: 89, question: 'You express your spirituality through your strong connection with nature.' },
  { id: 90, question: 'When making a decision, you try to find a solution that will please everyone.' },
  { id: 91, question: 'You lead others by incorporating their feelings into the decision-making process.' },
  { id: 92, question: 'You work best in an environment that is calm and peaceful with limited contact with others.' },
  { id: 93, question: 'You do not need friends or social interaction to be happy.' },
  { id: 94, question: 'To you, money represents physical safety and stability.' },
  { id: 95, question: 'You have difficulty keeping track of personal possessions.' },
  { id: 96, question: 'You are content to work with your hands.' },
  { id: 97, question: 'You want to know how and why things work the way they do.' },
  { id: 98, question: 'You enjoy working in occupations that require physical activity.' },
];

export default questions;

// Utility: Calculate aura rankings from answer map
// answers = { questionId: scoreValue(1-5) }
export function calculateAuraRankings(answers) {
  const scores = {};

  // Initialize scores
  for (const aura of Object.keys(auraQuestionMapping)) {
    scores[aura] = 0;
  }

  // Sum up scores per aura based on question mapping
  for (const [aura, questionIds] of Object.entries(auraQuestionMapping)) {
    for (const qId of questionIds) {
      scores[aura] += answers[qId] || 0;
    }
  }

  // Sort by score descending
  return Object.entries(scores)
    .map(([name, score]) => ({
      name,
      score,
      maxScore: 35, // 7 questions × 5 max score
      ...auraColors[name],
    }))
    .sort((a, b) => b.score - a.score);
}
