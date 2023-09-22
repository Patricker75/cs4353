import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate
import "./DataDisplay.css"; // Import your CSS file
import axios from "axios";

function FuelQuoteTable() {
  const jsonData = [
    {
      "amount": 3,
      "unitPrice": 12.5,
      "totalPrice": 37.5,
      "deliveryDate": "2023-09-22T00:00:00.000Z",
      "deliveryAddress": "123 Main Street, City, State"
    },
    {
      "amount": 5,
      "unitPrice": 11.75,
      "totalPrice": 58.75,
      "deliveryDate": "2023-09-23T00:00:00.000Z",
      "deliveryAddress": "456 Elm Street, City, State"
    },
    {
      "amount": 2,
      "unitPrice": 10.0,
      "totalPrice": 20.0,
      "deliveryDate": "2023-09-24T00:00:00.000Z",
      "deliveryAddress": "789 Oak Avenue, City, State"
    },
    {
      "amount": 4,
      "unitPrice": 12.0,
      "totalPrice": 48.0,
      "deliveryDate": "2023-09-25T00:00:00.000Z",
      "deliveryAddress": "101 Pine Road, City, State"
    }
  ];

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(jsonData);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter data based on the search term
    const filteredResults = jsonData.filter((item) =>
      item.deliveryDate.includes(searchTerm)
    );
    setFilteredData(filteredResults);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExit = () => {
    navigate("/");
    // Add functionality to exit here
  };

  const handleDisplayData = () => {
    navigate("/fuel"); // Use the navigate function to navigate to "/display"
    // Add functionality to display data here
  };

  return (
    <div className="container">
      <h2>Fuel Quote History</h2>
      <div>
        <input
          type="text"
          placeholder="Search by Delivery Date"
          onChange={handleSearch}
        />
      </div>
      {!loading ? (
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
      ) : (
        <p>Loading data...</p>
      )}

    </div>
  );
}

export default FuelQuoteTable;
