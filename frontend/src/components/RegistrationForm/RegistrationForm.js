import styles from "./RegistrationForm.module.css";

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
      <h1 className="page-header">Register</h1>

      <form id={styles["container-register"]} onSubmit={handleRegister}>
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

        {formError && <p className="form-error">{formError}</p>}

        <input
          id={styles["btn-register"]}
          type="submit"
          value="Register Account"
        />

        <Link id={styles["link-login"]} to="/">
          Log In to Account
        </Link>
      </form>
    </>
  );
};

export default RegistrationForm;
