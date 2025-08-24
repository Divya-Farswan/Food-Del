import express from "express";
import { stripeWebhook } from "../Controllers/paymentController.js";

const paymentRouter = express.Router();

// Stripe requires raw body for webhook verification
paymentRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

export default paymentRouter;


