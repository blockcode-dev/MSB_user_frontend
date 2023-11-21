import React from 'react'
import styles from "./BlogDetail.module.scss"
import { Container } from 'react-bootstrap'
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
    const videoPath = "../../public/assets/video.mp4"
    return (<div>
        {/* {storedValue ? */}
        {isClient&&
        <ReactPlayer url={videoPath} controls style={{ width: "90%", margin: "20px auto" }} width="90%" />}
        {/* <ReactPlayer url='../../public/assets/video.mp4' /> */}
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
                {/* <h6>{data?.data?.description}</h6> */}
            </div>
        </Container>
        {/* :
             <Signin />} */}
    </div>
    )
}
