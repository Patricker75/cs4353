import styles from "./Login.module.css";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
          navigate("/load", { replace: true });
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
    <>
      <h1 className="page-header">Login</h1>
      <form id={styles["container-login"]} onSubmit={(evt) => handleLogin(evt)}>
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
        {formError && <p className="form-error">{formError}</p>}

        <input id={styles["btn-login"]} type="submit" value="Login" />
        <Link id={styles["link-register"]} to="/register">
          Create an Account
        </Link>
      </form>
    </>
  );
};

export default Login;
