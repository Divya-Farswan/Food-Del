import { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from './../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  console.log("Food list from backend:", {foodList});

  if (!Array.isArray(foodList) || foodList.length === 0) {
    return <p>No food items available</p>;
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes for you</h2>
      <div className="food-display-list">
        {foodList.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}           // use unique id as key
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}      
              />
            );
          }
          return null; 
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
