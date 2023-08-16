import React from "react";

const CommentList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }
  return (
    //   <ul className="comments-list">
    //     {reviews.map((review, index) => (
    //       <li key={index}>
    //         <div className="comment">
    //           <div className="comment-body">
    //             <div className="meta-data">
    //               <div className="user-info">
    //                 <img
    //                   className="avatar avatar-sm rounded-circle"
    //                   alt="User Image"
    //                   src={review.user.image || "assets/img/patients/patient.jpg"}
    //                 />
    //                 <span className="comment-author">
    //                   {`${review.user.firstname} ${review.user.lastname}`}
    //                 </span>
    //               </div>
    //               <div>
    //                 <div className="review-count rating">
    //                   {[...Array(review.rating)].map((_, i) => (
    //                     <i key={i} className="fas fa-star filled"></i>
    //                   ))}
    //                   {[...Array(5 - review.rating)].map((_, i) => (
    //                     <i key={i} className="fas fa-star"></i>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //             <p className="comment-content">{review.review}</p>
    //           </div>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>

    <ul class="comments-list">
      {reviews.map((review, index) => {
        return (
          <li>
            <div class="comment">
              <img
                class="avatar avatar-sm rounded-circle"
                alt="User Image"
                src={review.user.image || "assets/img/patients/patient.jpg"}
              />
              <div class="comment-body">
                <div class="meta-data">
                  <span class="comment-author">
                    {" "}
                    {`${review.user.firstname} ${review.user.lastname}`}
                  </span>

                  <div
                    className="review-count rating"
                    style={{ justifyContent: "flex-end" }}
                  >
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star filled"></i>
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>

                <p class="comment-content">{review.review}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
