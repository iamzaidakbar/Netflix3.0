import { Link, useNavigate } from "react-router-dom";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";
import "../../styles/smallVideoCard.scss";
import ReactPlayer from "react-player";
import { useState, useRef, useMemo, useEffect } from "react";
import useFetchShortMovieTrailer from "../../Utils/API/useShortMovieTrailer";
import useGenre from "../../Utils/API/useGenre";
import { addMovieTrailerDetails } from "../../Utils/Slices/movieTrailerSlice";
import { useDispatch } from "react-redux";
import useDeviceType from "../../Utils/API/useDevicetype";

const SmallVideoCard = ({ item }) => {
  const [isActive, setIsActive] = useState(false);
  const [trailers, setTrailers] = useState(false);
  const [mediaStarted, setMediaStarted] = useState(false);
  const [mute, setMute] = useState(true);
  const timerRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deviceType = useDeviceType();

  const fetchShortMovieTrailers = useFetchShortMovieTrailer();

  const { original_title, genre_ids, backdrop_path, id } = item;

  const genre = useGenre(genre_ids);

  const handleSize = (deviceType) => {
    if (deviceType === "mobile") {
      return "100%";
    } else if (deviceType === "tablet") {
      return "190px";
    } else if (deviceType === "laptop") {
      return "250px";
    } else if (deviceType === "desktop") {
      return "300px";
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  function handleMouseOver(e) {
    clearTimeout(timerRef.current);
    e.stopPropagation();

    timerRef.current = setTimeout(() => {
      fetchShortMovieTrailers(id).then((fetchedTrailers) => {
        setTrailers(fetchedTrailers);
      });
      setIsActive(true);
    }, 1000);
  }

  function handleMouseLeave(e) {
    setIsActive(false);
    e.stopPropagation();

    clearTimeout(timerRef.current);
  }

  const handleMuteToggle = () => {
    setMute(!mute);
  };

  // Memoize the VideoCard component
  const memoizedReactPlayer = useMemo(() => {
    if (!trailers) {
      return null; // Handle the case where trailers is undefined or an empty array
    }

    const trailer = trailers.filter((item) => item.type === "Trailer");

    return (
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        fallback={<h2>Loading....</h2>}
        volume={1}
        playing={true}
        muted={mute}
        controls={false}
        light={true}
        url={VIDEO_URL + trailer[0]?.key}
        onStart={() => {
          setMediaStarted(true);
        }}
        onEnded={() => {
          setMediaStarted(false);
        }}
        style={{ scale: "1.4" }}
        playIcon={<span className="material-icons-outlined"></span>}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              modestbranding: 1,
              playsinline: 1,
              controls: 0,
              fs: 0,
              rel: 0,
              quality: "hd1080",
            },
          },
        }}
      />
    );
  }, [trailers, mute]);

  function animatePage() {
    const root = document.getElementById("home");
    if (root) {
      root.style.transition = "transform 3s";
      root.style.opacity = "1";
      root.style.transform = "scale(1)";

      // Trigger reflow
      root.offsetWidth;

      root.style.transform = "scale(1.2)";
      root.style.opacity = "0.7";
    }
  }

  function navigatePage() {
    navigate("/browse/" + id);
  }

  function handleNavigate() {
    dispatch(addMovieTrailerDetails(item));
    localStorage.setItem("movieDetails", JSON.stringify(item));
    animatePage();

    // Delay the navigation by 2 seconds
    setTimeout(() => {
      navigatePage();
    }, 2000);
  }

  return (
    <>
      <Link
        onMouseOver={handleMouseOver}
        className={`card ${isActive ? "active" : ""}`}
        style={{ width: handleSize(deviceType) }}
      >
        <span className="line"></span>
        <img
          onMouseLeave={isActive ? () => {} : handleMouseLeave}
          src={TMDB_IMG_URL + backdrop_path}
          style={{ width: handleSize(deviceType) }}
          alt="Thumbnail"
        />
      </Link>

      <div
        onMouseLeave={handleMouseLeave}
        className={`smallVideoCard ${isActive ? "active " : ""}` + deviceType}
        style={{
          zIndex: isActive ? 10 : 1,
          width: handleSize(deviceType),
          marginLeft: "-" + handleSize(deviceType),
        }}
        to={"/browse/" + id}
      >
        <div
          style={{ width: handleSize(deviceType) }}
          className="react-player-wrapper"
        >
          {isActive ? (
            memoizedReactPlayer
          ) : (
            <img
              width={handleSize(deviceType)}
              src={TMDB_IMG_URL + backdrop_path}
            />
          )}
        </div>
        {isActive ? (
          <div style={{ width: handleSize(deviceType) }} className="details">
            <div className="col-1">
              <span
                onClick={handleNavigate}
                className="material-icons-outlined play"
              >
                play_circle
              </span>
              <span className="material-icons-outlined add">add_circle</span>
            </div>
            <div className="col-2">
              <span className="title">{original_title}</span>
            </div>
            <div className="col-3">
              <span className="genre">{genre}</span>
            </div>
          </div>
        ) : (
          ""
        )}

        {mediaStarted ? (
          <span
            onClick={handleMuteToggle}
            className="material-icons-outlined volume"
          >
            {mute ? "volume_off" : "volume_up"}
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SmallVideoCard;
