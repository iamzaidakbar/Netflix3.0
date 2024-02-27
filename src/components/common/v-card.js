import "../../styles/v-card.scss";
import logo from "../../assets/logo/netflix-card-logo.png";
import { TMDB_IMG_URL, VIDEO_URL } from "../../Utils/constants";
import React, { useState } from "react";
import { TMDB_IMG_URL } from "../../Utils/constants";
import defaultBackdropPath from "../../assets/images/default-card-bg.png";
import useHover from "../../Utils/API/useHover";
import Badge from "./badge";
import useDeviceType from "../../Utils/API/useDevicetype";
import FrameMotionVideo from "./frame-motion-video";

const VCard = ({ data, flag }) => {
  const { isActive, trailers, handleMouseOver, handleMouseLeave } = useHover(
    data?.id
  );

  const [preview, setPreview] = useState(true);
  const deviceType = useDeviceType();

  const video = (
    <FrameMotionVideo
      data={data}
      trailers={trailers}
    />
  );

  const image = (
    <>
      {preview && <span className="line"></span>}
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
      <img
        className="image"
        onClick={() => {
          if (deviceType === "mobile") handleNavigation();
        }}
        src={
          data?.backdrop_path
            ? TMDB_IMG_URL + data?.backdrop_path
            : defaultBackdropPath
        }
      />
      {!preview && <Badge message={"Preview not available"} />}
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
        className="vcard"
        onMouseLeave={
          data?.backdrop_path && data?.id && deviceType != "mobile"
            ? handleMouseLeave
            : () => {
                setPreview(true);
              }
        }
        onMouseOver={
          data?.backdrop_path && data?.id && deviceType != "mobile"
            ? handleMouseOver
            : () => {
                setPreview(false);
              }
        }
      >
        {isActive ? video : image}
      </div>
    </>
  );
};
export default VCard;
