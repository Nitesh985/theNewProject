import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ReviewInfo from "./ReviewInfo";
import axios from 'axios'
import CreateReview from './CreateReview'

 
function Review() {
  const { productId } = useParams()
  const [reviews, setReviews] = useState(null)
  const [reviewData, setReviewData] = useState({
    stars: 5,
    comment:"",
  });

  useEffect(()=>{
    axios
    .get(`/api/v1/products/get-reviews/${productId}`)
    .then((res)=>{
      setReviews(res?.data?.data?.reviewers)
    })
    .catch(error=>{
      console.log(error)
    })

  }, [reviewData])

  return (
    <div>
      <div className="text-[#FF9800] text-center font-bold text-4xl mt-6">
        Reviews
      </div>
      <CreateReview reviewData={reviewData} setReviewData={setReviewData}  />
      <div className="mt-5" >
        {reviews && reviews.map((reviewData)=>(
          <ReviewInfo key={reviewData._id} {...reviewData} />
        ))}
      </div>
    </div>
  );
}

export default Review;
