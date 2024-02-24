export const VIDEO_URL = "https://www.youtube.com/watch?v=";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w300";
export const MOVIES_KEY = "trending/movie/day";
export const GOOGLE_SUGGESTION_API = "https://corsproxy.io/?http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TOKEN,
  },
};

export const genre_details = {
  "animation": 16,
  "comedy": 35,
  "drama": 18,
  "family": 10751,
  "mystery": 9648,
  "action": 28,
  "adventure": 12,
  "fantasy": 14,
  "history": 36,
  "horror": 27,
  "music": 10402,
  "science_fiction": 878,
  "tv_movie": 10770,
  "thriller": 53,
};

export const genre_names = {
  16: "Animation",
  35: "Comedy",
  18: "Drama",
  10751: "Family",
  9648: "Mystery",
  28: "Action",
  12: "Adventure",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
};

