import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import ManageSpots from "./ManageSpots";
import { getUserSpots } from "../../store/spots";


function MySpot({ spot }) {
  const dispatch = useDispatch();
  return (
      <Link to={`/spots/${spot.id}`}>
        <img src={spot.previewImage} alt="" className="spotImage" />
        <h2 className="spotInfo spotCity">{spot.city + ", " + spot.state}</h2>
        <h4 className="spotPrice">${spot.price}/night</h4>
        <p className="spotInfo starRating">{spot.avgStarRating}</p>
      </Link>

  );
}

export default MySpot;