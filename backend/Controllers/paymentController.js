import Stripe from "stripe";
import orderModel from "../Models/orderModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify that the event came from Stripe using webhook secret
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Update order in DB as paid
      await orderModel.findOneAndUpdate(
        { stripeSessionId: session.id },
        { payment: true, paymentId: session.payment_intent }
      );

      console.log("Payment verified for session:", session.id);
    }

    res.status(200).send("ok");
  } catch (err) {
    console.log("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

