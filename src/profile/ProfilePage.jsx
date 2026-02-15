import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { auraColors } from '../quiz/aura/QuestionBank';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(profileData);

        // Fetch quiz results
        const { data: resultData } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('quiz_type', 'aura')
          .order('completed_at', { ascending: false })
          .limit(1)
          .single();

        setQuizResult(resultData);
      } catch (err) {
        console.log('Profile fetch:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-loading-orb" />
        <p>loading your vibe... ✨</p>
      </div>
    );
  }

  const displayName =
    profile?.display_name ||
    user?.user_metadata?.display_name ||
    user?.email?.split('@')[0] ||
    'Explorer';

  const topAura = quizResult?.top_result;
  const auraData = topAura ? auraColors[topAura] : null;

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header glass">
        <div
          className="profile-avatar"
          style={
            auraData
              ? { background: auraData.gradient, boxShadow: `0 0 40px ${auraData.glow}` }
              : {}
          }
        >
          {displayName[0]?.toUpperCase() || '✨'}
        </div>
        <h1 className="profile-name">{displayName}</h1>
        <p className="profile-email">{user?.email}</p>
        {profile?.username && (
          <span className="profile-username">@{profile.username}</span>
        )}
      </div>

      {/* Quiz Results Grid */}
      <div className="profile-grid">
        {/* Aura Result Tile */}
        <div
          className={`profile-tile glass ${quizResult ? 'profile-tile-clickable' : ''}`}
          style={
            auraData
              ? {
                  '--tile-glow': auraData.glow,
                  '--tile-gradient': auraData.gradient,
                }
              : {}
          }
          onClick={
            quizResult
              ? () =>
                  navigate('/aura/results', {
                    state: { answers: quizResult.answers },
                  })
              : undefined
          }
          role={quizResult ? 'button' : undefined}
          tabIndex={quizResult ? 0 : undefined}
          onKeyDown={
            quizResult
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate('/aura/results', {
                      state: { answers: quizResult.answers },
                    });
                  }
                }
              : undefined
          }
        >
          {auraData && <div className="tile-glow-bg" />}
          <div className="tile-content">
            <div className="tile-header">
              <span className="tile-emoji">{auraData?.emoji || '🔮'}</span>
              <h2 className="tile-title">Aura</h2>
            </div>
            {quizResult ? (
              <div className="tile-result">
                <span
                  className="tile-aura-name"
                  style={
                    auraData
                      ? {
                          background: auraData.gradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : {}
                  }
                >
                  {topAura}
                </span>
                <p className="tile-desc">{auraData?.shortDesc}</p>
                <span className="tile-date">
                  taken {new Date(quizResult.completed_at).toLocaleDateString()}
                </span>
                <span className="tile-view-hint">tap to view & share →</span>
              </div>
            ) : (
              <div className="tile-empty">
                <p>you haven&apos;t discovered your aura yet</p>
                <button
                  className="tile-cta"
                  onClick={() => navigate('/aura/quiz')}
                >
                  take the quiz ✨
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Placeholder Tiles */}
        <div className="profile-tile profile-tile-locked glass">
          <div className="tile-content">
            <div className="tile-header">
              <span className="tile-emoji">🧠</span>
              <h2 className="tile-title">Big 5</h2>
            </div>
            <div className="tile-empty">
              <p>coming soon</p>
              <span className="tile-locked-icon">🔒</span>
            </div>
          </div>
        </div>

        <div className="profile-tile profile-tile-locked glass">
          <div className="tile-content">
            <div className="tile-header">
              <span className="tile-emoji">🚀</span>
              <h2 className="tile-title">Career Path</h2>
            </div>
            <div className="tile-empty">
              <p>coming soon</p>
              <span className="tile-locked-icon">🔒</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
