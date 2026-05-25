import React from "react";

import "./App.css";

import TravelForm from "./components/TravelForm";

import TravelList from "./components/TravelList";

function App() {
  return (
    <div className="container">
      <h1>Travel Management</h1>

      <TravelForm />

      <TravelList />
    </div>
  );
}

export default App;
