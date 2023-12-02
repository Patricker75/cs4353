import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  ClientProfile,
  FuelQuoteHistory,
  FuelQuoteForm,
  Landing,
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
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />

          <Route element={<RequireAuth />}>
            <Route path="/load" element={<DataLoad />} />
            <Route path="/fuel" element={<FuelQuoteForm />} />
            <Route path="/display" element={<FuelQuoteHistory />} />
            <Route path="/profile" element={<ClientProfile />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
