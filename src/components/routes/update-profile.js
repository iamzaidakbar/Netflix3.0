import { useNavigate } from "react-router";
import "../../styles/create-profile.scss";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import useFormValidation from "../../Utils/API/useValidations";
import { useSelector } from "react-redux";
import { useState } from "react";
import useUserProfile from "../../Utils/API/useUserData";

const UpdateProfile = () => {
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();
  const { currentProfileData, loading } = useUserProfile();
  const { errors, validateInput } = useFormValidation();
  const selectedAvatar = useSelector((store) => store?.profile?.selectedAvatar);

  if (loading) return <div id="loader" className="nfLoader"></div>;


  const updateUserProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: selectedAvatar,
      });

      console.log("User Updated.");
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    if (name === "name") {
      setDisplayName(value);
    }
  };

  return (
    <div className="create-profile">
      <div className="c-wrapper">
        <div className="c-col-1">
          <label className="c-label-1">Update Profile</label>
          <label className="c-label-2">
            Update your profile to watch Netflix nonstop.
          </label>
        </div>
        <div className="c-col-2">
          <img
            src={selectedAvatar ? selectedAvatar : currentProfileData?.photoURL}
            width={120}
            height={120}
            alt="Choose Avatar"
          />
          <span className="c-sub-col">
            <input
              style={{
                borderColor: errors.name && "red",
                outline: errors.name && "red",
              }}
              value={displayName}
              onChange={handleOnChange}
              type="text"
              placeholder={currentProfileData?.displayName}
              name="name"
            />
            {errors.name && (
              <span className="error-message">
                <span className="material-icons-outlined">clear</span>
                <span className="message">{errors.name}</span>
              </span>
            )}
          </span>
        </div>

        <div className="c-col-3">
          <button onClick={updateUserProfile} className="btn-continue">
            Continue
          </button>
          <button
            onClick={() => {
              navigate(
                "/choose-avatar/profileType=update_profile&username=" +
                  currentProfileData?.displayName
              );
            }}
            className="btn-choose-avatar"
          >
            Change Avatar
          </button>
          <button
            onClick={() => {
              navigate("/home");
            }}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
