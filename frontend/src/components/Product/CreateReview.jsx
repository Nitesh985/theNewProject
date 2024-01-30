import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import useUserContext from "../../context/UserContext";
import Loader from "../../utils/Loader";

function CreateReview({ reviewData, setReviewData }) {
  const { productId } = useParams();

  const { user, setUserData } = useUserContext();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      alert("You are not allowed to perform that task, please sign in");
      return;
    }
    try {
      setLoading(true)
      await axios.post(
        `/api/v1/reviews/upload-review/${productId}`,
        reviewData
      );
      setReviewData({ stars: 5, comment: "" });

      alert("Review added successfully");
    } catch (error) {
      if (error?.response && error?.response?.status===401){
        axios
        .post('/api/v1/users/refresh-token')
        .then(async ()=>{
          await axios.post(
            `/api/v1/reviews/upload-review/${productId}`,
            reviewData
            )
            setReviewData({ stars: 5, comment: "" });
          alert("Review added successfully");
        })
        .catch(error=>{
          console.log(error)
          if (error?.response && error?.response?.status===403){
            setUserData(null)
            alert('Your session has expired, please log in to your account') 
          }
        });
      }
    } finally {
      setLoading(false)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <Loader loading={loading} >
      <form onSubmit={handleSubmit}>
        <div className="comment-input-container">
          <input
            type="text"
            className="w-full h-10 mt-5 outline-none bg-transparent border-b-[1px] indent-5 border-gray-300 placeholder:opacity-45 focus:border-b-2 focus:input transition-all duration-300 ease-linear"
            placeholder="Add a review..."
            name="comment"
            value={reviewData.comment}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-5">
          <button className="items-center btn border w-[125px] h-[35px] mt-3 hover:bg-orange-600 text-white bg-orange-700">
            Add Review
          </button>
          <div className="rating rating-md ">
            <input
              type="radio"
              name="stars"
              value={1}
              className="mask mask-star-2 bg-yellow-400"
              onChange={handleChange}
            />
            <input
              type="radio"
              name="stars"
              value={2}
              className="mask mask-star-2 bg-yellow-400"
              onChange={handleChange}
            />
            <input
              type="radio"
              name="stars"
              value={3}
              className="mask mask-star-2 bg-yellow-400"
              onChange={handleChange}
            />
            <input
              type="radio"
              name="stars"
              value={4}
              className="mask mask-star-2 bg-yellow-400"
              onChange={handleChange}
            />
            <input
              type="radio"
              name="stars"
              value={5}
              className="mask mask-star-2 bg-yellow-400"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </Loader>
  );
}

export default CreateReview;
