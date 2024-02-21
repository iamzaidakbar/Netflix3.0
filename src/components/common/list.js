import React, { useState, useEffect } from "react";
import SmallVideoCard from "./smallVideoCard";
import "../../styles/list.scss";
import useDeviceType from "../../Utils/API/useDevicetype";

const List = ({ data, title }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerScreen, setCardsPerScreen] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const deviceType = useDeviceType();

  useEffect(() => {
    const calculateCardsPerScreen = () => {
      const cardWidth = 250;
      const screenWidth = window.innerWidth;
      const newCardsPerScreen = Math.floor(screenWidth / cardWidth);
      setCardsPerScreen(newCardsPerScreen > 0 ? newCardsPerScreen : 1);
    };

    calculateCardsPerScreen();

    window.addEventListener("resize", calculateCardsPerScreen);

    return () => {
      window.removeEventListener("resize", calculateCardsPerScreen);
    };
  }, []);

  const handleScroll = (direction) => {
    let newIndex;

    // Number of cards to scroll by based on deviceType
    let scrollBy;
    switch (deviceType) {
      case "desktop":
        scrollBy = 7;
        break;
      case "laptop":
        scrollBy = 5;
        break;
      case "tablet":
        scrollBy = 3;
        break;
      case "mobile":
        scrollBy = 1;
        break;
      default:
        scrollBy = 3; // Default value for tablet
    }

    if (direction === "left" && data) {
      newIndex = (startIndex - scrollBy + data?.length) % data?.length;
    } else {
      newIndex = (startIndex + scrollBy) % data?.length;
    }

    setStartIndex(newIndex);

    // Calculate the current page based on the new index and cards per screen
    setCurrentPage(Math.ceil((newIndex + 1) / cardsPerScreen));
  };

  const renderPaginationDashes = () => {
    // Calculate total dashes based on cards per screen
    const totalDashes = Math.ceil(data?.length / cardsPerScreen);

    // Generate dashes with correct styling
    const dashes = Array.from({ length: totalDashes }, (_, index) => (
      <span
        key={index}
        className={index === currentPage - 1 ? "active-dash" : "inactive-dash"}
      ></span>
    ));

    return dashes;
  };

  return (
    <div className="list">
      <span className="title">{title}</span>
      <div className="pagination-indicator">{renderPaginationDashes()}</div>
      <div className="arrow left" onClick={() => handleScroll("left")}>
        <span className="material-icons-outlined">arrow_back_ios</span>
      </div>
      <div className="showcase">
        {data &&
          [...data, ...data, ...data]
            .map((item, index) => (
              <SmallVideoCard key={index} item={item} videoId={item.id} />
            ))
            .slice(startIndex, startIndex + cardsPerScreen)}
      </div>
      <div className="arrow right" onClick={() => handleScroll("right")}>
        <span className="material-icons-outlined">arrow_forward_ios</span>
      </div>
    </div>
  );
};

export default List;
