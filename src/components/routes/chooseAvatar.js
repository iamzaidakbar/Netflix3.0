import "../../styles/choose-avatar.scss";
import avatar1 from "../../assets/images/Avatars/avatar1.png";
import avatar2 from "../../assets/images/Avatars/avatar2.png";
import avatar3 from "../../assets/images/Avatars/avatar3.png";
import { useState } from "react";
import useFormValidation from "../../Utils/API/useValidations";
import { useNavigate } from "react-router";

const ChooseAvatar = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [name, setName] = useState("");
  const { errors, validateInput } = useFormValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
    if (name === "name") setName(value);
  };

  const updateProfile = () => {
    const profile = {
      displayName: name,
      avatar: selectedAvatar,
    };
    localStorage.setItem("user-profile", JSON.stringify(profile));
    navigate("/home");
  };

  return (
    <div className="choose-avatar">
      <label>Who is Watching?</label>
      {!selectedAvatar ? (
        <div className="select-profile">
          <img
            onClick={() => {
              setSelectedAvatar(avatar1);
            }}
            src={avatar1}
            width={160}
            height={160}
          />
          <img
            onClick={() => {
              setSelectedAvatar(avatar2);
            }}
            src={avatar2}
            width={160}
            height={160}
          />
          <img
            onClick={() => {
              setSelectedAvatar(avatar3);
            }}
            src={avatar3}
            width={160}
            height={160}
          />
        </div>
      ) : (
        <div className="update-profile">
          <img src={selectedAvatar} width={110} height={110} />
          <div className="update-display-name">
            <input
              style={{
                borderColor: errors.name && "red",
                outline: errors.name && "red",
              }}
              name="name"
              onChange={handleChange}
              value={name}
              type="text"
              placeholder="Name"
            />
            {errors.name && (
              <span className="error-message">
                <span className="material-icons-outlined">clear</span>
                <span className="message">{errors.name}</span>
              </span>
            )}
            <div className="actions">
              <button onClick={updateProfile} className="continue">
                Continue
              </button>
              <button
                onClick={() => {
                  setSelectedAvatar(null);
                }}
                className="cancel"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChooseAvatar;
