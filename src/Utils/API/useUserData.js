import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Slices/userSlice";

const useUserProfile = () => {
  const dispatch = useDispatch()
  const [allProfilesData, setAllProfilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [componentChanged, setComponentChanged] = useState(false);

  const LOCAL_STORAGE_KEY = "userProfiles";

  // Function to fetch all user profiles
  const fetchAllUsersProfiles = () => {
    try {
      const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const profilesArray = Object.values(profilesData);
      setAllProfilesData(profilesArray);
    } catch (error) {
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

    setLoading(false);
    setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
  };


  // Function for deleting a user profile
  const deleteProfile = (profileKey) => {
    try {
      const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      delete profilesData[profileKey];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profilesData));
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
      setLoading(false);
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
      dispatch(addUser(profileDetails));

      // Store the current profile key in localStorage
      localStorage.setItem("currentProfileID", newProfileKey);
    } catch (error) {
      console.error("Error adding user profile:", error);
    }
  };

  // Function to update a user profile
  const updateProfile = (profileKey, updatedDetails) => {
    try {
      const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      profilesData[profileKey] = {
        ...profilesData[profileKey],
        ...updatedDetails
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profilesData));
      setLoading(false);
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    fetchAllUsersProfiles(); // Fetch all user profiles
    setLoading(false); // Move setLoading(false) outside of the try-catch block

    // Get the profile key from localStorage
    const currentProfileKey = localStorage.getItem("currentProfileID");

    // Find the profile with the stored profileKey
    const currentProfile = allProfilesData.find(
      (profile) => profile.profileKey === currentProfileKey
    );

  }, [componentChanged]); // Remove allProfilesData from the dependency array


  return {
    allProfilesData,
    loading,
    switchProfile,
    deleteProfile,
    addProfile,
    updateProfile,
  };
};

export default useUserProfile;
