import Slider from "react-slick";

function MultipleItems({images,active}) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {
            images?.map((img,indx)=>(
                <div key={indx}>
                    <img src={img} onClick={(e) => {active(e.target.src)}}/>
                </div>
            ))
        }
        
      </Slider>
    </div>
  );
}

export default MultipleItems;