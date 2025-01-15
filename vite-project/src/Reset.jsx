// import React, { useState } from 'react';
// import './Reset.css';

// function PasswordResetRequest() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
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
//       <div className="password-reset-container">
//         <div className="form-container">
//           <h2>Password Reset</h2>
//           {!success ? (
//             <>
//               <form onSubmit={handleSubmit}>
//                 <div className="input-group">
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <label htmlFor="email" id='label'>Enter your email address</label>
//                   {/* {error && <p className="error">{error}</p>} */}
//                 </div>
//                 <div>
//                   <button type="submit" className="submit-btn">Reset Password</button>
//                   {message && <p style={{ color: 'green' }}>{message}</p>}
//                   {error && <p style={{ color: 'red' }}>{error}</p>}
//                 </div>
//               </form>
//             </>
//           ) : (
//             <div className="success-message">
//               <h3>Check your inbox for the reset link!</h3>
//               <p>If the email is registered, you will receive an email shortly.</p>
//             </div>

//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PasswordResetRequest;






import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function PasswordReset() {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSuccess(true);

    try {
      const response = await fetch('https://gehuquiz-sagars-projects-0f20619e.vercel.app/reset-password', {
        method: 'POST',
        credentials: "include", // Include cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.message);
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
      setMessage('');
    }
  };

  return (
    <div id="body2">
      <div className="password-reset-container">
        <div className="form-container">
          <h2>Password Reset</h2>
          {!success ? (
            <>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email" id='label'>Enter your email address</label>
                  {/* {error && <p className="error">{error}</p>} */}
                </div>
                <div>
                  <button type="submit" className="submit-btn">Reset Password</button>
                  {message && <p style={{ color: 'green' }}>{message}</p>}
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
              </form>
            </>
          ) : (
            <div className="success-message">
              <h3>Check your inbox for the reset link!</h3>
              <p>If the email is registered, you will receive an email shortly.</p>
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
