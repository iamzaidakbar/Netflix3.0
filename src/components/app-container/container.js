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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        dispatch(addUser({ email, displayName, photoURL }));

        // Check if the current route is '/'
        if (location.pathname === "/") {
          navigate("/home");
        }
      } else {
        console.log("CON");
        navigate("/login");
      }
    });
  }, [location.pathname, navigate]);

  return (
    <div style={{ overflow: "hidden" }} className="container">
      <Outlet />
    </div>
  );
};

export default Container;
