import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Review } from '../models/review.models.js' 


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



export {
  uploadReview
}





