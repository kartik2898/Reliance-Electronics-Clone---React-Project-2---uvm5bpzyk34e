import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import summer from "../../Assets/Summer-Ready-Sale-Beat-the-Heat-Banner-freebie-D-1-.avif"
import Ac from "../../Assets/New-Launches-AC-Banner-D.avif"
import apple from "../../Assets/Apple-AirPods-Pro-Banner-D-1-.avif"
import laptop from "../../Assets/Laptop-Carnival-Lenovo-Banner-D-1-.webp"
import oneplus from "../../Assets/Oneplus-Nord-CE3-5G-Banners.avif"
import jioAirFiber from "../../Assets/JioAirFiber-1365-260-2-1-.avif"

function Carousel(){
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return(
    <Slider {...settings}>
      <div>
        <img src={summer} alt="" />
      </div>
      <div>
        <img src={Ac} alt="" />
      </div>
      <div>
        <img src={apple} alt="" />
      </div>
      <div>
        <img src={laptop} alt="" />
      </div>
      <div>
        <img src={oneplus} alt="" />
      </div>
      <div>
        <img src={jioAirFiber} alt="" />
      </div> 
    </Slider>
  )
}

export default Carousel