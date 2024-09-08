import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  // States
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        //console.log(response.data); // renvoie les informations d'un personnage
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      {data.map((details) => {
        //console.log(details._id); // Pour afficher l'id de chaque heros dans un objet
        /* console.log(details.thumbnail.path + details.thumbnail.extension); */
        return (
          <Link
            className="text-link"
            /*  to={`/comic/${details._id}`} */
            key={details._id}
          >
            <article>
              <h1>{details.name}</h1>
              <img src={details.thumbnail.path + details.thumbnail.extension} />
              <p>{details.description}</p>
            </article>
          </Link>
        );
      })}
    </main>
  );
};

export default Characters;
