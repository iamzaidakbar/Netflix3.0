import React, { useEffect } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import { useDispatch, useSelector } from "react-redux";
import { addAvatar } from "../../Utils/Slices/profileSlice";
import { useLocation, useNavigate } from "react-router";
import "../../styles/choose-avatar.scss";
import "../../styles/carousel.scss";
import { avatarData } from "../../Utils/Avatar-Collection/avatar-collection";
import { updateCurrentUser } from "firebase/auth";

const ChooseAvatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    document.title = "Choose Avatar - Netflix";

  }, []);

  const isPathUpdateProfile = location.pathname.includes(
    "profileType=update_profile"
  );

  const selectedAvatar = useSelector((store) => store?.profile?.selectedAvatar);

  const carouselConfig = {
    useArrowKeys: true,
    responsive: true,
    show: 7.2,
    slide: 6,
    swiping: true,
    dynamic: true,
    leftArrow: (
      <span className="material-icons-outlined scroll-back">arrow_back</span>
    ),
    rightArrow: (
      <span className="material-icons-outlined scroll-forward">
        arrow_forward
      </span>
    ),
    className: "custom-carousel",
  };

  const handleAvatarClick = (avatar) => {
    dispatch(addAvatar(avatar));
  };

  const renderAvatarImages = (avatars) => {
    return avatars.map((avatar, index) => (
      <img
        className="choose-avatar-image"
        key={index}
        src={avatar}
        alt={`avatar-${index}`}
        width={140}
        height={140}
        onClick={() => dispatch(addAvatar(avatar))}
      />
    ));
  };

  return (
    <div className="choose-avatar">
      <div className="avatar-col-1">
        <span className="sub-col-left">
          <span
            onClick={() =>
              navigate(
                isPathUpdateProfile ? "/update-profile" : "/create-profile"
              )
            }
            className="material-icons-outlined arrow-back"
          >
            arrow_back
          </span>
          <span>
            <h2 className="label-1">
              {isPathUpdateProfile ? "Update Profile" : "Edit Profile"}
            </h2>
            <h2 className="label-2">Choose a profile icon.</h2>
          </span>
        </span>
        <span className="sub-col-right">
          {selectedAvatar && (
            <img
              src={selectedAvatar}
              alt="selected-avatar"
              width={70}
              height={70}
            />
          )}
        </span>
      </div>

      {/* Avatar Carousel */}
      {avatarData.map((category, index) => (
        <div key={index} className={`avatar-col-${index + 2}`}>
          <label>{category.show}</label>
          <Carousel {...carouselConfig} transition={0.5}>
            {renderAvatarImages(category.avatars)}
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default ChooseAvatar;
