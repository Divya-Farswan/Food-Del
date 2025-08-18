import express from 'express'
import { addToCart, removeFromCart, getCart } from '../Controllers/cartController.js'
import cartAuth from '../Middleware/cartAuth.js';
const cartRouter = express.Router();

cartRouter.post("/add", cartAuth, addToCart)
cartRouter.post("/remove", cartAuth, removeFromCart)
cartRouter.get("/get", cartAuth, getCart)

export default cartRouter;