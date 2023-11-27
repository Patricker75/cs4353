import "./RegistrationForm.css";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { handleRegisterUser } from "../../redux/slices/authSlice";
import validateAuth from "../../validators/auth";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleRegister = () => {
    let data = {
      email,
      password,
    };

    let status = validateAuth(data);
    if (status === 0) {
      setFormError("");

      dispatch(handleRegisterUser(data))
        .unwrap()
        .then(() => {
          navigate("/profile", { replace: true });
        })
        .catch((error) => {
          setFormError(error.message);
        });
      return;
    }

    switch (status) {
      case -1:
        setFormError("Invalid Email");
        return;
      case -2:
        setFormError("Invalid Password");
        return;
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
      <p>{formError}</p>
    </div>
  );
};

export default RegistrationForm;
