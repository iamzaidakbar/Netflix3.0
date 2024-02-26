import { useState, useEffect } from 'react';

const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down, you can customize the threshold
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    console.log(scrolled)
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]); // Empty dependency array means this effect will only run once on mount

  return scrolled;
};

export default useScroll;
