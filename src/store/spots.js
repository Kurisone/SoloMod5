//store/spots.js
// This file contains the Redux slice for managing spots in the application
// It imports the csrfFetch function for making API requests
// It defines action types for loading and updating spots
// It defines the initial state for the spots slice
// It defines action creators for loading and updating spots
// It defines a thunk for fetching spots from the API
// It defines a thunk for updating a spot in the API
// It defines the reducer function for the spots slice
// It exports the reducer and the thunks for use in other parts of the application
// It uses Redux Toolkit to create the slice and manage the state
// It handles loading and updating spots in the Redux store


import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';

const initialState = {
    allSpots: {}
  };

const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
  });
  

  const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
  });

  export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    
    if (response.ok) {
      const { Spots } = await response.json();
      dispatch(loadSpots(Spots)); 
    }
  };

 
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_SPOTS: {
        const spotsState = {};
        action.spots.forEach(spot => {
          spotsState[spot.id] = spot;
        });
        return {
          ...state,
          allSpots: spotsState
        };
      }
  
      case UPDATE_SPOT: {
        return {
          ...state,
          allSpots: {
            ...state.allSpots,
            [action.spot.id]: action.spot
          }
        };
      }
  
      default:
        return state;
    }
  }

  export const updateSpotThunk = (spotId, spotData) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
      });
  
      const updatedSpot = await response.json();
      dispatch(updateSpot(updatedSpot));
      return updatedSpot;
    } catch (err) {
      const errorData = await err.json();
      console.error("Backend returned error: ", JSON.stringify(errorData, null, 2));      throw errorData;
    }
  };