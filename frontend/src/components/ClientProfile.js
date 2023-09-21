import React, { useState } from "react";

export const ClientProfile = () => {
  const [name, setName] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [auxAddress, setAuxAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    console.log({
      name,
      mainAddress,
      city,
      state,
      zipcode
    })
  }

  return (
    <>
      <form onSubmit={(evt) => handleSubmit(evt)}>
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
            onInput={(evt) => setState(evt.target.value)}
            defaultValue={state}
            required
          >
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
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
    </>
  );
};
