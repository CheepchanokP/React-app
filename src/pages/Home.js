import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'
import Widget from '../component/Widget'
/* import Feature from '../component/Featured' */
import Chart from '../component/Chart'
import './Home.scss'


function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบ token ใน localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // ถ้าไม่มี token ให้ redirect ไปยังหน้า login
      navigate('/login');
    } else {
      // ตรวจสอบ token โดยเรียก API (optional)
      fetch('http://localhost:5000/check-token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => {
          if (!response.ok) {
            // ถ้า token ไม่ถูกต้อง ให้ redirect ไปยังหน้า login
            localStorage.removeItem('token'); // ลบ token ที่ไม่ถูกต้อง
            navigate('/login');
          }
        })
        .catch(() => {
          // ถ้ามี error ในการตรวจสอบ ให้ redirect ไปยังหน้า login
          localStorage.removeItem('token');
          navigate('/login');
        });
    }
  }, [navigate]);

  return (
    <div className='home'>
        <Sidebar/>
        
        <div className='homeContainer'>
          <Navbar/>
          <div className='widgets'>
            <Widget type='total'/>
            <Widget type='average'/>
            <Widget type='best'/>
          </div>
          <div className='charts'>
            
            <Chart title='Total Assets' data='data1'/>
          </div>
        </div>
        
    </div>
  )
}

export default Home