import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Home.scss';

// Register the components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Home() {
  const [profitLoss, setProfitLoss] = useState(null);
  const [profitLossPercentage, setProfitLossPercentage] = useState(null);
  const [averageProfitLoss, setAverageProfitLoss] = useState(null);
  const [averageProfitLossPercentage, setAverageProfitLossPercentage] = useState(null);
  const [bestProfit, setBestProfit] = useState(null);
  const [bestProfitSymbol, setBestProfitSymbol] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
  const [valueGraphData, setValueGraphData] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/portfolios', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setPortfolios(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };

    fetchPortfolios();
  }, []);

  useEffect(() => {
    if (selectedPortfolioId) {
      const fetchProfitLoss = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/portfolios/${selectedPortfolioId}/profit_loss`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (response.ok) {
            setProfitLoss(data.profit_loss);
            setProfitLossPercentage(data.profit_loss_percentage);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching profit and loss:', error);
        }
      };

      const fetchAverageProfitLoss = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/portfolios/${selectedPortfolioId}/average_profit_loss`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (response.ok) {
            setAverageProfitLoss(data.average_profit_loss);
            setAverageProfitLossPercentage(data.average_profit_loss_percentage);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching average profit and loss:', error);
        }
      };

      const fetchBestProfit = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/portfolios/${selectedPortfolioId}/best_profit`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (response.ok) {
            setBestProfit(data.best_profit);
            setBestProfitSymbol(data.best_profit_symbol);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching best profit:', error);
        }
      };

      const fetchValueGraphData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/portfolios/${selectedPortfolioId}/value_graph`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (response.ok) {
            setValueGraphData(data);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching value graph data:', error);
        }
      };

      fetchProfitLoss();
      fetchAverageProfitLoss();
      fetchBestProfit();
      fetchValueGraphData();
    }
  }, [selectedPortfolioId]);

  const valueGraphOptions = {
    labels: valueGraphData ? valueGraphData.map(item => item.date) : [],
    datasets: [
      {
        label: 'Portfolio Value',
        data: valueGraphData ? valueGraphData.map(item => item.value) : [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='top'>
          {profitLoss !== null ? (
        
            <div className='profit'>
              <h1>Profit and Loss</h1>
              <p>{profitLoss} ({profitLossPercentage}%)</p>
            </div>
            
          ) : (
            <span>Select a portfolio to view profit and loss</span>
          )}
          {averageProfitLoss !== null ? (
            <div className='average'>
              <h1>Average Profit and Loss</h1>
              <p>{averageProfitLoss} ({averageProfitLossPercentage}%)</p>
            </div>
          ) : (
            <span>Select a portfolio to view average profit and loss</span>
          )}
          {bestProfit !== null ? (
            <div className='bestprofit'>
              <h1>Best Profit</h1>
              <p>{bestProfit} (Symbol: {bestProfitSymbol})</p>
            </div>
          ) : (
            <span>Select a portfolio to view best profit</span>
          )}
        </div>
        <div className='center'>
          <div>
            <label htmlFor="portfolioSelect">Select Portfolio:</label>
            <select
              id="portfolioSelect"
              onChange={(e) => setSelectedPortfolioId(e.target.value)}
              value={selectedPortfolioId || ''}
            >
              <option value="" disabled>Select a portfolio</option>
              {portfolios.map((portfolio) => (
                <option key={portfolio.id} value={portfolio.id}>
                  {portfolio.name}
                </option>
              ))}
            </select>
          </div>
        </div>
       {/*  <div className='bottom'>
        {valueGraphData !== null ? (
            <div className='chart'>
              <h1>Portfolio Value Over Time</h1>
              <Line data={valueGraphOptions} />
            </div>
          ) : (
            <p>Select a portfolio to view value graph</p>
          )}
        </div> */}
      
      </div>
    </div>
  );
}

export default Home;
