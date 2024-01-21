import { uploadReview } from "../controllers/review.controller.js"
import { verifyUser } from "../middlewares/auth.middlewares.js" 
import { Router } from 'express'

const router = Router()

router.route('/upload-review/:productId').post(verifyUser, uploadReview)



export default router

