import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Slices/userSlice";
import { LOCAL_STORAGE_KEY } from "../constants";

const useUserProfile = () => {
  const dispatch = useDispatch()
  const [allProfilesData, setAllProfilesData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [componentChanged, setComponentChanged] = useState(false);


  // Function to fetch all user profiles
  const fetchAllUsersProfiles = () => {
    try {
      setLoading(true)
      const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const profilesArray = Object.values(profilesData);
      setAllProfilesData(profilesArray);
      updateCurrentUserData() // Update current user after fetching profiles
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching all user profiles:", error);
    }
  };

  // Function to set the current user manually with a specific profileKey
  const setCurrentUserManually = (profileKey) => {
    try {
      localStorage.setItem("currentProfileID", profileKey);
    } catch (error) {
      console.error("Error setting current user manually:", error);
    }

    setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
  };

  // Function to switch the current profile
  const switchProfile = (profileKey) => {
    setLoading(true);
    setCurrentUserManually(profileKey); // Set the current user based on the selected profileKey

    const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    const updatedProfilesData = { ...profilesData };

    // Update isCurrentUser property for all profiles
    Object.keys(updatedProfilesData).forEach((key) => {
      updatedProfilesData[key].isCurrentUser = key === profileKey;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProfilesData));

    setAllProfilesData(Object.values(updatedProfilesData)); // Update allProfilesData state
    fetchAllUsersProfiles()
    setLoading(false);
    setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
  };

  // Function for deleting a user profile
  const deleteProfile = (profileKey) => {
    try {
      const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      delete profilesData[profileKey];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profilesData));
      fetchAllUsersProfiles()
      setLoading(false);
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  // Function to add a new profile
  const addProfile = (profileDetails, flag = false) => {
    try {
      const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const newProfileKey = `profile_${Date.now()}`;
      profilesData[newProfileKey] = {
        ...profileDetails,
        profileKey: newProfileKey,
        mylist: [],
        user_notifications: [],
        video_played: [],
        recently_played: [],
        isCurrentUser: flag,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profilesData));
      if (flag) {
        switchProfile(newProfileKey);
      }
      fetchAllUsersProfiles()
      setLoading(false);
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
      dispatch(addUser(profileDetails));

      // Store the current profile key in localStorage
      localStorage.setItem("currentProfileID", newProfileKey);
    } catch (error) {
      console.error("Error adding user profile:", error);
    }
  };

  const updateProfile = (profileKey, updatedDetails) => {
    console.log(updatedDetails, 'api')
    try {
      const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      profilesData[profileKey] = {
        ...profilesData[profileKey],
        ...updatedDetails
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profilesData));
      fetchAllUsersProfiles()
      console.log("Profile updated successfully");
      setLoading(false);
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
    } catch (error) {
      console.error("Error updating user profile:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };


  // Function to update current user after fetching profiles
  const updateCurrentUserData = () => {
    try {
      const currentProfile = allProfilesData?.find(
        (profile) => profile.isCurrentUser
      );
      setCurrentUser(currentProfile)
      localStorage.setItem('currentUser', JSON.stringify(currentProfile));
    } catch (error) {
      console.error("Error updating current user:", error);
    }
  }

  const getCurrentUser = () => {
    fetchAllUsersProfiles()
    return currentUser
  }


  useEffect(() => {
    fetchAllUsersProfiles();

  }, [componentChanged, loading]);

  return {
    fetchAllUsersProfiles,
    allProfilesData,
    loading,
    switchProfile,
    deleteProfile,
    addProfile,
    updateProfile,
    getCurrentUser,
    currentUser,
    componentChanged
  };
};

export default useUserProfile;
