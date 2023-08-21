import { Router } from "express";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";
import { createOrderHandler, getAllOrderHandler } from "./order.controller";

const router = Router()

// /api/orders -> POST
router.post('/', isAuthenticated, createOrderHandler);

// /api/orders -> GET
router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllOrderHandler);

export default router