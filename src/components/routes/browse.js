import { useParams } from "react-router";
import "../../styles/browse.scss";
import logo from "../../assets/logo/netflix-logo.png";
import useGenre from "../../Utils/API/useGenre";
import BrowseVideCard from "../common/browseVideoCard";
import useFetchTrailer from "../../Utils/API/useFetchTrailer";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { VIDEO_URL } from "../../Utils/constants";
import useMuteToggle from "../../Utils/API/useMuteToggle";

const Browse = () => {
  const { id: paramsID } = useParams();
  const fetchTrailers = useFetchTrailer();
  const { mute, handleMuteToggle } = useMuteToggle(false);

  useEffect(() => {
    fetchTrailers(paramsID);
  }, []);

  const { overview, original_title, vote_count, genre_ids } = JSON.parse(
    localStorage.getItem("movieDetails")
  );

  const genre = useGenre(genre_ids);
  const trailer = useSelector((store) => store?.trailer?.movieTrailer);

  const memoizedVideCard = useMemo(() => {
    if (!trailer) return <h2>Loading...</h2>;

    const filteredTrailer = trailer?.find((item) => item.type === "Trailer");

    return (
      <BrowseVideCard
        volume={1}
        mute={mute}
        playing={true}
        url={VIDEO_URL + filteredTrailer?.key}
      />
    );
  }, [fetchTrailers]);

  return (
    <div className="browse">
      <span className="video-player">{memoizedVideCard}</span>

      <div className="movieContent">
        <div className="left">
          <div className="col-1">
            <span className="match">{vote_count.toFixed(0)} Votes</span>
            <span className="yt-logo material-icons-outlined">play_arrow</span>
            <span className="netflix-logo">
              <img src={logo} width={"120px"} />
            </span>
            <span className="type">movie</span>
            <span className="resolution">HD</span>
          </div>
          <div className="col-2">
            <span className="title">{original_title}</span>
            <span className="description">{overview}</span>
          </div>
        </div>
        <div className="right">
          <div className="col-0">
            <span  onClick={handleMuteToggle} className="material-icons-outlined volume">
              {mute ? "volume_off" : "volume_up"}
            </span>
          </div>
          <div className="col-1">
            <span className="col-1-label">Genre : </span>
            <span className="genre">{genre}</span>
          </div>
          <div className="col-2">
            <img className="netflix-logo" src={logo} />
            <div className="author">
              <span className="col-2-label">Created by</span>
              <span className="author-name">ZAID AKBAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
