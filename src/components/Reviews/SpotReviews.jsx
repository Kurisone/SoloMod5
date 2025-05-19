import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUserReview, fetchReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewPage from "./ReviewPage";
import "./SpotReview.css";

function SpotReviews({ spotId }) {
  const dispatch = useDispatch();
  const { spotReviews } = useSelector(state => state.reviews);
  const currentUser = useSelector(state => state.session.user);
  
  const handleDelete = (reviewId) => dispatch(deleteUserReview(reviewId));
  
  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);


  return (
    <div className="spotReviews">
      <OpenModalButton
        buttonText="Leave a Review"
        className='review-btn'
        modalComponent={<ReviewPage spotId={spotId} />}
      />
      <ul>
        {spotReviews.map((spotReview) => {
          return (
            <li key={spotReview.id}>
              <h3>
              {spotReview.User?.firstName} {spotReview.User?.lastName}
              </h3>
              <p>{spotReview.review}</p>
              {currentUser?.id === spotReview.userId && (
                <button onClick={() => handleDelete(spotReview.id)}>
                  Delete Review
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SpotReviews;