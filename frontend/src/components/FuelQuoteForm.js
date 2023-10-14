import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  updateAmount,
  updateUnitPrice,
  updateTotalPrice,
  updateDeliveryDate,
  updateFuelQuote,
} from '../redux/fuelQuoteSlice';

import {
  updateUserID,
} from '../redux/clientProfileSlice';

function FuelQuoteForm() {
  const fuelQuote = useSelector((state) => state.fuelQuote);
  const clientProfile = useSelector((state) => state.clientProfile);
  const dispatch = useDispatch();

  // Dispatch the updateUserID action to set the user's ID when the component loads
  useEffect(() => {
    // Calculate the total price whenever amount or unitPrice changes
    dispatch(updateTotalPrice());
  }, [fuelQuote.amount, fuelQuote.unitPrice]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the user's ID and request data to send to the API
    let jsondata = {
      userID: clientProfile.userID,
      requestData: {
        amount: fuelQuote.amount,
        unitPrice: fuelQuote.unitPrice,
        deliveryDate: fuelQuote.deliveryDate,
        mainAddress: clientProfile.mainAddress,
      },
    };

    try {
      // Send a POST request to the API with the jsondata object
      const response = await axios.post('http://localhost:4001/api/quotes/new', jsondata);

      // Handle the API response if needed
      console.log('API response:', response.data);

      // You can dispatch the submitFuelQuote action or any other actions you need
      // dispatch(submitFuelQuote(fuelQuote));
    } catch (error) {
      // Handle errors if the request fails
      console.error('API request error:', error);
    }
  }

  const today = new Date().toISOString().split('T')[0];
  const generatedProfitMargin = 0.1;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount to Request:</label>
          <input
            type="number"
            id="amount"
            placeholder="Amount or Number"
            value={fuelQuote.amount}
            onChange={(e) => dispatch(updateAmount(parseInt(e.target.value)))}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address:</label>
          <p>{clientProfile.mainAddress}</p>
        </div>

        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            id="deliveryDate"
            value={fuelQuote.deliveryDate}
            onChange={(evt) => dispatch(updateDeliveryDate(evt.target.value))}
            min={today}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unitPrice">Price per Gallon:</label>
          <p>${fuelQuote.unitPrice}</p>
        </div>

        <div className="form-group">
          <label htmlFor="unitPrice">Total:</label>
          <p>${fuelQuote.totalPrice}</p>
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
          )}
        </div>
      </form>
    </div>
  );
}

export default FuelQuoteForm;
