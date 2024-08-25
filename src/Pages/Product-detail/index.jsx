import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../service/ProductService";
import { RxDotFilled } from "react-icons/rx";
import MultipleItems from "../../components/carousel/singleProductCarousel";
import { PiMonitorPlayThin } from "react-icons/pi";
import Modal from "../../components/modal";
import { CartContext } from "../../contexts/cart-context";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import ReactImageMagnify from '@blacklab/react-image-magnify';

function ProductDetail(){
    const [product, setProduct] = useState([]);
    const [selectImg, setSeclectImg] =useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemInCart, setItemInCart] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const {addCartItem,cartItems,checkProductInCart} = useContext(CartContext)
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };

    useEffect(()=>{
        getProduct();
    },[])
    useEffect(()=>{
        setItemInCart(checkProductInCart(id))
    },[cartItems])

    const getProduct = ()=>{
        productService.getProduct(id).then((res)=>{
            setProduct(res.data.data);
            setSeclectImg(res.data.data.displayImage)
        })
    }

    const handleNavigate = ()=>{
        addCartItem(id)
        navigate('/cart')
    }

    const handleBuyNow =()=>{
        navigate(`/checkout/${id}`)
    }

    return(<>
        <div className="bg-[#F5F7F7] mt-[7.9%]">
            <div className="flex border-b-2 gap-2">
                <div className="max-w-md bg-white">
                    <div className="p-6 flex justify-center">
                        <ReactImageMagnify
                            imageProps={{
                                alt: 'Wristwatch by Ted Baker London',
                                // isFluidWidth: true,
                                src: selectImg,
                                height : "100%",
                                width : 400
                            }}
                            magnifiedImageProps={{
                                src: selectImg,
                                width: 600,
                                height: 600
                            }}
                            magnifyContainerProps ={ {
                                scale : 2
                                }}
                            portalProps = {{ 
                                id : "portal-test-id",
                                horizontalOffset : 50
                            }
                            }
                        />
                        {/* <img src={selectImg}/> */}
                    </div>
                    <div className="flex h-[13%] max-w-md flex-col justify-center mt-4">
                        <div className="px-2">
                            <MultipleItems images={product.images} active={setSeclectImg} selectImg={selectImg}/>
                        </div>  
                    </div>
                    <div className="p-3 cursor-pointer mt-4">
                        
                        <div>
                            <button
                                className="flex flex-col justify-center items-center border-e p-2"
                                onClick={openModal}
                            >
                               <PiMonitorPlayThin fontSize={35} color="red" className=""/>
                                <p className="text-sm">View Slide Show</p>
                            </button>
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <div className="flex justify-between p-3 bg-[#3399CC] text-white rounded-t-lg">
                                    <div className="font-bold ">{product.name}</div>
                                    <div onClick={closeModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-3 flex justify-between ">
                                    <div className="w-[40%] flex flex-col justify-center ml-[80px]">
                                        <div className=" w-[60%]">
                                            <MultipleItems images={product.images} active={setSeclectImg} selectImg={selectImg}/>
                                        </div>
                                    </div>
                                    <div className="w-[35%]">
                                        <img src={selectImg}/>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-white p-3"> 
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <div className=""> <Rating style={{ maxWidth: 180 }}value={product.ratings}readOnly/></div>
                        
                    </div>
                    <div className="flex bg-white h-[100%]">
                        <div className="p-3 border-e-2 max-w-[60%]">
                            <div>
                                <h3 className="text-base font-bold">Gain more with offers</h3>
                                <span className="p-2">Flat 1000 Discount with OneCard Credit Cards Read-T&C</span>
                            </div>
                            <div>
                                <h3 className="text-base font-bold">Save more with EMI/Cashback</h3>
                                <div className="p-2">
                                    <span>Additional Cashback on Credit Card Low-cost EMIs. View-Plans.</span>
                                    <span>Additional Cashback on Debit Card Low-cost EMIs. View-Plans.</span>
                                    <span>Credit Card No-Cost EMI Options. View-Plans.</span>
                                </div>
                            </div>
                            <div className="py-3">
                                <h3 className="text-base font-bold">Warranty</h3>
                                <ul>    
                                    <li><span className="text-sm font-bold">Warranty:</span> 1 Year manufacturer warranty</li>
                                </ul>
                            </div>
                            <div className="py-3">
                                <h3 className="text-base font-bold">Key Features</h3>
                                <ul> {
                                    product?.features?.map((feature,key)=>(
                                        <div key={key}>
                                            <li className="flex items-center"><span><RxDotFilled /></span>{feature}</li>
                                        </div>
                                    ))
                                    }   
                                </ul>
                            </div>
                            <div className="py-3">
                                <h3 className="text-base font-bold">Return Policy</h3>
                                <ul>    
                                    <li className="flex items-center"><span><RxDotFilled /></span>For return eligibility. Read-T&C</li>
                                    <li className="flex items-center"><span><RxDotFilled /></span>All accessories, product & packaging need to be returned in original condition.</li>
                                </ul>
                            </div>
                            <div className="text-base font-bold py-3">
                                Got Feedback to share on this page? report here.
                            </div>
                        </div>
                        <div className="p-3 w-2/4">
                            <div>Offer price : <span className="text-base font-bold">&#8377;{product.price}</span></div>
                            <h2 className="text-lg font-semibold py-2">FREE Shipping!</h2>
                            <div className="flex gap-2 font-semibold text-white">
                            {
                                itemInCart ?<button className="p-3 bg-[#E43529] rounded hover:bg-[#003380]" onClick={()=>handleNavigate()}>GO TO CART</button> : 
                                <button className="p-3 bg-[#E43529] rounded hover:bg-[#003380]" onClick={()=>handleNavigate()}>ADD TO CART</button>
                            }    
                                <button className="p-3 px-6 bg-[#FC6027] rounded" onClick={()=>handleBuyNow()}>BUY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white px-6 py-3 text-lg">
                <div>
                    <p className="font-semibold">Description</p>
                    <div dangerouslySetInnerHTML={{__html: product.description}}></div>
                </div>
                {/* <div className="py-3">
                    <div className="flex gap-2">
                        <p className="font-semibold text-xl">Customer Reviews</p>
                        <p className="text-base">({product.name})</p>          
                    </div>
                </div> */}
            </div>
        </div>
    </>)
}

export default ProductDetail