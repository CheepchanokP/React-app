import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.scss'; 

const SignUp = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState(''); // State สำหรับ username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    // ตรวจสอบว่ารหัสผ่านและการยืนยันรหัสผ่านตรงกันหรือไม่
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      // ส่งข้อมูลไปยัง API signup
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }), // รวม username ในข้อมูลที่ส่ง
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // แสดง error จาก backend หากมี
        return;
      }
  
      const data = await response.json(); // รับ token จาก API
      localStorage.setItem('token', data.token); // เก็บ token ใน localStorage
  
      alert('Successfully registered!');
      navigate('/home'); // ไปยังหน้า home หลังการลงทะเบียนสำเร็จ
    } catch (error) {
      setError('Error during sign up. Please try again.');
    }
  };

  const handleGoToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="sign-up-container">
      <h2 className='title'>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // จัดการการเปลี่ยนแปลงของ username
            placeholder="Enter your username"
            required
          />
        </div>
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
            placeholder="Please enter your password."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Please confirm your password."
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p className="go-to-login" onClick={handleGoToLogin}>
          Already have an account? Return to the login page.
      </p>
    </div>
  );
};

export default SignUp;
