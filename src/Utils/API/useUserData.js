import { useState, useEffect } from "react";
import { auth, database, push } from "../../Utils/firebase";
import { ref, get, remove, set, push } from "firebase/database";

const useUserProfile = () => {
  const [currentProfileData, setCurrentProfileData] = useState(null);
  const [allProfilesData, setAllProfilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [componentChanged, setComponentChanged] = useState(false);

  // Function to switch the current profile
  const switchProfile = async (profileKey) => {
    localStorage.setItem("currentProfileID", profileKey);
    setComponentChanged((prev) => !prev); // Toggle the state to trigger useEffect
  };

  // Function for deleting a user.
  const deleteProfile = async (profileKey) => {
    const userID = auth.currentUser.uid;
    const profileRef = ref(
      database,
      `profiles/${userID}/userProfiles/${profileKey}`
    );

    try {
      await remove(profileRef);
    } catch (error) {
      console.error("Error deleting user profile:", error);
    }
  };

  // Function to add a new profile
  const addProfile = async (profileDetails) => {
    const userID = auth.currentUser.uid;
    const newProfileKey = push(
      ref(database, `profiles/${userID}/userProfiles`)
    ).key;

    try {
      await set(
        ref(database, `profiles/${userID}/userProfiles/${newProfileKey}`),
        {
          ...profileDetails,
          profileKey: newProfileKey,
        }
      );
      setComponentChanged((prev) => !prev); // Trigger useEffect to update profiles
    } catch (error) {
      console.error("Error adding user profile:", error);
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
  };
};

export default useUserProfile;
