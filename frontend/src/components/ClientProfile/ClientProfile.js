import "./ClientProfile.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleProfileUpdate } from "../../redux/slices/profileSlice";
import states from "../../utils/states";
import validateProfile from "../../validators/profile";

const ClientProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.profile);

  const [profile, setProfile] = useState(userProfile);
  const [formError, setFormError] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    let status = validateProfile(profile);

    switch (status) {
      case 0:
        setFormError("");

        dispatch(handleProfileUpdate(profile))
          .unwrap()
          .then(() => {
            alert("Profile Updated Succesfully");
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case -1:
        setFormError("Invalid Name");
        break;
      case -2:
        setFormError("Invalid Primary Addresss");
        break;
      case -3:
        setFormError("Invalid City");
        break;
      case -4:
        setFormError("Invalid State");
        break;
      case -5:
        setFormError("Invalid Zip Code");
        break;
      case -6:
        setFormError("Invalid Auxillary Addresss");
        break;
      default:
        setFormError("");
    }
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
            defaultValue={userProfile.name}
            onChange={(evt) =>
              setProfile({ ...profile, name: evt.target.value })
            }
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
            defaultValue={userProfile.addressPrimary}
            onChange={(evt) =>
              setProfile({ ...profile, addressPrimary: evt.target.value })
            }
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
            defaultValue={userProfile.addressAux}
            onChange={(evt) =>
              setProfile({ ...profile, addressAux: evt.target.value })
            }
          />
        </p>

        <p>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            maxLength="100"
            defaultValue={userProfile.city}
            onChange={(evt) =>
              setProfile({ ...profile, city: evt.target.value })
            }
            required
          />
        </p>

        <p>
          <label htmlFor="state">State:</label>
          <select
            name="state"
            id="state"
            defaultValue={userProfile.state}
            onChange={(evt) =>
              setProfile({ ...profile, state: evt.target.value })
            }
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="number"
            name="zipcode"
            id="zipcode"
            defaultValue={userProfile.zipCode}
            onChange={(evt) =>
              setProfile({ ...profile, zipCode: parseInt(evt.target.value) })
            }
            minLength="5"
            maxLength="9"
            required
          />
        </p>

        <input type="submit" value="Save" />
      </form>
      <p>{formError}</p>
    </div>
  );
};

export default ClientProfile;
