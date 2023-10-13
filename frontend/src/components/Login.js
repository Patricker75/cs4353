import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom'; // Import navigate
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updatePassword, login } from '../redux/loginSlice';

const Login = () => {
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Import useNavigate

  const handleLogin = () => {
    // You can perform authentication logic here.
    // Dispatch the login action to set isAuthenticated to true.
    dispatch(login());

    alert("This is email " + email + " This is password " + password);
    navigate('/profile');
  };

  const handleRegister = () => {
    // Redirect to the /register route
    alert("Sending you to the register page");
    navigate('/register');
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
