import React, { useState } from "react";
import './ClientProfile.css';
import { useDispatch } from "react-redux";    
import { updateProfile } from "../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

export const ClientProfile = () => {  
  const [name, setName] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [auxAddress, setAuxAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(""); // Changed state to an empty string
  const [zipcode, setZipcode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    let newProfile = {
      name,
      mainAddress,
      city,
      state, // Use the state variable
      zipcode,
    };

    dispatch(updateProfile(newProfile))
    navigate('/fuel')
  };

  // Array of U.S. states
  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District Of Columbia",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];

  return (
    <div className="container1"> {/* Matched container1 */}
      <form className="form" onSubmit={(evt) => handleSubmit(evt)}> {/* Matched form1 */}
        <p>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            maxLength="50"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            required
          />
        </p>

        <p>
          <label htmlFor="mainAddress">Address 1:</label>
          <input
            type="text"
            name="mainAddress"
            id="mainAddress"
            maxLength="100"
            value={mainAddress}
            onChange={(evt) => setMainAddress(evt.target.value)}
            required
          />
        </p>

        <p>
          <label htmlFor="auxAddress">Address 2:</label>
          <input
            type="text"
            name="auxAddress"
            id="auxAddress"
            maxLength="100"
            value={auxAddress}
            onChange={(evt) => setAuxAddress(evt.target.value)}
          />
        </p>

        <p>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            maxLength="100"
            value={city}
            onChange={(evt) => setCity(evt.target.value)}
            required
          />
        </p>

        <p>
          <label htmlFor="state">State:</label>
          <select
            name="state"
            id="state"
            onChange={(evt) => setState(evt.target.value)} // Update the state variable
            value={state} // Bind the selected state
            required
          >
            <option value="">Select State</option>
            {usStates.map((usState) => (
              <option key={usState} value={usState}>
                {usState}
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
            value={zipcode}
            onChange={(evt) => setZipcode(evt.target.value)}
            minLength="5"
            maxLength="9"
            required
          />
        </p>

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};
