import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement authentication logic here
    // Do authentication

 
    alert("This is email " + email, " This is password " + password)
    navigate('/fuel');
  };

  const handleRegister = () => {
    // Redirect to the /register route
    alert("Sending you to register page");
    navigate('/register');
  };

  return (
    <div className="container">
      <div className="form">
        <h2 id = "my-black">Login </h2>
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