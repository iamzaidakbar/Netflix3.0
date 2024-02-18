import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return <div className="App">
    <h2>Hello</h2>
  </div>
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>)