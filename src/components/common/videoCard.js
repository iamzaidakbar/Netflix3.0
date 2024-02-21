import React, { useState, useEffect, useMemo } from "react";
import ReactPlayer from "react-player/lazy";
import barsGif from "../../assets/gifs/bars-animation.gif";
import logo from "../../assets/logo/netflix-card-logo.png";
import { VIDEO_URL } from "../../Utils/constants";
import "../../styles/videocard.scss";
import useFetchTrailer from "../../Utils/API/useFetchTrailer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const VideoCard = ({ title, description, videoId, backdrop_path }) => {
  const [mute, setMute] = useState(true);
  const [reduceTextSize, setReduceTextSize] = useState(false);

  const location = useLocation();

  const isBrowsePage = location.pathname.includes("browse");

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
        light={true}
        url={VIDEO_URL + trailer[0]?.key}
        style={{ marginTop: "-70px", scale: "1.2" }}
        controls={false}
        playIcon={<span></span>}
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

  useEffect(() => {
    setTimeout(() => {
      setReduceTextSize(true);
    }, 5000);
  }, []);

  return trailers ? (
    <div className="videocard">
      <div className="react-player-wrapper">{memoizedReactPlayer}</div>

      <div className="details">
        <div className="logo_text">
          <img className="logo" width={30} src={logo} />
          <span className="text">SERIES</span>
        </div>
        <span className={`title ${reduceTextSize && "reduce-title-size"}`}>
          {title}
        </span>
        {!isBrowsePage && <span className="description">{description}</span>}

        <span className="buttons">
          <span className="material-icons-outlined add">add_circle</span>
          <span
            onClick={handleMuteToggle}
            className="material-icons-outlined add"
          >
            {mute ? "volume_off" : "volume_up"}
          </span>
        </span>
      </div>
    </div>
  ) : (
    ""
  );
};

export default VideoCard;
