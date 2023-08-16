import React, { useState } from "react";
import { addRatingAndReview } from "../../axios/services/HomeServices";

const AddReview = ({ docId }) => {
  const [review, setReview] = useState("");
  const [selectedRating, setSelectedRating] = useState('');

  const userId = JSON.parse(localStorage.getItem("user")).userExists?.id;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(review && selectedRating){
      const reviewData = {
        userId: userId, 
        docId: docId, 
        rating: selectedRating,
        review: review,
      };
        console.log(review, selectedRating);
     const response = await addRatingAndReview(reviewData,token)
       
    }else{
        alert("please add your rating and review")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label>Review</label>
        <div class="star-rating">
          {[5, 4, 3, 2, 1].map((value) => (
            <>
              <input
                id={`${value}`}
                type="radio"
                name="rating"
                value={`${value}`}
                checked={selectedRating === `${value}`}
                onChange={handleRatingChange}
              />
              <label key={value} for={`${value}`} title={`${value} star`}>
                <i class="active fa fa-star"></i>
              </label>
            </>
          ))}
        </div>
      </div>
      <div class="form-group">
        <label>Your review</label>
        <textarea
          id="review_desc"
          maxlength="100"
          class="form-control"
          onChange={handleChange}
        ></textarea>

        <div class="d-flex justify-content-between mt-3">
          <small class="text-muted">
            <span id="chars">100</span> characters remaining
          </small>
        </div>
      </div>
      <hr />
      <div class="submit-section">
        <button type="submit" class="btn btn-primary submit-btn">
          Add Review
        </button>
      </div>
    </form>
  );
};

export default AddReview;
