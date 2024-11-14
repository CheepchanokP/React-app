import React, { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import Widget from '../component/Widget';
import './market.scss';

function Market() {
  const [marketData, setMarketData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [predictionImage, setPredictionImage] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/market-data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
    // Fetch every 5 seconds
    const interval = setInterval(fetchMarketData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (symbol) => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?symbol=${symbol}`);
      const data = await response.json();
      setSearchResult(data);
      setOpenModal(true);
    } catch (error) {
      console.error('Error searching market data:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <div className='market'>
      <Sidebar />
      <div className='marketContainer'>
        <Navbar onSearch={handleSearch} />
        <div className='widgets'>
          {
            marketData ? (
              marketData.map((item, index) => (
                <Widget key={index} data={item} />
              ))
            ) : (
              <p>Loading...</p>
            )
          }
        </div>
        {openModal && searchResult && (
          <div className="modal">
            <div className="modal-content">
              <h2>{searchResult.symbol}</h2>
              <p>
                <strong>Symbol:</strong> {searchResult.symbol} <br />
                <strong>High:</strong> {searchResult.high} <br />
                <strong>Low:</strong> {searchResult.low} <br />
                <strong>Last:</strong> {searchResult.last} <br />
                <strong>Total Volume:</strong> {searchResult.total_volume} <br />
                <strong>Projected Open Price:</strong> {searchResult.projected_open_price} <br />
                <strong>Change:</strong> {searchResult.change} <br />
                <strong>Total Value:</strong> {searchResult.total_value} <br />
                <strong>Market Status:</strong> {searchResult.market_status} <br />
              </p>

              <button className="close-btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Market;