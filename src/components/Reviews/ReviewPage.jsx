import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewReview } from "../../store/reviews";

function ReviewPage({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
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
    } catch (res) {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-page">
      <h1>Leave a Review</h1>
      
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here"
        required
      />
      
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star}>
            <input
              type="radio"
              name="stars"
              value={star}
              checked={stars === star}
              onChange={() => setStars(star)}
              required
            />
            {star} ★
          </label>
        ))}
      </div>

      {errors.review && <p className="error">{errors.review}</p>}
      {errors.stars && <p className="error">{errors.stars}</p>}

      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewPage;