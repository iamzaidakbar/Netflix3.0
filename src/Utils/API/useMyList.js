import { useState, useEffect } from "react";

const useMyList = () => {
  const [myList, setMyList] = useState(
    JSON.parse(localStorage.getItem("my_list")) || []
  );

  useEffect(() => {
    // Periodically check for updates in local storage
    const intervalId = setInterval(() => {
      // Retrieve the list from localStorage on component mount
      const storedList = JSON.parse(localStorage.getItem("my_list")) || [];
      setMyList(storedList);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const addToMyList = (movieData) => {
    // Get existing list from localStorage or initialize an empty array
    const existingList = JSON.parse(localStorage.getItem("my_list")) || [];

    // Check if the movie with the same ID already exists in the list
    const isDuplicate = existingList.some((movie) => movie.id === movieData.id);

    if (!isDuplicate) {
      // Add the movieData to the list
      existingList.push(movieData);

      // Save the updated list to localStorage
      localStorage.setItem("my_list", JSON.stringify(existingList));

      // Update the state to trigger a re-render
      setMyList(existingList);
    }
  };

  const removeFromMyList = (movieId) => {
    console.log(movieId);
    // Filter out the movie with the specified ID
    console.log(myList);
    const updatedList = myList.filter((movie) => movie.id !== movieId);
    console.log(updatedList);

    // Save the updated list to localStorage
    localStorage.setItem("my_list", JSON.stringify(updatedList));

    // Update the state to trigger a re-render
    setMyList(updatedList);
  };

  return { myList, addToMyList, removeFromMyList };
};

export default useMyList;
