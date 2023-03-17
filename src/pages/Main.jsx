import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import { MovieContext } from "../context/MovieContext";
import { toastErrorNotify } from "../helpers/ToastNotify";

const Main = () => {
  const { movies, loading, API_KEY, getMovies } = useContext(MovieContext);

  const { currentUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser && search) {
      getMovies(SEARCH_API);
    } else if (!currentUser) {
      toastErrorNotify("Please log in to search");
      navigate("/login");
    } else {
      toastErrorNotify("Please enter a movie");
    }
  };
  return (
    <>
      <form className="flex justify-center p-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className="btn-danger-bordered">
          Submit
        </button>
      </form>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div class="flex items-center justify-center mt-56">
            <div
              class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </>
  );
};

export default Main;
