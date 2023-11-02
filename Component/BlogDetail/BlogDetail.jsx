import React from 'react'
import styles from "./BlogDetail.module.scss"
import { Container } from 'react-bootstrap'
import Pic from "../../public/assets/pic.png"
import Image from 'next/image'
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
    return (<>
        {storedValue ?
            <Container className={styles.BlogDetailComponent}>
                <div>
                    <h3>{data?.data?.heading}</h3>
                    <div>
                        <span
                            style={{ color: like?.message === "User Liked Successfully." ? "#007FFF" : "unset", cursor: "pointer" }}
                            onClick={handleLike}><ThumbUpIcon /><span>{likeCount?.likes_count}</span> </span>
                        <span>Share </span>
                        <span>Comment </span>
                    </div>
                    <h6>{data?.data?.description}</h6>
                    <Image src={`${Image_URL}${data?.data?.blogs[0]?.file_name}`} width={100} height={100} alt='' className={styles.picture} />
                </div>
            </Container> : <Signin />}
    </>
    )
}
