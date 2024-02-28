import { useNavigate } from "react-router";
import "../../styles/avatar.scss";
import { auth } from "../../Utils/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeUser } from "../../Utils/Slices/userSlice";
import useUserProfile from "../../Utils/API/useUserData";

const Avatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProfileData, allProfilesData, switchProfile, loading } =
    useUserProfile();


  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        dispatch(removeUser());
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const user_profiles =
    allProfilesData &&
    allProfilesData?.map((profiles, index) => {
      return (
        <li
          className={`user_profiles ${index === 0 ? "first_child" : ""}`}
          key={profiles.profileKey}
        >
          <div className="profile-details">
            <img src={profiles?.photoURL} width={30} height={30} />
            <span className="display-name">{profiles?.displayName}</span>
          </div>
          <input
            onChange={() => {
              switchProfile(profiles.profileKey);
            }}
            id="f-option"
            name="selector"
            checked={currentProfileData?.profileKey === profiles.profileKey}
            type="radio"
          />
        </li>
      );
    });

  return (
    <div className="avatar">
      <span className="avatar-logo">
        {loading ? (
          <div
            style={{
              float: "right",
              width: "40px",
              height: "40px",
              margin: "6px 12px",
            }}
            id="loader"
            className="nfLoader"
          ></div>
        ) : (
          <>
            <img src={currentProfileData?.photoURL} width={40} height={40} />
            <span className="material-icons-outlined drop">
              arrow_drop_down
            </span>
          </>
        )}

        {/* dropdown */}
        <ul className="settings">
          <li>
            <img src={currentProfileData?.photoURL} width={30} height={30} />
            <span className="display-name">
              {currentProfileData?.displayName}
            </span>
          </li>
          <li>
            <span className="material-icons-outlined edit-icon">edit</span>
            <span
              onClick={() => {
                navigate("/update-profile");
              }}
              className="text"
            >
              Edit profile
            </span>
          </li>
          <li>
            <span className="material-icons-outlined edit-icon">person</span>

            <span
              onClick={() => {
                navigate("/select-profile");
              }}
              className="text"
            >
              Manage profile
            </span>
          </li>
          <li>
            <span className="material-icons-outlined edit-icon">
              add_circle
            </span>

            <span
              onClick={() => {
                navigate("/add-profile");
              }}
              className="text"
            >
              Add profile
            </span>
          </li>
          {user_profiles}
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
