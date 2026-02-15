import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn({ onSwitchToSignUp, redirectState = {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);

      // If coming from results page, redirect back with answers
      if (redirectState.from && redirectState.answers) {
        navigate(redirectState.from, {
          state: { answers: redirectState.answers },
          replace: true,
        });
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="auth-error">{error}</div>}

      <div className="input-group">
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? (
          <span className="auth-spinner" />
        ) : (
          'sign in →'
        )}
      </button>

      <p className="auth-switch">
        don&apos;t have an account?{' '}
        <button type="button" className="auth-switch-btn" onClick={onSwitchToSignUp}>
          sign up ✨
        </button>
      </p>
    </form>
  );
}
