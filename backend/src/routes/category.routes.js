import { getAllCategories } from "../controllers/category.controller.js"
import { Router } from 'express'

const router = Router()
router.route('/get-all-categories:categoryId').get(getAllCategories)


export default router
