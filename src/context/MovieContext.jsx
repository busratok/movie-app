import { async } from "@firebase/util";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MovieContext = createContext();

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const values = { movies, getMovies, loading, API_KEY };
  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};

export default MovieContextProvider;
