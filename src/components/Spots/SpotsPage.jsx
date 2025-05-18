//SpotsPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from '../../store/spots';
import SpotCard from './SpotCard';
import './SpotsPage.css' 


// SpotsPage component
// This component fetches and displays a list of spots
// It uses Redux to manage the state of the spots
// It uses the useEffect hook to fetch the spots when the component mounts
// It uses the useSelector hook to get the spots from the Redux store
// It uses the useDispatch hook to dispatch the fetchSpots action
// It maps over the spots and renders a SpotCard for each spot
function SpotsPage() {
const dispatch = useDispatch(); 
const spots = useSelector(state => Object.values(state.spots.allSpots));
useEffect(() => {
    dispatch(fetchSpots());
}, [dispatch]);
console.log("Spots data:", useSelector(state => state.spots));
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