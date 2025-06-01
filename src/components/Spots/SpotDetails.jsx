import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SpotReviews from '../Reviews/SpotReviews';
import './SpotDetails.css';

function SpotDetails() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const delay = 1000 + Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        const res = await fetch(`/api/spots/${spotId}`);
        if (res.ok) {
          const data = await res.json();
          setSpot(data);
        }
      } catch (err) {
        console.error('Error fetching spot:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpot();
  }, [spotId]);

  const handleReserveClick = () => {
    alert("Feature coming soon");
  };

  if (isLoading) {
    return (
      <div className="spot-details-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading spot details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="spot-details-container">
      <div className="spot-details-main">
        <div className="spot-details-content">
          <h1>{spot?.name}</h1>
          <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
          <img src={spot?.SpotImages?.[0]?.url} alt={spot?.name} width="400" />
          <p>{spot?.description}</p>
          <p>★ {spot?.avgStarRating || "New"}</p>
          <hr style={{ margin: '20px 0' }} />
          <h2>Reviews</h2>
          <SpotReviews spotId={spotId} />
        </div>
        
        <div className="spot-callout-box">
          <div className="price-container">
            <span className="price">${spot?.price}</span>
            <span className="per-night"> / night</span>
          </div>
          <button 
            className="reserve-button"
            onClick={handleReserveClick}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpotDetails;