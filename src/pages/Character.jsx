import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

const Character = () => {
  const { characterId } = useParams();
  const { state } = useLocation(); // Récupère les données du state
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics/${characterId}`
        );

        // Vérification si la réponse contient des comics
        if (response.data && response.data.comics) {
          setComics(response.data.comics);
        } else {
          setComics([]); // Pas de comics disponibles
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [characterId]);
  const settings = {
    dots: true, // Afficher les points de navigation
    infinite: true, // Répéter le carousel à l'infini
    speed: 600, // Durée de transition en ms
    slidesToShow: 3, // Nombre d'éléments visibles
    slidesToScroll: 1, // Nombre d'éléments défilés à chaque clic
    autoplay: true, // Active l'auto-play
    autoplaySpeed: 2000, // Intervalle de l'auto-play (en ms)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Pour les écrans moyens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Pour les petits écrans
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h1>All comics of {state?.name || "Unknown Character"}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="carousel-container">
          {comics.length > 0 ? (
            <Slider {...settings}>
              {comics.map((comic) => (
                <div className="carousel-item" key={comic._id}>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <h3>{comic.title}</h3>
                  <p>{comic.description}</p>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No comics found for this character.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Character;
