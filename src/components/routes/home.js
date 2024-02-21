import React, { useEffect, useMemo } from "react";
import VideoCard from "../common/videoCard";
import "../../styles/home.scss";
import List from "../common/list";
import useFetchMovies from "../../Utils/API/useFetchMovies";
import { useSelector } from "react-redux";
import useFetchAnime from "../../Utils/API/useFetchAnime";
import logo from "../../assets/logo/netflix-logo.png";
import { Github, Instagram, Linkedin, Facebook } from "react-bootstrap-icons";

const Home = () => {
  const fetchMovies = useFetchMovies();
  const fetchAnime = useFetchAnime();

  useEffect(() => {
    document.title = "Home - Netflix";

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
    { title: "Top 10", data: movies, fetch: fetchMovies, flag: true },
    { title: "Trending Now", data: movies, fetch: fetchMovies, flag: false },
    { title: "Anime", data: anime, fetch: fetchAnime, flag: false },
    // Add more categories as needed
  ];

  return (
    <div id="home" className="home">
      <div className="main-menu">{memoizedVideoCard}</div>

      <div className="sections">
        {categories.map(({ title, data, fetch, flag }) => (
          <List
            key={title}
            data={data}
            title={title}
            fetch={fetch}
            flag={flag}
          />
        ))}
      </div>
      <div className="footer">
        <div className="social">
          <span className="links">
            <a
              target="_blank"
              href="https://www.facebook.com/zaidakbarwani/"
              className="fb"
            >
              <Facebook color="white" size={25} />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/1amzaidakbar/"
              className="insta"
            >
              <Instagram color="white" size={25} />
            </a>
            <a
              target="_blank"
              href="https://github.com/iamzaidakbar"
              className="github"
            >
              <Github color="white" size={25} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/zaidakbar/"
              className="linkedin"
            >
              <Linkedin color="white" size={25} />
            </a>
          </span>
          <span className="creator">
            created by <i>Zaid Akbar</i>
          </span>
        </div>
        <span className="line"></span>
        <div className="netflix">
          <img src={logo} width={200} />
        </div>
      </div>
    </div>
  );
};

export default Home;
