import { useState, useRef } from "react";
import useFetchShortMovieTrailer from "./useShortMovieTrailer";

const useHover = (id) => {
  const [isActive, setIsActive] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const timerRef = useRef(null);

  const fetchShortMovieTrailers = useFetchShortMovieTrailer(id);

  const handleMouseOver = (e) => {
    clearTimeout(timerRef.current);
    e.stopPropagation();

    timerRef.current = setTimeout(() => {
      fetchShortMovieTrailers(id).then((fetchedVideos) => {
        const fetchedTrailers = fetchedVideos.filter(item => item.type === 'Trailer')
        setTrailers(fetchedTrailers);
      });
      setIsActive(true);
    }, 1500);
  };

  const handleMouseLeave = (e) => {
    setIsActive(false);
    e.stopPropagation();

    clearTimeout(timerRef.current);
  };

  return { isActive, trailers, handleMouseOver, handleMouseLeave };
};

export default useHover;
