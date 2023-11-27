import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  ClientProfile,
  DataDisplay,
  FuelQuoteForm,
  Login,
  NavBar,
  RegistrationForm,
} from "./components";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/fuel" element={<FuelQuoteForm />} />
          <Route path="/display" element={<DataDisplay />} />
          <Route path="/profile" element={<ClientProfile />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
