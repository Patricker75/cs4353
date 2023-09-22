import React, { useState, useEffect } from 'react';
import './DataDisplay.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DataDisplay() {
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [inState, setInState] = useState(true);
  const [previousClient, setPreviousClient] = useState(false);
  const [generatedProfitMargin, setGeneratedProfitMargin] = useState(null);
  const [clientHistory, setClientHistory] = useState([]);

  const navigate = useNavigate();

  const handleExit = (e) => {
    alert("Wont actually work like this.. not authenticated..")
    navigate('/');

  }
  const handleEntry = (e) => {
    navigate('/fuel');

  }
  useEffect(() => {
    // Simulate fetching client data and profit margin from an API or database
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/printClientData');
        const data = response.data;
  
        console.log('Fetched Data:', data); // Debugging: Log the entire data object
  
        setAmount(data.amount);
        setClientHistory(data.clientHistory.map(item => item.toString()));
        setClientName(data.clientName);
        setGeneratedProfitMargin(data.generatedProfitMargin);
        setInState(data.inState);
        setPreviousClient(data.previousClient);
        setPrice(data.price);
   // Convert each item to a string
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  return (
    <div className="container">
        <h2>Data Display</h2>
        <div className="data-item">
          <strong>Client Name:</strong> {clientName}
        </div>
        <div className="data-item">
          <strong>Amount or Number:</strong> {amount}
        </div>
        <div className="data-item">
          <strong>Price:</strong> {price}
        </div>
        <div className="data-item">
          <strong>In State:</strong> {inState ? 'True' : 'False'}
        </div>
        <div className="data-item">
          <strong>Previous Client:</strong> {previousClient ? 'True' : 'False'}
        </div>
        <div className="data-item">
          <strong>Profit Margin:</strong>{' '}
          {generatedProfitMargin !== null ? generatedProfitMargin.toFixed(2) : 'N/A'}
        </div>
        <div className="data-item">
          <strong>Client History:</strong>
          <ul>
            {clientHistory.map((historyItem, index) => (
              <li key={index}>{historyItem}</li>
            ))}
          </ul>
        </div>
     
      <div className="fuel-button-container">
        <button className="fuel-button" onClick={handleEntry}>Head to Fuel</button>
      </div>
      <div className="exit-button-container1">
        <button className="exit-button1" onClick={handleExit}>Exit</button>
      </div>
    </div>
  );
}

export default DataDisplay;
