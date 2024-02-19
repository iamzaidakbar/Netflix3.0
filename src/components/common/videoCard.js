import React, { useState, useCallback, useEffect, useMemo } from "react";
import ReactPlayer from "react-player";
import barsGif from "../../assets/gifs/bars-animation.gif";
import { VIDEO_URL } from "../../Utils/constants";
import "../../styles/videocard.scss";
import useFetchTrailer from "../../Utils/API/useFetchTrailer";
import { useSelector } from "react-redux";
import Shimmer from "./shimmer";

const VideoCard = ({ title, description, videoId }) => {
  const [mute, setMute] = useState(true);
  const [reduceTextSize, setReduceTextSize] = useState(false);

  const fetchTrailers = useFetchTrailer();

  useEffect(() => {
    fetchTrailers(videoId);
  }, []);

  const trailers = useSelector((store) => {
    return store.trailer?.movieTrailer;
  });

  const handleMuteToggle = () => {
    setMute(!mute);
  };

  const handleScroll = () => {
    // Check if the user has scrolled down, and mute the video
    if (window.scrollY > 400) {
      setMute(true);
    } 
  };

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Memoize the VideoCard component
  const memoizedReactPlayer = useMemo(() => {
    if (!trailers || trailers.length === 0) {
      return null; // Handle the case where trailers is undefined or an empty array
    }

    const trailer = trailers.filter((item) => item.type === "Trailer");

    return (
      <ReactPlayer
        width={"100vw"}
        height={"120vh"}
        fallback={<h2>Loading....</h2>}
        volume={1}
        playing={true}
        muted={mute}
        url={VIDEO_URL + trailer[0]?.key}
        style={{ marginTop: "-60px", scale: "1.3" }}
      />
    );
  }, [trailers, mute]);

  useEffect(() => {
    setTimeout(() => {
      setReduceTextSize(true);
    }, 5000);
  }, []);

  return trailers ? (
    <div className="videocard">
      <div className="react-player-wrapper">{memoizedReactPlayer}</div>

      <div className="details">
        <span className={`title ${reduceTextSize && "reduce-title-size"}`}>
          {title}
        </span>
        <span className="description">{description}</span>

        <span className="buttons">
          <button className="play">
            <span className="material-icons-outlined">play_arrow</span>
            Play
          </button>

          <button className="next">
            <img width={"34px"} src={barsGif} alt="Loading" />
          </button>
        </span>
      </div>

      <div className="action-button">
        <span onClick={handleMuteToggle} className="material-icons-outlined">
          {mute ? "volume_off" : "volume_up"}
        </span>
      </div>
    </div>
  ) : (
    <Shimmer width={"98vw"} height={"90vh"} />
  );
};

export default VideoCard;
