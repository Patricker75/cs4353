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
  RequireAuth,
  DataLoad,
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

          <Route element={<RequireAuth />}>
            <Route path="/load" element={<DataLoad />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/fuel" element={<FuelQuoteForm />} />
            <Route path="/display" element={<DataDisplay />} />
            <Route path="/profile" element={<ClientProfile />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
