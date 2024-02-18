import React, { useState, useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import barsGif from "../../assets/gifs/bars-animation.gif";
import useRandomVideo from "../../Utils/useRandomVideo";
import { VIDEO_URL } from "../../Utils/constants";
import "../../styles/videocard.scss";

const VideoCard = () => {
  const [mute, setMute] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reduceTextSize, setReduceTextSize] = useState(false);

  // Custom hook for random video ID
  const { randomVideo, updateRandomVideo } = useRandomVideo();

  // Debouncing logic for reducing text size
  const startDebounceTimer = useCallback(() => {
    setReduceTextSize(true);
  }, []);

  useEffect(() => {
    let debounceTimer;

    if (isPlaying) {
      // If video is playing, start the debouncing timer
      debounceTimer = setTimeout(startDebounceTimer, 5000);
    } else {
      // If video is paused or ended, reset the debouncing timer
      setReduceTextSize(false);
      clearTimeout(debounceTimer);
    }

    return () => {
      // Cleanup on unmount or dependency change
      clearTimeout(debounceTimer);
    };
  }, [isPlaying, startDebounceTimer]);

  const handleUpdateVideoId = useCallback(() => {
    updateRandomVideo();
    setVideoEnded(false);
  }, [updateRandomVideo]);

  const handleVideoStart = useCallback(() => {
    setVideoEnded(false);
    setIsPlaying(true);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true);
    setIsPlaying(false);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }, []);

  const handleNext = useCallback(() => {
    handleUpdateVideoId();
    setIsPlaying(true);
  }, [handleUpdateVideoId]);

  const handleMuteToggle = useCallback(() => {
    setMute((prevMute) => !prevMute);
  }, []);

  return (
    <div className="videocard">
      <div className="react-player-wrapper">
        <ReactPlayer
          width={"100vw"}
          height={"120vh"}
          fallback={<h2>Loading....</h2>}
          volume={1}
          playing={isPlaying}
          muted={mute}
          onStart={handleVideoStart}
          onEnded={handleVideoEnd}
          light={videoEnded}
          url={VIDEO_URL + randomVideo?.id}
          style={{ marginTop: "-60px" }}
        />
      </div>

      <div className="details">
        <span className={`title ${reduceTextSize && "reduce-title-size"}`}>
          {randomVideo.title}
        </span>
        <span className="description">
          {randomVideo.description}
        </span>

        <span className="buttons">
          <button onClick={handlePlayPause} className="play">
            <span className="material-icons-outlined">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
            {isPlaying ? "Pause" : "Play"}
          </button>

          {videoEnded ? (
            <button onClick={handleNext} className="next">
              <span className="material-icons-outlined">navigate_next</span>
              Next
            </button>
          ) : (
            <button className="next">
              <img width={"34px"} src={barsGif} alt="Loading" />
            </button>
          )}
        </span>
      </div>

      <div className="action-button">
        <span onClick={handleMuteToggle} className="material-icons-outlined">
          {mute ? "volume_off" : "volume_up"}
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
