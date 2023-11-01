import { GetBlog } from '@/Constants/Api/Api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardComponent from '../CardComponent/CardComponent';
import { Container } from 'react-bootstrap';
import Pic1 from "../../public/assets/card1.png"

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
    console.log(blog, "blog")
    return (
        <Container>
            <h1 style={{ textAlign: "center", margin: "20px 30px" }}>My Stories</h1>
            <div class="row row-cols-1 row-cols-md-4 g-4">
                {blog?.map((item, index) => {
                    return (
                        <div class="col" key={index}>
                            <CardComponent title={item.heading} text={item.description} 
                            // image={item.blogs[0]?.file_name}
                            />
                        </div>
                    )
                })}
              
               
            </div>
        </Container>
    );
}
export default Blogs;
