import React, { useEffect, useRef, useState } from "react";
import styles from "./landing.module.scss";
import Image1 from "../../public/assets/story.png";
import Banner from "../Banner/Banner";
import Image from "next/image";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
const Landing = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const path =
    "https://node.mystorybank.info:4000/videos/Animated_Logo_mystorybank.mp4";
  const homeVideoPath = "/assets/homeVideo.mp4";
  const secondVideoPath = "/assets/secondVideo.mp4";
  const thirdVideoPath = "/assets/thirdVideo.mp4";
  const playerRef = useRef(null);
  const handleVideoEnd = () => {
    if (playerRef && playerRef.current) {
      const currentRef = playerRef.current;
      if (currentRef.seekTo) {
        currentRef.seekTo(0); // Seek to the beginning of the video
      }
      if (currentRef.play) {
        currentRef.play(); // Play the video again
      }
    }
  };
  return (
    <div className={styles.Landing}>
      {/* <Banner /> */}
      <div className={styles.Video_Banner}>
        {isClient && (
          <ReactPlayer
            ref={playerRef}
            url={path}
            onEnded={handleVideoEnd} // When the video ends, replay it
            // controls
            controls={false}
            loop={false}
            muted={true}
            playing={true} // Autoplay the video
            // style={{ width: "90%", margin: "20px auto" }}
            className={styles.video_banner_inner}
            height="450px"
            width="100%"
          />
        )}
      </div>
      <Container className={styles.main}>
        <div className={styles.section1}>
          <div className={styles.imagesss}>
            <Image
              src={Image1}
              width={100}
              height={100}
              className={styles.Images}
            />
          </div>
          <div className={styles.content}>
            <p>
              Are you struggling with stories to share in your business, in a
              presentation, in your training sessions?
            </p>
            <p className={styles.paraText}>
              Do you ever say, “What is a good story to share in this
              situation?”
            </p>
          </div>
        </div>
      </Container>
      <Container className={styles.main} style={{ padding: "0px 0px" }}>
        <div className={`${styles.section1} ${styles.reverse}`}>
          <div className={styles.content}>
            <p>
              Would you benefit from having a database of stories to share with
              your audience?
            </p>
            <p className={styles.paraText}>
              Do you want a connect with your audience in a better way?
            </p>
            <p className={styles.paraText}>
              If your answer is YES, then the wait is over.
            </p>
            <h5 className={styles.linkText}>
              <b>Click The Link To Purchase Immediately:</b>
            </h5>
            <Button className={`button_theme ${styles.btnStarted}`}>
              Buy Now
            </Button>
          </div>
          <div className={styles.imagesss}>
         { isClient && 
            <ReactPlayer
              ref={playerRef}
              url={homeVideoPath}
              onEnded={handleVideoEnd}
              // controls
              controls={true}
              loop={false}
              muted={true}
              playing={false}
              height="100%"
              width="100%"
            />}
          </div>
        </div>
      </Container>
      <div className={styles.backgroundImage}>
      <Container className={styles.main}>
        <div className={styles.section3}>
          <h1>My Story Bank</h1>
          <p className={styles.paraText}>
            MSB is a data bank of stories for the storyteller in you. MSB
            provides you with a categorized list of stories to help take your
            audience to a place they can’t go on their own. MSB puts at your
            fingertips over 130 messages to empower, inspire and transform an
            audience experience.
          </p>
          <p className={styles.paraText}>
            Everyone loves a good story. Storytelling is a critical, but often
            overlooked, skill every business owner should have.
          </p>
          <h4 className={styles.boldText}>
            <b>WHAT’S INCLUDED IN YOUR “MY STORY BANK” PURCHASE:</b>
          </h4>
        </div>
        <ul>
          <li>Over 130 stories in over 30 different categories</li>
          <li>Tips on why story telling is important</li>
          <li>On average $1.83 per story</li>
          <li>
            Stories Customized by Category: Accountability, Blindspot,
            Character, Communication, Comfort Zone, Consistency, Connection,
            Desire, Emotional Intelligence, Fear, Funny Openers, Good
            Intentions, Greatness, Growth, Influence, Integrity, Leadership,
            Limiting Beliefs, Making Adjustments, Mindset, Momentum, Motivation,
            Overcoming, Passion, Perspective, Priorities, Resilience, Religion,
            Self Confidence, Teachability, Teamwork, Traditions, etc….
          </li>
        </ul>
      </Container>
      </div>
      <Container className={styles.main}>
        <div className={styles.section4}>
          <div className={styles.firstBox}>
            <h3 className={styles.boxText}>
              "Storytelling is the most powerful way to put ideas into the world
              today." --Robert McKee
            </h3>
            <h4 className={styles.innerText}>
              Click The Link To Purchase Immediately:
            </h4>
            <br></br>
            <Button className={`button_theme ${styles.buyButton}`}>
              Buy Now
            </Button>
          </div>
          <div className={styles.firstBox}>
            <h3 className={styles.boxText}>
              STORIES MAKES YOUR CUSTOMERS FALL IN LOVE WITH YOU AND BUY FROM
              YOU OVER AND OVER AGAIN.
            </h3>
            <h4 className={styles.innerText}>
              Tell, don't sell. Click The Link To Purchase Immediately:
            </h4>
            <Button className={`button_theme ${styles.buyButton}`}>
              Buy Now
            </Button>
          </div>
        </div>
      </Container>
      <h2 className={styles.exampleText}>HERE ARE SOME STORY EXAMPLES</h2>
      <Container className={styles.main}>
        <div className={styles.imagesss}>
          {isClient && 
          <ReactPlayer
            ref={playerRef}
            url={secondVideoPath}
            onEnded={handleVideoEnd}
            // controls
            controls={true}
            loop={false}
            muted={true}
            playing={false}
            height="100%"
            width="100%"
          />}
        </div>
        <div className={styles.imagesss}>
        {isClient && 
          <ReactPlayer
            ref={playerRef}
            url={thirdVideoPath}
            onEnded={handleVideoEnd}
            // controls
            controls={true}
            loop={false}
            muted={true}
            playing={false}
            height="100%"
            width="100%"
          />}
        </div>
      </Container>
    </div>
  );
};
export default Landing;
