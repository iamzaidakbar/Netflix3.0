import { useState, useRef } from "react";
import useFetchShortMovieTrailer from "./useShortMovieTrailer";

const useHover = (id) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const timerRef = useRef(null);

  const fetchShortMovieTrailers = useFetchShortMovieTrailer(id);

  const handleMouseOver = (e) => {
    clearTimeout(timerRef.current);
    e.stopPropagation();

    setIsHovering(true);

    timerRef.current = setTimeout(() => {
      fetchShortMovieTrailers(id).then((fetchedVideos) => {
        const fetchedTrailers = fetchedVideos?.filter(
          (item) => item.type === "Trailer"
        );
        setTrailers(fetchedTrailers);
      });

      setIsActive(true);
    }, 1500);
  };

  const handleMouseLeave = (e) => {
    setIsActive(false);
    setIsHovering(false);
    e.stopPropagation();

    clearTimeout(timerRef.current);
  };

  // Attach event handlers to the appropriate elements

  return { isActive, trailers, handleMouseOver, handleMouseLeave, isHovering };
};

export default useHover;
