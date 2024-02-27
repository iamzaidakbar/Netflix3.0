import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("laptop");

  useEffect(() => {
    const updateDeviceType = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 700) {
        setDeviceType("mobile");
      } else if (screenWidth <= 992) {
        setDeviceType("tablet");
      } else if (screenWidth <= 1366) {
        setDeviceType("laptop");
      } else {
        setDeviceType("desktop");
      }
    };

    updateDeviceType();

    // Listen for window resize events to update device type
    window.addEventListener("resize", updateDeviceType);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
