import avatar1 from "../../assets/images/Avatars/avatar1.png";
import avatar2 from "../../assets/images/Avatars/avatar2.png";
import avatar3 from "../../assets/images/Avatars/avatar3.png";
import { Carousel } from "@trendyol-js/react-carousel";
import "../../styles/choose-avatar.scss";
import "../../styles/carousel.scss";
import { useDispatch, useSelector } from "react-redux";
import { addAvatar } from "../../Utils/Slices/profileSlice";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import {
  classic_1,
  classic_2,
  classic_3,
  classic_4,
  classic_5,
  classic_6,
  classic_7,
  classic_8,
  classic_9,
  classic_10,
  classic_11,
  classic_12,
  classic_13,
  classic_14,
  classic_15,
  classic_16,
  black_mirror_1,
  black_mirror_2,
  black_mirror_3,
  black_mirror_4,
  black_mirror_5,
  black_mirror_6,
  black_mirror_7,
  money_heist_1,
  money_heist_2,
  money_heist_3,
  money_heist_4,
  money_heist_5,
  money_heist_6,
  money_heist_7,
  money_heist_8,
  money_heist_9,
  money_heist_10,
  lost_in_space_1,
  lost_in_space_2,
  lost_in_space_3,
  lost_in_space_4,
  lost_in_space_5,
  lost_in_space_6,
  lost_in_space_7,
  lost_in_space_8,
  lost_in_space_9,
  stranger_things_1,
  stranger_things_2,
  stranger_things_3,
  stranger_things_4,
  stranger_things_5,
  stranger_things_6,
  stranger_things_7,
  stranger_things_8,
  stranger_things_9,
  stranger_things_10,
  stranger_things_11,
  stranger_things_12,
  stranger_things_13,
  stranger_things_14,
  stranger_things_15,
  stranger_things_16,
  aggrestsuko_1,
  aggrestsuko_2,
  aggrestsuko_3,
  aggrestsuko_4,
  aggrestsuko_5,
  aggrestsuko_6,
  aggrestsuko_7,
  aggrestsuko_8,
  aggrestsuko_9,
  aggrestsuko_10,
  aggrestsuko_11,
  aggrestsuko_12,
  orange_is_the_new_black_1,
  orange_is_the_new_black_2,
  orange_is_the_new_black_3,
  orange_is_the_new_black_4,
  orange_is_the_new_black_5,
  orange_is_the_new_black_6,
  orange_is_the_new_black_7,
  orange_is_the_new_black_8,
  orange_is_the_new_black_9,
  orange_is_the_new_black_10,
  the_boss_baby_1,
  the_boss_baby_2,
  the_boss_baby_3,
  the_boss_baby_4,
  the_boss_baby_5,
  the_boss_baby_6,
  the_boss_baby_7,
  the_boss_baby_8,
  the_boss_baby_9,
  the_boss_baby_10,
  the_boss_baby_11,
  our_planet_1,
  our_planet_2,
  our_planet_3,
  our_planet_4,
  our_planet_5,
  our_planet_6,
  our_planet_7,
  our_planet_8,
  our_planet_9,
  our_planet_10,
  our_planet_11,
  arcadia_1,
  arcadia_2,
  arcadia_3,
  arcadia_4,
  arcadia_5,
  arcadia_6,
  arcadia_7,
  arcadia_8,
  arcadia_9,
} from "../../Utils/Avatar-Collection/avatar-collection";


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

  const classicAvatars = [
    classic_1,
    classic_2,
    classic_3,
    classic_4,
    classic_5,
    classic_6,
    classic_7,
    classic_8,
    classic_9,
    classic_10,
    classic_11,
    classic_12,
    classic_13,
    classic_14,
    classic_15,
    classic_16,
  ];
  const blackmirror_avatars = [
    black_mirror_1,
    black_mirror_2,
    black_mirror_3,
    black_mirror_5,
    black_mirror_4,
    black_mirror_6,
    black_mirror_3,
    black_mirror_7,
    black_mirror_1,
  ];
  const money_heist_avatars = [
    money_heist_1,
    money_heist_2,
    money_heist_3,
    money_heist_4,
    money_heist_5,
    money_heist_6,
    money_heist_7,
    money_heist_8,
    money_heist_9,
    money_heist_10,
  ];
  const lost_in_space = [
    lost_in_space_1,
    lost_in_space_2,
    lost_in_space_3,
    lost_in_space_4,
    lost_in_space_5,
    lost_in_space_6,
    lost_in_space_7,
    lost_in_space_8,
    lost_in_space_9,
  ];

  const stranger_things = [
    stranger_things_1,
    stranger_things_2,
    stranger_things_3,
    stranger_things_4,
    stranger_things_5,
    stranger_things_6,
    stranger_things_7,
    stranger_things_8,
    stranger_things_9,
    stranger_things_10,
    stranger_things_11,
    stranger_things_12,
    stranger_things_13,
    stranger_things_14,
    stranger_things_15,
    stranger_things_16,
  ];

  const aggrestsuko = [
    aggrestsuko_1,
    aggrestsuko_2,
    aggrestsuko_3,
    aggrestsuko_4,
    aggrestsuko_5,
    aggrestsuko_6,
    aggrestsuko_7,
    aggrestsuko_8,
    aggrestsuko_9,
    aggrestsuko_10,
    aggrestsuko_11,
    aggrestsuko_12,
  ];

  const orange_is_the_new_black = [
    orange_is_the_new_black_1,
    orange_is_the_new_black_2,
    orange_is_the_new_black_3,
    orange_is_the_new_black_4,
    orange_is_the_new_black_5,
    orange_is_the_new_black_6,
    orange_is_the_new_black_7,
    orange_is_the_new_black_8,
    orange_is_the_new_black_9,
    orange_is_the_new_black_10,
  ];

  const the_boss_baby = [
    the_boss_baby_1,
    the_boss_baby_2,
    the_boss_baby_3,
    the_boss_baby_4,
    the_boss_baby_5,
    the_boss_baby_6,
    the_boss_baby_7,
    the_boss_baby_8,
    the_boss_baby_9,
    the_boss_baby_10,
    the_boss_baby_11,
  ];

  const our_planet = [
    our_planet_1,
    our_planet_2,
    our_planet_3,
    our_planet_4,
    our_planet_5,
    our_planet_6,
    our_planet_7,
    our_planet_8,
    our_planet_9,
    our_planet_10,
    our_planet_11,
  ];

  const arcadia = [
    arcadia_1,
    arcadia_2,
    arcadia_3,
    arcadia_4,
    arcadia_5,
    arcadia_6,
    arcadia_7,
    arcadia_8,
    arcadia_9,
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
        <label>Black Mirror</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(blackmirror_avatars)}
        </Carousel>
      </div>

      <div className="avatar-col-4">
        <label>Money Heist</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(money_heist_avatars)}
        </Carousel>
      </div>

      <div className="avatar-col-5">
        <label>Lost In Space</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(lost_in_space)}
        </Carousel>
      </div>

      <div className="avatar-col-6">
        <label>Stranger Things</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(stranger_things)}
        </Carousel>
      </div>

      <div className="avatar-col-7">
        <label>Aggrestsuko</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(aggrestsuko)}
        </Carousel>
      </div>

      <div className="avatar-col-8">
        <label>Orange Is The New Black</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(orange_is_the_new_black)}
        </Carousel>
      </div>

      <div className="avatar-col-8">
        <label>The Boss Baby</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(the_boss_baby)}
        </Carousel>
      </div>

      <div className="avatar-col-9">
        <label>Our Planet</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(our_planet)}
        </Carousel>
      </div>

      <div className="avatar-col-10">
        <label>Arcadia</label>
        <Carousel {...carouselConfig} transition={0.5}>
          {renderAvatarImages(arcadia)}
        </Carousel>
      </div>
    </div>
  );
};
export default ChooseAvatar;
