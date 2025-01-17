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
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/otp" element={<OTPVerification />} />
                <Route path="/results" element={<FeedbackPage />} />
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/adminlogin" element={<Admin/>} />
                <Route path="/reset-password" element={<PasswordReset/>} />
                <Route path="/reset-password/confirm/:token" element={<PassConfirm/>} />
                <Route path="/start" element={<Quizstart questions={questions} />} />
            </Routes>
    );
}export default App;