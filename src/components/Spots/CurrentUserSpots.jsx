// CurrentUserSpots.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';


// CurrentUserSpots component
// This component fetches and displays the spots owned by the current user
// It uses Redux to manage the state of the spots
// It uses the useEffect hook to fetch the spots when the component mounts
// It uses the useSelector hook to get the spots from the Redux store
// It uses the useDispatch hook to dispatch the fetchSpots action
// It filters the spots to only show those owned by the current user
// It uses the useNavigate hook to navigate to the edit page for each spot
// It displays a message if the user is not logged in
// It maps over the user spots and renders a card for each spot
// It uses a fallback image if the spot does not have a preview image
// It displays the spot name, location, price, and average star rating
// It includes an edit button that navigates to the edit page for the spot
function CurrentUserSpots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots.allSpots));
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!sessionUser) return <h2>Please log in to view your spots.</h2>;

  const userSpots = spots.filter(spot => spot.ownerId === sessionUser.id);

  return (
    <div className="user-spots">
      <h2>Your Spots</h2>
      {userSpots.map(spot => (
        <div key={spot.id} className="spot-card">
          <img src={spot.previewImage} alt={spot.name} />
          <h3>{spot.name}</h3>
          <p>{spot.city}, {spot.state}</p>
          <p>${spot.price} / night</p>
          <p>★ {spot.avgStarRating || "New"}</p>

          <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default CurrentUserSpots;