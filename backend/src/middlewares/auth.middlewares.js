import { ApiError } from "../utils/ApiError.js"
import { Customer } from "../models/customer.models.js"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js"


const verifyUser = asyncHandler(async (req, res, next) => {
    const accessToken = req?.cookies?.accessToken || req.headers.authorization

    if (!accessToken){
        throw new ApiError(401, "The user is not authenticated")
    }
    
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

 
    if (!decoded){
        throw new ApiError(500, "Something went wrong getting user data")
    }

    const user = await Customer.findById(decoded._id)

    if (!user){
        throw new ApiError(400, "Bad request :: The user is not authenticated for that action")
    }

    req.user = user
    next()
})

export { verifyUser }