import React, { useState, useEffect, useMemo } from "react";
import ReactPlayer from "react-player/lazy";
import logo from "../../assets/logo/netflix-card-logo.png";
import "../../styles/videocard.scss";
import { useLocation } from "react-router";
import useRandomVideo from "../../Utils/API/useRandomVideo";
import useMuteToggle from "../../Utils/API/useMuteToggle";

const VideoCard = () => {
  const [reduceTextSize, setReduceTextSize] = useState(false);
  const [videoDetails, setVideoDetails] = useState(false);
  const videoInfo = useRandomVideo();
  const location = useLocation();
  const isBrowsePage = location.pathname.includes("browse");
  const { mute, handleMuteToggle } = useMuteToggle(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setVideoDetails(videoInfo);
  }, []);


  // Memoize the VideoCard component
  const memoizedReactPlayer = useMemo(() => {
    if (!videoDetails.video_url || videoDetails.video_url.length === 0) {
      return null;
    }

    return (
      <>
        <ReactPlayer
          width={"100vw"}
          height={"100vh"}
          fallback={<h2>Loading....</h2>}
          volume={1}
          playing={playing}
          muted={mute}
          url={videoDetails.video_url}
          style={{ scale: "1.2" }}
          controls={false}
          onEnded={() => {
            setPlaying(false);
          }}
          onError={() => {
            setPlaying(false);
          }}
        />
        {!isBrowsePage && (
          <img
            className={`thumbnail ${playing ? "hide" : ""}`}
            src={videoDetails.thumbnail}
          />
        )}
      </>
    );
  }, [videoDetails, playing, mute]);

  useEffect(() => {
    setTimeout(() => {
      setReduceTextSize(true);
    }, 5000);
  }, []);

  return (
    <div className="videocard">
      <div className="react-player-wrapper">{memoizedReactPlayer}</div>

      <div className="details">
        <div className="logo_text">
          <img className="logo" width={30} src={logo} alt="Logo" />
          <span className="text">SERIES</span>
        </div>
        <span
          style={{ color: videoDetails.video_color }}
          className={`title ${reduceTextSize && "reduce-title-size"}`}
        >
          {videoDetails.video_title}
        </span>
        {!isBrowsePage && (
          <span className="description">{videoDetails.video_description}</span>
        )}

        <span className="buttons">
          <span
            onClick={() => {
              setPlaying(!playing);
            }}
            className="material-icons-outlined add"
          >
            {playing ? "pause_circle" : "play_circle"}
          </span>
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
  );
};

export default VideoCard;
