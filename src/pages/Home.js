import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import Widget from '../component/Widget';
import Chart from '../component/Chart';
import './Home.scss';

function Home() {
  const navigate = useNavigate();

  /* useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      fetch('http://localhost:5000/api/protected', {
        method: 'GET', // เปลี่ยนเป็น GET
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => {
          if (!response.ok) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [navigate]); */

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='widgets'>
          <Widget type='total' />
          <Widget type='average' />
          <Widget type='best' />
        </div>
        <div className='charts'>
          <Chart title='Total Assets' data='data1' />
        </div>
      </div>
    </div>
  );
}

export default Home;
