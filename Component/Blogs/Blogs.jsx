import { BlogByCategoryApi, GetBlog, getLocalStorageItem } from '@/Constants/Api/Api';
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
    const {slug}=router.query
    console.log(slug,"params")
    useEffect(() => {
        BlogByCategoryApi(slug).then((res) => {
            setBlog(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [slug])
    const storedValue = getLocalStorageItem("UserLoginToken");
    return (<>
        {storedValue ?
            <Container>
                <h1 style={{ textAlign: "center", margin: "20px 30px" }}>My Stories</h1>
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    {blog?.map((item, index) => {
                        return (
                            <div class="col" key={index}>
                                <div>
                                <CardComponent title={item.heading} text={item.description} 
                                 image={ item.blog_attachment?`${Image_URL}${ item.blog_attachment[0]?.file_name}`:""}
                                 path={item.id}
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
