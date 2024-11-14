import React, { useState } from 'react';
import './Navbar.scss';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isMarketPage = location.pathname === '/market';
  const username = localStorage.getItem('username') || 'Guest';

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className='navbar'>
      <div className='wrapper'>
        {isMarketPage && (
          <div className='search'>
            <input
              type='text'
              placeholder='Search in Market..'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className='icon' onClick={handleSearch} />
          </div>
        )}
        <div className='items'>
          <div className='item'>
            <span>Welcome, {username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;