import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss'; 


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);  
      alert('Successfully logged in!');
      navigate('/');
    } catch (error) {
      setError('Error during login. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); 
  };


  return (
    <div className="login-container">
      <h2 className='title'>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="sign-up" onClick={handleSignUp}>
         Don't have an account? Sign up here.
      </p>
    </div>
  );
};

export default Login;
