import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

export const Container = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ overflow: "hidden" }} className="container">
      <Outlet />
    </div>
  );
};
