import { useRef } from 'react';

const usePageAnimation = () => {
  const animatePage = () => {
    const root = document.getElementById("root");
    if (root) {
      root.style.transition = "transform 3s";
      root.style.opacity = "1";
      root.style.transform = "scale(1)";

      // Trigger reflow
      root.offsetWidth;

      root.style.transform = "scale(1.2)";
      root.style.opacity = "0.7";
    }
  };

  const handleAnimation = useRef(animatePage);

  const animate = () => {
    handleAnimation.current();
  };

  return animate;
};

export default usePageAnimation;
