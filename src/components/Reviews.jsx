import { useEffect, useState } from "react";
import "./Reviews.css"; // Optional CSS if you want to style it separately

const Reviews = ({ partId }) => {
  const [reviews, setReviews] = useState([]);
  

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const reviewText = e.target[0].value;
    const rating = e.target[1].value;

    const reviewData = {
      buyer_email: JSON.parse(localStorage.getItem("user")).email,
      part_id: partId,
      review_text: reviewText,
      rating: parseInt(rating),
    };

    try {
      const res = await fetch(`http://localhost:3000/api/parts/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        setReviews((prevReviews) => [...prevReviews, reviewData]);
        e.target.reset(); // Reset the form after submission
      } else {
        console.error("Failed to submit review:", res.statusText);
      }
    } catch (err) {
      console.error("Error submitting review:", err.message);
    }
  }


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/parts/reviews/${partId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log(data);

        if (Array.isArray(data)) setReviews(data);
      } catch (err) {
        console.error("Error loading reviews:", err.message);
      }
    };

    if (partId) {
      fetchReviews();
    }
  }, [partId]);

  return (
    <>
    <div className="section p-3 rounded write-review-container">
      <h3 className="text-white mb-5">Write a Review</h3>
      <form onSubmit={handleSubmitReview} className="review-form flex flex-col gap-4">
        <textarea
          className="review-textarea"
          placeholder="Write your review here..."
          required
        ></textarea>
        <select className="review-rating" required>
          <option value="" disabled selected>Select Rating</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
        <button type="submit" className="p-1 rounded submit-review-btn">Submit Review</button>
      </form>
    </div>
    <div className="section reviews-container bg-black rounded min-h-[500px] max-h-[500px]">
      <h3 className="text-white mb-5">Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((rev, i) => (
          <div key={i} className="review-item rounded p-4 mb-2">
            <div className="review-header">
              <strong>{rev.buyer_email}</strong>
              <span className="review-rating">⭐ {rev.rating}/5</span>
            </div>
            <p className="review-text">{rev.review_text}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
    </>
  );
};

export default Reviews;
