import { useContext } from "react";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/MovieContext";

const Favorites = () => {
  const { favorites } = useContext(MovieContext);
  return (
    <div className="flex justify-center flex-wrap flex-grow dark:bg-gray-dark-main">
      {favorites.length === 0 ? (
        <div>
          <h2 className="mt-20 font-bold text-lg dark:text-white">
            Your favorites list is empty.
          </h2>
        </div>
      ) : (
        favorites.map((movie) => <MovieCard key={movie.id} {...movie} />)
      )}
    </div>
  );
};

export default Favorites;
