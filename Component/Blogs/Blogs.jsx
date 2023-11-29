import {
  BlogByCategoryApi,
  GetBlog,
  getLocalStorageItem,
  AllCategoryAPI
} from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardComponent from "../CardComponent/CardComponent";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pic1 from "../../public/assets/card1.png";
import Signin from "@/pages/signin";
import { Image_URL } from "@/Constants/host";
import { CircularProgress } from "@mui/material";
import styles from "./Blogs.module.scss";
import ListGroup from "react-bootstrap/ListGroup";

function Blogs() {
  const [blog, setBlog] = useState();
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();
  const { slug } = router.query;
  // console.log(slug, "params")

  const handleCategoryClick = (index) => {
    console.log(index, '======')
    setSelectedCategory(index);
    const path = index === "all" ? `/blogs/all` : `/blogs/${category[index].slug}`;
    router.push(path);
  };

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
    AllCategoryAPI()
      .then((res) => {
        console.log(res.data, "*******")
        setCategory(res.data);
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // console.log(blog, "blog")
  return (
    <>
      {isClient && storedValue ? (
        <Container>
          <h1
            className={styles.heading}
            style={{ textAlign: "center", margin: "20px 30px", textTransform: 'capitalize' }}
          >
            {isClient && slug == "all" ? "My Stories" : slug}
          </h1>

          <Row>
            <Col sm={3}>
              <div>
              <ListGroup className={styles.category_list}>
                <h4 className={styles.categoryText}>Categories</h4>
                <ListGroup.Item
                      style={{
                        cursor: "pointer",
                      }}
                      className={`${styles.category_item} ${selectedCategory === "all" ? styles.selectedCategory : ''}`}
                      onClick={() => handleCategoryClick("all")}
                    >
                      All Category
                    </ListGroup.Item>
                {category.map((item, index) => {
                  return (
                    <ListGroup.Item
                      style={{
                        cursor: "pointer",
                      }}
                      className={`${styles.category_item} ${selectedCategory === index ? styles.selectedCategory : ''}`}
                      key={index}
                      onClick={() => handleCategoryClick(index)}
                    >
                      {item.title}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
              </div>
            </Col>
            <Col sm={9}>
              <div class="row row-cols-1 row-cols-md-3 g-4">
                {blog === undefined ? (
                  <div
                    className="loader-container"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <div className="loader-content">
                      <CircularProgress />
                      <p>Fetching Stories...</p>
                    </div>
                  </div>
                ) : (
                  blog?.map((item, index) => {
                    return (
                      <div
                        className={`col ${styles.cardContainer}`}
                        key={index}
                        style={{ margin: "40px 0px" }}
                      >
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
            </Col>
          </Row>
        </Container>
      ) : (
        <Signin />
      )}
    </>
  );
}
export default Blogs;
