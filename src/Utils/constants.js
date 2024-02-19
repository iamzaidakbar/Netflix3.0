export const VIDEO_URL = "https://www.youtube.com/watch?v=";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w300";
export const MOVIES_KEY = "trending/movie/day";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TOEKN,
  },
};
