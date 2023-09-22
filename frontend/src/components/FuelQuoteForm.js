import React, { useState, useEffect } from "react";
import "./FuelQuoteForm.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useSelector } from "react-redux";

function FuelQuoteForm() {
  const today = (new Date()).toISOString().split('T')[0];

  const [amount, setAmount] = useState(1);
  const [unitPrice, setUnitPrice] = useState(10);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState(today);

  const [generatedProfitMargin, setGeneratedProfitMargin] = useState(null);

  const address = useSelector((state) => state.profile.profile.mainAddress);
  const navigate = useNavigate();
  
  useEffect(() => {
    setTotalPrice(unitPrice * amount)
  }, [amount])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all form fields have values
    if (!amount) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      // Prepare the data to send
      const dataToSend = {
      };

      // Send a POST request to the Flask backend
      const response = await axios.post(
        "http://localhost:4001/api/updateClientData",
        dataToSend
      );

      if (response.status === 200) {
        console.log("Data updated successfully.");
        // You can handle a successful response here if needed
      } else {
        console.error("Failed to update data.");
        // Handle failure if needed
      }
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle the error if needed
    }
    alert("Has been submitted or tried");
  };

  const handleExit = (e) => {
    alert("Won't actually work like this... not authenticated..");
    navigate("/");
  };

  const handleDisplayData = (e) => {
    navigate("/display");
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount to Request:</label>
            <input
              type="number"
              id="amount"
              placeholder="Amount or Number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              min='1'
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
              value={deliveryDate}
              onChange={(evt) => setDeliveryDate(evt)}
              min={today}
            />
          </div>

          <div className="form-group">
            <label htmlFor="unitPrice">Price per Gallon:</label>
            <p>${unitPrice}</p>
          </div>

          <div className="form-group">
            <label htmlFor="unitPrice">Total:</label>
            <p>${totalPrice}</p>
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

      {/* Exit button */}
      <div className="exit-button-container1">
        <button className="exit-button1" onClick={handleExit}>
          Exit
        </button>
      </div>

      {/* Display Data button */}
      <div className="display-data-button-container">
        <button className="display-data-button" onClick={handleDisplayData}>
          Display Data
        </button>
      </div>
    </div>
  );
}

export default FuelQuoteForm;
