import React, { useState, useEffect } from "react";
import "./ClientProfile.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import clientProfileSlice from "../redux/clientProfileSlice";
import states from "../utils/states";

import {
  updateUserID,
  updateName,
  updateMainAddress,
  updateAuxAddress,
  updateCity,
  updateState,
  updateZipcode,
} from "../redux/clientProfileSlice";

export const ClientProfile = () => {
  const dispatch = useDispatch();
  const clientProfile = useSelector((state) => state.clientProfile);

  const generateRandomUserId = () => {
    return (
      "user_" + new Date().getTime() + "_" + Math.floor(Math.random() * 1000)
    );
  };
  useEffect(() => {
    // Generate a random user ID only when the component first loads
    const userId = generateRandomUserId();
    // Dispatch the user ID to the Redux store
    dispatch(updateUserID(userId));
  }, []); // Empty dependency array to run this effect only once

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    // Generate a random user ID
    const userId = generateRandomUserId();

    // Dispatch actions to update the client profile fields
    dispatch(updateName(clientProfile.name));
    dispatch(updateMainAddress(clientProfile.mainAddress));
    dispatch(updateAuxAddress(clientProfile.auxAddress));
    dispatch(updateCity(clientProfile.city));
    dispatch(updateState(clientProfile.state));
    dispatch(updateZipcode(clientProfile.zipcode));
  };

  const handleSave = () => {
    console.log("Profile data stored in Redux:", {
      userID: clientProfile.userID,
      name: clientProfile.name,
      mainAddress: clientProfile.mainAddress,
      auxAddress: clientProfile.auxAddress,
      city: clientProfile.city,
      state: clientProfile.state,
      zipcode: clientProfile.zipcode,
    });

    let newProfile = {
      userID: clientProfile.userID,
      profileData: {
        name: clientProfile.name,
        mainAddress: clientProfile.mainAddress,
        auxAddress: clientProfile.auxAddress,
        city: clientProfile.city,
        state: clientProfile.state,
        zipcode: clientProfile.zipcode,
      },
    };

    axios
      .put("http://localhost:4001/api/profile", newProfile, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Profile updated successfully on the server.");
        } else {
          console.error("Failed to update profile on the server.");
        }
      })
      .catch((error) => {
        console.error("An error occurred while updating the profile:", error);
      });
  };

  return (
    <div className="container1">
      <form className="form" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            maxLength="50"
            value={clientProfile.name}
            onChange={(evt) => dispatch(updateName(evt.target.value))}
            required
          />
        </p>

        <p>
          <label htmlFor="mainAddress">Main Address:</label>
          <input
            type="text"
            name="mainAddress"
            id="mainAddress"
            maxLength="100"
            value={clientProfile.mainAddress}
            onChange={(evt) => dispatch(updateMainAddress(evt.target.value))}
            required
          />
        </p>

        <p>
          <label htmlFor="auxAddress">Aux Address:</label>
          <input
            type="text"
            name="auxAddress"
            id="auxAddress"
            maxLength="100"
            value={clientProfile.auxAddress}
            onChange={(evt) => dispatch(updateAuxAddress(evt.target.value))}
          />
        </p>

        <p>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            maxLength="100"
            value={clientProfile.city}
            onChange={(evt) => dispatch(updateCity(evt.target.value))}
            required
          />
        </p>

        <p>
          <label htmlFor="state">State:</label>
          <select
            name="state"
            id="state"
            onChange={(evt) => dispatch(updateState(evt.target.value))}
            value={clientProfile.state}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            value={clientProfile.zipcode}
            onChange={(evt) => dispatch(updateZipcode(evt.target.value))}
            minLength="5"
            maxLength="9"
            required
          />
        </p>

        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};
