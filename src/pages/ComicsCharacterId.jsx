// Pour utiliser l'id passée en params dans le Link de la page Home

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const ComicsCharacterId = () => {
  // States

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Récupération de l'id du personnage

  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics/${characterId}`
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [characterId]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div>
        <h1>Retrouvez toutes les BD de votre personnage préféré {data.name}</h1>
        <img src={data.thumbnail.path + data.thumbnail.extension} />
      </div>
      {data.comics.map((comic, index) => {
        //console.log(comic);
        return (
          <article key={index}>
            <h2>{comic.title}</h2>
            <img src={comic.thumbnail.path + comic.thumbnail.extension} />
            <p>{comic.description}</p>
          </article>
        );
      })}
    </main>
  );
};

export default ComicsCharacterId;
