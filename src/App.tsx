import React from "react";
import Exchanger from "./components/Exchanger";
import Logo from "./components/Logo";
import "./index.css";

function App() {
  return (
    <div className="container border-2 border-solid border-green-500 max-w-5xl mx-auto">
      <Logo />
      <Exchanger />
    </div>
  );
}

export default App;
