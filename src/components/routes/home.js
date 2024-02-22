import React, { useEffect, useMemo } from "react";
import VideoCard from "../common/videoCard";
import "../../styles/home.scss";
import "../../styles/carousel.scss";
import useFetchMovies from "../../Utils/API/useFetchMovies";
import { useSelector } from "react-redux";
import useFetchAnime from "../../Utils/API/useFetchAnime";
import logo from "../../assets/logo/netflix-logo.png";
import { Github, Instagram, Linkedin, Facebook } from "react-bootstrap-icons";
import useFetchTopRated from "../../Utils/API/useFetchTopRated";
import { Carousel } from "@trendyol-js/react-carousel";
import VCard from "../common/v-card";

const Home = () => {
  const fetchMovies = useFetchMovies();
  const fetchAnime = useFetchAnime();
  const fetchTopRated = useFetchTopRated();

  useEffect(() => {
    document.title = "Home - Netflix";

    fetchMovies();
    fetchAnime();
    fetchTopRated();
  }, []);

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const anime = useSelector((store) => store.anime?.animeVideos);
  const top10 = useSelector((store) => store?.topRated?.topRatedVideos);

  const memoizedVideoCard = useMemo(() => {
    if (!movies || !anime || !top10) {
      return <h2>Loading...</h2>;
    }

    const randomIndex = Math.floor(Math.random() * movies.length);
    const { original_title, overview, id } = movies[randomIndex];

    return (
      <VideoCard videoId={id} title={original_title} description={overview} />
    );
  }, [movies, anime, top10]);

  const carouselItems = top10?.map((item, index) => (
    <VCard
      key={item?.id}
      flag={true}
      data={item}
      img_url={item?.backdrop_path}
    />
  ));

  const carouselConfig = {
    useArrowKeys: true,
    responsive: true,
    show: 5.5,
    slide: 2,
    swiping: true,
    dynamic: true,
    leftArrow: (
      <span className="material-icons-outlined scroll-back">arrow_back</span>
    ),
    rightArrow: (
      <span className="material-icons-outlined scroll-forward">
        arrow_forward
      </span>
    ),
    className: "custom-carousel",
  };

  return (
    <div id="home" className="home">
      <div className="main-menu">{memoizedVideoCard}</div>

      <div className="sections">
        <span className="top10">
          <label className="label">Top 10</label>
          {carouselItems && (
            <Carousel children={carouselItems} {...carouselConfig} />
          )}
        </span>
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
