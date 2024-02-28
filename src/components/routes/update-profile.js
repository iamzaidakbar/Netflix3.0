import { useNavigate } from "react-router";
import "../../styles/create-profile.scss";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import useFormValidation from "../../Utils/API/useValidations";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Utils/Slices/userSlice";
import { useState } from "react";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, displayName, photoURL } = useSelector(
    (store) => store?.user?.loggedInUser || {}
  );

  const [selectedDisplayName, setSelectedDisplayName] = useState(displayName);
  const { errors, validateInput } = useFormValidation();

  const updateUserProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: selectedDisplayName,
        photoURL,
      });

      dispatch(
        addUser({
          email: email,
          displayName: selectedDisplayName,
          photoURL,
        })
      );
      const data = {
        backdrop_path: photoURL,
      };
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
      setSelectedDisplayName(value);
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
          <img src={photoURL} width={120} height={120} alt="Choose Avatar" />
          <span className="c-sub-col">
            <input
              style={{
                borderColor: errors.name && "red",
                outline: errors.name && "red",
              }}
              onChange={handleOnChange}
              value={selectedDisplayName ? selectedDisplayName : displayName}
              type="text"
              placeholder="Name"
              name="name"
            />
            <input
              disabled
              value={email}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleOnChange}
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
            disabled={displayName?.length === 0}
            onClick={updateUserProfile}
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
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
