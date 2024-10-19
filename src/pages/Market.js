import React from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'
import Widget from '../component/Widget'
import MarketChart from '../component/MarketChart'


function Market() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className='homeContainer'>
            <Navbar/>
            <div className='widgets'>
            <Widget type='ptt'/>
            <Widget type='scg'/>
            <Widget type='bitkub'/>
            <Widget type='xlm'/>
            <Widget type='btc'/>
            </div>
            <div className='charts'>
            <MarketChart title='BTC Chart'/>
          </div>
        </div>

    </div>
  )
}

export default Market