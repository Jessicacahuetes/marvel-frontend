import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CgChevronDoubleRight } from "react-icons/cg";
import { CgChevronDoubleLeft } from "react-icons/cg";
import comicsmarvel from "../img/comics-marvel.jpg";

const Home = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/characters?limit=${limit}&page=${page}&name=${search}`
        );
        console.log(
          `${
            import.meta.env.VITE_API_URL
          }/characters?limit=${limit}&page=${page}&name=${search}`
        );

        const newData = response.data.results;

        setData(newData);
        setTotalResults(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, search]);

  //pour afficher le nombre de pages sur le nombre total de page Math.ceil() pour arrondir au plus petit entier supérieur ou égal
  let totalPages;
  if (totalResults === 0) {
    totalPages = 1;
  } else {
    totalPages = Math.ceil(totalResults / limit);
  }

  // pour gérer la navigation entre les pages
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page * limit < totalResults) {
      setPage(page + 1);
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="hero">
        <img src={comicsmarvel} alt="" />
        <div className="title">
          <h1>Marvel's Characters</h1>
        </div>
      </div>
      <div className="pagination container">
        <div className="pagination-btn">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={page === 1 ? "display" : ""}
          >
            <CgChevronDoubleLeft className="previous" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={page === totalPages ? "display" : ""}
          >
            <CgChevronDoubleRight className="next" />
          </button>
        </div>
        <span>
          {page} ______ {totalPages}
        </span>
      </div>
      <div className="divider"></div>
      <div className="container">
        <div className="card-container">
          {data.map((character) => (
            <Link
              to={`/character/${character._id}`}
              key={character._id}
              state={{ name: character.name }} // On transmet le nom dans le state
            >
              <div className="card-content">
                <h3>{character.name}</h3>
                <p>{character.description ? character.description : ""}</p>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
