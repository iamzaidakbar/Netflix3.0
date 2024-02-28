import { useState, useEffect } from "react";
import { auth, database } from "../../Utils/firebase";
import { ref, get } from "firebase/database";

const useUserProfile = () => {
  const [currentProfileData, setCurrentProfileData] = useState(null);
  const [allProfilesData, setAllProfilesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to switch the current profile
  const switchProfile = async (profileKey) => {
    localStorage.setItem("currentProfileID", profileKey);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
            const currentProfileKey = localStorage.getItem("currentProfileID");

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
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, []);

  return { currentProfileData, allProfilesData, loading, switchProfile };
};

export default useUserProfile;
