import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cancel.css"; // Import CSS file

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // After a short delay, redirect to cart again
    const timer = setTimeout(() => {
      navigate("/cart");
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="cancel-container">
      <h1 className="cancel-title">❌ Payment Cancelled</h1>
      <p className="cancel-message">Your order was not completed.</p>
      <p className="cancel-redirect">Redirecting you back to cart...</p>
    </div>
  );
};

export default Cancel;
