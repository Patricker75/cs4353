import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import FuelQuoteForm from './FuelQuoteForm';
import RegistrationForm from './RegistrationForm';
import DataDisplay from './DataDisplay';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />,
        <Route path="/register" element={<RegistrationForm/>} />,
        <Route path="/fuel" element={<FuelQuoteForm/>} />,
        <Route path="/display" element={<DataDisplay/>} />,
        </Routes>
    </Router>
  );
};

export default App;
