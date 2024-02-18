import React from "react";
import ReactDOM from "react-dom/client";
import './App.scss';
import { RouterProvider } from "react-router-dom";
import router from "./src/Utils/routes";
import { Container } from "./src/components/app-container/container";

const App = () => {
  return (
    <div className="App">
      <Container />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
