import { getAllProducts, getProduct, getReviews, getReviewsByStars, uploadProduct } from "../controllers/product.controller.js";
import { Router} from "express";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route('/get-all-products').get(getAllProducts)
router.route('/get-product/:productId').get(getProduct)
router.route('/upload-product').post(upload.array('images', 5),
uploadProduct)

router.route('/get-reviews/:productId').get(getReviews)

router.route('/get-reviews-by-stars/:productId).get(getReviewsByStars)

export default router