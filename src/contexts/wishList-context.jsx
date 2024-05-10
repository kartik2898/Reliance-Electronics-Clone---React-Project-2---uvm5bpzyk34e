import { createContext,useEffect,useState } from "react";
import productService from "../service/ProductService";


export const WishListContext = createContext()

function WishListContextProvider({children}){

    const [wishList, setWishList] = useState();

    useEffect(()=>{
        getWishList();
    },[])
    
    const getWishList = ()=>{
        productService.getWishList().then((res)=>{
            setWishList(res.data.data);
        })
    }
    const addItemInWishList = (id) => {
        productService.addItemInWishList(id).then((res) => {
            getWishList();
        })
    }
    const removeItemFromWishList =(id)=>{
        productService.removeItemFromWishList(id).then((res)=>{
            getWishList();
        })
    }
    const checkProductInWishList = (id)=>{
        let itemInWishList = wishList?.items?.filter(item => item.products._id==id)
        if(itemInWishList?.length>0) return true
        else return false
    }
    
    return(
        <WishListContext.Provider value={{addItemInWishList,removeItemFromWishList,wishList,checkProductInWishList}}>
            {children}
        </WishListContext.Provider>
    )
}

export default WishListContextProvider