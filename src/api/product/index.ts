import { Router } from "express";
import multer from 'multer';
import {
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler
} from "./product.controller";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";

const upload = multer({
  dest: './uploads/products',
  preservePath: true,
})

const router = Router()

// /api/products -> GET
router.get('/', getAllProductsHandler)

// /api/products -> POST
router.post('/', isAuthenticated, hasRole(['ADMIN']), upload.single('image'), createProductHandler)

// /api/products -> PATCH
router.patch('/', isAuthenticated, hasRole(['ADMIN']), updateProductHandler)


export default router