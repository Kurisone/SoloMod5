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
        // Add 1-3 second delay before fetching
        const delay = 1000 + Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        const res = await fetch(`/api/spots/${spotId}`);
        console.log('Response:', res);
        
        if (res.ok) {
          const data = await res.json();
          console.log('Spot data:', data);
          setSpot(data);
        } else {
          console.error('Failed to fetch spot:', res.status);
        }
      } catch (err) {
        console.error('Error fetching spot:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpot();
  }, [spotId]);

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
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <img src={spot.SpotImages?.[0]?.url} alt={spot.name} width="400" />
      <p>{spot.description}</p>
      <p><strong>${spot.price}</strong> / night</p>
      <p>★ {spot.avgStarRating || "New"}</p>

      <hr style={{ margin: '20px 0' }} />
      <h2>Reviews</h2>
      <SpotReviews spotId={spotId} />
    </div>
  );
}

export default SpotDetails;