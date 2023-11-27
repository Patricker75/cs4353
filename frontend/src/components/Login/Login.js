import "./Login.css";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleLoginUser } from "../../redux/slices/authSlice";
import validateAuth from "../../validators/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleLogin = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    let data = {
      email,
      password,
    };

    let status = validateAuth(data);
    if (status === 0) {
      setFormError("");

      dispatch(handleLoginUser(data))
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
      default:
        setFormError("");
        return;
    }
  };

  return (
    <div className="container">
      <h2 id="my-black">Login</h2>
      <form className="form" onSubmit={(evt) => handleLogin(evt)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="login-button" type="submit" value="Login" />
      </form>
      <button className="register-button" onClick={() => navigate("/register")}>
        Register
      </button>
      <p>{formError}</p>
    </div>
  );
};

export default Login;
