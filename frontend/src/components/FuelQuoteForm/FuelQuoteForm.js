import "./FuelQuoteForm.css";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  handlePriceGet,
  handleQuoteAdd,
} from "../../redux/slices/fuelQuoteSlice";
import validateQuote from "../../validators/quote";

function FuelQuoteForm() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.profile.profile);

  const initialQuote = {
    amount: -1,
    totalPrice: -1,
    deliveryAddress: userProfile.addressPrimary,
    deliveryDate: null,
  };
  const initialPricing = {
    unitPrice: 0,
    totalPrice: 0,
  };

  const [quote, setQuote] = useState(initialQuote);
  const [pricing, setPricing] = useState(initialPricing);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (quote.amount < 1) return;

    dispatch(handlePriceGet(quote.amount)).then(({ payload }) => {
      setPricing({
        unitPrice: payload.unitPrice,
        totalPrice: payload.total,
      });
    });
  }, [dispatch, quote.amount]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    let status = validateQuote(quote);

    switch (status) {
      case 0:
        setFormError("");

        let quoteData = {
          ...quote,
          ...pricing,
        };

        dispatch(handleQuoteAdd(quoteData))
          .unwrap()
          .then(() => {
            console.log("ALERT USER");
            setQuote(initialQuote);
            setPricing(initialPricing);
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case -1:
        setFormError("Invalid Amount");
        break;
      case -2:
        console.error("Total Price is not valid ????");
        break;
      case -3:
        setFormError("Invalid Delivery Address");
        break;
      case -4:
        setFormError("Invalid Delivery Date");
        break;
      default:
        setFormError("");
        break;
    }
  };

  const today = new Date().toISOString().split("T")[0];
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
            min="1"
            value={quote.amount}
            onChange={(evt) =>
              setQuote({ ...quote, amount: parseFloat(evt.target.value) })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address:</label>
          {!userProfile.addressAux ? (
            <p>{userProfile.addressPrimary}</p>
          ) : (
            <select
              name="deliveryAddress"
              defaultValue="primary"
              onChange={(evt) =>
                setQuote({ ...quote, deliveryAddress: evt.target.value })
              }
            >
              <option key="primary" value={userProfile.addressPrimary}>
                {userProfile.addressPrimary}
              </option>
              <option key="aux" value={userProfile.addressAux}>
                {userProfile.addressAux}
              </option>
            </select>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input
            type="date"
            name="deliveryDate"
            id="deliveryDate"
            min={today}
            onChange={(evt) =>
              setQuote({ ...quote, deliveryDate: evt.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="unitPrice">Price per Gallon:</label>
          <p>{pricing.unitPrice}</p>
        </div>

        <div className="form-group">
          <label htmlFor="unitPrice">Total:</label>
          <p>{pricing.totalPrice}</p>
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
      <p>{formError}</p>
    </div>
  );
}

export default FuelQuoteForm;
