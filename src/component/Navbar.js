import React from 'react'
import './Navbar.scss'
/* import SearchIcon from '@mui/icons-material/Search';
/* import ContrastIcon from '@mui/icons-material/Contrast';
import NotificationsIcon from '@mui/icons-material/Notifications'; */ 

function Navbar() {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          {/* <input type='text' placeholder='Search..'/>
          <SearchIcon className='icon'/> */}
        </div>
        <div className='items'>
          {/* <div className='item'>
            <ContrastIcon className='icon'/>
          </div> */}
          {/* <div className='item'>
            <NotificationsIcon className='icon'/>
          </div> */}
          {/* <div className='item'>
            <img src='https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' className='avatar'/>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar