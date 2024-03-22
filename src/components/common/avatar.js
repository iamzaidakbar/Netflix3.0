import { useNavigate } from "react-router";
import "../../styles/avatar.scss";
import { auth } from "../../Utils/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeUser } from "../../Utils/Slices/userSlice";
import useUserProfile from "../../Utils/API/useUserData";
import { useEffect, useState } from "react";

const Avatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeUser, setActiveUser] = useState(null)
  const {
    allProfilesData,
    switchProfile,
    deleteProfile,
    loading,
  } = useUserProfile();


  const currentActiveUser = allProfilesData.filter(profile => profile.isCurrentUser)
  
  useEffect(() => {
    setActiveUser(currentActiveUser[0])
  }, [currentActiveUser])


  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteProfile = (profileKey) => {
    deleteProfile(profileKey);
  };


  const loaderStyles = {
    width: '40px',
    height: '40px',
    margin: '0 12px',
    position: 'relative',
    top: '4px',
    right: '10px',
    left: 'unset',
    transform: 'unset',
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
            {activeUser?.profileKey != profiles.profileKey && (
              <span
                onClick={() => {
                  handleDeleteProfile(profiles.profileKey);
                }}
                className="material-icons-outlined delete-icon"
              >
                delete
              </span>
            )}
          </div>
          <input
            onChange={() => {
              switchProfile(profiles.profileKey);
            }}
            id="f-option"
            name="selector"
            checked={activeUser?.profileKey === profiles.profileKey}
            type="radio"
          />
        </li>
      );
    });

  return (
    <div className="avatar">
      <span className="avatar-logo">
        {loading ? (
          <div id="loader" style={loaderStyles} className="nfLoader"></div>
        ) : (
          <>
            <img src={activeUser?.photoURL} width={40} height={40} />
            <span className="material-icons-outlined drop">
              arrow_drop_down
            </span>
          </>
        )}

        {/* dropdown */}
        <ul className="settings">
          <li>
            <img src={activeUser?.photoURL} width={30} height={30} />
            <span className="display-name">
              {activeUser?.displayName}
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
