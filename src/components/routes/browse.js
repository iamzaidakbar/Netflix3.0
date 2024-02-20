import { useParams } from "react-router";
import VideoCard from "../common/videoCard";
import "../../styles/browse.scss";
import logo from "../../assets/logo/netflix-logo.png";
import useGenre from "../../Utils/API/useGenre";

const Browse = () => {
  const { id: paramsID } = useParams();
  const mockdata = {
    adult: false,
    backdrop_path: "/7grv5ULlK9wMr2T1fkgr56HlbT.jpg",
    id: 760774,
    title: "One Life",
    original_language: "en",
    original_title: "One Life",
    overview:
      "British stockbroker Nicholas Winton visits Czechoslovakia in the 1930s and forms plans to assist in the rescue of Jewish children before the onset of World War II, in an operation that came to be known as the Kindertransport.",
    poster_path: "/kmGCB4TTMEphUSxDHsDULDgJMuB.jpg",
    media_type: "movie",
    genre_ids: [18, 36, 10752],
    popularity: 71.081,
    release_date: "2023-09-09",
    video: false,
    vote_average: 7.819,
    vote_count: 69,
  };

  const { overview, original_title, vote_count, genre_ids } = JSON.parse(
    localStorage.getItem("movieDetails")
  );

  const genre = useGenre(genre_ids);

  return (
    <div className="browse">
      <VideoCard videoId={paramsID} description={""} title={original_title} />

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
            <span className="description">{overview}</span>
          </div>
        </div>
        <div className="right">
          <div className="col-1">
            <span className="label">Genre : </span>
            <span className="genre">{genre}</span>
          </div>
          <div className="col-2">
            <img className="netflix-logo" src={logo} />
            <div className="author">
              <span className="label">Created by</span>
              <span className="author-name">ZAID AKBAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Browse;
