import { useNavigate } from "react-router-dom";
import FavIcon from "../assets/icons/FavIcon";

const FavComp = () => {
  const navigate = useNavigate();
  return (
    <span
      className="mr-2 cursor-pointer opacity-50 hover:opacity-100"
      onClick={() => navigate("/favorites")}
    >
      <FavIcon isFavorite={true} />
    </span>
  );
};

export default FavComp;
