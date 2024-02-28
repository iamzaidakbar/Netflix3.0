import { useNavigate } from "react-router";
import avatar from "../../assets/images/Avatars/avatar1.png";
import "../../styles/add-profile.scss";
import removeAvatar from "../../Utils/Slices/profileSlice";
import { auth, database } from "../../Utils/firebase";
import { set, push, ref } from "firebase/database";
import useFormValidation from "../../Utils/API/useValidations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AddProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const { errors, validateInput } = useFormValidation();

  const [displayName, setDisplayName] = useState("");
  const selectedAvatar = useSelector((store) => store?.avatar?.selectedAvatar);

  useEffect(() => {
    dispatch(removeAvatar);
  }, []);

  const addProfile = () => {
    if (user) {
      const userID = user.uid;
      const profileData = {
        email: user.email,
        displayName: displayName,
        photoURL: selectedAvatar ? selectedAvatar : avatar,
      };

      // Generate a unique key for each profile
      const profileKey = push(
        ref(database, `profiles/${userID}/userProfiles`)
      ).key;

      // Set the profile data under the generated key
      set(
        ref(database, `profiles/${userID}/userProfiles/${profileKey}`),
        profileData
      )
        .then(() => {
          console.log("User and Profile Created.");
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error creating profile:", error);
        });
    } else {
      console.error("User not authenticated");
      navigate("/login");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setDisplayName(value);
  };

  return (
    <div className="add-profile">
      <div className="c-wrapper">
        <div className="c-col-1">
          <label className="c-label-1">Add Profile</label>
          <label className="c-label-2">
            Add profile for yourself to watch Netflix nonstop.
          </label>
        </div>
        <div className="c-col-2">
          <img
            src={selectedAvatar ? selectedAvatar : avatar}
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
              onChange={handleOnChange}
              value={displayName}
              type="text"
              placeholder="Name"
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
          <button
            disabled={displayName.length == 0}
            onClick={addProfile}
            className="btn-continue"
          >
            Continue
          </button>
          <button
            onClick={() => {
              navigate("/choose-avatar");
            }}
            className="btn-choose-avatar"
          >
            Choose Avatar
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
export default AddProfile;
