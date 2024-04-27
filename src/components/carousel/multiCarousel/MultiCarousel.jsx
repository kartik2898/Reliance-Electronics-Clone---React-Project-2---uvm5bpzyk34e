import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import productService from "../../../service/ProductService";
import { useNavigate } from "react-router-dom";
function MultiCarousel({products,heading,categoryName}){
  const [Products, setProducts] = useState();
  const [price,setPrice] = useState(1);
  const navigate = useNavigate();
  useEffect(()=>{
    if(products){
      setProducts(products);
    }
    else if(categoryName){
      categoriesProduct()
    }
  },[products])

  const categoriesProduct =()=>{
    const categories = `filter={"subCategory":"${categoryName}"}`
    productService.getProducts(categories).then((res)=>{
      setProducts(res.data.data);
    })
  }
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };
    const handleNavigate = ()=>{
      if(categoryName){
        navigate(`/products/c/${categoryName}`)
      }
      else{
        navigate(`/products/c/:sc`)
      }
    }
    return(
        <div className="slider-container">
          <div className="flex gap-x-1.5">
                <h1 className="text-lg"> {heading}</h1>
                <button onClick={handleNavigate} className="p-1 bg-[#003380] px-3 text-white text-xs rounded-sm">View all</button>
            </div>
            <Slider {...settings}>
            {
              Products?.map((product,indx)=>(
                <div key={indx} className="text-center">
                  <div className="flex justify-center">
                    <img src={product.displayImage} className="max-h-64"/>
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    <div>
                      <div>Price: <span>&#8377;{product.price}</span></div>
                    </div>
                  </div>
                </div>
              ))
            }
            </Slider>
        </div>
    )
}

export default MultiCarousel