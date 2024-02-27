import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

export const Container = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/home")
    }
  }, []);

  return (
    <div style={{ overflow: "hidden" }} className="container">
      <Outlet />
    </div>
  );
};
