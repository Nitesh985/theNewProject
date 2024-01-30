import { ApiError } from "../utils/ApiError.js"
import { Customer } from "../models/customer.models.js"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js"


const verifyUser = asyncHandler(async (req, res, next) => {

    const accessToken = req?.cookies?.accessToken || req?.header("authorization")?.split(" ")[1]


    if (!accessToken){
        throw new ApiError(401, "The user is not authenticated")
    }
    
    let userId

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
        if (err){
            throw new ApiError(401, err?.message || "The token is invalid or has expired")
        }
        userId = data?._id
    })  


    const user = await Customer.findById(userId)

    if (!user){
        throw new ApiError(404, "The user by that id is not found")
    }

    req.user = user
    next()
})

export { verifyUser }