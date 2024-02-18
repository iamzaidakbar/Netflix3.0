import React, { useMemo } from 'react';
import VideoCard from "../common/videoCard";

const Home = () => {
  // Memoize the VideoCard component
  const memoizedVideoCard = useMemo(() => <VideoCard />, []);

  return (
    <div className="Home">
      {memoizedVideoCard}
    </div>
  );
};

export default Home;
