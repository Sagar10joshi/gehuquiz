// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizHomePage from './QuizHomePage'; // Your quiz component
import LoginPage from './Login'; // Your login component
import RegistrationPage from './Register'
import OTPVerification from './Otp';
import FeedbackPage from './Feedback'
import AdminPage from './AdminDash';
import Admin from './Admin.jsx';
import questions from './Questions.jsx';
import Quizstart from './Startquiz'
import PasswordReset from './Reset'
import PassConfirm from './Resetpass'
function App() {
    return (
            <Routes>
                <Route path="/" element={<QuizHomePage />} />
                <Route path="/api/register" element={<RegistrationPage />} />
                <Route path="/api/login" element={<LoginPage />} />
                <Route path="/api/otp" element={<OTPVerification />} />
                <Route path="/api/results" element={<FeedbackPage />} />
                <Route path="/api/admin" element={<AdminPage/>}/>
                <Route path="/api/adminlogin" element={<Admin/>} />
                <Route path="/api/reset-password" element={<PasswordReset/>} />
                <Route path="/reset-password/:token" element={<PassConfirm />} />
                <Route path="/api/start" element={<Quizstart questions={questions} />} />
            </Routes>
    );
}export default App;