import avatar1 from "../../assets/images/Avatars/avatar1.png";
import avatar2 from "../../assets/images/Avatars/avatar2.png";
import avatar3 from "../../assets/images/Avatars/avatar3.png";
import { Carousel } from "@trendyol-js/react-carousel";
import "../../styles/choose-avatar.scss";
import "../../styles/carousel.scss";
import { useDispatch, useSelector } from "react-redux";
import { addAvatar } from "../../Utils/Slices/profileSlice";
import { useLocation, useNavigate } from "react-router";

const ChooseAvatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isPathUpdateProfile = location.pathname.includes(
    "profileType=update_profile"
  );

  const selectedAvatar = useSelector((store) => store?.profile?.selectedAvatar);
  console.log(selectedAvatar)

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

  const classicAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar1,
    avatar2,
    avatar3,
    avatar1,
    avatar1,
    avatar2,
    avatar3,
    avatar1,
  ];
  const homelanderAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar1,
    avatar2,
    avatar3,
    avatar1,
    avatar1,
    avatar2,
    avatar3,
    avatar1,
  ];
  const heisenbergAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar1,
    avatar2,
    avatar3,
    avatar1,
    avatar1,
    avatar2,
    avatar3,
    avatar1,
  ];
  const witcherAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar1,
    avatar2,
    avatar3,
    avatar1,
    avatar1,
    avatar2,
    avatar3,
    avatar1,
  ];

  const renderAvatarImages = (avatars) => {
    return avatars.map((avatar, index) => (
      <img
        className="choose-avatar-image"
        key={index}
        src={avatar}
        width={140}
        height={140}
        onClick={() => {
          handleAvatarClick(avatar);
        }}
      />
    ));
  };

  const handleAvatarClick = (avatar) => {
    dispatch(addAvatar(avatar));
  };

  return (
    <div className="choose-avatar">
      <div className="avatar-col-1">
        <span className="sub-col-left">
          <span
            onClick={() => {
              navigate(
                isPathUpdateProfile ? "/update-profile" : "/create-profile"
              );
            }}
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
            <img src={selectedAvatar} width={70} height={70} />
          )}
        </span>
      </div>

      {/* Avatar Carousel */}

      <div className="avatar-col-2">
        <label>The Classics</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(classicAvatars)}
        </Carousel>
      </div>
      <div className="avatar-col-3">
        <label>Homelander</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(homelanderAvatars)}
        </Carousel>
      </div>
      <div className="avatar-col-4">
        <label>Heisenberg</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(heisenbergAvatars)}
        </Carousel>
      </div>
      <div className="avatar-col-5">
        <label>The Witcher</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(witcherAvatars)}
        </Carousel>
      </div>
    </div>
  );
};
export default ChooseAvatar;
