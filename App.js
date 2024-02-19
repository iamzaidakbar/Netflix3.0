import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./src/Utils/routes";
import dotenv from "dotenv";
import { Container } from "./src/components/app-container/container";
import { Provider } from "react-redux";
import Store from "./src/Utils/Store/store";

dotenv.config();

const App = () => {
  return (
    <div className="App">
      <Container />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
