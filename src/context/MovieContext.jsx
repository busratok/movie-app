import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MovieContext = createContext();

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = async (API) => {
    try {
      let { data } = await axios(API);
      let { results } = await data;
      setMovies(results);
      setLoading(false);
      console.log(results);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const addToFavorites = (movie) => {
    let isFavorite = favorites.some((item) => item.id === movie.id);
    if (isFavorite) {
      let newFavorites = favorites.filter((item) => item.id !== movie.id);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      let newFavorites = [...favorites, movie];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const values = {
    movies,
    getMovies,
    loading,
    API_KEY,
    addToFavorites,
    favorites,
  };
  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};

export default MovieContextProvider;
