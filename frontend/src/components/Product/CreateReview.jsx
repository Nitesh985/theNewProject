import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function CreateReview() {
  const {productId} = useParams()

  const [reviewData, setReviewData] = useState({
    stars:5,
    comment:"",
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post(`/api/v1/reviews/upload-review/${productId}`, reviewData)
    console.log(response)
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setReviewData(prevData=>{
      return {
        ...prevData,
        [name]:value
      }
    })
  }

  return (
    <div >
      <input 
      type="text" 
      className='w-full indent-3 h-10 mt-2 placeholder:opacity-65'
      placeholder='Add a review...'
      name="comment"
      value={reviewData.comment}
      onChange={handleChange} 
       />
      
      <div className='flex items-center gap-5'>
        <button className='items-center border w-[100px] h-[35px] mt-3 hover:bg-gray-700 '
          onClick={handleSubmit}
        >Add Review</button>
        <div className="rating rating-md " >
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
    </div>
  )
}

export default CreateReview