import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSpots, deleteSpot } from '../../store/spots';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteListing from './DeleteListing';
import './CurrentUserSpots.css';

function CurrentUserSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => Object.values(state.spots.allSpots));
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!sessionUser) {
    return (
      <div className="user-spots-message-container">
        <h2 className="user-spots-message">
          Please log in to view your spots.
        </h2>
      </div>
    );
  }

  const userSpots = spots.filter(spot => spot.ownerId === sessionUser.id);

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
  };

  return (
    <div className="user-spots-container">
      <h1 className="user-spots-header">Your Listings</h1>
      {userSpots.length === 0 ? (
        <div className="no-spots-message">
          You haven't listed any spots yet.
        </div>
      ) : (
        <div className="spots-grid">
          {userSpots.map(spot => (
            <div key={spot.id} className="spot-card">
              <img 
                src={spot.previewImage || 'https://via.placeholder.com/300'} 
                alt={spot.name}
                className="spot-image"
                onClick={() => navigate(`/spots/${spot.id}`)}
              />
              <div className="spot-details">
                <div className="spot-info">
                  <h3 className="spot-title">{spot.name}</h3>
                  <p className="spot-location">
                    {spot.city}, {spot.state}
                  </p>
                  <p className="spot-price">${spot.price} / night</p>
                  <p className="spot-rating">
                    ★ {spot.avgStarRating || "New"}
                  </p>
                </div>
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
      )}
    </div>
  );
}

export default CurrentUserSpots;