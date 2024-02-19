import { Link } from "react-router-dom";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";
import "../../styles/smallVideoCard.scss";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";

const SmallVideoCard = ({ videoId, imgSrc }) => {
  const [isActive, setIsActive] = useState(false);
  const [mute, setMute] = useState(true);
  const timerRef = useRef();

  const handleMuteToggle = () => {
    setMute(!mute);
  };

  function handleMouseOver(e) {
    e.stopPropagation();
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }

  function handleMouseLeave(e) {
    e.stopPropagation();

    clearTimeout(timerRef.current);
    setIsActive(false);
  }

  return (
    <>
      <Link
        onMouseOver={handleMouseOver}
        className={`card ${isActive ? "active" : ""}`}
      >
        <img
          onMouseLeave={isActive ? ()=>{} : handleMouseLeave}
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
              url={VIDEO_URL + "3jqt7MxifiU"}
              style={{scale: "1.2"}}
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
