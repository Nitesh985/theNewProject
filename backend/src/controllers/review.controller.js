import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const uploadReview = asyncHandler(async (req, res)=>{
    const { productId } = req.params
    const { stars, comment } = req.body
    const customerId = req?.user

    if (!stars || !comment){
        throw new ApiError(401, "Stars or comment field is missing")
    }

    const review = await Review.create({
        productId,
        customerId,
        stars,
        comment
    })

    if (!review){
        throw new ApiError(501, "Something went wrong uploading the review")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "The review was stored successfully!")
        )
})


const getReviewsByStars = asyncHandler(async (req, res)=>{
    const {stars} = req.body
    
    if (!stars){
        throw new ApiError(401, "The stars not found")
    }
    
    const reviews = await Review.find({stars})
    
    return res.status(200)
        .json(
            new ApiResponse(200, reviews, "The reviews were fetched successfully!")
        )
})

export {
  uploadReview,
  getReviewsByStars
}





