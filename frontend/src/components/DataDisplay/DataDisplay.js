import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateFuelQuoteHistory } from "../../redux/historySlice";
import "./DataDisplay.css";
import axios from "axios";

function calculateTotalPrice(amount, unitPrice) {
  return amount * unitPrice;
}

function FuelQuoteTable() {
  const fuelQuoteHistory = useSelector(
    (state) => state.history.fuelQuoteHistory
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(fuelQuoteHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the data from the backend when the component mounts
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4001/api/quotes/history"
        );
        const data = response.data;
        // Dispatch the fetched data to your Redux store
        dispatch(updateFuelQuoteHistory(data));
        setFilteredData(data); // Set the filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData(); // Call the fetchData function when the component mounts
  }, [dispatch]);

  const handleSearch = (e) => {
    const term = e.target.value;

    if (term !== searchTerm) {
      setSearchTerm(term);

      setLoading(true);

      setTimeout(() => {
        if (term) {
          const filteredResults = fuelQuoteHistory.filter((item) =>
            item.mainAddress.toLowerCase().includes(term.toLowerCase())
          );
          setFilteredData(filteredResults);
        } else {
          setFilteredData(fuelQuoteHistory);
        }

        setTimeout(() => {
          setLoading(false);
        }, 850);
      }, 800);
    }
  };

  const handleExit = () => {
    navigate("/");
  };

  const handleDisplayData = () => {
    navigate("/fuel");
  };

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
          placeholder="Search by Main Address"
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
              <th>Main Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.amount}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>
                  ${calculateTotalPrice(item.amount, item.unitPrice).toFixed(2)}
                </td>
                <td>{item.deliveryDate}</td>
                <td>{item.mainAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FuelQuoteTable;
