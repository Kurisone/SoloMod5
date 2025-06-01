import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewReview } from "../../store/reviews";
import "./SpotReview.css";

function ReviewPage({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await dispatch(createNewReview({
      spotId: Number(spotId),
      review,
      stars: Number(stars)
    }));
    closeModal();
    window.location.reload();
  } catch (res) {
    const data = await res.json();
    if (data?.errors) setErrors(data.errors);
  }
};

  return (
    <form onSubmit={handleSubmit} className="review-page">
      <h1>How was your stay?</h1>
      
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave your review here..."
        required
      />
      
      <div className="star-rating-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hover || stars) ? "filled" : "empty"}`}
            onClick={() => setStars(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
        <span>Stars</span>
      </div>

      {errors.review && <p className="error">{errors.review}</p>}
      {errors.stars && <p className="error">{errors.stars}</p>}

      <button 
        type="submit" 
        className="submit-review-btn"
        disabled={!stars || review.length < 10}
      >
        Submit Your Review
      </button>
    </form>
  );
}

export default ReviewPage;