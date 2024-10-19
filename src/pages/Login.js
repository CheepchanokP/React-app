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
      // ส่งข้อมูลเข้าสู่ระบบไปยัง API
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // แสดงข้อผิดพลาดจาก API
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // เก็บ token ใน localStorage

      alert('ล็อกอินสำเร็จ!');
      navigate('/home'); // ไปยังหน้า home หลังล็อกอินสำเร็จ
    } catch (error) {
      setError('การล็อกอินล้มเหลว กรุณาลองใหม่อีกครั้ง');
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
