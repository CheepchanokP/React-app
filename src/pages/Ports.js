import React, { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';


import '../pages/ports.scss';

function Ports() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isEditPortfolioModalOpen, setIsEditPortfolioModalOpen] = useState(false);
  const [isDeletePortfolioModalOpen, setIsDeletePortfolioModalOpen] = useState(false);
  const [portName, setPortName] = useState('');
  const [transaction, setTransaction] = useState({ symbol: '', shares: '', price: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [fetchedPortfolios, setFetchedPortfolios] = useState({});
  const [newPortfolioName, setNewPortfolioName] = useState('');
  
  // Fetch the list of portfolios
  useEffect(() => {
    const fetchPortfolios = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/portfolios', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPortfolios(data);
        } else {
          setErrorMessage(data.error || 'Something went wrong!');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch portfolios');
      }
    };

    fetchPortfolios();
  }, []);

  const handlePortfolioModalOpen = (portfolio) => {
    if (!portfolio || !portfolio.id) {
      setErrorMessage('Invalid portfolio');
      return;
    }
  
    setIsPortfolioModalOpen(true);
    setSelectedPortfolio(portfolio);
    fetchPortfolioDetails(portfolio.id);
  };
  
  const fetchPortfolioDetails = async (portfolioId) => {
    if (!portfolioId) {
      setErrorMessage('Portfolio ID is undefined');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/portfolios/${portfolioId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
  
      const data = await response.json();
  
      setFetchedPortfolios((prev) => ({ ...prev, [portfolioId]: data }));
      setSelectedPortfolio(data);
    } catch (error) {
      setErrorMessage(`Failed to fetch portfolio details: ${error.message}`);
    }
  };
  
  const handlePortfolioModalClose = () => {
    setIsPortfolioModalOpen(false);
    setSelectedPortfolio(null); // Clear selected portfolio data
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPortfolio(null); // Clear selected portfolio data
  };

  const handleTransactionModalOpen = (portfolio) => {
    if (!portfolio) {
      setErrorMessage('No portfolio selected');
      return;
    }
    setSelectedPortfolio(portfolio);
    setIsTransactionModalOpen(true);
  };

  const handleTransactionModalClose = () => {
    setIsTransactionModalOpen(false);
    setSelectedPortfolio(null); // Clear selected portfolio data
  };

  const handleEditPortfolioModalOpen = (portfolio) => {
    if (!portfolio) {
      setErrorMessage('No portfolio selected');
      return;
    }
    setSelectedPortfolio(portfolio);
    setIsEditPortfolioModalOpen(true);
  };

  const handleEditPortfolioModalClose = () => {
    setIsEditPortfolioModalOpen(false);
    setSelectedPortfolio(null); // Clear selected portfolio data
  };

// Fix the handler function to accept portfolio object instead of just ID
const handleDeletePortfolioModalOpen = (portfolio) => {
  if (!portfolio || !portfolio.id) {
    setErrorMessage('No portfolio selected');
    return;
  }
  setIsDeletePortfolioModalOpen(true);
  setSelectedPortfolio(portfolio);
};

  const handleDeletePortfolioModalClose = () => {
    setIsDeletePortfolioModalOpen(false);
    setSelectedPortfolio(null); // Clear selected portfolio data
  };

  const handleInputChange = (e) => {
    setPortName(e.target.value);
  };

  const handleTransactionInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handlePortfolioNameChange = (e) => {
    setNewPortfolioName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:5000/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: portName }),
      });

      const data = await response.json();

      if (response.ok) {
        setPortName('');
        setIsModalOpen(false);
        alert(data.message);
        setPortfolios([...portfolios, { id: data.portfolio_id, name: portName }]);
      } else {
        setErrorMessage(data.message || 'Something went wrong!');
      }
    } catch (error) {
      setErrorMessage('Failed to create portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePortfolioName = async () => {
    if (!selectedPortfolio) {
      setErrorMessage('No portfolio selected');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/portfolios/${selectedPortfolio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newPortfolioName }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setPortfolios(portfolios.map(p => p.id === selectedPortfolio.id ? { ...p, name: newPortfolioName } : p));
        setIsEditPortfolioModalOpen(false);
        alert(data.message);
      } else {
        setErrorMessage(data.error || 'Something went wrong!');
      }
    } catch (error) {
      setErrorMessage('Failed to update portfolio name');
    }
  };
  
  const handleConfirmDeletePortfolio = async () => {
    if (!selectedPortfolio?.id) {
      setErrorMessage('No portfolio selected');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found');
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
  
    try {
      const response = await fetch(`http://localhost:5000/api/portfolios/${selectedPortfolio.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      // Check response status
      if (response.ok) {
        setPortfolios(portfolios.filter(p => p.id !== selectedPortfolio.id));
        setIsDeletePortfolioModalOpen(false);
        setSelectedPortfolio(null);
        alert('Portfolio deleted successfully');
        return;
      }
  
      // Handle specific error cases
      switch (response.status) {
        case 404:
          throw new Error('Portfolio not found');
        case 401:
          localStorage.removeItem('token');
          throw new Error('Session expired - please login again');
        case 403:
          throw new Error('Not authorized to delete this portfolio');
        case 500:
          throw new Error('Server error - please contact support');
        default:
          throw new Error(`Unexpected error (${response.status})`);
      }
  
    } catch (error) {
      setErrorMessage(`Failed to delete portfolio: ${error.message}`);
      
      // Network error special case
      if (!navigator.onLine) {
        setErrorMessage('Network connection lost - please check your internet connection');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!selectedPortfolio) {
      setErrorMessage('No portfolio selected');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/portfolios/${selectedPortfolio.id}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setTransaction({ symbol: '', shares: '', price: '', date: '' });
        setIsTransactionModalOpen(false);
        alert(data.message);
        fetchPortfolioDetails(selectedPortfolio.id); // Refresh portfolio details
      } else {
        setErrorMessage(data.error || 'Something went wrong!');
      }
    } catch (error) {
      setErrorMessage('Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteTransaction = async (transactionId) => {
    if (!selectedPortfolio) {
      setErrorMessage('No portfolio selected');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No token found');
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
  
    try {
      const response = await fetch(`http://localhost:5000/api/portfolios/${selectedPortfolio.id}/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        setFetchedPortfolios((prev) => ({
          ...prev,
          [selectedPortfolio.id]: {
            ...prev[selectedPortfolio.id],
            transactions: prev[selectedPortfolio.id].transactions.filter(t => t.id !== transactionId)
          }
        }));
        alert('Transaction deleted successfully');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Something went wrong!');
      }
    } catch (error) {
      setErrorMessage(`Failed to delete transaction: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className='ports'>
      <Sidebar />
      <div className='portsContainer'>
        <Navbar />
        <div className='body'>
          <div className='portfolio'>
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {portfolios.map((portfolio) => (
                  <tr key={portfolio.id}>
                    <td>{portfolio.name}</td>
                    <td>
                    <button className="view-button" onClick={() => handlePortfolioModalOpen(portfolio)}>View</button>
                    <button className="addTransaction-button"onClick={() => handleTransactionModalOpen(portfolio)}>Add Transaction</button>
                    <button className="editPortfolio-button"onClick={() => handleEditPortfolioModalOpen(portfolio)}>Edit Portfolio</button>
                    <button className="delete-button" onClick={() => handleDeletePortfolioModalOpen(portfolio)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <button onClick={handleModalOpen}>Add Port</button>
        </div>
      </div>

      {/* Modal for adding portfolio */}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeButton" onClick={handleModalClose}>&times;</span>
            <h2>Add Port</h2>
            <form onSubmit={handleSubmit}>
              <div className="formGroup">
                <label htmlFor="portName">Port Name</label>
                <input
                  type="text"
                  id="portName"
                  name="portName"
                  value={portName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {errorMessage && <p className="error">{errorMessage}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for displaying portfolio details */}
      {isPortfolioModalOpen && selectedPortfolio && (
        <div className="modalTransaction">
          <div className="modalTransaction-Content">
          <h3>Portfolio Name:  {selectedPortfolio.name}</h3>
            <table className="portfolioDetail-Table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Symbol</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedPortfolio.transactions && selectedPortfolio.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.symbol}</td>
                    <td>{transaction.shares}</td>
                    <td>{transaction.price}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.price * transaction.shares}</td>                    
                    <td>
                        <button className='deleteTransaction-button' onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <span className="closeButton" onClick={handlePortfolioModalClose}>&times;</span>
          </div>
        </div>
      )}

      {/* Modal for editing portfolio name */}
      {isEditPortfolioModalOpen && (
        <div className="modalEditportname">
          <div className="modalEditportname-Content"> 
            <span className="closeButton" onClick={handleEditPortfolioModalClose}>&times;</span>
            <h4>Edit Portfolio Name</h4>
            <p>New port name</p>
            <input type="text" value={newPortfolioName} onChange={handlePortfolioNameChange} />
            <button className='saveName-button' onClick={handleSavePortfolioName}>Save</button>
          </div>
        </div>
      )}
      {/* Modal for deleting portfolio */}
      {isDeletePortfolioModalOpen && (
        <div className="modalDeleteport">
          <div className="modalDeleteport-Content">
            <h5>Delete Portfolio</h5>
            <p>Are you sure you want to delete "{selectedPortfolio?.name}"?</p>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="modalButtons">
              <button className='deletePort' onClick={handleConfirmDeletePortfolio} disabled={loading}> {loading ? 'Deleting...' : 'Delete'}</button>
              <button className='cancelDelete' onClick={handleDeletePortfolioModalClose} disabled={loading}>Cancel</button>    
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding transaction */}
      {isTransactionModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeButton" onClick={handleTransactionModalClose}>&times;</span>
            <h2>Add Transaction</h2>
            <form onSubmit={handleTransactionSubmit}>
              <div className="formGroup">
                <label htmlFor="symbol">Symbol</label>
                <input
                  type="text"
                  id="symbol"
                  name="symbol"
                  value={transaction.symbol}
                  onChange={handleTransactionInputChange}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="shares">Shares</label>
                <input
                  type="number"
                  id="shares"
                  name="shares"
                  value={transaction.shares}
                  onChange={handleTransactionInputChange}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={transaction.price}
                  onChange={handleTransactionInputChange}
                  required
                />
              </div>
              <div className="formGroup">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={transaction.date}
                  onChange={handleTransactionInputChange}
                  required
                />
              </div>
              {errorMessage && <p className="error">{errorMessage}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ports;