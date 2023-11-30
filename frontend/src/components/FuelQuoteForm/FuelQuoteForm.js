import styles from "./FuelQuoteForm.module.css";

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

    dispatch(handlePriceGet(quote.amount))
      .unwrap()
      .then((response) => {
        setPricing({
          unitPrice: response.unitPrice,
          totalPrice: response.total,
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
          amount: parseFloat(quote.amount),
        };

        dispatch(handleQuoteAdd(quoteData))
          .unwrap()
          .then(() => {
            alert("Fuel Request has been Recorded");

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
    <>
      <h1 className="page-header">Request a Fuel Quote</h1>
      <form id={styles["form-request"]} onSubmit={handleSubmit}>
        <p>
          <label htmlFor="amount">Amount to Request:</label>
          <input
            type="number"
            id="amount"
            placeholder="Amount or Number"
            min="1"
            value={quote.amount}
            onChange={(evt) => setQuote({ ...quote, amount: evt.target.value })}
            required
          />
        </p>

        <p>
          <label htmlFor="address">Delivery Address:</label>
          {!userProfile.addressAux ? (
            <>{userProfile.addressPrimary}</>
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
        </p>

        <p>
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
        </p>

        <p>Price per Gallon: {pricing.unitPrice}</p>

        <p>Total: {pricing.totalPrice}</p>

        {formError && <p className="form-error">{formError}</p>}

        <input type="submit" value="Submit" />

        <div className="profit-button">
          {generatedProfitMargin !== null && (
            <div className="result">
              <p>Profit Margin: {generatedProfitMargin.toFixed(2)}</p>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default FuelQuoteForm;
