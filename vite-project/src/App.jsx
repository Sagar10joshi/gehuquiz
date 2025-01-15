// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizHomePage from './QuizHomePage'; // Your quiz component
import LoginPage from './Login'; // Your login component
import RegistrationPage from './Register'
import OTPVerification from './Otp';
import FeedbackPage from './Feedback'
import AdminPage from './AdminDash';
import Admin from './Reset.jsx';
import questions from './Questions.jsx';
import Quizstart from './Startquiz'
// import PasswordResetRequest from './Reset'
import PasswordResetConfirm from './Resetpass'
function App() {
    return (
            <Routes>
                <Route path="/" element={<QuizHomePage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/otp" element={<OTPVerification />} />
                <Route path="/results" element={<FeedbackPage />} />
                <Route path="/admin" element={<AdminPage/>}/>
                {/* <Route path="/adminlogin" element={<Admin/>} /> */}
                <Route path="/reset-password" element={<Admin/>} />
                <Route path="/reset-password/:token" element={<PasswordResetConfirm/>} />
                <Route path="/start" element={<Quizstart questions={questions} />} />
            </Routes>
    );
}export default App;