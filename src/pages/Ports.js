import React from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'

function Ports() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className='homeContainer'>
          <Navbar/>
          <div className='port'>
          Ports
        </div> 
      </div>
            
    </div>
  )
}

export default Ports