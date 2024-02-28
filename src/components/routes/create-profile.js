import { useNavigate } from "react-router";
import avatar from "../../assets/images/Avatars/avatar1.png";
import "../../styles/create-profile.scss";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Utils/firebase";
import useFormValidation from "../../Utils/API/useValidations";
import { useDispatch, useSelector } from "react-redux";
import { addDisplayName } from "../../Utils/Slices/profileSlice";
import { addUser } from "../../Utils/Slices/userSlice";

const CreateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errors, validateInput } = useFormValidation();

  const photoUrl = useSelector((store) => store?.avatar?.selectedAvatar);
  const displayName = useSelector((store) => store?.avatar?.name);
  const loggedInUser = useSelector((store) => store?.user?.loggedInUser);

  const createProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoUrl,
    })
      .then(() => {
        console.log(auth.currentUser)
        const { email, displayName, photoURL } = auth.currentUser;
        dispatch(addUser({ email, displayName, photoURL }));
        console.log(email, displayName, photoURL);
        console.log("User Created.");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    dispatch(addDisplayName(value));
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
            src={photoUrl ? photoUrl : avatar}
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
            <input
              disabled
              value={loggedInUser ? loggedInUser?.email : ""}
              name="email"
              type="email"
              placeholder="Email"
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
export default CreateProfile;
