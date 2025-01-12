import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import ProfilePage from './profile/ProfilePage';
import ResultsPage from './results/ResultsPage';
import Quiz from './quiz/Quiz';

import qBank from './Components/QuestionBank';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      questionBank: qBank || [],
    };
  }

  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth();
    }
  }

  render() {
    const { user, questionBank } = this.state;

    return (
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" replace /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/profile" replace /> : <Login />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <ProfilePage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute user={user}>
              <Quiz user={user} questionBank={questionBank} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute user={user}>
              <ResultsPage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }
}

export default App;
