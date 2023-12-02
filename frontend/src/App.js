import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  ClientProfile,
  Error404,
  FuelQuoteForm,
  FuelQuoteHistory,
  Landing,
  Login,
  RegistrationForm,
  NavBar,
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

          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
