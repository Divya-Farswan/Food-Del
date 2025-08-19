import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import foodRouter from './Routes/foodRoute.js';
import userRouter from './Routes/userRoute.js';
import cartRouter from './Routes/cartRoute.js';
import { verifyOrder } from './Controllers/orderController.js';
import orderRouter from './Routes/orderRoute.js';
import connectCloudinary from './Config/cloudinaryConfig.js';
import connectDB from './Config/dbConfig.js';

// app config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/verify", verifyOrder)

app.get("/", (req, res) => {
    res.send("API working...")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

