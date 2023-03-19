import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
const defaultImg =
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2056&q=80";

const MovieCard = ({ title, poster_path, overview, vote_average, id }) => {
  const { currentUser } = useContext(AuthContext);
  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else if (vote > 0) {
      return "red";
    }
  };
  const navigate = useNavigate();
  return (
    <div
      className="movie"
      id="container"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <img
        loading="lazy"
        src={poster_path ? baseImageUrl + poster_path : defaultImg}
        alt="movie-card"
      />
      <div className="flex align-baseline justify-between p-1 text-white">
        <h5>{title}</h5>
        {currentUser && (
          <span className={`tag ${getVoteClass(vote_average)}`}>
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
