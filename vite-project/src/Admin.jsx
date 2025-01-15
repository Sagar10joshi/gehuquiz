import React, { useState } from "react";
import "./Admin.css"; // CSS file for styling

function Admin() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if(!loginUsername || !loginPassword){
        setErrorMessage("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch('/adminLogin',{
            method :'POST',
            headers :{
                'Content-Type': 'application/json',    
            },
            body: JSON.stringify({ loginUsername, loginPassword }),
        });
        const data = await response.json();

        if (response.ok) {
          setSuccessMessage('Logged in successful!');
          // const { token } = await response.json();
          sessionStorage.setItem('token', data.token);
          if (data.redirect) {
              navigate(data.redirect); // Navigate to Quiz page
          }
          setSuccessMessage(data.message);
          // Optionally redirect or perform additional actions here
      } else {
          setErrorMessage(data.message || 'Login failed.');
      }
    } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
    }
  };


  const handleRegisterSubmit = async(event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    setSuccessMessage(''); // Clear any previous success messages


    if (!registerUsername.trim() || !registerPassword.trim() || !confirmPassword.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setErrorMessage("Password and Conform Password should match.");
      return;
    }

    alert("Registration successful!");


    try {
      const response = await fetch('');

    } catch (error) {
      
    }
  };

  return (
    <div id="bodyMain">
        <div className="container2">
      <div className="tabs2">
        <div
          className={`tab1 ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </div>
        <div
          className={`tab1 ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </div>
      </div>

      {activeTab === "login" ? (
        <form id="loginForm1" onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <div className="form-group1">
            <input
              type="text"
              id="loginUsername"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group1">
            <input
              type="password"
              id="loginPassword"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" />
          </div>
        </form>
      ) : (
        <form id="registerForm" onSubmit={handleRegisterSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <input
              type="text"
              id="registerUsername"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="registerPassword"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Register" />
          </div>
        </form>
      )}

      <p>Don't have an account? Register.</p>
    </div>
    </div>
  );
}

export default Admin;