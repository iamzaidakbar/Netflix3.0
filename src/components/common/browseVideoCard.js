import ReactPlayer from "react-player";

const BrowseVideCard = ({ volume, playing, mute, url }) => {
  return (
    <>
      <ReactPlayer
        width={"100vw"}
        height={"100%"}
        fallback={<h2>Loading....</h2>}
        volume={volume}
        playing={playing}
        muted={mute}
        url={url}
        style={{ scale: "1.4" }}
        controls={false}
      />
    </>
  );
};

export default BrowseVideCard;
