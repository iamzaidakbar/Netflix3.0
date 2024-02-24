import { Outlet } from "react-router";
import { Header } from "../common/header";

export const Container = () => {
  return (
    <div style={{ overflow: "hidden" }} className="container">
      <Header />
      <Outlet />
    </div>
  );
};
