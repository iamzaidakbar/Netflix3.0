import { useState, useEffect } from "react";
import useUserProfile from "./useUserData";

const useVideoPlayed = () => {
  const [videoPlayed, setVideoPlayed] = useState([]);
  const { allProfilesData } = useUserProfile();
  const LOCAL_STORAGE_KEY = "userProfiles";

  useEffect(() => {
    if (!allProfilesData || allProfilesData.length === 0) return;

    const currentActiveUser = allProfilesData.find(profile => profile.isCurrentUser);
    if (!currentActiveUser) return;

    const currentUserVideoPlayed = currentActiveUser.video_played || [];
    setVideoPlayed(currentUserVideoPlayed);
  }, [allProfilesData]);

  const updateVideoPlayed = (updatedVideoPlayed) => {
    try {
      const profilesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const updatedProfilesData = { ...profilesData };

      const currentActiveUser = allProfilesData.find(profile => profile.isCurrentUser);
      const profileKey = currentActiveUser?.profileKey;
      let currentVideoPlayed = updatedProfilesData[profileKey]?.video_played || [];

      // Check if the updated video played entry already exists
      const existingIndex = currentVideoPlayed.findIndex(item => item.id === updatedVideoPlayed.id);
      if (existingIndex !== -1) {
        // Replace the existing entry with the updated one
        currentVideoPlayed[existingIndex] = updatedVideoPlayed;
      } else {
        // Add the updated entry if it doesn't exist
        currentVideoPlayed.push(updatedVideoPlayed);
      }

      updatedProfilesData[profileKey].video_played = currentVideoPlayed;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProfilesData));
      setVideoPlayed(currentVideoPlayed);
    } catch (error) {
      console.error("Error updating video played:", error);
    }
  };

  return { videoPlayed, updateVideoPlayed };
};

export default useVideoPlayed;
