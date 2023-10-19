import Banner from '@/Component/Banner/Banner'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Home.module.css"
import Slider from 'react-slick';
import CardComponent from '@/Component/CardComponent/CardComponent';
import { Container } from 'react-bootstrap';
import Pic1 from "../../public/assets/card1.png"
import Pic2 from "../../public/assets/card2.png"
const Home = () => {
  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  });
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setSliderSettings({
          ...sliderSettings,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false
        });
      } else if (window.innerWidth <= 992) {
        setSliderSettings({
          ...sliderSettings,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        });
      } else if (window.innerWidth <= 1295) {
        setSliderSettings({
          ...sliderSettings,
          slidesToShow: 3,
          slidesToScroll: 1
        });
      }
      else {
        setSliderSettings({
          ...sliderSettings,
          slidesToShow: 4,
          slidesToScroll: 1
        });
      }
    }
    // Initial setup
    handleResize();
    // Add event listener to update slider settings on window resize
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sliderSettings]);
  return (
    <div className={styles.Home}>
      <Banner />
      <h2 className={styles.heading}>Top Finance</h2>
      <Container className={styles.section1}>
          <div>
          <Slider {...sliderSettings}>
            <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div>
            <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div>
          </Slider>
        </div>
      </Container>
      <h2 className={styles.heading}>Most Read Case Studies</h2>
      <Container className={styles.section1}>
          <div>
          <Slider {...sliderSettings}>
            <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div>
            <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div>
          </Slider>
        </div>
      </Container><h2 className={styles.heading}>Most Liked Case Studies</h2>
      <Container className={styles.section1}>
        <div>
          <Slider {...sliderSettings}>
            <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div>
            <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
                path="/blogdetail"
              />
            </div>
          </Slider>
        </div>
      </Container>'
    </div>
  )
}
export default Home
