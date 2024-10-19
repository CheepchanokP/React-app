import React from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'

function Register() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className='homeContainer'>
          <Navbar/>
          <div className='register'>
          Register
        </div> 
        </div>
            
    </div>
  )
}

export default Register