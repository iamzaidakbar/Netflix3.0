import React, { useEffect, useMemo } from "react";
import VideoCard from "../common/videoCard";
import "../../styles/home.scss";
import List from "../common/list";
import useFetchMovies from "../../Utils/API/useFetchMovies";
import { useSelector } from "react-redux";

const Home = () => {
  const fetchMovies = useFetchMovies();

  useEffect(() => {
    fetchMovies();
  }, []);

  const movies = useSelector((store) => {
    return store.movies?.nowPlayingMovies;
  });

  // Memoize the VideoCard component
  const memoizedVideoCard = useMemo(() => {
    if (!movies || movies.length === 0) {
      return <h2>Loading...</h2>; // Handle the case where movies is undefined or an empty array
    }

    // Generate a random index within the movies array
    const randomIndex = Math.floor(Math.random() * movies.length);

    const { original_title, overview, id } = movies[randomIndex];

    return (
      <VideoCard videoId={id} title={original_title} description={overview} />
    );
  }, [movies]);

  return (
    <div className="home">
      <div className="main-menu">{memoizedVideoCard}</div>

      <div className="sections">
        <List data={movies} title="Trending Now" />
        <List data={movies} title="Movies" />
      </div>
    </div>
  );
};

export default Home;
