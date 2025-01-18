import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import questions from './Questions.jsx';

function QuizHomePage() {
  const [startQuiz, setStartQuiz] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has already taken the quiz
    const quizTaken = sessionStorage.getItem('quizTaken');
    if (quizTaken) {
      alert('You have already completed the quiz.');
      navigate('/results'); // Redirect to results page or any other page
    }
  }, [navigate]);

  const handleStartQuiz = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert("Please log in to start the quiz.");
      navigate('/login');
      return;
    }
    setStartQuiz(true);
    navigate('/start');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleAdmin = () => {
    navigate('/adminlogin');
  };

  return (
    <div className="quiz-container">
      {!startQuiz ? (
        <>
          <div id='btncon'>
            <button onClick={handleLogin} id='btn'>Login</button>
            <button onClick={handleRegister} id='btn2'>Register</button>
            <button onClick={handleAdmin} id='btn3'>Admin</button>
          </div>

          <header className="quiz-header">
            <h1>Welcome to the Quiz Channel</h1>
          </header>
          <section className="quiz-instructions">
            <h2>Instructions</h2>
            <ul>
              <li>This quiz consists of {questions.length} questions.</li>
              <li>You have 15 minutes to complete the quiz.</li>
              <li>Each question has 4 options, but only one is correct.</li>
              <li>For each correct answer, you earn 10 points.</li>
              <li>No negative marking for incorrect answers.</li>
            </ul>
          </section>
          <button className="start-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </>
      ) :(
        <Quiz questions={questions} />
      )}
    </div>
  );
}
export default QuizHomePage;