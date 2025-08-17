import express from 'express'
import  { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../Controllers/orderController.js';
import cartAuth from '../Middleware/cartAuth.js';

const orderRouter = express.Router();

orderRouter.post("/place", cartAuth, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/usersorders", cartAuth, userOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter;