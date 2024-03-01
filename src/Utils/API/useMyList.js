import { useState } from "react";
import { auth, database, ref, get, set } from "../../Utils/firebase";

const useMyList = () => {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToMyList = async (movieData, profileKey) => {
    try {
      setLoading(true);

      const userID = auth.currentUser.uid;
      const myListRef = ref(
        database,
        `profiles/${userID}/userProfiles/${profileKey}/mylist`
      );

      const snapshot = await get(myListRef);
      const storedList = snapshot.val() || [];

      const isDuplicate = storedList.some((movie) => movie.id === movieData.id);

      if (!isDuplicate) {
        await set(myListRef, [...storedList, movieData]);
        setMyList([...storedList, movieData]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error adding movie to mylist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromMyList = async (movieId, profileKey) => {
    try {
      setLoading(true);

      if (!auth.currentUser || !profileKey) {
        // Handle the case when the user or profile is not authenticated
        return;
      }

      const userID = auth.currentUser.uid;
      const myListRef = ref(
        database,
        `profiles/${userID}/userProfiles/${profileKey}/mylist`
      );

      const snapshot = await get(myListRef);
      const storedList = snapshot.val() || [];

      const updatedList = storedList.filter((movie) => movie.id !== movieId);

      await set(myListRef, updatedList);
      setMyList(updatedList);
    } catch (error) {
      console.error("Error removing movie from mylist:", error);
    } finally {
      setLoading(false);
    }
  };

  return { myList, addToMyList, removeFromMyList, loading };
};

export default useMyList;
