import Slider from "react-slick";
import img1 from '../../assets/sliders/slide1.png'
import img2 from '../../assets/sliders/slide2.png'
import img3 from '../../assets/sliders/slide3.png'
import img4 from '../../assets/sliders/slide4.png'
import img5 from '../../assets/sliders/slide5.png'
import img6 from '../../assets/sliders/slide6.png'
import img7 from '../../assets/sliders/slide7.png'

const Gallery = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };
  return (
    <>
    <Slider {...settings}>
    <div>
      <img src={img1} className="w-full" height={300} alt="" />
    </div>
    <div>
    <img src={img2} className="w-full" height={300} alt="" />
    </div>
    <div>
    <img src={img3} className="w-full" height={300} alt="" />
    </div>
    <div>
    <img src={img4} className="w-full" height={300} alt="" />
    </div>
    <div>
    <img src={img5} className="w-full" height={300} alt="" />

    </div>
    <div>
    <img src={img6} className="w-full" height={300} alt="" />

    </div>
    <div>
    <img src={img7} className="w-full" height={300} alt="" />

    </div>
  </Slider>
  </>
  )
}
export default Gallery