import React, { Component } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebaseConfig";
import Toolbar from "./Components/Toolbar/Toolbar";
import LandingPage from "./landing/LandingPage";
import ProfilePage from "./profile/ProfilePage";
import Quiz from "./quiz/Quiz";
import ResultsPage from "./results/ResultsPage";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Modal from "./Components/Modal/Modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showLoginModal: false,
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

  openLoginModal = () => {
    this.setState({ showLoginModal: true });
  };

  closeLoginModal = () => {
    this.setState({ showLoginModal: false });
  };

  getBackgroundClass = () => {
    const location = window.location.pathname;
    if (location.startsWith("/quiz") || location.startsWith("/results")) {
      return "aura-background";
    }
    return "default-background";
  };

  render() {
    const { user, showLoginModal } = this.state;

    return (
      <div className={this.getBackgroundClass()}>
        <Toolbar user={user} openLoginModal={this.openLoginModal} />
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
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
                <Quiz user={user} />
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
          <Route
            path="/auth"
            element={user ? <Navigate to="/profile" replace /> : <Login />}
          />
        </Routes>
        {showLoginModal && (
          <Modal onClose={this.closeLoginModal}>
            <Login onSignIn={() => this.setState({ showLoginModal: false })} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
