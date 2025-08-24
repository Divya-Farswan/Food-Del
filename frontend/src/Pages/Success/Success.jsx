import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./success.css"; // Import CSS file

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // After a short delay, send user back to homepage/orders
    setTimeout(() => {
      navigate("/orders"); // or "/"
    }, 3000);
  }, []);

  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">Thank you for your order.</p>
      <p className="success-redirect">Redirecting you to your orders...</p>
    </div>
  );
};

export default Success;
