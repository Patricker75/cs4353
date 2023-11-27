import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegistrationForm.css"; // Import your CSS file
import axios from "axios"; // Import Axios

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const jsondata = {
    email: email, // Assuming your email state is named 'email'
    password: password, // Assuming your password state is named 'password'
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/auth/register",
        jsondata,
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to indicate JSON data
          },
        }
      );
      if (response.status === 201) {
        // Successful registration
        alert("Registration successful");
        // You can navigate to another page if needed
      } else if (response.status === 409) {
        // Email already in use
        alert("Email already in use");
      } else {
        // Handle other errors
        alert("Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleRegister}>
        <h2 id="my-black">Register</h2>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="register-button"
          type="button"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
