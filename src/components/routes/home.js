import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Carousel } from "@trendyol-js/react-carousel";
import { useSelector } from "react-redux";
import { genre_details } from "../../Utils/constants";
import usePageNavigation from "../../Utils/API/usePageNavigation";
import useFetchTopRated from "../../Utils/API/useFetchTopRated";
import useFetchMovies from "../../Utils/API/useFetchMovies";
import makeApiRequest from "../../Utils/API/useFetchGenre";
import useFetchAnime from "../../Utils/API/useFetchAnime";
import useDeviceType from "../../Utils/API/useDevicetype";
import VideoCard from "../common/videoCard";
import VCard from "../common/v-card";
import Footer from "../common/footer";
import "../../styles/carousel.scss";
import "../../styles/home.scss";
import useMyList from "../../Utils/API/useMyList";

const Home = () => {
  const fetchMovies = useFetchMovies();
  const fetchAnime = useFetchAnime();
  const fetchTopRated = useFetchTopRated();
  const [showSlides, setShowSlides] = useState(5.5);
  const deviceType = useDeviceType();
  const navigatePage = usePageNavigation();
  const [getItOnAction, setGettOnAction] = useState();
  const navigate = useNavigate();
  const { myList } = useMyList();

  useEffect(() => {
    document.title = "Home - Netflix";

    async function fetchGetItOnAction() {
      const response = await makeApiRequest(genre_details["action"]);
      setGettOnAction(response);
    }

    fetchMovies();
    fetchAnime();
    fetchTopRated();
    fetchGetItOnAction();
  }, []);

  useEffect(() => {
    if (deviceType === "desktop") setShowSlides(6);
    if (deviceType === "laptop") setShowSlides(5.5);
    if (deviceType === "tablet") setShowSlides(3);
    if (deviceType === "mobile") setShowSlides(2);
  }, [deviceType]);

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const anime = useSelector((store) => store.anime?.animeVideos);
  const top10 = useSelector((store) => store?.topRated?.topRatedVideos);
  const recently_played = JSON.parse(localStorage.getItem("video_played"));

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

  const myListItems = myList?.map((myList, index) => (
    <VCard
      key={myList?.id}
      flag={false}
      data={myList}
      img_url={myList?.backdrop_path}
    />
  ));

  const actionCarouselItems = getItOnAction?.map((action, index) => (
    <VCard
      key={action?.id}
      flag={false}
      data={action}
      img_url={action?.backdrop_path}
    />
  ));

  const recentlyplayed = recently_played?.map((recently_played) => (
    <VCard
      key={recently_played?.data?.id}
      flag={false}
      data={recently_played?.data}
      img_url={recently_played?.data?.backdrop_path}
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

  const memoizedActionCarousel = useMemo(() => {
    if (!actionCarouselItems) return <h2>Loading...</h2>;

    return <Carousel children={actionCarouselItems} {...carouselConfig} />;
  }, [deviceType, actionCarouselItems]);

  const memoizedMyListCarousel = useMemo(() => {
    if (!myListItems) return <h2>Loading...</h2>;

    return <Carousel children={myListItems} {...carouselConfig} />;
  }, [deviceType, myListItems]);

  const memoizedRecentlyPlayedCarousel = useMemo(() => {
    if (!recentlyplayed) return <h2>Loading...</h2>;

    return <Carousel children={recentlyplayed} {...carouselConfig} />;
  }, [deviceType, recentlyplayed]);

  return (
    <div id="home" className="home">
      <div className="h-main-menu">{memoizedVideoCard}</div>

      <div className="h-sections">
        {recentlyplayed && recentlyplayed?.length > 6 &&(
          <span className="recently-played">
            <label className="h-label">Recently Played</label>
            {memoizedRecentlyPlayedCarousel}
          </span>
        )}
        <span
          className="top10"
        >
          <label className="h-label">Top 10</label>
          {memoizedCarousel}
        </span>
        <span className="movies">
          <label className="h-label">Popular Movies</label>
          {memoizedMoviesCarousel}
        </span>
        <span className="anime">
          <label className="h-label">Popular Anime</label>
          {memoizedAnimeCarousel}
        </span>
        <span className="action">
          <label className="h-label">
            Get It On Action
            <small
              onClick={() => {
                navigate("/genre");
              }}
              className="h-explore_more"
            >
              Explore All Genre &#62;
            </small>
          </label>
          {memoizedActionCarousel}
        </span>
        {myList.length > 6 && (
          <span className="mylist">
            <label className="h-label">
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
                Explore More
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
