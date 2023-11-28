import "./FuelQuoteHistory.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { handleHistoryGet } from "../../redux/slices/historySlice";
import months from "../../utils/months";

const FuelQuoteHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quotes = useSelector((state) => state.history.items);

  useEffect(() => {
    dispatch(handleHistoryGet());
  }, []);

  const dateToString = (date) => {
    return `${
      months[date.getMonth()].full
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="container2">
      <table>
        <thead>
          <tr>
            <th>Request Number</th>
            <th>Amount</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Delivery Date</th>
            <th>Delivery Address</th>
          </tr>
        </thead>

        <tbody>
          {quotes.length > 0 &&
            quotes.map((quote) => (
              <tr>
                <td>{quote.requestId}</td>
                <td>{quote.amount}</td>
                <td>${quote.unitPrice}</td>
                <td>${quote.totalPrice}</td>
                <td>{dateToString(quote.deliveryDate)}</td>
                <td>{quote.deliveryAddress}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuelQuoteHistory;
