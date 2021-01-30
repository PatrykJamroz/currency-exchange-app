import React from "react";
import Exchanger from "./components/Exchanger";
import Logo from "./components/Logo";
import "./index.css";

function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <Logo />
      <Exchanger />
    </div>
  );
}

export default App;
