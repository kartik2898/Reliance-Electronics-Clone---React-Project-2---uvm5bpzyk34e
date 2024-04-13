import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function MultiCarousel({products}){
  console.log(products);
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
    return(
        <div className="slider-container">
            <Slider {...settings}>
            {
              products?.map((product,indx)=>(
                <div key={indx}>
                  <div>
                    <img src={product.displayImage}/>
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