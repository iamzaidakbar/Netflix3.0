import React, { useEffect, useMemo, useState } from "react";
import VideoCard from "../common/videoCard";
import "../../styles/home.scss";
import "../../styles/carousel.scss";
import useFetchMovies from "../../Utils/API/useFetchMovies";
import { useSelector } from "react-redux";
import useFetchAnime from "../../Utils/API/useFetchAnime";
import useFetchTopRated from "../../Utils/API/useFetchTopRated";
import { Carousel } from "@trendyol-js/react-carousel";
import VCard from "../common/v-card";
import useDeviceType from "../../Utils/API/useDevicetype";
import usePageNavigation from "../../Utils/API/usePageNavigation";
import Footer from "../common/footer";

const Home = () => {
  const fetchMovies = useFetchMovies();
  const fetchAnime = useFetchAnime();
  const fetchTopRated = useFetchTopRated();
  const [showSlides, setShowSlides] = useState(5.5);
  const deviceType = useDeviceType();
  const navigatePage = usePageNavigation();
  const myListVideos = useSelector((store) => store?.myList?.myListVideos);

  useEffect(() => {
    document.title = "Home - Netflix";

    fetchMovies();
    fetchAnime();
    fetchTopRated();
  }, []);

  useEffect(() => {
    if (deviceType === "laptop") setShowSlides(5.5);
    if (deviceType === "desktop") setShowSlides(6);
    if (deviceType === "tablet") setShowSlides(3);
    if (deviceType === "mobile") setShowSlides(1);
  }, [deviceType]);

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

  const topRatedCarouselItems = top10?.map((item, index) => (
    <VCard
      key={item?.id}
      flag={true}
      data={item}
      img_url={item?.backdrop_path}
    />
  ));

  const moviesCarouselItems = movies?.map((movie, index) => (
    <VCard
      key={movie?.id}
      flag={false}
      data={movie}
      img_url={movie?.backdrop_path}
    />
  ));

  const animeCarouselItems = anime?.map((animeItem, index) => (
    <VCard
      key={animeItem?.id}
      flag={false}
      data={animeItem}
      img_url={animeItem?.backdrop_path}
    />
  ));

  const myListItems = myListVideos?.map((myList, index) => (
    <VCard
      key={myList?.id}
      flag={false}
      data={myList}
      img_url={myList?.backdrop_path}
    />
  ));

  const carouselConfig = {
    useArrowKeys: true,
    responsive: true,
    show: showSlides,
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

  const memoizedCarousel = useMemo(() => {
    if (!topRatedCarouselItems) return <h2>Loading...</h2>;

    return <Carousel children={topRatedCarouselItems} {...carouselConfig} />;
  }, [deviceType, topRatedCarouselItems]);

  const memoizedMoviesCarousel = useMemo(() => {
    if (!moviesCarouselItems) return <h2>Loading...</h2>;

    return <Carousel children={moviesCarouselItems} {...carouselConfig} />;
  }, [deviceType, moviesCarouselItems]);

  const memoizedAnimeCarousel = useMemo(() => {
    if (!animeCarouselItems) return <h2>Loading...</h2>;

    return <Carousel children={animeCarouselItems} {...carouselConfig} />;
  }, [deviceType, animeCarouselItems]);

  const memoizedMyListCarousel = useMemo(() => {
    if (!myListItems) return <h2>Loading...</h2>;

    return <Carousel children={myListItems} {...carouselConfig} />;
  }, [deviceType, myListItems]);

  return (
    <div id="home" className="home">
      <div className="main-menu">{memoizedVideoCard}</div>

      <div className="sections">
        <span className="top10">
          <label className="label">Top 10</label>
          {memoizedCarousel}
        </span>
        <span className="movies">
          <label className="label">Popular Movies</label>
          {memoizedMoviesCarousel}
        </span>
        <span className="anime">
          <label className="label">Popular Anime</label>
          {memoizedAnimeCarousel}
        </span>
        {myListVideos.length > 6 && (
          <span className="mylist">
            <label className="label">
              My List
              <small
                onClick={() => {
                  navigatePage("/mylist");
                }}
                style={{
                  fontSize: "13px",
                  left: "8px",
                  top: "-4px",
                  position: "relative",
                  color: "skyblue",
                  cursor: "pointer",
                }}
              >
                Explore More{" "}
                <span
                  style={{ fontSize: "10px" }}
                  className="material-icons-outlined"
                >
                  arrow_forward_ios
                </span>
                <span
                  style={{ fontSize: "10px" }}
                  className="material-icons-outlined"
                >
                  arrow_forward_ios
                </span>
              </small>
            </label>
            {memoizedMyListCarousel}
          </span>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
