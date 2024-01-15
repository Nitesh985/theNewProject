import React from "react";
import ReviewInfo from "./ReviewInfo";


function Review() {





  const arr = [1,2,3,5,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]


  return (
    <div>
      <div className="text-[#FF9800] text-center font-rubik text-5xl mt-2">
        Reviews
      </div>
      {arr.map(()=>(
        <ReviewInfo />
      ))}
    </div>
  );
}

export default Review;
