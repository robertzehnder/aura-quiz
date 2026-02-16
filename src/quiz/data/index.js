/* ═══════════════════════════════════════════════════
   QUIZ DATA REGISTRY — All quiz definitions
   ═══════════════════════════════════════════════════ */

import elementQuiz from './elementQuiz';
import colorQuiz from './colorQuiz';
import spiritAnimalQuiz from './spiritAnimalQuiz';
import loveLanguageQuiz from './loveLanguageQuiz';
import attachmentQuiz from './attachmentQuiz';
import communicationQuiz from './communicationQuiz';
import conflictQuiz from './conflictQuiz';
import friendshipQuiz from './friendshipQuiz';
import enneagramQuiz from './enneagramQuiz';
import discQuiz from './discQuiz';
import bigFiveQuiz from './bigFiveQuiz';
import mbtiQuiz from './mbtiQuiz';
import temperamentQuiz from './temperamentQuiz';
import eqQuiz from './eqQuiz';
import valuesQuiz from './valuesQuiz';
import moralQuiz from './moralQuiz';
import strengthsQuiz from './strengthsQuiz';
import cognitiveQuiz from './cognitiveQuiz';
import jungianQuiz from './jungianQuiz';
import defenseQuiz from './defenseQuiz';
import fearQuiz from './fearQuiz';
import narrativeQuiz from './narrativeQuiz';
import shadowQuiz from './shadowQuiz';

const quizRegistry = {
  element: elementQuiz,
  color: colorQuiz,
  'spirit-animal': spiritAnimalQuiz,
  'love-language': loveLanguageQuiz,
  attachment: attachmentQuiz,
  communication: communicationQuiz,
  conflict: conflictQuiz,
  friendship: friendshipQuiz,
  enneagram: enneagramQuiz,
  disc: discQuiz,
  big5: bigFiveQuiz,
  mbti: mbtiQuiz,
  temperament: temperamentQuiz,
  eq: eqQuiz,
  values: valuesQuiz,
  moral: moralQuiz,
  strengths: strengthsQuiz,
  cognitive: cognitiveQuiz,
  jungian: jungianQuiz,
  defense: defenseQuiz,
  fear: fearQuiz,
  narrative: narrativeQuiz,
  shadow: shadowQuiz,
};

export function getQuizById(id) {
  return quizRegistry[id] || null;
}

export function getAllQuizzes() {
  return Object.values(quizRegistry);
}

export default quizRegistry;
