import { useNavigate } from "react-router";
import avatar from "../../assets/images/Avatars/avatar1.png";
import "../../styles/create-profile.scss";
import { auth } from "../../Utils/firebase";
import useFormValidation from "../../Utils/API/useValidations";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useUserProfile from "../../Utils/API/useUserData";

const CreateProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { addProfile, currentProfileData } =
    useUserProfile();

  const { errors, validateInput } = useFormValidation();

  const [displayName, setDisplayName] = useState("");
  const selectedAvatar = useSelector((store) => store?.profile?.selectedAvatar);

  useEffect(() => {
    document.title = "Create Profile - Netflix";
  }, []);

  const createProfile = async () => {
    const profileData = {
      email: user.email,
      displayName: displayName,
      photoURL: selectedAvatar ? selectedAvatar : avatar,
    };
    await addProfile(profileData, true);
    console.log(currentProfileData)
    navigate("/home");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setDisplayName(value);
  };

  return (
    <div className="create-profile">
      <div className="c-wrapper">
        <div className="c-col-1">
          <label className="c-label-1">Create Profile</label>
          <label className="c-label-2">
            Add a profile to watch Netflix nonstop.
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
            onClick={createProfile}
            className="btn-continue"
          >
            Continue
          </button>
          <button
            onClick={() => {
              navigate(
                "/choose-avatar/profileType=create-profile&username=null"
              );
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
export default CreateProfile;
