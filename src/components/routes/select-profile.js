import { useNavigate } from "react-router";
import "../../styles/select-profile.scss";
import useUserProfile from "../../Utils/API/useUserData";
import { useDispatch } from "react-redux";

const SelectProfile = () => {
  const navigate = useNavigate();
  const { currentProfileData, allProfilesData, switchProfile, loading } =
    useUserProfile();

  if (loading) return <div id="loader" className="nfLoader"></div>;

  return (
    <div className="select-profile">
      <label>Who is Watching?</label>
      <div className="profiles-container">
        {currentProfileData && (
          <div
            key={currentProfileData.displayName}
            className="profile current_user"
          >
            <img
              width={150}
              height={150}
              src={currentProfileData.photoURL}
              alt={currentProfileData.displayName}
            />
            <small>Logged in as {currentProfileData.displayName}</small>
          </div>
        )}
        {allProfilesData?.map((profile) => (
          <div
            key={profile.displayName}
            className="profile"
            onClick={() => {
              switchProfile(profile.profileKey);
              navigate("/home");
            }}
          >
            <img
              width={200}
              height={200}
              src={profile.photoURL}
              alt={profile.displayName}
            />
            <p>{profile.displayName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectProfile;
