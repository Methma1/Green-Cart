import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState (false)
    const [products, setProducts] =useState ([])
    const [cartItems, setCartItems] =useState ({})
    const [searchQuery, setSearchQuery] =useState ({})
    // fetch all products
    const fetchProducts = async ()=>{
        setProducts(dummyProducts)
    }

    // add product to cart
    const addTocart =(itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }
    //update cart item qautity
const updateCartItems = (itemId,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData)
    toast.success("Cart Updated")
}
// remove cart product
const removeFromCart =(itemId)=>{
 let cartData = structuredClone(cartItems);
 if(cartData[itemId]){
    cartData[itemId] -= 1;
    if(cartData[itemId] === 0){
        delete cartData[itemId];
    }
 }
 toast.success("Removed from cart")
 setCartItems(cartData)
}

// get cart item count

const getCartCount = ()=>{
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item]
    }
    return totalCount
}
//get cart total amount
const getCartAmount = ()=>{
    let totAmount = 0;
    for (const items in cartItems){
        let itemInfo = products.find((product)=>product._id ===  items)
        if(cartItems[items] > 0){
            totAmount += itemInfo.offerPrice * cartItems[items]
        }
    }
    return Math.floor(totAmount * 100) / 100;
}



    useEffect(()=>{
       fetchProducts()
    },[])

    const value ={navigate, user, setUser,isSeller,setIsSeller
        ,showUserLogin,setShowUserLogin, products,currency,addTocart 
    ,updateCartItems, removeFromCart,cartItems,searchQuery,setSearchQuery
     ,getCartCount ,getCartAmount }

     return <AppContext.Provider value={value}>
        {children}
     </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}