import { Outlet } from "react-router";
import { Header } from "../common/header";

export const Container = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};
