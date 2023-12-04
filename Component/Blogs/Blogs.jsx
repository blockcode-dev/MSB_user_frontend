import {
  BlogByCategoryApi,
  GetBlog,
  getLocalStorageItem,
  AllCategoryAPI
} from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { FaFilter } from "react-icons/fa6";
import CardComponent from "../CardComponent/CardComponent";
import { Container, Offcanvas } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pic1 from "../../public/assets/card1.png";
import Signin from "@/pages/signin";
import { Image_URL } from "@/Constants/host";
import { CircularProgress, Pagination } from "@mui/material";
import styles from "./Blogs.module.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Banner from "../Banner/Banner";
function Blogs() {
  const [blog, setBlog] = useState();
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogTitle, setBlogTitle] = useState("My stories")
  const [blogimg, setBlogImage] = useState("")
  const router = useRouter();
  const { slug } = router.query;
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Adjust as needed
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleCategoryClick = (index, title, url) => {
    setBlogImage(url)
    setBlogTitle(title)
    setSelectedCategory(index);
    const path = index === "all" ? `/story/all` : `/story/${category[index].slug}`;
    router.push(path);
  };
  useEffect(() => {
    BlogByCategoryApi(slug)
      .then((res) => {
        setBlog(res.data.data);
        setDataCount(res.data?.data?.length || 0);
      })
      .catch((error) => {
      });
  }, [slug]);
  const storedValue = getLocalStorageItem("UserLoginToken");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    AllCategoryAPI()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const paginatedBlog = blog?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [offcanvasWidth, setOffcanvasWidth] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth >= 1200 ? "50%" : "80%";
      setOffcanvasWidth(width);
    }
  }, []);
  return (
    <>
      <Banner title={blogTitle} uri={blogimg} desc={isClient&& blogTitle === "My stories" ? null : blogTitle} />
      {isClient && storedValue ? (
        <Container>
          <div className={styles.filter_icon} onClick={handleShow}>
            <FaFilter size={30} />Filter
          </div>
          <Offcanvas show={show} onHide={handleClose} style={{ width: offcanvasWidth}}>
            <Offcanvas.Body style={{padding:"0px"}}>
              <ListGroup className={styles.category_list}>
                <h4 className={styles.categoryText}>Categories</h4>
                <ListGroup.Item
                  style={{
                    cursor: "pointer",
                  }}
                  className={`${styles.category_item} ${selectedCategory === "all" ? styles.selectedCategory : ''}`}
                  onClick={() => { handleCategoryClick("all"); handleClose() }}
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
                      onClick={() => { handleCategoryClick(index); handleClose() }}
                    >
                      {item.title}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
          {/* <h1
            className={styles.heading}
            style={{ textAlign: "center", margin: "20px 30px", textTransform: 'capitalize' }}
          >
            My Stories
          </h1> */}
          {/* <Row>
            <Col sm={2} className={styles.filter_list}>
              <div>
                  <h4 className={styles.categoryText}>Categories</h4>
                <ListGroup className={styles.category_list}>
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
                        onClick={() => handleCategoryClick(index, item.title, item.file_name)}
                      >
                        {item.title}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            </Col>
            <Col></Col>
            <Col sm={9} className={styles.filter_blog} >
            </Col>
          </Row> */}
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <h4 className={styles.categoryText}>Categories</h4>

              <ListGroup className={styles.category_list}>
                <ListGroup.Item
                  style={{
                    cursor: "pointer",
                  }}
                  className={`${styles.category_item} ${selectedCategory === "all" ? styles.selectedCategory : ''}`}
                  onClick={() => handleCategoryClick("all")}
                >
                  All Category
                </ListGroup.Item>
                {category?.map((item, index) => {
                  return (
                    <ListGroup.Item
                      style={{
                        cursor: "pointer",
                      }}
                      className={`${styles.category_item} ${selectedCategory === index ? styles.selectedCategory : ''}`}
                      key={index}
                      onClick={() => handleCategoryClick(index, item.title, item.file_name)}
                    >
                      {item.title}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>

            </div>
            
            <div className={styles.content}>
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-2 g-4">
                {isClient&& paginatedBlog === undefined ? (
                  <div
                    className="loader-container"
                    style={{ width: "100%", textAlign: "center", height: "1000px" }}
                  >
                    <div className="loader-content">
                      <CircularProgress />
                      <p>Fetching Stories...</p>
                    </div>
                  </div>
                ) :isClient&& paginatedBlog.length === 0 ?
                  <div
                    style={{ width: "100%", textAlign: "center", height: "1000px" }}
                  >
                    <div className="loader-content">
                      <p>No Stories Available.... </p>
                    </div>
                  </div> : isClient&&(
                    paginatedBlog?.map((item, index) => {
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
            </div>
          </div>
          <div className={styles.pagination_custom}>
            <Pagination
              count={Math.ceil(dataCount / itemsPerPage)}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </div>
        </Container>
      ) : (
        <Signin />
      )}
    </>
  );
}
export default Blogs;
