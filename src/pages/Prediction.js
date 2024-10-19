import React from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'


function Prediction() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className='homeContainer'>
          <Navbar/>
          <div className='prediction'>
          Prediction
        </div> 
        </div>
            
    </div>
  )
}

export default Prediction