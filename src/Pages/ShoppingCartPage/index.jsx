import { useContext, useEffect, useState } from "react";
import empty from "../../Assets/emptycart.webp"
import { CartContext } from "../../contexts/cart-context";
import { WishListContext } from "../../contexts/wishList-context";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ShoppingCard() {
    const [itemInWishList, setItemInWishList] = useState(false)
    const {cartItems,deleteCartItem,addCartItem} = useContext(CartContext);
    const {addItemInWishList,checkProductInWishList} = useContext(WishListContext)
    const navigate = useNavigate();

    // useEffect(()=>{
    //    moveToWishList()
    // },[itemInWishList])

    const moveToWishList = (id) => {
        debugger
        setItemInWishList(checkProductInWishList(id))
        if(checkProductInWishList(id)){
            toast("already in whishList")
        }
        else{
            addItemInWishList(id)
            deleteCartItem(id)
        }
    }

    const handleQuantityChange =(e,id,prevQty)=>{
        addCartItem(id,parseInt(e.target.value)-prevQty)
    }

    const handleProductId = (id)=>{
        navigate(`/product/${id}`)
    }

    return (
        <>
            {cartItems?.items?.length > 0 ? (
                <div className="flex  py-4 px-9 gap-7 mt-[7.9%] bg-[#F5F7F7] h-[100%]">
                    <div className="flex flex-col gap-2 w-[100%]">
                        <div className="bg-white p-3 border border-current-500  rounded">
                            <div className="flex gap-3">
                                <span className="font-medium">My Cart</span>
                                <span>({cartItems.items.length} items)</span>
                            </div>
                        </div>
                        {
                            cartItems.items?.map((item, idx) => (
                                <div className="flex flex-col gap-7 bg-white p-4 border border-current-500  rounded" key={idx}>
                                    <div className="flex justify-between gap-2">
                                        <div className="flex gap-1">
                                            <div>
                                                <div className="w-28 h-28">
                                                    <img src={item.product.displayImage} className="w-28 h-28" />
                                                </div>
                                                <div className="flex gap-1 z-10">
                                                    <div className="font-normal">Qty:</div>
                                                    <select value={item.quantity} onChange={(e)=> handleQuantityChange(e,item.product._id,item.quantity)}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="font-medium text-sm text-[#003380] cursor-pointer" onClick={()=>handleProductId(item.product._id)}>{item.product.name}</div>
                                        </div>
                                        <div className="max-w-[40%] text-right">
                                            <p className="font-medium text-lg"> &#8377;{item.product.price}</p>
                                            <p className="text-sm text-green-600 font-medium">Free Shipping</p>
                                            <p className="text-xs font-medium pt-3">*Delivery assurance is subject to our delivery locations staying open as per govt. regulations</p>
                                        </div>
                                    </div>
                                    <div className="flex border-y border-current-500 font-medium text-sm divide-x text-blue-700">
                                        <div className="w-full">
                                            <button className="w-full py-2" onClick={() => deleteCartItem(item.product._id)}>Remove</button>
                                        </div>
                                        <div className="w-full">
                                            <button className="w-full py-2" onClick={()=>moveToWishList(item.product._id)}>Move to Wishlist</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-5 w-3/6  rounded h-fit">
                        <div>
                            <button type="submit" className="bg-red-600 p-2 rounded text-white w-full" onClick={()=> navigate("/Checkout")}>
                                CHECKOUT
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 p-4 bg-white border border-current-500  rounded">
                            <p className="font-medium text-slate-600">PRcenterICE DETAILS</p>
                            <div className="flex justify-between text-sm">
                                <p className="">price ({cartItems.items.length} items)</p>
                                <span className="font-medium"> &#8377;{cartItems.totalPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <p>Delivery Charges</p>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between border-y border-sky-500 py-2">
                                <p className="font-medium">AMOUNT PAYABLE</p>
                                <span> &#8377;{cartItems.totalPrice}</span>
                            </div>
                            <div className="text-sm font-medium text-slate-600">
                                <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (<div className="mt-[7.9%] flex flex-col h-[100vh] justify-center items-center">
                <img src={empty} className="w-32 h-32"></img>
                <Link to={"/home"} className="bg-red-600 p-2 rounded text-white">CONTINUE SHOPPING</Link>
            </div>)
            }
        </>
    )
}

export default ShoppingCard