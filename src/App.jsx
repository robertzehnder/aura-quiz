import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Toolbar from './Components/Toolbar/Toolbar';
import AnimatedBackground from './Components/AnimatedBackground/AnimatedBackground';
import ProfilePage from './profile/ProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './auth/Login';
import AuraQuiz from './quiz/aura/AuraQuiz';
import ResultsPage from './quiz/aura/ResultsPage';
import GenericQuiz from './quiz/GenericQuiz';
import GenericResults from './quiz/GenericResults';
import ZodiacQuiz from './quiz/ZodiacQuiz';
import FortuneTeller from './fortune/FortuneTeller';
import JourneyPage from './journey/JourneyPage';
import TierPage from './journey/TierPage';
import QuizzesPage from './quizzes/QuizzesPage';
import './App.css';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <AnimatedBackground />
        <div className="loading-content">
          <div className="loading-orb" />
          <p className="loading-text">✨ Finding your vibe... ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <AnimatedBackground />
      <Toolbar />
      <main className="main-content">
        <Routes>
          {/* Journey is now the home page */}
          <Route path="/" element={<JourneyPage />} />
          <Route path="/journey/tier/:tierId" element={<TierPage />} />

          {/* Quizzes catalog */}
          <Route path="/quizzes" element={<QuizzesPage />} />

          {/* Individual quizzes */}
          <Route path="/quiz/zodiac" element={<ZodiacQuiz />} />
          <Route path="/quiz/:quizId" element={<GenericQuiz />} />
          <Route path="/quiz/:quizId/results" element={<GenericResults />} />

          {/* Aura quiz keeps its own routes */}
          <Route path="/aura/quiz" element={<AuraQuiz />} />
          <Route path="/aura/results" element={<ResultsPage />} />

          {/* Fortune teller */}
          <Route path="/fortune" element={<FortuneTeller />} />

          {/* Auth & Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="/profile" replace /> : <Login />}
          />

          {/* Legacy redirect: /journey → / */}
          <Route path="/journey" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
