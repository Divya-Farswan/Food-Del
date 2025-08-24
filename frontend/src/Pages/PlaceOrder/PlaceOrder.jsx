import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom';
import { backendUrl } from "../../App";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    console.log("place order data", data)
  }, [data])

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("cartItems before order:", cartItems);

    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // clone to avoid mutation
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    console.log("Order items:", orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      console.log("Axios response:", response);  //  log full response object
      console.log("Axios response data:", response.data); //  log only data

      if (response.data.success) {
        const { session_url } = response.data;
        console.log("Stripe session response:", response.data);

        // redirect
        window.location.href = session_url; // use href instead of replace to debug
      } else {
        alert("Error: " + JSON.stringify(response.data.message));
      }
    } catch (err) {
      console.error("Place order API error:", err.response || err);
      alert("Something went wrong with order. Check console.");
    }
  };



  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     navigate('/cart')
  //   }
  //   else {
  //     if (getTotalCartAmount() ===0) {
  //       navigate('/cart')
  //     }
  //   }
  // }, [token]);

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">

        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input name="firstName" value={data.firstName} onChange={onChangeHandler} required type="text" placeholder="First Name" />
            <input name="lastName" value={data.lastName} onChange={onChangeHandler} required type="text" placeholder="Last Name" />
          </div>

          <input name="email" value={data.email} onChange={onChangeHandler} required type="email" placeholder="Email Address" />
          <input name="street" value={data.street} onChange={onChangeHandler} required type="text" placeholder="Street" />

          <div className="multi-fields">
            <input name="city" value={data.city} onChange={onChangeHandler} required type="text" placeholder="City" />
            <input name="state" value={data.state} onChange={onChangeHandler} required type="text" placeholder="State" />
          </div>

          <div className="multi-fields">
            <input name="zipcode" value={data.zipcode} onChange={onChangeHandler} required type="text" placeholder="Zip Code" />
            <input name="country" value={data.country} onChange={onChangeHandler} required type="text" placeholder="Country" />
          </div>

          <input name="phone" value={data.phone} onChange={onChangeHandler} required type="text" placeholder="Phone" />

        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>

            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit" >PROCEED TO PAYMENT</button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default PlaceOrder;
