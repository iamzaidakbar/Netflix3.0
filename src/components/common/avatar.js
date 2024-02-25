import { useNavigate } from "react-router";
import "../../styles/avatar.scss";
import { auth } from "../../Utils/firebase";
import { signOut } from "firebase/auth";

const Avatar = () => {
  const navigate = useNavigate();
  const { displayName, avatar } = JSON.parse(
    localStorage.getItem("user-profile")
  );

  const editProfile = () => {
    navigate("/update-avatar");
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="avatar">
      <span className="avatar-logo">
        <img src={avatar} width={40} height={40} />
        <span className="material-icons-outlined drop">arrow_drop_down</span>

        {/* dropdown */}
        <ul className="settings">
          <li>
            <img src={avatar} width={30} height={30} />
            <span className="display-name">{displayName}</span>
          </li>
          <li>
            <span className="material-icons-outlined edit-icon">edit</span>
            <span onClick={editProfile} className="text">
              Edit profile
            </span>
          </li>
          <li>
            <button onClick={logoutUser} className="log-out">
              Sign out of netflix
            </button>
          </li>
        </ul>
      </span>
    </div>
  );
};
export default Avatar;
