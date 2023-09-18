import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import FuelQuoteForm from './components/FuelQuoteForm';
import RegistrationForm from './components/RegistrationForm';
import DataDisplay from './components/DataDisplay';


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
