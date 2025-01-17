import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Quizstart({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [intervalId, setIntervalId] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Check for token
    if (!token) {
      // If no token, redirect to login page
      alert("You need to log in first.");
      navigate('/api/login'); // Redirect to login
    } else {
      setTimer(30); // Reset the timer if logged in
      startTimer(); // Start the quiz timer
    }
  }, [navigate]);

  const startTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 1) {
          clearInterval(id);
          handleAnswer(""); // Automatically skip the question when timer reaches 0
          return 30; // Reset timer for the next question
        }
        return prevTime - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 10);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleEndTest = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Fetch the token
      const response = await fetch('https://gehuquiz-sagars-projects-0f20619e.vercel.app/api/score', {
        method: 'POST',
        credentials: "include", // Include cookies
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        throw new Error('Failed to save score');
      }

      sessionStorage.setItem('quizTaken', 'true');
      const result = await response.json();
      alert(`Test Ended! Check mail for final score`);
      navigate('/results', { state: { score } });
      setQuizEnded(true);
    } catch (error) {
      console.error('Error saving score:', error);
      alert('An error occurred while saving your score. Please try again.');
    }
  };

  return (
    <div className="quiz">
      <h2>{questions[currentQuestionIndex].question}</h2>
      <p>Time Remaining: {timer}s</p>
      <ul>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <li key={index} onClick={() => handleAnswer(option)}>
            {option}
          </li>
        ))}
      </ul>
      <div className="navigation-buttons">
        {currentQuestionIndex === questions.length - 1 ? (
          <button onClick={handleEndTest} disabled={quizEnded}>End Test</button>
        ) : (
          <button onClick={() => handleAnswer("")}>Next</button>
        )}
      </div>
    </div>
  );
}

export default Quizstart;
