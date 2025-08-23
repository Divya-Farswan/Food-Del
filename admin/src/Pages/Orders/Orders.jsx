import { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { assets } from './../../../../frontend/src/assets/assets';
import { backendUrl } from '../../../../frontend/src/App';


const Order = ({url}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(backendUrl + "/api/order/list")
    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(backendUrl + "/api/order/status", { 
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list' >
        {
          orders.map((order, index) => {
            <div key={index} className='order-item' >
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p>
                  {
                    order.items.map((item, index) => {
                      if (index===order.items.length-1) {
                        return item.name + " x " + item.quantity
                      } else {
                        return item.name + " x " + item.quantity + " , "
                      }
                    })
                  }
                </p>
                <p className='order-item-name' > {order.address.firstName + " " + order.address.lastName} </p>
                <div className='order-item-address' >
                  <p> {order.address.street + ","} </p>
                  <p> {order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode } </p>
                </div>
                <p className='order-item-phone' > {order.address.phone} </p>
              </div>
              <p>Items : {order.items.length} </p>
              <p>$ {order.amount} </p>
              <select onChange={(event) => statusHandler(evert, order._id) } value={order.status} >
                <option value="Food Processing">Food Processing</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Deliverd</option>
              </select>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Order
