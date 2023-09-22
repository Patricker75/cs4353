import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import FuelQuoteForm from "./components/FuelQuoteForm";
import RegistrationForm from "./components/RegistrationForm";
import DataDisplay from "./components/DataDisplay";
import { ClientProfile } from "./components/ClientProfile";
import { NavBar } from "./components/NavBar";
import './App.css'

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Login />} />,
          <Route path="/register" element={<RegistrationForm />} />,
          <Route path="/fuel" element={<FuelQuoteForm />} />,
          <Route path="/display" element={<DataDisplay />} />,
          <Route path="/profile" element={<ClientProfile />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
