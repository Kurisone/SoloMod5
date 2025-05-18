//SpotCard.jsx

import { Link } from 'react-router-dom';
import './SpotCard.css';

// SpotCard component
// This component displays a card for each spot
// It uses the Link component from react-router-dom to navigate to the spot details page
// It takes a spot object as a prop
// It displays the spot image, city, state, price, and average star rating
// It uses a fallback image if the spot does not have a preview image
function SpotCard({ spot }) {
    return (
      <Link to={`/spots/${spot.id}`} className="spot-card-link">
        <div className="spot-card">
          <img src={spot.previewImage || '/fallback.jpg'} alt={spot.name} />
          <div className="spot-info">
            <div>{spot.city}, {spot.state}</div>
            <div>${spot.price} / night</div>
            <div>★ {spot.avgRating === '0.0' ? 'New' : spot.avgRating}</div>
          </div>
        </div>
      </Link>
    );
  }

export default SpotCard;