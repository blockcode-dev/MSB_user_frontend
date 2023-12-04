import React from 'react'
import styles from "./BlogDetail.module.scss"
import { Container, Offcanvas } from 'react-bootstrap'
import Pic from "../../public/assets/pic.png"
import Image from 'next/image'
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
import Banner from '../Banner/Banner'
import { RxDotFilled } from "react-icons/rx";
import Comment from '../Comment/Comment'
import { getComment } from '@/redux/getcommentSlice'
export default function BlogDetailComponent({ data }) {
    const router = useRouter()
    const { id } = router.query
    const [likeCount, setLikeCount] = useState()
    const [like, setLike] = useState("")
    const [comment, setComment] = useState("")
    const blogdetail = useSelector((state) => {
        state.rootReducer.blogdetail
    })
    const dispatch = useDispatch()
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
            setLike(res.payload)
        })
    }
    const likeFeature = useSelector((state) => state.rootReducer.like.clientProfile
    )
    const storedValue = getLocalStorageItem("UserLoginToken");
    const [isClient, setIsClient] = useState(false)
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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    // useEffect(() => {
    //     dispatch(getComment(id))
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [dispatch, id]);
    // useEffect(() => {
    //     dispatch(getComment(id)).then((res) => {
           
    //         setComment(res.payload.length)
    //     })
    // }, [dispatch, id])
    // Fetch comments from Redux store
    const comments  = useSelector((state) => state.rootReducer.comment.comments
    );
   
    return (<div className={styles.blockdetails}>
        <div className={styles.hedaer}>
            <Container className={styles.content}>
                <h2 >{data?.data?.heading}</h2>
                <div className={styles.details}>
                    <div>
                        <h6>By <b>
                            Admin
                        </b>
                            <span>
                                <RxDotFilled />
                            </span>
                            <span>
                                Posted on {new Date(data?.data?.updated_at).toLocaleDateString("en-US")}
                            </span>
                        </h6>
                    </div>
                    <div>
                        <div>
                            <span style={{ color: like?.message === "User Liked Successfully." ? "#007FFF" : "unset", cursor: "pointer" }}>
                                <ThumbUpIcon onClick={handleLike} />
                            </span>
                            {likeCount?.likes_count}Likes
                            &nbsp;
                            <span style={{ cursor: "pointer" }} onClick={handleShow}>
                                {comments?.length}Comment
                            </span>
                            &nbsp;
                            <Offcanvas placement="end" show={show} onHide={handleClose}>
                                <Offcanvas.Body>
                                    <Comment id={id} />
                                </Offcanvas.Body>
                            </Offcanvas>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        {/* 
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
                />} */}
        {/* <Banner /> */}
        <Container className={styles.BlogDetailComponent}>
            <div>
                <Image
                    src={`${Image_URL}${data?.data?.blog_attachment[0]?.file_name}`}
                    width={100} height={100} alt='' className={styles.picture} />
                <div>
                    {/* <span
                        style={{ color: like?.message === "User Liked Successfully." ? "#007FFF" : "unset", cursor: "pointer" }}
                        onClick={handleLike}><ThumbUpIcon /><span>{likeCount?.likes_count}</span> </span>
                    <span>Share </span>
                    <span>Comment </span> */}
                </div>
                <div className={styles.blogdescc}
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
