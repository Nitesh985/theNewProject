import { uploadReview, getReviewsByStars } from "../controllers/review.controller.js"
import { verifyUser } from "../middlewares/auth.middlewares.js" 
import { Router } from 'express'

const router = Router()

router.route('upload-review').post(verifyUser, uploadReview)
router.route('get-reviews-by-stars').get(getReviewsByStars)


export default router

