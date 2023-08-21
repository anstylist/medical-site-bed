import { Router } from "express";
import {
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler
} from "./product.controller";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";

const router = Router()

// /api/products -> GET
router.get('/', getAllProductsHandler)

// /api/products -> POST
router.post('/', isAuthenticated, hasRole(['ADMIN']), createProductHandler)

// /api/products -> PATCH
router.patch('/', isAuthenticated, hasRole(['ADMIN']), updateProductHandler)





export default router