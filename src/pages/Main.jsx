import React, { useContext } from "react";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/MovieContext";

const Main = () => {
  const { movies, loading } = useContext(MovieContext);
  return (
    <div>
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
    </div>
  );
};

export default Main;
