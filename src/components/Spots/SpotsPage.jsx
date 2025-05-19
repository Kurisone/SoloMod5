//Spots/SpotsPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from '../../store/spots';
import SpotCard from './SpotCard'; 
import './SpotsPage.css'



function SpotsPage() { 
  // This component fetches and displays a list of available spots
  // It uses the useEffect hook to fetch the spots when the component mounts
  // It uses the useDispatch hook to dispatch the fetchSpots action
  // It uses the useSelector hook to get the list of spots from the Redux store
  // It maps over the list of spots and renders a SpotCard for each spot
  // It includes a heading and a grid layout for displaying the spots
const dispatch = useDispatch();
  const spots = useSelector(state => {
    return state.spots?.allSpots ? Object.values(state.spots.allSpots) : [];
  });
useEffect(() => {
    dispatch(fetchSpots());
}, [dispatch]);

    return (
        <div className="spots-page">
            <h1>Available Spots</h1>
            <div className="spots-grid">
                {spots.map(spot => (
                    <SpotCard key={spot.id} spot={spot} />
                ))}     
            </div>
        </div>
    );
}

export default SpotsPage;