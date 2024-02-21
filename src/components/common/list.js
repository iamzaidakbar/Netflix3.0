import React, { useState, useEffect } from "react";
import SmallVideoCard from "./smallVideoCard";
import "../../styles/list.scss";

const List = ({ data, title }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerScreen, setCardsPerScreen] = useState(3);

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
    const lastIndex = data.length - 1;
    let newIndex;

    if (direction === "left") {
      newIndex = startIndex === 0 ? lastIndex : startIndex - 1;
    } else {
      newIndex = startIndex === lastIndex ? 0 : startIndex + 1;
    }

    setStartIndex(newIndex);
  };

  return (
    <div className="list">
      <span className="title">{title}</span>
      <div className="arrow left" onClick={() => handleScroll("left")}>
        <span className="material-icons-outlined">arrow_back_ios</span>
      </div>
      <div className="showcase">
        {[...data, ...data].map((item, index) => (
          <SmallVideoCard key={index} item={item} videoId={item.id} />
        )).slice(startIndex, startIndex + cardsPerScreen)}
      </div>
      <div className="arrow right" onClick={() => handleScroll("right")}>
        <span className="material-icons-outlined">arrow_forward_ios</span>
      </div>
    </div>
  );
};

export default List;
