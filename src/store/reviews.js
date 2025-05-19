import { csrfFetch } from "./csrf";

// Action Types
const GET_REVIEWS = "reviews/GET";
const ADD_REVIEW = "reviews/ADD";
const REMOVE_REVIEW = "reviews/REMOVE";

// Action Creators
const getReviews = (reviews) => ({ type: GET_REVIEWS, reviews });
const createReview = (review) => ({ type: ADD_REVIEW, review });
const removeReview = (reviewId) => ({ type: REMOVE_REVIEW, reviewId });

// Thunks
export const fetchReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const { Reviews } = await res.json();
  dispatch(getReviews(Reviews));
};

export const createNewReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review)
  });
  const newReview = await res.json();
  dispatch(createReview(newReview));
  return newReview;
};

export const deleteUserReview = (reviewId) => async (dispatch) => {
  await csrfFetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
  dispatch(removeReview(reviewId));
};

// Reducer
const initialState = { spotReviews: [] };

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return { ...state, spotReviews: action.reviews };
    case ADD_REVIEW:
      return { ...state, spotReviews: [...state.spotReviews, action.review] };
    case REMOVE_REVIEW:
      return {
        ...state,
        spotReviews: state.spotReviews.filter(review => review.id !== action.reviewId)
      };
    default:
      return state;
  }
}