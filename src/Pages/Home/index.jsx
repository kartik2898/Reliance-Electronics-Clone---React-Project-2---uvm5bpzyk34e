import { useEffect, useState } from "react";
import Header from "../../components/Header/index";
import Carousel from "../../components/carousel/Carousel";
import MultiCarousel from "../../components/carousel/multiCarousel/MultiCarousel";
import productService from "../../service/ProductService";

function Home(){
    const[lowesPriceProduct, setLowestPriceProduct] = useState([]);
    const[trendingProduct, setTrendingProducts] = useState([]);
    useEffect(()=>{
        lowestPrice();
        trendingProducts();
    },[])

    const lowestPrice =()=>{
        var sort = `sort={"price":1}`
        productService.getProducts(sort).then((res)=>{
            setLowestPriceProduct(res.data.data)
            // console.log(res.data.data);
        })
    }
    const trendingProducts =()=>{
        var trending= `sort={"rating":-1}`
        productService.getProducts(trending).then((res)=>{
            setTrendingProducts(res.data.data)
            // console.log(res.data.data);
        })
    }
    
    const productsCategoriesName = [
        {
            heading : "2024 New Range of ACs from Rs. 22990*",
            categoryName: "ac",
        },
        {
            heading : "Best Selling Audio Accessories",
            categoryName: "audio",
        },
        {
            heading : "Smartphone Bonanza",
            categoryName: "mobile",
        },
        {
            heading : "TVs with Flat 10% Instant Discount | HDFC/SBI Card Offer",
            categoryName: "tv",
        },
    ]
    
    return(
    <div>
        {/* <div>
            <Header/>
        </div> */}
        <div className="">
            <Carousel/>
        </div>
        {
            productsCategoriesName.map((product,key)=>(
                <div className="mt-7" key={key}>
                    <div>
                        <MultiCarousel  heading={product.heading} categoryName={product.categoryName}/>
                    </div>
                </div>
            ))
        }
        <div className="mt-6">
            <div>
                <MultiCarousel products={lowesPriceProduct} heading="Lowest Prices of the Today"/>
            </div>
        </div>
        <div className="mt-6">
            <div>
                <MultiCarousel products={trendingProduct} heading="Top Trending Deals"/>
            </div>
        </div>
    </div>
)}

export default Home;