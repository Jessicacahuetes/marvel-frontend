import { useState, useEffect } from "react";
import axios from "axios";
import { CgChevronDoubleRight } from "react-icons/cg";
import { CgChevronDoubleLeft } from "react-icons/cg";

const Comics = ({ search }) => {
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
          }/comics?limit=${limit}&page=${page}&title=${search}`
        );

        setData(response.data.results);
        setTotalResults(response.data.count); // Total des comics
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page, search]);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(totalResults / limit);

  // Gestion des boutons de pagination
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="comics-title container">
        <h1>Marvel's Comics Books</h1>
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

      <div className="comics-list">
        {data.map((comic) => (
          <div key={comic._id} className="comic-item">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <div className="comic-item-content">
              <h3>{comic.title}</h3>
              <p>
                {comic.description
                  ? comic.description
                  : "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Comics;
