import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateFuelQuoteHistory } from "../redux/historySlice";
import "./DataDisplay.css";

function FuelQuoteTable() {
  const fuelQuoteHistory = useSelector((state) => state.history.fuelQuoteHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(fuelQuoteHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Initially not loading

  useEffect(() => {
    // Ensure the Redux store is populated at the beginning
    if (fuelQuoteHistory.length === 0) {
      // Fetch or populate your initial data here and dispatch it
      // For example, dispatch(updateFuelQuoteHistory(initialMockData));
    }
  }, [dispatch, fuelQuoteHistory]);

  const handleSearch = (e) => {
    const term = e.target.value;

    if (term !== searchTerm) {
      setSearchTerm(term);

      setLoading(true); // Show the loading UI

      setTimeout(() => {
        if (term) {
          const filteredResults = fuelQuoteHistory.filter((item) =>
            item.deliveryAddress.toLowerCase().includes(term.toLowerCase())
          );
          setFilteredData(filteredResults);
        } else {
          setFilteredData(fuelQuoteHistory);
        }
        
        // Delay for 0.85 seconds before hiding the loading UI
        setTimeout(() => {
          setLoading(false);
        }, 850);
      }, 800); // Delay of 0.8 seconds
    }
  };

  const handleExit = () => {
    navigate("/");
  }

  const handleDisplayData = () => {
    navigate("/fuel");
  }

  return (
    <div className="container2">
      {loading && (
        <div className="loading-ui">
          <p>Loading data...</p>
        </div>
      )}
      <h2 className="search-heading">Fuel Quote History</h2>
      <div>
        <input
          type="text"
          placeholder="Search by Delivery Address"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {filteredData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Delivery Date</th>
              <th>Delivery Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.amount}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.totalPrice.toFixed(2)}</td>
                <td>{item.deliveryDate}</td>
                <td>{item.deliveryAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FuelQuoteTable;


