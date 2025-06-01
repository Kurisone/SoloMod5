import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { deleteUserReview, fetchReviews } from "../../store/reviews";
import ReviewPage from "./ReviewPage";
import "./SpotReview.css";

function SpotReviews({ spotId }) {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const { spotReviews } = useSelector(state => state.reviews);
  const currentUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots[spotId]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handleDelete = (reviewId) => dispatch(deleteUserReview(reviewId));
  const handlePostReview = () => setModalContent(<ReviewPage spotId={spotId} />);
  
  useEffect(() => {
    const loadReviews = async () => {
      try {
        await dispatch(fetchReviews(spotId));
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load reviews");
        setIsLoading(false);
      }
    };
    
    loadReviews();
  }, [dispatch, spotId]);

  // Sort reviews by date (newest first)
  const sortedReviews = [...spotReviews].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Check if current user can post a review
  const canPostReview = currentUser && 
    !spotReviews.some(review => review.userId === currentUser.id) && 
    currentUser.id !== spot?.Owner?.id;

  const StarRatingDisplay = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25;
    
    return (
      <div className="star-rating-display">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= fullStars) {
            return <span key={star} className="star filled">★</span>;
          } else if (star === fullStars + 1 && hasHalfStar) {
            return <span key={star} className="star half">½</span>;
          } else {
            return <span key={star} className="star empty">☆</span>;
          }
        })}
        <span className="rating-value">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const calculateAverageRating = () => {
    if (spotReviews.length === 0) return 0;
    const sum = spotReviews.reduce((total, review) => total + review.stars, 0);
    return sum / spotReviews.length;
  };

  if (isLoading) return <div className="loading-reviews">Loading reviews...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="spot-reviews-container">
      <div className="reviews-header">
        <div className="rating-summary">
          <StarRatingDisplay rating={calculateAverageRating()} />
          <span className="separator-dot">·</span>
          <span className="review-count">
            {sortedReviews.length} review{sortedReviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {canPostReview && (
        <button 
          onClick={handlePostReview}
          className="post-review-btn"
        >
          Post Your Review
        </button>
      )}

      {sortedReviews.length === 0 ? (
        <p className="no-reviews">
          {currentUser ? "Be the first to review!" : "No reviews yet"}
        </p>
      ) : (
        <ul className="reviews-list">
          {sortedReviews.map((review) => (
            <li key={review.id} className="review-item">
              <div className="review-header">
                <h3 className="reviewer-name">
                  {review.User?.firstName} {review.User?.lastName}
                </h3>
                <StarRatingDisplay rating={review.stars} />
              </div>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </p>
              <p className="review-text">{review.review}</p>
              {currentUser?.id === review.userId && (
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="delete-review-btn"
                >
                  Delete Review
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SpotReviews;