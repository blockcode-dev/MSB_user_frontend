import {
  BlogByCategoryApi,
  GetBlog,
  getLocalStorageItem,
} from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardComponent from "../CardComponent/CardComponent";
import { Container } from "react-bootstrap";
import Pic1 from "../../public/assets/card1.png";
import Signin from "@/pages/signin";
import { Image_URL } from "@/Constants/host";
import { CircularProgress } from "@mui/material";
import styles from "./Blogs.module.scss"

function Blogs() {
  const [blog, setBlog] = useState();
  const router = useRouter();
  const { slug } = router.query;
  // console.log(slug, "params")
  useEffect(() => {
    BlogByCategoryApi(slug)
      .then((res) => {
        // console.log(res, "addd");
        setBlog(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  const storedValue = getLocalStorageItem("UserLoginToken");
  const [isClient, setIsClient] = useState(false);
  // console.log(router.asPath, "check path")
  useEffect(() => {
    setIsClient(true);
  }, []);
  // console.log(blog, "blog")
  return (
    <>
      {isClient && storedValue ? (
        <Container>
          <h1 className={styles.heading} style={{ textAlign: "center", margin: "20px 30px" }}>
            My Stories
          </h1>
          <div class="row row-cols-1 row-cols-md-4 g-4">
            {blog === undefined ? (
              <div
                className="loader-container"
                style={{ width: "100%", textAlign: "center" }}
              >
                <div className="loader-content">
                  <CircularProgress />
                  <p>Fetching blogs...</p>
                </div>
              </div>
            ) : (
              blog?.map((item, index) => {
                return (
                  <div className={`col ${styles.cardContainer}`} key={index} style={{ margin: "40px 0px" }}>
                    <div>
                      <CardComponent
                        title={item.heading}
                        text={item.description}
                        image={
                          item.blog_attachment
                            ? `${Image_URL}${item.blog_attachment[0]?.file_name}`
                            : ""
                        }
                        path={item.id}
                        paid={item.type}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Container>
      ) : (
        <Signin />
      )}
    </>
  );
}
export default Blogs;
