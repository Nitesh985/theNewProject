import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ReviewInfo from "./ReviewInfo";
import axios from 'axios'


function Review() {
  const { productId } = useParams()
  const [reviews, setReviews] = useState(null)


  useEffect(()=>{
    axios
    .get(`http://localhost:3000/api/v1/products/get-reviews/${productId}`)
    .then((res)=>{
      setReviews(res?.data?.data)
    })
    .catch(error=>{
      console.log(error)
    })

  }, [])
  
  console.log("Reviews::", reviews)

  return (
    <div>
      <div className="text-[#FF9800] text-center font-rubik text-5xl mt-2">
        Reviews
      </div>
      {reviews && reviews.map((reviewData)=>(
        <ReviewInfo {...reviewData} />
      ))}
    </div>
  );
}

export default Review;
