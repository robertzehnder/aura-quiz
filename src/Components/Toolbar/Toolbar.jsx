import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Toolbar.css';

export default function Toolbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const isHome = location.pathname === '/';
  const isQuizzes = location.pathname === '/quizzes';

  return (
    <nav className="toolbar glass">
      <div className="toolbar-inner">
        <button className="toolbar-brand" onClick={() => navigate('/')}>
          <span className="brand-icon">✦</span>
          <span className="brand-text gradient-text">find yourself</span>
        </button>

        <div className="toolbar-nav">
          {!isHome && (
            <button
              className="nav-pill"
              onClick={() => navigate('/')}
            >
              🗺️ journey
            </button>
          )}

          {!isQuizzes && (
            <button
              className="nav-pill nav-pill-journey"
              onClick={() => navigate('/quizzes')}
            >
              📝 quizzes
            </button>
          )}

          {user ? (
            <div className="toolbar-user">
              <button
                className="nav-pill nav-pill-glow"
                onClick={() => navigate('/profile')}
              >
                <span className="user-avatar">
                  {user.user_metadata?.display_name?.[0]?.toUpperCase() || '✨'}
                </span>
                profile
              </button>
              <button className="nav-pill nav-pill-ghost" onClick={handleSignOut}>
                sign out
              </button>
            </div>
          ) : (
            <button
              className="nav-pill nav-pill-glow"
              onClick={() => navigate('/auth')}
            >
              sign in ✨
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
