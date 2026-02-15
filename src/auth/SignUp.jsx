import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp({ onSwitchToSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, {
        display_name: displayName,
        username,
      });
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="auth-error">{error}</div>}

      <div className="input-group">
        <label htmlFor="signup-email">email</label>
        <input
          type="email"
          id="signup-email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="display-name">display name</label>
        <input
          type="text"
          id="display-name"
          placeholder="what should we call you?"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          placeholder="@yourhandle"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="signup-password">password</label>
        <input
          type="password"
          id="signup-password"
          placeholder="min 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? (
          <span className="auth-spinner" />
        ) : (
          'create account 🌟'
        )}
      </button>

      <p className="auth-switch">
        already have an account?{' '}
        <button type="button" className="auth-switch-btn" onClick={onSwitchToSignIn}>
          sign in
        </button>
      </p>
    </form>
  );
}
