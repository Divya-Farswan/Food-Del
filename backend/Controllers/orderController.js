import Stripe from 'stripe'
import orderModel from './../Models/orderModel.js';
import userModel from './../Models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {

  const frontend_url = process.env.FRONTEND_URL;

  try {
    // new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    })

    // save in db
    await newOrder.save();

    // clear the user cart after placing order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

    // create line items 
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100
      },

      quantity: item.quantity,
    }))

    // push delivery charges in line_items
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2000,
      },
      quantity: 1,
    })

    // create session using line_items
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: process.env.FRONTEND_URL + "/success",
      cancel_url: process.env.FRONTEND_URL + "/cancel",
    })

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {

}

const updateStatus = async (req, res) => {

}

const userOrders = async (req, res) => {

}


export { listOrders, placeOrder, updateStatus, userOrders };