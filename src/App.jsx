import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebaseConfig";
import Toolbar from "./Components/Toolbar/Toolbar";
import LandingPage from "./landing/LandingPage";
import ProfilePage from "./profile/ProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Modal from "./Components/Modal/Modal";
import Login from "./auth/Login";

import AuraHome from "./quiz/aura/AuraHome";
import AuraQuiz from "./quiz/aura/AuraQuiz";
import ResultsPage from "./quiz/aura/ResultsPage"; // ✅ Import ResultsPage

import auraQuestionBank from "./quiz/aura/QuestionBank"; // Aura Quiz questions

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showLoginModal: false,
      currentQuestionIndex: 0,
      userAnswers: {}, // Store answers
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

  /** ✅ Handle Answer Submission */
  handleAnswer = (answerIndex) => {
    const { currentQuestionIndex, userAnswers } = this.state;
    console.log(`✅ Answer selected: ${answerIndex} for question ${currentQuestionIndex}`);

    // Store the answer but do NOT move to the next question automatically
    this.setState({
      userAnswers: { ...userAnswers, [currentQuestionIndex]: answerIndex },
    });
  };

  /** ✅ Handle Next Question or Submit */
  handleNextQuestion = (navigate) => {
    const { currentQuestionIndex, userAnswers } = this.state;

    if (currentQuestionIndex < auraQuestionBank.length - 1) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
    } else {
      console.log("🎉 Quiz completed:", userAnswers);
      navigate("/quiz/aura/results", { state: { answers: userAnswers } }); // ✅ Navigate to ResultsPage
    }
  };

  handlePreviousQuestion = () => {
    this.setState((prevState) => ({
      currentQuestionIndex: Math.max(prevState.currentQuestionIndex - 1, 0),
    }));
  };

  render() {
    const { user, showLoginModal, currentQuestionIndex, userAnswers } = this.state;

    return (
      <div>
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
          {/* Aura Quiz Routes */}
          <Route path="/aura" element={<AuraHome />} />
          <Route
            path="/aura/quiz"
            element={
              <AuraQuiz
                user={user}
                questionBank={auraQuestionBank}
                currentQuestionIndex={currentQuestionIndex}
                userAnswers={userAnswers}
                onAnswer={this.handleAnswer}
                onNext={this.handleNextQuestion}
                onPrevious={this.handlePreviousQuestion}
              />
            }
          />
          <Route
            path="/quiz/aura/results"
            element={<ResultsPage />} // ✅ Add ResultsPage route
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