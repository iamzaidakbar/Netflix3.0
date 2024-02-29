import { useNavigate } from "react-router";
import "../../styles/select-profile.scss";
import useUserProfile from "../../Utils/API/useUserData";
import { useEffect, useMemo } from "react";

const SelectProfile = () => {
  const navigate = useNavigate();
  const { currentProfileData, allProfilesData, switchProfile, loading } =
    useUserProfile();

    useEffect(()=>{
      document.title = "Select Profile - Netflix";
    },[])

  const memoizedProfiles = useMemo(() => {
    return allProfilesData?.map((profile) => (
      <div
        key={profile.displayName}
        className="profile"
        onClick={() => handleProfileClick(profile)}
      >
        <img
          width={150}
          height={150}
          src={profile.photoURL}
          alt={profile.displayName}
        />
        <p>{profile.displayName}</p>
      </div>
    ));
  }, [allProfilesData, currentProfileData]);

  const loggedInUser = currentProfileData && (
    <div className="current_user">
      <span
        onClick={() => {
          navigate("/home");
        }}
        className="material-icons-outlined arrow-back"
      >
        arrow_back
      </span>
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
    </div>
  );

  const handleProfileClick = async (profile) => {
    await switchProfile(profile.profileKey);
    navigate("/home");
  };

  if (loading) return <div id="loader" className="nfLoader"></div>;

  return (
    <>
      {loggedInUser}
      <div className="select-profile">
        <label>Who is Watching?</label>
        <div className="profiles-container">{memoizedProfiles}</div>
      </div>
    </>
  );
};

export default SelectProfile;
