import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUserReview, fetchReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import ReviewPage from "./ReviewPage";
import "./SpotReview.css";

function SpotReview({ spotId }) {
  const dispatch = useDispatch();
  const { spotReviews } = useSelector(state => state.reviews);
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  const handleDelete = (reviewId) => dispatch(deleteUserReview(reviewId));

  return (
    <div className="reviews-container">
      {currentUser && (
        <OpenModalButton
          buttonText="Leave a Review"
          modalComponent={<ReviewPage spotId={spotId} />}
          className="review-button"
        />
      )}

      <ul className="reviews-list">
        {spotReview?.map(({ id, User, review, userId }) => (
          <li key={id} className="review-item">
            <h3>{User?.firstName} {User?.lastName}</h3>
            <p>{review}</p>
            {currentUser?.id === userId && (
              <button 
                onClick={() => handleDelete(id)}
                className="delete-button"
              >
                Delete Review
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpotReview;