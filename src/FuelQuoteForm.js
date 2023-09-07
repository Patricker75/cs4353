import React, { useState } from 'react';
import './FuelQuoteForm.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';
function FuelQuoteForm() {
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [inState, setInState] = useState(true);
  const [previousClient, setPreviousClient] = useState(false);
  const [generatedProfitMargin, setGeneratedProfitMargin] = useState(null); // Define the state variable
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // For demonstration, generate a random profit margin value between 0 and 1
    const randomProfitMargin = Math.random();

    // Set the generated profit margin value in a state variable
    setGeneratedProfitMargin(randomProfitMargin);
  }
  const handleExit = (e) => {
    alert("Wont actually work like this.. not authenticated..")
    navigate('/');

  }
  const handleDisplayData = (e) => {
    navigate('/display');

  }
  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientName">Client Name:</label>
            <input
              type="text"
              id="clientName"
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="amount">Amount or Number:</label>
            <input
              type="number"
              id="amount"
              placeholder="Amount or Number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              step="0.01"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="inState">In State:</label>
            <select
              id="inState"
              value={inState}
              onChange={(e) => setInState(e.target.value === 'true')}
            >
              <option value="true">In State (True)</option>
              <option value="false">In State (False)</option>
            </select>
          </div>
  
          <div className="form-group">
            <label htmlFor="previousClient">Previous Client:</label>
            <select
              id="previousClient"
              value={previousClient}
              onChange={(e) => setPreviousClient(e.target.value === 'true')}
            >
              <option value="true">Previous Client (True)</option>
              <option value="false">Previous Client (False)</option>
            </select>
          </div>
  
          <div className="form-group">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>

          </div>
          <div className="profit-button">
          {generatedProfitMargin !== null && (
        <div className="result">
          <p>Profit Margin: {generatedProfitMargin.toFixed(2)}</p>
        </div>
      )} </div>

        </form>
      </div>

    
   
      
      {/* Exit button */}
      <div className="exit-button-container1">
        <button className="exit-button1" onClick={handleExit}>
          Exit
        </button>
      </div>
  
      {/* Display Data button */}
      <div className="display-data-button-container">
        <button
          className="display-data-button"
          onClick={handleDisplayData}
        >
          Display Data
        </button>
      </div>
    </div>
  );
  
}

export default FuelQuoteForm;
