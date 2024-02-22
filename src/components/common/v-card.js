import "../../styles/v-card.scss";
import ReactPlayer from "react-player";
import logo from "../../assets/logo/netflix-card-logo.png";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";
import { addMovieTrailerDetails } from "../../Utils/Slices/movieTrailerSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo, useState } from "react";
import { TMDB_IMG_URL } from "../../Utils/constants";
import usePageNavigation from "../../Utils/API/usePageNavigation";
import usePageAnimation from "../../Utils/API/usePageAnimation";
import useMuteToggle from "../../Utils/API/useMuteToggle";
import useHover from "../../Utils/API/useHover";
import useGenre from "../../Utils/API/useGenre";
import { addMyList } from "../../Utils/Slices/useMyListSlice";

const VCard = ({ data, flag }) => {
  const { isActive, trailers, handleMouseOver, handleMouseLeave } = useHover(
    data?.id
  );

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("");
  const dispatch = useDispatch();
  const navigatePage = usePageNavigation();
  const animate = usePageAnimation();
  const { mute, handleMuteToggle } = useMuteToggle(false);
  const genres = useGenre(data?.genre_ids);

  const myListVideos = useSelector((store) => store?.myList?.myListVideos);
  const isItemInList = myListVideos?.some((item) => item?.id === data?.id);

  function handleNavigation() {
    dispatch(addMovieTrailerDetails(data));
    localStorage.setItem("movieDetails", JSON.stringify(data));
    animate();
    setTimeout(() => {
      navigatePage("/browse/" + data?.id);
    }, 2000);
  }
  function handleProgress(state) {
    const storedData = JSON.parse(localStorage.getItem("video_played")) || [];
    const dataArray = Array.isArray(storedData) ? storedData : [];
    const index = dataArray.findIndex((item) => item.id === data?.id);

    if (index !== -1) {
      dataArray[index].played = state.played;
    } else {
      dataArray.push({
        id: data?.id,
        played: state.played,
        title: data?.original_title,
      });
    }

    localStorage.setItem("video_played", JSON.stringify(dataArray));
  }
  function handleDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    setDuration(`${formattedMinutes}:${formattedSeconds}`);
  }

  const videoWrapper = useMemo(
    () => (
      <div className={"wrapper"}>
        <div className="react-player-wrapper">
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            fallback={<h2>Loading....</h2>}
            playing={playing}
            muted={mute}
            controls={false}
            url={VIDEO_URL + trailers[0]?.key}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
          <img
            width={"250px"}
            className={`thumbnail ${playing ? "hide" : ""}`}
            src={TMDB_IMG_URL + data?.backdrop_path}
          />
        </div>
        <div style={{ width: "300px", height: "130px" }} className="details">
          <div className="icons">
            <span
              onClick={(e) => {
                setPlaying(!playing);
              }}
              className="material-icons-outlined"
            >
              {playing ? "pause_circle" : "play_circle"}
            </span>
            {isItemInList ? (
              <span className="material-icons-outlined">check_circle</span>
            ) : (
              <span
                onClick={() => {
                  dispatch(addMyList(data));
                }}
                className="material-icons-outlined"
              >
                add_circle
              </span>
            )}

            <button onClick={handleNavigation} className="more-info">
              <span className="material-icons-outlined">info</span>
              <span> More Info</span>
            </button>
            <span className="duration">{duration}</span>
            <span
              onClick={handleMuteToggle}
              className="material-icons-outlined volume-icon"
            >
              {mute ? "volume_off" : "volume_up"}
            </span>
          </div>
          <div className="trailer-details">
            <span className="title">{data?.original_title}</span>
            <span className="genre">{genres}</span>
          </div>
        </div>
      </div>
    ),
    [trailers, mute, playing]
  );

  const image = (
    <>
      <span className="line"></span>
      <img className="card-logo" src={logo} />
      {flag && (
        <div className="flag">
          <div className="ribbon slant-down" style={{ color: "#8975b4" }}>
            <div className="content">
              <span className="label-1">TOP</span>
              <span className="label-2">10</span>
            </div>
          </div>
        </div>
      )}
      <img src={TMDB_IMG_URL + data?.backdrop_path} />
      {JSON.parse(localStorage.getItem("video_played"))?.find(
        (video) => video.id === data?.id
      )?.played > 0 && (
        <div style={{ width: "180px" }} className="progress-bar-wrapper">
          <span
            className="bar"
            style={{
              width: `${
                (
                  JSON.parse(localStorage.getItem("video_played"))?.find(
                    (video) => video.id === data?.id
                  )?.played || 0
                ).toFixed(3) * 100
              }%`,
            }}
          ></span>
        </div>
      )}
    </>
  );

  return (
    <>
      <div
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        className="vcard"
      >
        {isActive ? videoWrapper : image}
      </div>
    </>
  );
};
export default VCard;
