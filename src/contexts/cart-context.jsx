import { createContext,useEffect,useState } from "react";
import productService from "../service/ProductService";

export const CartContext = createContext()

function CartContextProvider({children}){
    
    const [cartItems, setCartItems] = useState([]);

    useEffect(()=>{
        getCartItems()
    },[])
    const addCartItem = (id,quantity=1)=>{  
        productService.AddCartItem(id,quantity).then((res)=>{ 
            getCartItems()  
        }) 
    }
    const getCartItems = ()=>{
        productService.getCartItems().then((res)=>{
            setCartItems(res.data.data);
        })
    }
    const deleteCartItem = (id) => {
        productService.deleteCartItem(id).then((res) => {
            getCartItems();
        })
    }
    const clearCartItem = ()=>{
        productService.clearCartItem().then((res)=>{
            getCartItems();
        })
    }
    const checkProductInCart = (id) => {
        let itemInCart = cartItems?.items?.filter(item => item.product._id == id)
        if(itemInCart?.length>0) return true
        else return false
    };
    
    return(
        <CartContext.Provider value={{cartItems,addCartItem,deleteCartItem,checkProductInCart,clearCartItem}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider