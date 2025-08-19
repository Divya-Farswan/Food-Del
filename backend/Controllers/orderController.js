export const placeOrder = async (req, res) => {
  try {
    // Skip Stripe completely
    return res.json({ success: true, message: "Order placed (Stripe ignored)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
