import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB Connected Successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB Connection Error:", err);
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/food-del`)
    } catch (error) {
        console.error("Error while connecting to MongoDB:", error);
    }
};

export default connectDB;



