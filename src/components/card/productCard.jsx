import { useNavigate } from "react-router-dom"
import 'react-loading-skeleton/dist/skeleton.css'
import { useState,useEffect,useContext } from "react";
import { WishListContext } from "../../contexts/wishList-context";

function ProductCard({product}){
    // console.log(product);
    const [like, setLike] = useState(false)
    const {wishList,checkProductInWishList,addItemInWishList,removeItemFromWishList} = useContext(WishListContext)
    const navigate = useNavigate();
    const handleProductId = ()=>{
        navigate(`/product/${product._id}`)
    }
    useEffect(()=>{
        setLike(checkProductInWishList(product._id))
    },[wishList])
    const handleLike =()=>{
        if(!like){
            addItemInWishList(product._id)
        }
        else{
            removeItemFromWishList(product._id)
        }
        setLike(!like)
    }
    return (
        <div className="w-64 bg-white p-2 hover:shadow-2xl" >
            <div onClick={handleProductId}>
                <div className="p-4">
                    {
                    <img src={product.displayImage} className="transition duration-500 hover:duration-500 ease-in-out hover:scale-110 cursor-pointer"/>
                    }
                </div>
                <div className="p-3">
                    <h3 className="text-base text-[#425D88] hover:text-red-400 cursor-pointer" >{product.name}</h3>
                    <div>
                        <span>&#8377;{product.price}</span>
                    </div>
                    <p>
                        OFFERS AVAILABLE
                    </p>
                </div>
            </div>
            <div  className="flex gap-x-1 cursor-pointer" >
                <div className="" onClick={handleLike}>
                    <div className="" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={like?"red":"none"} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <div>
                        Wishlist
                </div>
                </div> 
            </div>
        </div>
    )
}

export default ProductCard