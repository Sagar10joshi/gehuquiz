// import React, { useState } from 'react';
// import './Reset.css';

// function PasswordResetRequest() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     // Simple email validation
//     if (!email || !/\S+@\S+\.\S+/.test(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     setError('');
//     setSuccess(true); // Simulate success after email is submitted

//     try {
//       const response = await fetch('https://gehuquiz-sagars-projects-0f20619e.vercel.app/reset-password', {
//         method: 'POST',
//         credentials: "include", // Include cookies
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message);
//         setError('');
//       } else {
//         console.log("Error in frontend");
//         setError(data.message);
//         setMessage('');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong');
//       setMessage('');
//     }
//   };

//   return (
//     <div id="body2">
//         <div className="password-reset-container">
//       <div className="form-container">
//         <h2>Password Reset</h2>
//         {!success ? (
          
//             <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label htmlFor="email" id='label'>Enter your email address</label>
//               {/* {error && <p className="error">{error}</p>} */}
//             </div>
//               <div>
//                 <button type="submit" className="submit-btn">Reset Password</button>
//                 {message && <p style={{ color: 'green' }}>{message}</p>}
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//               </div>
//             </form>
//         ) : (
//           <div className="success-message">
//             <h3>Check your inbox for the reset link!</h3>
//             <p>If the email is registered, you will receive an email shortly.</p>
//           </div>
          
//         )}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default PasswordResetRequest;






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