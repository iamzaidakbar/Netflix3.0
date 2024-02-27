import "../../styles/v-card.scss";
import React, { useState } from "react";
import { TMDB_IMG_URL } from "../../Utils/constants";
import useHover from "../../Utils/API/useHover";
import useDeviceType from "../../Utils/API/useDevicetype";
import FrameMotionVideo from "./frame-motion-video";
import FrameMotionImage from "./frame-motio-image";

const VCard = ({ data, flag }) => {
  const { isActive, trailers, handleMouseOver, handleMouseLeave } = useHover(
    data?.id
  );

  const [preview, setPreview] = useState(true);
  const deviceType = useDeviceType();

  const video = <FrameMotionVideo data={data} trailers={trailers} />;
  const image = <FrameMotionImage data={data} preview={preview} flag={flag} />;

  const mouseEnter = (event) => {
    if (data?.backdrop_path && data?.id && deviceType !== "mobile") {
      handleMouseOver(event);
    } else {
      setPreview(false);
    }
  };

  const mouseLeave = (event) => {
    if (data?.backdrop_path && data?.id && deviceType !== "mobile") {
      handleMouseLeave(event);
    } else {
      setPreview(true);
    }
  };

  return (
    <>
      <div className="vcard" onMouseLeave={mouseLeave} onMouseOver={mouseEnter}>
        {isActive ? video : image}
      </div>
    </>
  );
};

export default VCard;
