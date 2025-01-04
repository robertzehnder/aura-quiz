// App.jsx
import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { db, auth } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import Login from './Login';           // Your custom login/sign-up component
import ProtectedRoute from './ProtectedRoute'; // Our wrapper

import qBank from './Components/QuestionBank';
import Score from './Components/Score';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      questionBank: qBank,
      currentQuestion: 0,
      selectedOption: 0,
      answers: Array(qBank.length).fill(null),
      quizEnd: false,
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

  handleOptionChange = (value) => {
    this.setState({ selectedOption: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { currentQuestion, selectedOption, answers } = this.state;

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption;

    if (currentQuestion === qBank.length - 1) {
      this.setState({ answers: updatedAnswers });
    } else {
      this.setState({
        answers: updatedAnswers,
        selectedOption: null,
        currentQuestion: currentQuestion + 1,
      });
    }
  };

  navigateToQuestion = (index) => {
    this.setState({
      currentQuestion: index,
      selectedOption: this.state.answers[index] || 0,
    });
  };

  handleQuizSubmit = async () => {
    const { user, answers } = this.state;
    if (user) {
      try {
        await setDoc(doc(db, 'quizResults', user.uid), {
          results: answers,
          timestamp: new Date(),
        });
        console.log('Quiz results saved!');
      } catch (error) {
        console.error('Error saving results:', error.message);
      }
    }
    this.setState({ quizEnd: true });
  };

  renderQuiz() {
    const {
      questionBank,
      currentQuestion,
      selectedOption,
      quizEnd,
      answers,
    } = this.state;

    if (quizEnd) {
      return <Score scores={answers} />;
    }

    return (
      <div className="app-container">
        <div className="question-panel">
          <h3 className="question-header">
            QUESTION {currentQuestion + 1}
          </h3>
          <p className="question-body">
            {questionBank[currentQuestion].question}
          </p>
          <form onSubmit={this.handleFormSubmit} className="options-container">
            {questionBank[currentQuestion].options.map((option, idx) => (
              <div
                key={idx}
                className={`option-card ${
                  selectedOption === idx + 1 ? 'selected' : ''
                }`}
                onClick={() => this.handleOptionChange(idx + 1)}
              >
                <label>{option}</label>
              </div>
            ))}
            <button type="submit" className="btn btn-primary mt-2">
              {currentQuestion === questionBank.length - 1
                ? 'Save Answer'
                : 'Submit Answer'}
            </button>
          </form>
        </div>

        <div className="navigation-panel">
          <h4>NAVIGATE</h4>
          <div className="nav-button">
            {questionBank.map((_, idx) => (
              <button
                key={idx}
                className={`btn ${
                  idx === currentQuestion ? 'active' : ''
                }`}
                onClick={() => this.navigateToQuestion(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          {currentQuestion === questionBank.length - 1 && (
            <button
              className="submit-exam btn btn-success mt-3"
              onClick={this.handleQuizSubmit}
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.state;

    return (
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/quiz" replace /> : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="/auth"
          element={
            user
              ? <Navigate to="/quiz" replace />
              : <Login />
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute user={user}>
              {this.renderQuiz()}
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }
}

export default App;
