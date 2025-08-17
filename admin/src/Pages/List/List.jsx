import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../../App'

const List = ( {token} ) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/food/list");
      console.log(response.data)

      if (response.data.success) {
        setList(response.data.foods);
      } else {
        toast.error("Failed to fetch the list.");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error fetching the list.");
    }
  }
  
  const removeFood = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/food/remove", { id }, {headers:{token}});  
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing list:", error);
      toast.error(error.message);
    }
  }

  // call fetchList
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col' >   
      <p>All Foods List</p>
      <div className="list-table">

        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={() => removeFood(item._id)} >X</p>
            </div>
          ))
      }  
      </div>
    </div>
  )
}

export default List






