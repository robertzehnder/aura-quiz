// App.jsx

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import qBank from "./Components/QuestionBank";
import Score from "./Components/Score";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: qBank,
            currentQuestion: 0,
            selectedOption: 0,
            answers: Array(qBank.length).fill(null), // Store user answers
            quizEnd: false,
        };
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
            // Don't move to the next question for the last one
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

    handleQuizSubmit = () => {
        this.setState({ quizEnd: true });
    };

    render() {
        const { questionBank, currentQuestion, selectedOption, quizEnd, answers } = this.state;

        return (
            <div className="app-container">
                {!quizEnd ? (
                    <>
                        <div className="question-panel">
                            <h3 className="question-header">QUESTION {currentQuestion + 1}</h3>
                            <p className="question-body">{questionBank[currentQuestion].question}</p>
                            <form onSubmit={this.handleFormSubmit} className="options-container">
                                {questionBank[currentQuestion].options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`option-card ${
                                            selectedOption === index + 1 ? "selected" : ""
                                        }`}
                                        onClick={() => this.handleOptionChange(index + 1)}
                                    >
                                        <label>{option}</label>
                                    </div>
                                ))}
                                <button type="submit" className="btn btn-primary mt-2">
                                    {currentQuestion === qBank.length - 1 ? "Save Answer" : "Submit Answer"}
                                </button>
                            </form>
                        </div>

                        <div className="navigation-panel">
                            <h4>NAVIGATE</h4>
                            <div className="nav-button">
                                {questionBank.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`btn ${index === currentQuestion ? "active" : ""}`}
                                        onClick={() => this.navigateToQuestion(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            {currentQuestion === qBank.length - 1 && (
                                <button
                                    className="submit-exam btn btn-success mt-3"
                                    onClick={this.handleQuizSubmit}
                                >
                                    Submit Exam
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <Score scores={answers} />
                )}
            </div>
        );
    }
}

export default App;
