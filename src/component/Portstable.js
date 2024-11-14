/* import React from 'react'
import { useEffect, useState } from 'react';
import './portstable.scss'

function Portstable() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolios/1'); // Replace '1' with the actual portfolio ID you need
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchPortfolioData();
  }, []);

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <div className="portstable">
      <h2>{portfolio.name} - Portfolio Details</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.symbol}</td>
              <td>{transaction.shares}</td>
              <td>{transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Portstable; */