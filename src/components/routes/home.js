import React, { useEffect, useMemo } from "react";
import VideoCard from "../common/videoCard";
import "../../styles/home.scss";
import List from "../common/list";
import useFetchMovies from "../../Utils/API/useFetchMovies";
import { useSelector } from "react-redux";
import useFetchAnime from "../../Utils/API/useFetchAnime";

const Home = () => {
  const fetchMovies = useFetchMovies();
  const fetchAnime = useFetchAnime();

  useEffect(() => {
    document.title = 'Home - Netflix';

    fetchMovies();
    fetchAnime();
  }, []);

  const movies = useSelector((store) => {
    return store.movies?.nowPlayingMovies;
  });
  const anime = useSelector((store) => store.anime?.animeVideos);

  // Memoize the VideoCard component
  const memoizedVideoCard = useMemo(() => {
    if (!movies || !anime) {
      return <h2>Loading...</h2>; // Handle the case where movies is undefined or an empty array
    }

    // Generate a random index within the movies array
    const randomIndex = Math.floor(Math.random() * movies.length);

    const { original_title, overview, id } = movies[randomIndex];

    return (
      <VideoCard videoId={id} title={original_title} description={overview} />
    );
  }, [movies, anime]);

  // Define categories and corresponding API calls
  const categories = [
    { title: "Trending Now", data: movies, fetch: fetchMovies },
    { title: "Anime", data: anime, fetch: fetchAnime },
    // Add more categories as needed
  ];

  return (
    <div id="home" className="home">
      <div className="main-menu">{memoizedVideoCard}</div>

      <div className="sections">
        {categories.map(({ title, data, fetch }) => (
          <List key={title} data={data} title={title} fetch={fetch} />
        ))}
      </div>
    </div>
  );
};

export default Home;
