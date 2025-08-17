// routes/foodRouter.js
import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import upload from "../Middleware/multer.js";
import adminAuth from './../Middleware/adminAuth.js';

const foodRouter = express.Router();

// POST - accepts multipart/form-data with field "image"
foodRouter.post("/add",adminAuth, upload.single("image") , addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove",adminAuth, removeFood);

export default foodRouter;
