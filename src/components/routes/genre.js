import "../../styles/genre.scss";
import "../../styles/carousel.scss";
import { useEffect, useState, useMemo } from "react";
import makeApiRequest from "../../Utils/API/useFetchGenre";
import { genre_details, genre_names } from "../../Utils/constants";
import { Carousel } from "@trendyol-js/react-carousel";
import VCard from "../common/v-card";
import Footer from "../common/footer";
import useDeviceType from "../../Utils/API/useDevicetype";
import useScroll from "../../Utils/useScroll";
import { useNavigate } from "react-router";

const Genre = () => {
  const [showSlides, setShowSlides] = useState(5.5);
  const deviceType = useDeviceType();
  const [genreData, setGenreData] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const scrolled = useScroll();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const genreDataPromises = Object.entries(genre_details).map(
        async ([genreKey, genreId]) => {
          const response = await makeApiRequest(genreId);
          return { [genreKey]: response };
        }
      );

      try {
        const genreResponses = await Promise.all(genreDataPromises);
        const mergedGenreData = Object.assign({}, ...genreResponses);
        setGenreData(mergedGenreData);
      } catch (error) {
        console.error("Error fetching genre data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (deviceType === "laptop") setShowSlides(5.5);
    if (deviceType === "desktop") setShowSlides(6);
    if (deviceType === "tablet") setShowSlides(3);
    if (deviceType === "mobile") setShowSlides(2);
  }, [deviceType]);

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

  const memoizedMyGenreCarousel = useMemo(() => {
    const genreCards = Object.entries(genreData).map(
      ([genreKey, genreVideos]) => (
        <div key={genreKey} className="genre-section">
          <label className="genre-label">
            {genreVideos ? genreKey.replace(/_/g, " ") : ""}
          </label>
          <Carousel
            children={genreVideos.map((data) => (
              <VCard key={data.id} data={data} flag={false} />
            ))}
            {...carouselConfig}
          />
        </div>
      )
    );

    return <div className="Genre">{genreCards}</div>;
  }, [genreData, carouselConfig]);

  return (
    <div className="Genre-wrapper">
      <span className="g-label-wrapper">
        <label className="g-label">Genre</label>
        <button
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
          className="g-dropdown-button"
        >
          <span>Genres</span>
          <span className="material-icons-outlined">expand_more</span>
        </button>
        {showDropdown && (
          <span className="g-dropdown-list">
            {Object.entries(genre_details).map(([genreKey, genreId]) => (
              <ul key={genreKey}>
                <li onClick={() => navigate(`/explore/genre/${genreId}`)}>
                  {genre_names[genreId]}
                </li>
              </ul>
            ))}
          </span>
        )}
      </span>
      {memoizedMyGenreCarousel}
      <Footer />
    </div>
  );
};

export default Genre;
