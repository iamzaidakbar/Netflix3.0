import { Link } from "react-router-dom";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";
import "../../styles/smallVideoCard.scss";
import ReactPlayer from "react-player";
import { useState, useRef, useMemo } from "react";
import useFetchShortMovieTrailer from "../../Utils/API/useShortMovieTrailer";

const SmallVideoCard = ({ videoId, imgSrc }) => {
  const [isActive, setIsActive] = useState(false);
  const [trailers, setTrailers] = useState(false);
  const [mute, setMute] = useState(true);
  const timerRef = useRef();
  const fetchShortMovieTrailers = useFetchShortMovieTrailer();

  async function handleMouseOver(e) {
    e.stopPropagation();
    clearTimeout(timerRef.current);
    const fetchedTrailers = await fetchShortMovieTrailers(videoId);
    setTrailers(fetchedTrailers);

    timerRef.current = setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }

  function handleMouseLeave(e) {
    e.stopPropagation();

    clearTimeout(timerRef.current);
    setIsActive(false);
  }

  const handleMuteToggle = () => {
    setMute(!mute);
  };

  // Memoize the VideoCard component
  const memoizedReactPlayer = useMemo(() => {
    if (!trailers) {
      console.log("NULL");
      return null; // Handle the case where trailers is undefined or an empty array
    }
    console.log(trailers, "trailer-short");

    const trailer = trailers.filter((item) => item.type === "Trailer");

    return (
      <ReactPlayer
      width={'100%'}
      height={'100vpx'}
        fallback={<h2>Loading....</h2>}
        volume={1}
        playing={true}
        muted={mute}
        controls={false}
        url={VIDEO_URL + trailer[0]?.key}
        style={{ scale: '1.3', marginTop: '-10px' }}
      />
    );
  }, [trailers, mute]);

  return (
    <>
      <Link
        onMouseOver={handleMouseOver}
        className={`card ${isActive ? "active" : ""}`}
      >
        <img
          onMouseLeave={isActive ? () => {} : handleMouseLeave}
          src={TMDB_IMG_URL + imgSrc}
          width={250}
          alt="Thumbnail"
        />
      </Link>
      <Link
        onMouseLeave={handleMouseLeave}
        className={`smallVideoCard ${isActive ? "active" : ""}`}
        style={{
          zIndex: isActive ? 10 : 1,
        }}
      >
        <div className="react-player-wrapper">
          {isActive ? memoizedReactPlayer : ""}
        </div>
        <span onClick={handleMuteToggle} className="material-icons-outlined">
          {mute ? "volume_off" : "volume_up"}
        </span>
      </Link>
    </>
  );
};

export default SmallVideoCard;
