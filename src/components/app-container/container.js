import { Outlet, useNavigate, useLocation } from "react-router";
import { addUser } from "../../Utils/Slices/userSlice";
import { auth } from "../../Utils/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

const Container = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.pathname === "/") {
          navigate("/home");
        }
      } else {
        // Redirect to the corresponding route based on the current path
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
          // Redirect to login if the path is neither login nor signup
          navigate("/login");
        }
      }
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, [location.pathname, navigate, dispatch]);

  return (
    <div style={{ overflow: "hidden" }} className="container">
      <Outlet />
    </div>
  );
};

export default Container;
