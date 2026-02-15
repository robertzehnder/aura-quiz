import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Toolbar from './Components/Toolbar/Toolbar';
import AnimatedBackground from './Components/AnimatedBackground/AnimatedBackground';
import LandingPage from './landing/LandingPage';
import ProfilePage from './profile/ProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './auth/Login';
import AuraQuiz from './quiz/aura/AuraQuiz';
import ResultsPage from './quiz/aura/ResultsPage';
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/aura/quiz" element={<AuraQuiz />} />
          <Route path="/aura/results" element={<ResultsPage />} />
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
        </Routes>
      </main>
    </div>
  );
}
