//HomePage.jsx
import SpotsPage from '../Spots/SpotsPage';
import './HomePage.css';
import React from 'react';
// HomePage component
// This component serves as the landing page for the application
// It imports the SpotsPage component to display a list of available spots
// It includes a welcome message and a brief description of the app
export default function HomePage() {
  return (
    <div className="home-page">
        <h1>Welcome to Our App</h1>
        <p>Discover amazing spots around the world.</p>
        <SpotsPage />
    </div>
  );
}