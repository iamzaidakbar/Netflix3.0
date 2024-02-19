import { Link } from "react-router-dom";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";
import "../../styles/smallVideoCard.scss";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import useFetchTrailer from "../../Utils/API/useFetchTrailer";
import { useSelector } from "react-redux";

const SmallVideoCard = ({ videoId, imgSrc }) => {
  const [isActive, setIsActive] = useState(false);
  const [mute, setMute] = useState(true);
  const timerRef = useRef();
  const fetchTrailers = useFetchTrailer();

  function handleMouseOver(e) {
    e.stopPropagation();
    clearTimeout(timerRef.current);
    
    timerRef.current = setTimeout(() => {
      fetchTrailers(videoId);
      setIsActive(true);
    }, 1000);
  }

  function handleMouseLeave(e) {
    e.stopPropagation();

    clearTimeout(timerRef.current);
    setIsActive(false);
  }

  const trailers = useSelector((store) => {
    return store.trailer?.movieTrailer;
  });

  const handleMuteToggle = () => {
    setMute(!mute);
  };

  const trailer = trailers?.filter((item) => item.type === "Trailer");

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
          {isActive ? (
            <ReactPlayer
              width={"250px"}
              height={"130px"}
              volume={1}
              playing={true}
              muted={mute}
              url={VIDEO_URL + trailer[0]?.key}
              style={{ scale: "1.3" }}
            />
          ) : (
            ""
          )}
        </div>
        <span onClick={handleMuteToggle} className="material-icons-outlined">
          {mute ? "volume_off" : "volume_up"}
        </span>
      </Link>
    </>
  );
};

export default SmallVideoCard;
