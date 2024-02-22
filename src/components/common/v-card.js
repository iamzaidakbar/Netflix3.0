import ReactPlayer from "react-player";
import useHover from "../../Utils/API/useHover";
import "../../styles/v-card.scss";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";

const VCard = ({ data }) => {
  const { isActive, trailers, handleMouseOver, handleMouseLeave } = useHover(
    data?.id
  );

  const videoWrapper = (
    <div className={"wrapper"}>
      <div className="react-player-wrapper">
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          fallback={<h2>Loading....</h2>}
          playing={true}
          muted={true}
          controls={false}
          url={VIDEO_URL + trailers[0]?.key}
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
      </div>
      <div style={{ width: "300px", height: "130px" }} className="details">
        <div className="icons">
          <span className="material-icons-outlined">play_circle</span>
          <span className="material-icons-outlined">add_cir cle</span>
        </div>
        <div className="trailer-details">
          <span className="title">Wonka</span>
          <span className="genre">Action - Comedy - Fantasy</span>
        </div>
      </div>
    </div>
  );

  const image = (
    <>
      <span className="line"></span>
      <img src={TMDB_IMG_URL + data?.backdrop_path} />
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
