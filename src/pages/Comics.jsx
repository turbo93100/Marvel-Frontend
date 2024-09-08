/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Comics = ({ search, setSearch }) => {
  // States

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?title=${search}`
        );
        console.log(response.data); // renvoie les informations d'un personnage
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  //------ FAVORIS ------------

  // Chargement des cookies
  useEffect(() => {
    const savedFavorites = Cookies.get("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Fonction pour ajouter ou retirer un favori quand on clique dessus
  const handleFavorite = (comic) => {
    //console.log(comic); //Tableau pour afficher les informations
    let isAlreadyFavorite = false;
    let updatedFavorites = [];

    // Parcourir le tableau des favoris existants

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i]._id === comic._id) {
        // Si le comic est déjà dans les favoris, on passe isAlready à true
        isAlreadyFavorite = true;
      } else {
        // Ajouter le nouveau favoris dans updatedfavoris
        updatedFavorites.push(favorites[i]);
      }
    }

    // Si le comic n'est pas déjà dans les favoris, dans ce cas là, on l'ajoute
    if (!isAlreadyFavorite) {
      updatedFavorites.push(comic);
    }

    //Update des favoris
    setFavorites(updatedFavorites);

    // Transformation d'un tableau en chaine de caractères
    const favoritesToSave = JSON.stringify(updatedFavorites);

    // Mise à jour des cookies avec la nouvelle liste de favoris (expire dans 15 jours)
    Cookies.set("favorites", favoritesToSave, { expires: 15 });
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {data.sort().map((details) => {
        //console.log(details._id); // Pour afficher l'id de chaque heros dans un objet
        /* console.log(details.thumbnail.path + details.thumbnail.extension); */

        //Vérification si l'id du comic est dans les favoris
        const detailsId = details._id;
        // Si le comic n'est pas dans les favoris par défaut
        let isFavorite = false;

        // Parcourir chaque comic dans la liste des favoris
        for (let i = 0; i < favorites.length; i++) {
          const currentFavorite = favorites[i]; // Récupération du comic dans les favoris
          const currentFavoriteId = currentFavorite._id; // Récupérer l'id du comic

          // Vérification pour savoir si l'identifiant du comic est le même que celui du comic
          // que l'on veux vérifier
          if (currentFavoriteId === detailsId) {
            isFavorite = true; // Si les id correspondent, alors le comic est déjà dans les favoris
            break; // On peut arrêter la boucle puisqu'on a trouvé le comic dans les favoris
          }
        }

        return (
          <article key={details._id}>
            <h1>{details.title}</h1>
            <label htmlFor={details._id}>Ajouter aux favoris</label>
            <input
              type="checkbox"
              id={details._id}
              checked={isFavorite}
              onChange={() => handleFavorite(details)} // Ajouter ou retirer des favoris
            />
            <img
              src={details.thumbnail.path + details.thumbnail.extension}
              alt={details.title}
            />
            <p>{details.description}</p>
          </article>
        );
      })}
    </main>
  );
};

export default Comics;
