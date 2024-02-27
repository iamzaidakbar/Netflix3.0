import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import makeApiRequest from "../../Utils/API/useFetchGenre";
import VCard from "../common/v-card";
import "../../styles/explore-genre.scss";
import Footer from "../common/footer";
import { genre_names } from "../../Utils/constants";

const ExploreGenre = () => {
  const [genres, setGenres] = useState(null);
  const { id: genreID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeApiRequest(genreID);
        setGenres(response);
      } catch (error) {
        console.error("Error fetching genre data:", error);
      }
    };

    fetchData();
  }, [genreID]);

  const memoizedCard = useMemo(() => {
    if (genres === null) return <h2>Loading...</h2>;

    const items = genres?.map((genre) => (
      <VCard key={genre?.id} data={genre} flag={false} />
    ));

    return items;
  }, [genres]);


  return (
    <>
      <label className="explore-genre-label-wrapper">
        <span className="text">Genre</span>
        <span className="material-icons-outlined">arrow_forward_ios</span>
        <span className="genre-label">
          {genre_names[genreID]}
        </span>
      </label>
      <div className="explore-genre">{memoizedCard}</div>
      <Footer />
    </>
  );
};

export default ExploreGenre;
