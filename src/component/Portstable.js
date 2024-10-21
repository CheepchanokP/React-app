import React from 'react'
import { useEffect, useState } from 'react';
import '../component/portstable.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Portstable() {
    const [rows, setRows] = useState([]);  // State to store API data
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
  
    useEffect(() => {
      // Fetch data from the API
      fetch('https://api.example.com/data')  // Replace with your API URL
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Assuming the API returns an array of objects with name, price, and change properties
          setRows(data);
          setLoading(false);  // Stop loading when data is fetched
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError(error);
          setLoading(false);  // Stop loading in case of error
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;  // Show loading state
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;  // Show error state
    }
  
    return (
      <div className='portstable'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price&nbsp;($)</TableCell>
                <TableCell align="right">Change&nbsp;(%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell
                    align="right"
                    // Apply conditional styles for green if change > 0, red if change < 0
                    style={{ color: row.change > 0 ? 'green' : row.change < 0 ? 'red' : 'black' }}
                  >
                    {row.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  

export default Portstable
