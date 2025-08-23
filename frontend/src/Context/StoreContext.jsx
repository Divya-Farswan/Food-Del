import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { backendUrl } from "../App";

// create context name as StoreContext 
export const StoreContext = createContext(null)

// create storeContextProvider function 
const StoreContextProvider = (props) => {
    const [token, setToken] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [redirectPath, setRedirectPath] = useState(null);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
        }));

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (err) {
                console.error("Failed to update backend cart:", err);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 })) -  this might cause quantity to become negative. check before subtracting 
        setCartItems((prev) => {
            if (prev[itemId] > 1) {
                return { ...prev, [itemId]: prev[itemId] - 1 }
            } else {
                const updated = { ...prev }
                delete updated[itemId]
                return updated
            }
        });


        // remove cart data in backend
        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/remove", { itemId }, { headers: { token } }
                );
            } catch (err) {
                console.error("Failed to remove item from backend cart:", err);
            }
        }
    };


    // function return cart total 
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/food/list")
            console.log("Food list fetched from backend:", response.data.foods);
            setFoodList(response.data.foods)
        } catch (error) {
            console.log("Error fetching foods:", error)
        } finally {
            setLoading(false)
        }
    }

    // no logout and change in cart data when refresh the page
    const loadCartData = async (token) => {
        const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])

    // any element add in this object we can access that element in any component using context 
    const contextValue = {
        foodList,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        getTotalCartAmount,
        backendUrl,
        token,
        setToken,
        loading,
        redirectPath,
        setRedirectPath
    }

    // console cartitems - 1:3, 2:0, 3:1
    useEffect(() => {
        console.log("Cartitem from context", cartItems)
    }, [cartItems])

    // when user 1st time added the item in the cart this statement will be executed */
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider

