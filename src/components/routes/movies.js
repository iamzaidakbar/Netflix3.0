import Shimmer from "../common/shimmer";
import { useEffect } from 'react';

const Movies = () => {
  useEffect(()=>{
    document.title = 'Movies - Netflix'
  },[])
  return (
    <div className="Movies">
      <Shimmer video />
    </div>
  );
};

export default Movies;