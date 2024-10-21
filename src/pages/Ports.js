import React from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'
import '../pages/ports.scss'
import Portstable from '../component/Portstable'

function Ports() {
  return (
    <div className='ports'>
        <Sidebar/>
        <div className='portsContainer'>
          <Navbar/>
          <div className='body'>
          <Portstable/>
        </div> 
      </div>
            
    </div>
  )
}

export default Ports