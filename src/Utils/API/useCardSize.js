import { useState, useEffect } from "react";

const useCardSize = (deviceType) => {
  const [cardSize, setCardSize] = useState("100%");

  useEffect(() => {
    if (deviceType === "mobile") {
      setCardSize("100%");
    } else if (deviceType === "tablet") {
      setCardSize("190px");
    } else if (deviceType === "laptop") {
      setCardSize("250px");
    } else if (deviceType === "desktop") {
      setCardSize("300px");
    }
  }, [deviceType]);

  return cardSize;
};

export default useCardSize;
