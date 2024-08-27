import { useState,useEffect } from "react"
import ProductCard from "../../components/card/productCard"
import productService from "../../service/ProductService"
import { useLocation, useParams,Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import empty from "../../Assets/emptycart.webp"
import Footer from "../../components/Footer";
function ProductsPage(){
    const [price,setPrice] = useState(1);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [showSkeleton , setShowSkeleton] = useState("true")
    const [nextPage, setNextpage] = useState(true);
    const {sc} = useParams();
    const location = useLocation();
    const searchTitle = location.state?.title?.search;
    var limit = 25;
    const filter = `limit=${limit}&page=${page}&sort={"price":${price}}`
    var searchProduct = filter;
    
    
    useEffect(() => {
        setShowSkeleton("true");
        setPage(0)
        setProducts([]);
        scrollToTop();
        getProducts()
    }, [sc,searchTitle,price])

    useEffect(()=>{
            getProducts()
   },[page])

    const getProducts =()=>{
        
        if(sc != ":sc"){
            searchProduct = `filter={"subCategory":"${sc}"}&${filter}`
        }
        else if(searchTitle){
            const urlComponent = encodeURIComponent(JSON.stringify({"subCategory":searchTitle}));
            searchProduct = `search=${urlComponent}&${filter}`
        }
        productService.getProducts(searchProduct).then((res)=>{
            // setShowSkeleton(false)
            if(page==0){
                setProducts(res.data.data);
            }else{
                let tempProducts = JSON.parse(JSON.stringify(products))
                tempProducts = [...tempProducts,...res.data.data];
                setProducts(tempProducts);
            }
            if(res.data.results != 25 || res.data?.reults < 25){
                setNextpage(false);
            }
            setTimeout(()=>{
                console.log(products);
                console.log(showSkeleton);
            },1000)
        }).catch((err)=>setShowSkeleton(false)
        )
    }

    // const search = ()=>{
    //     const urlComponent = encodeURIComponent(JSON.stringify({"subCategory":searchTitle}));
    //     const search = `search=${urlComponent}&${filter}`
    //     productService.search(search).then((res)=>{
    //         if(page==0){
    //             setProducts(res.data.data);
    //         }else{
    //             let tempProducts = JSON.parse(JSON.stringify(products))
    //             tempProducts = [...tempProducts,...res.data.data];
    //             setProducts(tempProducts);
    //         }
    //         if(res.data.results != 20 || res.data?.reults < 20){
    //             setNextpage(false);
    //         }
    //     })
    // }

    // const categoriesProduct =()=>{
    //     const categories = `filter={"subCategory": "${sc}"}&${filter}`
    //     productService.productsCategories(categories).then((res)=>{
    //         setProducts(res.data.data);
    //         if(page==0){
    //             setProducts(res.data.data);
    //         }else{
    //             let tempProducts = JSON.parse(JSON.stringify(products))
    //             tempProducts = [...tempProducts,...res.data.data];
    //             setProducts(tempProducts);
    //         }
    //         if(res.data.results != 20 || res.data?.reults < 20){
    //             setNextpage(false);
    //         }
    //     })
    //   }
    
    const priceSorting = (val)=>{
        setPrice((prev)=>val)
    }

    const fetchMoreData = () => {
        setPage((prev)=>prev+1)
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return(
        <div className="mt-[7.9%]">

        {showSkeleton && products.length>0?(
        <div className="flex  bg-[#F5F7F7] gap-2 mt-[7.9%]">

            <div className="w-80">
                
                <div class="text-2xl font-semibold w-72 bg-white p-2.5 text-center">FILTERS</div>
                <div>
                    
                </div>
            </div>
            <div className="flex gap-2 flex-col">
                <div className="p-3 bg-white">
                    <div className="flex gap-2 text-sm" >
                        <span className="font-semibold">Sort By:</span>  
                        <button type="button" className="p-1 bg-[#F5F7F7] rounded-md text-sm" onClick={()=>priceSorting(1)}>Price(low-high)</button>
                        <button type="button" className="p-1 bg-[#F5F7F7] rounded-md text-sm" onClick={()=>{priceSorting(-1)}}>Price(high-low)</button>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={nextPage}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="flex flex-wrap gap-2">
                        {
                         products.length>0?  ( products?.map((product,idx)=>(
                               <ProductCard product={product} key={idx}/>
                            ))):(showSkeleton? (<SkeletonTheme baseColor="#202020" highlightColor="#444">
                                <p>
                                <Skeleton count={10} />
                                </p>
                            </SkeletonTheme>):
                            (<div className="mt-[7.9%] flex flex-col h-[100vh] justify-center items-center">
                                <img src={empty} className="w-32 h-32"></img>
                                <p>No Product</p>
                                <Link to={"/"} className="bg-red-600 p-2 rounded text-white">CONTINUE SHOPPING</Link>
                            </div>)
                          )
                        }
                    </div>
                </InfiniteScroll>
            </div>
        </div>
         ):(!showSkeleton && products.length==0?(
            <div className="mt-[7.9%] flex flex-col h-[100vh] justify-center items-center">
                <img src={empty} className="w-32 h-32"></img>
                <p>No Product</p>
                <Link to={"/"} className="bg-red-600 p-2 rounded text-white">CONTINUE SHOPPING</Link>

            </div>
        ):(
            <div className="grid grid-cols-4 gap-4 p-4">
                <div>
                    <Skeleton count={8} />
                </div>
                <div>
                    <Skeleton count={8} />
                </div>
                <div>
                    <Skeleton count={8} />
                </div>
                <div>
                    <Skeleton count={8} />
                </div>
                <div>
                    <Skeleton count={8} />
                </div>
                <div>
                    <Skeleton count={8} />
                </div>
                <div>
                    <Skeleton count={8} />
                </div>
                <div>
                    <Skeleton count={8} />
                </div>
            </div>
        ))
        } 
        <div>
            <Footer/>
        </div>
    </div>
    )
}

export default ProductsPage