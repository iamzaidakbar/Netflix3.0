import ReactPlayer from "react-player";
import useHover from "../../Utils/API/useHover";
import "../../styles/v-card.scss";
import logo from "../../assets/logo/netflix-card-logo.png";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";
import usePageNavigation from "../../Utils/API/usePageNavigation";
import { addMovieTrailerDetails } from "../../Utils/Slices/movieTrailerSlice";
import usePageAnimation from "../../Utils/API/usePageAnimation";
import { useDispatch } from "react-redux";
import useMuteToggle from "../../Utils/API/useMuteToggle";
import { useEffect, useState } from "react";

const VCard = ({ data, flag }) => {
  const { isActive, trailers, handleMouseOver, handleMouseLeave } = useHover(
    data?.id
  );

  const dispatch = useDispatch();
  const navigatePage = usePageNavigation();
  const animate = usePageAnimation();
  const { mute, handleMuteToggle } = useMuteToggle(false);
  const [played, setPlayed] = useState(0);

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
    setPlayed(state.played);
  }

  const videoWrapper = (
    <div className={"wrapper"}>
      <div className="react-player-wrapper">
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          fallback={<h2>Loading....</h2>}
          playing={true}
          muted={mute ? true : false}
          controls={false}
          url={VIDEO_URL + trailers[0]?.key}
          style={{ scale: "1.3 1.4" }}
          onProgress={handleProgress}
        />
      </div>
      <div style={{ width: "300px", height: "130px" }} className="details">
        <div className="icons">
          <span onClick={handleNavigation} className="material-icons-outlined">
            play_circle
          </span>
          <span className="material-icons-outlined">add_circle</span>
          <span
            onClick={handleMuteToggle}
            className="material-icons-outlined volume-icon"
          >
            {mute ? "volume_off" : "volume_up"}
          </span>
        </div>
        <div className="trailer-details">
          <span className="title">{data?.original_title}</span>
          <span className="genre">Action - Comedy - Fantasy</span>
        </div>
      </div>
    </div>
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
      {JSON.parse(localStorage.getItem("video_played")).find(
        (video) => video.id === data?.id
      )?.played > 0 && (
        <div style={{ width: "180px" }} className="progress-bar-wrapper">
          <span
            className="bar"
            style={{
              width: `${
                (
                  JSON.parse(localStorage.getItem("video_played")).find(
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
