import { useEffect, useState } from "react";
import Header from "../Header/index";
import Carousel from "../carousel/Carousel";
import MultiCarousel from "../carousel/multiCarousel/MultiCarousel";
import postService from "../../service/PostService";

function Home(){
    const[lowesPriceProduct, setLowestPriceProduct] = useState([]);
    const[trendingProduct, setTrendingProducts] = useState([]);

    useEffect(()=>{
        lowestPrice();
        trendingProducts();
    },[])

    const lowestPrice =()=>{
        postService.lowestPriceProducts().then((res)=>{
            setLowestPriceProduct(res.data.data)
            // console.log(res.data.data);
        })
    }
    const trendingProducts =()=>{
        postService.trendingProducts().then((res)=>{
            setTrendingProducts(res.data.data)
            // console.log(res.data.data);
        })
    }
    
    return(
    <div>
        <div>
            <Header/>
        </div>
        <div>
            <Carousel/>
        </div>
        <div className="mt-6">
            <div className="flex gap-x-1.5">
                <h1 className="text-lg"> Lowest Prices of the Today</h1>
                <button>View all</button>
            </div>
            <div>
                <MultiCarousel products={lowesPriceProduct}/>
            </div>
        </div>
        <div className="mt-6">
            <div className="flex gap-x-1.5">
                <h1 className="text-lg">Top Trending Deals</h1>
                <button>View all</button>
            </div>
            <div>
                <MultiCarousel products={trendingProduct}/>
            </div>
        </div>
    </div>
)}

export default Home;