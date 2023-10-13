import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateAmount,
  updateUnitPrice,
  updateTotalPrice,
  updateDeliveryDate,
  updateFuelQuote

} from '../redux/fuelQuoteSlice';

function FuelQuoteForm() {
  // Use useSelector to access the current fuelQuote state
  const fuelQuote = useSelector((state) => state.fuelQuote);
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate the total price whenever amount or unitPrice changes
    dispatch(updateTotalPrice());
  }, [fuelQuote.amount, fuelQuote.unitPrice]);

  const address = '123 Main St';
  const today = new Date().toISOString().split('T')[0];
  const generatedProfitMargin = 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can dispatch the submitFuelQuote action or any other actions you need
    // dispatch(submitFuelQuote(fuelQuote));
  };

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
          <p>{address}</p>
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
