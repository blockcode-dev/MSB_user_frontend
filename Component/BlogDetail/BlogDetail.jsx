import React from 'react'
import styles from "./BlogDetail.module.scss"
import { Container } from 'react-bootstrap'
import Pic from "../../public/assets/pic.png"
import Image from 'next/image'
import { CldVideoPlayer } from 'next-cloudinary';

// import Video from "../../public/assets/Animated Logo_mystorybank.mp4"
import { useRouter } from 'next/router'
import { getLocalStorageItem } from '@/Constants/Api/Api'
import { Image_URL } from '@/Constants/host'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLike } from '@/redux/getlikeslice'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Signin from '@/pages/signin'
import { getBlog } from '@/redux/getBlog'
import ReactPlayer from 'react-player'
import { useRef } from 'react'
export default function BlogDetailComponent({ data }) {
    console.log(data, "data")
    const router = useRouter()
    const { id } = router.query
    const [likeCount, setLikeCount] = useState()
    const [like, setLike] = useState("")
    const blogdetail = useSelector((state) => {
        state.rootReducer.blogdetail
    })
    console.log(blogdetail, "bloggg")
    const dispatch = useDispatch()
    console.log(likeCount, "likecounttt")
    useEffect(() => {
        dispatch(getLike(id)).then((res) => {
            dispatch(getBlog(id)).then((res) => {
                setLikeCount(res.payload)
            })
            setLike(res.payload)
        })
    }, [dispatch, id])
    const handleLike = () => {
        dispatch(getLike(id)).then((res) => {
            dispatch(getBlog(id)).then((res) => {
                setLikeCount(res.payload)
            })
            console.log(res)
            setLike(res.payload)
        })
    }
    const likeFeature = useSelector((state) => state.rootReducer.like.clientProfile
    )
    const storedValue = getLocalStorageItem("UserLoginToken");
    console.log(like, "like")

    const [isClient, setIsClient] = useState(false)
    console.log(router.asPath, "check path")
    useEffect(() => {
        setIsClient(true)
    }, [])
    const path = "https://node.mystorybank.info:4000/videos/Animated_Logo_mystorybank.mp4"
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

    return (<div>


            {isClient &&
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
                    height="100%"
                    width="100%"
                />}


        <Container className={styles.BlogDetailComponent}>
            <div>
                <Image
                    src={`${Image_URL}${data?.data?.blog_attachment[0]?.file_name}`}
                    width={100} height={100} alt='' className={styles.picture} />
                <h2>{data?.data?.heading}</h2>
                <div>
                    <span
                        style={{ color: like?.message === "User Liked Successfully." ? "#007FFF" : "unset", cursor: "pointer" }}
                        onClick={handleLike}><ThumbUpIcon /><span>{likeCount?.likes_count}</span> </span>
                    <span>Share </span>
                    <span>Comment </span>
                </div>
                <h6 className={styles.blogdescc}
                    style={{ paddingBottom: "20px" }}
                    dangerouslySetInnerHTML={{
                        __html: data?.data?.description
                    }}
                />
            </div>
        </Container>
        {/* :
             <Signin />} */}
    </div>
    )
}
