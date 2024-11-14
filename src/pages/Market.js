import React, { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'
import Widget from '../component/Widget'
import MarketChart from '../component/MarketChart'


function Market() {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/market-data');
        const data = await response.json();
        console.log(data)
        
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
  return (
    <div className='home'>
        <Sidebar/>
        <div className='homeContainer'>
            <Navbar/>
            <div className='widgets'>
            {
              marketData?.map((item) => 
                <>
                <Widget data={item}/>
                </>
              )
            }  
            {/* <Widget type='ptt'/>
            <Widget type='scg'/>
            <Widget type='bitkub'/>
            <Widget type='xlm'/> */}
            </div>
            <div className='charts'>
            <MarketChart title='BTC Chart'/>
          </div>
        </div>

    </div>
  )
}

export default Market