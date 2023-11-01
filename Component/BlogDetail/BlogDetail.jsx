import React from 'react'
import styles from "./BlogDetail.module.scss"
import { Container } from 'react-bootstrap'
import Pic from "../../public/assets/pic.png"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BlogDetailAPI, LikeApi } from '@/Constants/Api/Api'
import { Image_URL } from '@/Constants/host'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLike } from '@/redux/getlikeslice'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
export default function BlogDetailComponent({ data }) {
    const router = useRouter()
    const { id } = router.query
    const [like, setLike] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLike(id)).then((res) => {
            setLike(res.payload)
        })
    }, [dispatch, id])
    const handleLike = () => {
        dispatch(getLike(id)).then((res) => {
            setLike(res.payload)
        })
    }
    const likeFeature = useSelector((state) => state.rootReducer.like.clientProfile
    )
    return (
        <Container className={styles.BlogDetailComponent}>
            <div>
                <h3>{data?.data?.heading}</h3>
                <div>
                    
                    <span
                        style={{ color: like?.message === "User Liked Successfully." ? "#007FFF" : "unset" ,cursor:"pointer"}}
                        onClick={handleLike}><ThumbUpIcon/> </span>
                    <span>Share </span>
                    <span>Comment </span>
                </div>
                <h6>{data?.data?.description}</h6>
                <img src={`${Image_URL}${data?.data?.file_name}`} width={100} height={100} alt='' className={styles.picture} />
            </div>
        </Container>
    )
}
