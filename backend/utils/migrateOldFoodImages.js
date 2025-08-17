import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import foodModel from "../Models/foodModel.js";  // your mongoose model

dotenv.config();

const migrateLocalImagesToCloudinary = async () => {
  try {
    // 1. Connect to DB
    await mongoose.connect(`${process.env.MONGODB_URI}/food-del`)
    console.log("MongoDB connected");

    // 2. Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // 3. Find foods with old images (not Cloudinary URLs)
    const items = await foodModel.find({
      image: { $not: { $regex: /^https:\/\/res\.cloudinary\.com/ } },
    });

    console.log(`Found ${items.length} items to migrate...`);

    // 4. Loop through and upload each image, then update DB
    for (const item of items) {
      const oldImage = item.image;
      const localImagePath = path.join("./uploads", oldImage);  // adjust to your local images folder

      if (fs.existsSync(localImagePath)) {
        try {
          const result = await cloudinary.uploader.upload(localImagePath);
          item.image = result.secure_url;
          await item.save();
          console.log(`Updated item ${item._id} with Cloudinary URL`);

          // Delete old local image after successful upload and save
          console.log(`🗑️ Trying to delete: ${localImagePath}`);
          fs.unlinkSync(localImagePath);
          console.log(`✅ Deleted: ${localImagePath}`);

          console.log(`Deleted local image: ${localImagePath}`);
        } catch (uploadError) {
          console.error(`Failed to migrate image for item ${item._id}:`, uploadError.message);
        }
      } else {
        console.warn(`Image file not found: ${localImagePath}`);
      }

    }

    console.log("Image migration completed.");
    process.exit(0);  // exit after done
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  }
};

migrateLocalImagesToCloudinary();
