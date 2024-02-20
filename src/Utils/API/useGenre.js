import { useState, useEffect } from 'react';

const useGenre = (genreIds, separator = '  •  ') => {
  const [genres, setGenres] = useState('');

  useEffect(() => {
    const genresData = {
      10759: "Action & Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      10762: "Kids",
      9648: "Mystery",
      10763: "News",
      10764: "Reality",
      10765: "Sci-Fi & Fantasy",
      10766: "Soap",
      10767: "Talk",
      10768: "War & Politics",
      37: "Western",
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

    // Set the genre values based on the provided genreIds
    const genreArray = genreIds
      .map((id) => genresData[id])
      .filter((genre) => genre !== undefined && genre !== null);

    setGenres(genreArray.join(separator));
  }, [genreIds, separator]);

  return genres;
};

export default useGenre;
