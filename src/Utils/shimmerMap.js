import React, { useState, useEffect } from "react";
import Main_Card_Shimmer from "../components/shimmer/ui/main-card-shimmer";

const mockData = [
  {
    id: 1,
    name: "Shimmer 1",
  },
  {
    id: 2,
    name: "Shimmer 2",
  },
  {
    id: 3,
    name: "Shimmer 3",
  },
  {
    id: 4,
    name: "Shimmer 4",
  },
];

const ShimmerMap = () => {
  const [visibleShimmers, setVisibleShimmers] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (visibleShimmers.length < mockData.length) {
        setVisibleShimmers((prev) => [...prev, mockData[prev.length]]);
      } else {
        clearInterval(timer);
      }
    }, 500); // Adjust the delay between showing each shimmer card
    return () => clearInterval(timer);
  }, [visibleShimmers]);

  return (
    <div style={{ display: "flex", gap: "12px", justifyContent: 'start' }}>
      {visibleShimmers.map((shimmer) => (
        <Main_Card_Shimmer key={shimmer.id} w={"300px"} h={"150px"} />
      ))}
    </div>
  );
};

export default ShimmerMap;
