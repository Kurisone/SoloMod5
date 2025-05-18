//SpotsDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


// SpotDetails component
// This component fetches and displays the details of a specific spot
// It uses the useParams hook to get the spotId from the URL
// It uses the useEffect hook to fetch the spot details when the component mounts
// It uses the useState hook to manage the state of the spot
// It fetches the spot details from the server using the spotId
// It displays the spot name, location, image, description, price, and average star rating
// It handles loading state and error handling
function SpotDetails() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
        try {
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
          }
    };

    fetchSpot();
  }, [spotId]);


  // Check if spot is null or undefined
  // If it is, return a loading message
  // This is to handle the case when the spot data is still being fetched
  // This prevents the component from trying to access properties of an undefined object
  // This is a common pattern in React to handle asynchronous data fetching
  // It ensures that the component only tries to render the spot details when the data is available
  // This is important for preventing errors and ensuring a smooth user experience
  // It also helps to avoid rendering a blank page or an error message
  // while the data is being fetched
  if (!spot) return <h2>Loading spot details...</h2>;

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <img src={spot.SpotImages?.[0]?.url} alt={spot.name} width="400" />
      <p>{spot.description}</p>
      <p><strong>${spot.price}</strong> / night</p>
      <p>★ {spot.avgStarRating || "New"}</p>
    </div>
  );
}


// Export the SpotDetails component
export default SpotDetails;