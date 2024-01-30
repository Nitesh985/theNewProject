import { Router } from 'express'
import { loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/customer.controller.js'
import { upload } from '../middlewares/multer.middlewares.js'
import { verifyUser } from '../middlewares/auth.middlewares.js'

const router = Router()

router.route('/sign-up').post(
    upload.single("avatar"),
    registerUser)

router.route('/sign-in').post(loginUser)

router.route('/sign-out').post(verifyUser, logoutUser)

router.route('/refresh-token').post(refreshAccessToken)



export default router