import "./Login.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useSelector, useDispatch } from "react-redux";
import {
  updateEmail,
  updatePassword,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/loginSlice";

const Login = () => {
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/auth/login",
        { email, password }
      );
      if (response.status === 200) {
        // Successful login
        const user = response.data;
        dispatch(loginSuccess(user));
        alert("Login successful");
        navigate("/profile");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      dispatch(loginFailure("Invalid email or password"));
      alert("Invalid email or password");
    }
  };

  const handleRegister = () => {
    // alert("Sending you to the register page");
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="form">
        <h2 id="my-black">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(updateEmail(e.target.value))}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch(updatePassword(e.target.value))}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
