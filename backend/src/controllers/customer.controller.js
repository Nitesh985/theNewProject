import { Customer } from "../models/customer.models.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'



const registerUser = asyncHandler (async (req, res) => {
    const reqFields = ["email", "username", "password", "contact", "address"]

    const {username, email, password, contact, address, country} = req.body

    reqFields.forEach(field=>{
        if (!req.body[field]){
            throw new ApiError(401, ((field[0].toUpperCase() + field.slice(1)) + " is a required field"))
        }
    })

    const userExists = await Customer.findOne({
        $or:[{email}, {username}]
    })

    if (userExists){
        throw new ApiError(401, "The user by that name or email already exists")
    }

    const avatarPath = req.file?.path
    

    const avatar = avatarPath?await uploadToCloudinary(avatarPath):null

    if (avatarPath && !avatar){
        throw new ApiError(500, "Something went wrong uploading the file")
    }



    const user = await Customer.create({
        email,
        password,
        username,
        contact,
        address,
        avatar,
        country
    })

    const userData = await Customer.findById(user._id).select("-password")


    if (!userData){
        throw new ApiError(500, "Error submitting the data to the database")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, userData, "The user registered sucessfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    
    if ((!username && !email) || !password){
        throw new ApiError(400, "The required fields are not filled")
    }
    
    const user = await Customer.findOne({
        $or:[{username}, {email}]
    })

    if (!user){
        throw new ApiError(401, "The user by that username or the email isn't registered yet")
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    const updatedUser = await Customer.findByIdAndUpdate(user._id, {
        refreshToken,
    }).select('-refreshToken -password')

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, updatedUser, "The user is logged in successfully")
    )
})


const logoutUser = asyncHandler(async (req, res) => {
    try {
        
        const user = await Customer.findByIdAndUpdate(req.user?._id, {
            $set:{
                refreshToken:null
            }
        })

        if (!user){
            throw new ApiError(500, "Something went wrong logging out")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, null, "The user logged out successfully")
        )


    } catch (error) {
        throw new ApiError(500, error.message || "The user couldn't log out due to some internal problems")
    }
})


const refreshAccessToken = asyncHandler(async (req, res)=> {
    const prevRefreshToken = req?.cookies?.refreshToken || req?.header("authorization")?.split(" ")[1]
    if (!prevRefreshToken){
        throw new ApiError(403, "Your session has expired, please log back in")
    }

    let userId;
    jwt.verify(prevRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data)=>{
        if (err){
            throw new ApiError(403, err.message || "The token must have expired")
        }
        userId = data?._id
    })


    const user = await Customer.findById(userId)

    if (!user){
        throw new ApiError(401, "Bad request, the user by that id doesn't exists")
    }

    if (user.refreshToken !== prevRefreshToken){
        throw new ApiError(403, "Your session has expired, please log back in")
    }

    const accessToken = user.generateAccessToken()

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, {}, "The access token was generated successfully")
        )


    
})



export {registerUser, loginUser, logoutUser, refreshAccessToken}