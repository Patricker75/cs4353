import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationForm.css'; // Import your CSS file

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Implement registration logic here
    alert("We are now registered");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleRegister}>
      <h2 id = "my-black">Register </h2>
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
          <button className="register-button" type="submit">
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
