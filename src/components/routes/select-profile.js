import { useNavigate } from "react-router";
import "../../styles/select-profile.scss";
import useUserProfile from "../../Utils/API/useUserData";

const SelectProfile = () => {
  const navigate = useNavigate();
  const {
    currentProfileData,
    allProfilesData,
    switchProfile,
    deleteProfile,
    loading,
  } = useUserProfile();

  if (loading) return <div id="loader" className="nfLoader"></div>;

  console.log(currentProfileData);

  const handleProfileClick = async (e, profile) => {
    e.preventDefault();

    await switchProfile(profile.profileKey);
    navigate("/home");
  };

  const handleDeleteProfile = async (e, profileKey) => {
    e.preventDefault();

    await deleteProfile(profileKey);
  };

  const loggerInUser = (
    <div className="current_user">
      <span
        onClick={() => {
          navigate("/home");
        }}
        className="material-icons-outlined arrow-back"
      >
        arrow_back
      </span>
      {currentProfileData && (
        <div className="current_user_profile">
          <img
            width={50}
            height={50}
            src={currentProfileData.photoURL}
            alt={currentProfileData.displayName}
          />
          <span className="current_user_name">
            {currentProfileData.displayName}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {loggerInUser}
      <div className="select-profile">
        <label>Who is Watching?</label>
        <div className="profiles-container">
          {allProfilesData?.map((profile) => (
            <div
              key={profile.displayName}
              className="profile"
              onClick={() => handleProfileClick(event, profile)}
            >
              <img
                width={150}
                height={150}
                src={profile.photoURL}
                alt={profile.displayName}
              />
              <p>{profile.displayName}</p>
              {currentProfileData?.profileKey != profile.profileKey ? (
                <span
                  onClick={() => handleDeleteProfile(event, profile.profileKey)}
                  className="material-icons-outlined delete-icon"
                >
                  delete
                </span>
              ) : (
                <span className="material-icons-outlined user-icon">
                  person
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectProfile;
