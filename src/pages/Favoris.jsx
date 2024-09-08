import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Favoris = () => {
  const [favorites, setFavorites] = useState([]);

  // Enregistrement du cookie
  useEffect(() => {
    const savedFavorites = Cookies.get("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites)); // Charger les favoris si le cookie existe
    }
  }, []);

  return (
    <main>
      <h1>Mes Favoris</h1>
      {favorites.length === 0 ? (
        <p>Aucun favori pour le moment.</p>
      ) : (
        favorites.map((details) => (
          <article key={details._id}>
            <h1>{details.title}</h1>
            <img
              src={details.thumbnail.path + details.thumbnail.extension}
              alt={details.title}
            />
            <p>{details.description}</p>
          </article>
        ))
      )}
    </main>
  );
};

export default Favoris;
