import foodModel from "../Models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";

// Add food item
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image.path);

    // Get the secure URL
    const imageUrl = result.secure_url;

    console.log(name, description, price, category)
    console.log(imageUrl)

    const foodData = {
      name,
      description,
      category,
      price: Number(price),
      image: imageUrl,
      date: Date.now()
    }

    // add product using product model
    const product = new foodModel(foodData)
    await product.save()            // save product in db

    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("addFood error:", error);
    res.json({ success: false, message: "Error adding food item" });
  }
};

// List food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, foods });
  } catch (error) {
    console.error("list Food error:", error);
    res.json({ success: false, message: "Error fetching food list" });
  }
};

// Remove food
const removeFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
