import { csrfFetch } from "./csrf";

// Action Types
const SET_SPOTS = "spots/setSpots";
const CREATE_SPOT = "spots/createSpot";
const SET_SPOT = "spots/setSpot";
const SET_USER_SPOTS = "spots/setUserSpots";
const REMOVE_SPOT = "spots/removeSpot";
const UPDATE_SPOT = "spots/updateSpot";
const CLEAR_SPOT = "spots/clearSpot";

// Action Creators
const setSpots = (spots) => ({ type: SET_SPOTS, spots });
const setSpot = (spot) => ({ type: SET_SPOT, spot });
const addSpot = (spot) => ({ type: CREATE_SPOT, spot });
const setUserSpots = (spots) => ({ type: SET_USER_SPOTS, spots });
const removeSpot = (spotId) => ({ type: REMOVE_SPOT, spotId });
const spotUpdate = (spot) => ({ type: UPDATE_SPOT, spot });
export const clearSpot = () => ({ type: CLEAR_SPOT });

// Thunks
export const getSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  const spots = await res.json();
  dispatch(setSpots(spots.Spots || spots));
};

export const getSpotById = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`);
  const spot = await res.json();
  dispatch(setSpot(spot));
};

export const createSpot = (spotData) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spotData)
  });
  const spot = await res.json();
  dispatch(addSpot(spot));
  return spot;
};

export const getUserSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");
  const spots = await res.json();
  dispatch(setUserSpots(spots.Spots || spots));
};

export const deleteSpot = (spotId) => async (dispatch) => {
  await csrfFetch(`/api/spots/${spotId}`, { method: "DELETE" });
  dispatch(removeSpot(spotId));
};

export const updateSpot = (spotId, spotData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spotData)
  });
  const spot = await res.json();
  dispatch(spotUpdate(spot));
};

// Reducer
const initialState = { 
  allSpots: [], 
  currentSpot: null, 
  userSpots: [] 
};

export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, allSpots: action.spots };
    case SET_SPOT:
      return { ...state, currentSpot: action.spot };
    case CREATE_SPOT:
      return { ...state, allSpots: [...state.allSpots, action.spot] };
    case SET_USER_SPOTS:
      return { ...state, userSpots: action.spots };
    case UPDATE_SPOT:
      return {
        ...state,
        userSpots: state.userSpots.map(spot => 
          spot.id === action.spot.id ? action.spot : spot
        )
      };
    case REMOVE_SPOT:
      return {
        ...state,
        userSpots: state.userSpots.filter(spot => spot.id !== action.spotId)
      };
    case CLEAR_SPOT:
      return { ...state, currentSpot: null };
    default:
      return state;
  }
}