import { useDispatch } from "react-redux";
import useGenre from "../../Utils/API/useGenre";
import useMuteToggle from "../../Utils/API/useMuteToggle";
import useMyList from "../../Utils/API/useMyList";
import useNotifications from "../../Utils/API/useNotifications";
import logo from "../../assets/logo/netflix-card-logo.png";
import usePageNavigation from "../../Utils/API/usePageNavigation";
import ReactPlayer from "react-player";
import { addMovieTrailerDetails } from "../../Utils/Slices/movieTrailerSlice";
import { useState, useMemo } from "react";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";

const FrameMotionVideo = ({ data, trailers }) => {
  const isMyListRoute = location.pathname === "/mylist";
  const { mute, handleMuteToggle } = useMuteToggle(false);
  const { myList, addToMyList, removeFromMyList } = useMyList();
  const genres = useGenre(data?.genre_ids);
  const dispatch = useDispatch();
  const navigatePage = usePageNavigation();
  const { addNotification } = useNotifications();

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("");
  const date = new Date().toISOString();

  const isItemInList = myList?.some((item) => item?.id === data?.id);

  function handleAddNotification(message) {
    const title = data?.original_title
      ? data?.original_title + " " + message
      : "Item" + " " + message;
    const navigateTo = "/mylist";
    addNotification(data?.id, data?.backdrop_path, title, date, navigateTo);
  }

  function handleNavigation() {
    dispatch(addMovieTrailerDetails(data));
    localStorage.setItem("movieDetails", JSON.stringify(data));
    navigatePage("/browse/" + data?.id);
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
        data,
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
      <div className="wrapper">
        <div className="react-player-wrapper">
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            fallback={<h2>Loading....</h2>}
            playing={playing}
            muted={mute}
            controls={false}
            url={
              trailers
                ? VIDEO_URL + trailers[0]?.key
                : "https://youtu.be/riYaNOBOI"
            }
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
          <img className="card-logo" src={logo} />
          <span className="duration">{duration}</span>
          <img
            className={`thumbnail ${playing ? "hide" : ""}`}
            src={
              data?.backdrop_path
                ? TMDB_IMG_URL + data?.backdrop_path
                : defaultBackdropPath
            }
          />
        </div>
        <div className="details">
          <div className="icons">
            <span
              onClick={(e) => {
                setPlaying(!playing);
              }}
              className="material-icons-outlined"
            >
              {playing ? "pause_circle" : "play_circle"}
            </span>
            {isMyListRoute && (
              <span
                onClick={() => {
                  removeFromMyList(data?.id);
                  handleAddNotification("removed from the list.");
                }}
                className="material-icons-outlined"
              >
                cancel
              </span>
            )}
            {isItemInList && !isMyListRoute && (
              <span className="material-icons-outlined">check_circle</span>
            )}
            {!isItemInList && !isMyListRoute && (
              <span
                onClick={() => {
                  addToMyList(data);
                  handleAddNotification("added to list");
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

            <span
              onClick={handleMuteToggle}
              className="material-icons-outlined volume-icon"
            >
              {mute ? "volume_off" : "volume_up"}
            </span>
          </div>
          <div className="trailer-details">
            <span className="title">
              {data?.original_title
                ? data?.original_title
                : "Netflix Originals"}
            </span>
            <span className="genre">{genres ? genres : ""}</span>
          </div>
        </div>
      </div>
    ),
    [trailers, mute, playing]
  );

  return videoWrapper;
};

export default FrameMotionVideo;