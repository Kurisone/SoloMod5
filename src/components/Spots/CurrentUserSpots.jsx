// CurrentUserSpots.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSpots, deleteSpot } from '../../store/spots';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteListing from './DeleteListing';

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
  const navigate = useNavigate();
  const spots = useSelector(state => Object.values(state.spots.allSpots));
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!sessionUser) return <h2>Please log in to view your spots.</h2>;

  const userSpots = spots.filter(spot => spot.ownerId === sessionUser.id);

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
  };

  return (
    <div className="user-spots">
      <h1>Your Listings</h1>
      <div className="spot-grid">
        {userSpots.map(spot => (
          <div key={spot.id} className="spot-card">
            <img 
              src={spot.previewImage || 'https://via.placeholder.com/300'} 
              alt={spot.name} 
              onClick={() => navigate(`/spots/${spot.id}`)}
            />
            <div className="spot-info">
              <h3>{spot.name}</h3>
              <p>{spot.city}, {spot.state}</p>
              <p>${spot.price} / night</p>
              <p>★ {spot.avgStarRating || "New"}</p>
              
              <div className="spot-actions">
                <button 
                  onClick={() => navigate(`/spots/${spot.id}/edit`)}
                  className="edit-button"
                >
                  Edit
                </button>
                
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteListing 
                      spot={spot} 
                      onConfirm={() => handleDelete(spot.id)} 
                    />
                  }
                  buttonClass="delete-button"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentUserSpots;