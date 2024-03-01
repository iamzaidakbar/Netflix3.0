import { useState, useEffect } from "react";
import { auth, database, ref, get, onValue, set } from "../../Utils/firebase";

const useVideoPlayed = (profileKey) => {
  const [videoPlayed, setVideoPlayed] = useState([]);

  useEffect(() => {
    const userID = auth.currentUser?.uid;
    const videoPlayedRef = ref(
      database,
      `profiles/${userID}/userProfiles/${profileKey}/video_played`
    );

    const fetchVideoPlayed = async () => {
      try {
        const snapshot = await get(videoPlayedRef);
        const videoPlayedList = snapshot.val() || [];
        setVideoPlayed(videoPlayedList);
      } catch (error) {
        console.error("Error fetching video_played from Firebase:", error);
      }
    };

    fetchVideoPlayed();

    const listener = onValue(videoPlayedRef, () => {
      fetchVideoPlayed();
    });

    return () => {
      listener();
    };
  }, [profileKey]);

  const updateVideoPlayed = async (videoPlayedData) => {
    try {
      // Assuming videoPlayedData has a structure like { id, played }
      const existingIndex = videoPlayed.findIndex(
        (item) => item.id === videoPlayedData.id
      );

      if (existingIndex !== -1) {
        // If the item exists, update the played state
        videoPlayed[existingIndex].played = videoPlayedData.played;
      } else {
        // If the item doesn't exist, add it to the array
        videoPlayed.push(videoPlayedData);
      }

      // Update the "video_played" in the database
      const userID = auth.currentUser.uid;
      const videoPlayedRef = ref(
        database,
        `profiles/${userID}/userProfiles/${profileKey}/video_played`
      );
      await set(videoPlayedRef, videoPlayed);
    } catch (error) {
      console.error("Error updating video_played:", error);
    }
  };

  return { videoPlayed, updateVideoPlayed };
};

export default useVideoPlayed;
