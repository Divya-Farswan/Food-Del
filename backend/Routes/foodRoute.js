import express from "express";
import { addFood, listFood, removeFood } from "../Controllers/foodController.js";
import upload from "../Middleware/multer.js";
import adminAuth from './../Middleware/adminAuth.js';

const foodRouter = express.Router();

foodRouter.post("/add",adminAuth, upload.single("image") , addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove",adminAuth, removeFood);

export default foodRouter;
