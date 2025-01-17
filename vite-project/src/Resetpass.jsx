import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function PassConfirm() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://gehuquiz-sagars-projects-0f20619e.vercel.app/api/reset-password/confirm`,{
        method: 'POST',
        credentials: "include", // Include cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token,newPassword}),
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
    <div id="reset">
      <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
}

export default PassConfirm;
