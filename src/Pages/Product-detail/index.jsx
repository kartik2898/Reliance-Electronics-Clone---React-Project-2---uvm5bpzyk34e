import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../service/ProductService";
import { RxDotFilled } from "react-icons/rx";
import MultipleItems from "../../components/carousel/singleProductCarousel";
import { PiMonitorPlayThin } from "react-icons/pi";

function ProductDetail(){
    const [product, setProduct] = useState([]);
    const [selectImg, setSeclectImg] =useState();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct = ()=>{
        productService.getProduct(id).then((res)=>{
            setProduct(res.data.data);
            setSeclectImg(res.data.data.displayImage)
        })
    }

    const handleNavigate = ()=>{
        navigate('/cart',{state : {id:id}});
    }

    return(<>
        <div className="bg-[#F5F7F7] mt-[7.9%]">
            <div className="flex border-b-2 gap-2">
                <div className="max-w-md bg-white">
                    <div className="p-6 flex justify-center">
                        <img src={selectImg}/>
                    </div>

                   
                    <div className="flex h-[13%] max-w-md flex-col justify-center">
                        <div className="max-w-72 ml-[80px]">
                            <MultipleItems images={product.images} active={setSeclectImg}/>
                        </div>  
                    </div>
                    <div className="p-3 cursor-pointer">
                        <PiMonitorPlayThin fontSize={40} color="red"/>
                        <p>View Slide Show</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-white p-3"> 
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p>{Math.round(product.ratings)} ratings  & review</p>
                        
                    </div>
                    <div className="flex bg-white">
                        <div className="p-3 border-e-2 max-w-[65%]">
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
                                <button className="p-3 bg-[#E43529] rounded hover:bg-[#003380]" onClick={()=>handleNavigate()}>ADD TO CART</button>
                                <button className="p-3 px-6 bg-[#FC6027] rounded" onClick={()=>handleNavigate()}>BUY NOW</button>
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
                <div className="py-3">
                    <div className="flex gap-2">
                        <p className="font-semibold text-xl">Customer Reviews</p>
                        <p className="text-base">({product.name})</p>          
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ProductDetail