import { GetBlog, getLocalStorageItem } from '@/Constants/Api/Api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardComponent from '../CardComponent/CardComponent';
import { Container } from 'react-bootstrap';
import Pic1 from "../../public/assets/card1.png"
import Signin from '@/pages/signin';
import { Image_URL } from '@/Constants/host';
function Blogs() {
    const [blog, setBlog] = useState()
    const router = useRouter()
    useEffect(() => {
        GetBlog().then((res) => {
            setBlog(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    const storedValue = getLocalStorageItem("UserLoginToken");
    console.log(blog,"blog")
    return (<>
        {storedValue ?
            <Container>
                <h1 style={{ textAlign: "center", margin: "20px 30px" }}>My Stories</h1>
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    {blog?.map((item, index) => {
                        return (
                            <div class="col" key={index}>
                                <div onClick={() => {
            const path = `blogdetail/${item.id}`
            router.push(path)}} style={{cursor:"pointer"}}>
                                <CardComponent title={item.heading} text={item.description}  image={`${Image_URL}${item.blogs[0]?.file_name}`}
                                />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
            : <Signin />
        }
    </>
    );
}
export default Blogs;
