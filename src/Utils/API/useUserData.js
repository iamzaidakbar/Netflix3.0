import { useState, useEffect } from "react";
import { auth, database, push } from "../../Utils/firebase";
import { ref, get, remove, set, push, update } from "firebase/database";

const useUserProfile = () => {
  const [currentProfileData, setCurrentProfileData] = useState(null);
  const [allProfilesData, setAllProfilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [componentChanged, setComponentChanged] = useState(false);

  // Function to set the current user manually with a specific profileKey
  const setCurrentUserManually = async (profileKey) => {
    const userID = auth.currentUser.uid;
    const userProfilesRef = ref(database, `profiles/${userID}/userProfiles`);

    try {
      const snapshot = await get(userProfilesRef);

      if (snapshot.exists()) {
        const profilesData = snapshot.val();
        const profilesArray = Object.values(profilesData);

        // Find the profile with the specified profileKey
        const selectedProfile = profilesArray.find(
          (profile) => profile.profileKey === profileKey
        );

        // Update the current profile data
        setCurrentProfileData(selectedProfile);

        // Set the current profileKey in localStorage
        localStorage.setItem("currentProfileID", profileKey);
      }
    } catch (error) {
      console.error("Error setting current user manually:", error);
    }

    setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
  };

  // Function to switch the current profile
  const switchProfile = async (profileKey) => {
    // Use the existing switchProfile logic
    setLoading(true);
    await setCurrentUserManually(profileKey); // Set the current user based on the selected profileKey
    setLoading(false);
  };

  // Function for deleting a user.
  const deleteProfile = async (profileKey) => {
    const userID = auth.currentUser.uid;
    const profileRef = ref(
      database,
      `profiles/${userID}/userProfiles/${profileKey}`
    );

    try {
      setLoading(true);
      await remove(profileRef);
      setLoading(false);
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  // Function to add a new profile
  const addProfile = async (profileDetails, flag = false) => {
    const userID = auth.currentUser.uid;
    const newProfileKey = push(
      ref(database, `profiles/${userID}/userProfiles`)
    ).key;

    try {
      setLoading(true);
      await set(
        ref(database, `profiles/${userID}/userProfiles/${newProfileKey}`),
        {
          ...profileDetails,
          profileKey: newProfileKey,
        }
      );
      if (flag) {
        await switchProfile(newProfileKey);
      }
      setLoading(false);
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
    } catch (error) {
      console.error("Error adding user profile:", error);
    }
  };

  // Function to update a user profile
  const updateProfile = async (profileKey, updatedDetails) => {
    const userID = auth.currentUser.uid;
    const profileRef = ref(
      database,
      `profiles/${userID}/userProfiles/${profileKey}`
    );

    try {
      setLoading(true);
      await update(profileRef, updatedDetails);
      setLoading(false);
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          const userID = user.uid;
          const userProfilesRef = ref(
            database,
            `profiles/${userID}/userProfiles`
          );

          try {
            const snapshot = await get(userProfilesRef);

            if (snapshot.exists()) {
              const profilesData = snapshot.val();
              const profilesArray = Object.values(profilesData);

              // Set all profiles data
              setAllProfilesData(profilesArray);

              // Get the profile key from localStorage
              const currentProfileKey =
                localStorage.getItem("currentProfileID");

              // Find the profile with the stored profileKey
              const currentProfile = profilesArray.find(
                (profile) => profile.profileKey === currentProfileKey
              );

              // Update the current profile data
              setCurrentProfileData(currentProfile);
            }
          } catch (error) {
            console.error("Error reading user profiles:", error);
          } finally {
            setLoading(false);
          }
        } else {
          console.error("User not authenticated!");
          setLoading(false);
        }
      },
      [componentChanged]
    ); // Include componentChanged in the dependency array

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, [componentChanged]);

  return {
    currentProfileData,
    allProfilesData,
    loading,
    switchProfile,
    deleteProfile,
    addProfile,
    updateProfile,
  };
};

export default useUserProfile;
