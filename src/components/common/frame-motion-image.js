import useDeviceType from "../../Utils/API/useDevicetype";
import { TMDB_IMG_URL } from "../../Utils/constants";
import logo from "../../assets/logo/netflix-card-logo.png";
import defaultBackdropPath from "../../assets/images/default-card-bg.png";
import Badge from "./badge";
import useUserProfile from "../../Utils/API/useUserData";
import { useEffect, useState } from "react";

const FrameMotionImage = ({ flag, preview, data }) => {
  const deviceType = useDeviceType();
  const { allProfilesData } = useUserProfile();
  const [currentActiveUser, setCurrentActiveUser] = useState(null)

  useEffect(() => {
    if (allProfilesData) {
      setCurrentActiveUser(allProfilesData.find(profile => profile.isCurrentUser));
    }
  }, [allProfilesData])


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
      {currentActiveUser?.video_played?.length > 0 &&
        currentActiveUser?.video_played?.find((video) => video.id === data?.id)
          ?.played > 0 && (
          <div style={{ width: "180px" }} className="progress-bar-wrapper">
            <span
              className="bar"
              style={{
                width: `${(
                  currentActiveUser?.video_played?.find(
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


  return image;
};
export default FrameMotionImage;
