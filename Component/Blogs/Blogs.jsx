import {
  BlogByCategoryApi,
  GetBlog,
  getLocalStorageItem,
  AllCategoryAPI,
  CheckToken,
  AipromtHistoryApi,
} from "@/Constants/Api/Api";
import { TbMessageChatbot } from "react-icons/tb";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import dummyStory from "../../public/assets/dummystory.png"
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
import usePagination from "../Pagination";
import ChatWidget from "../ChatBox/ChatWidget";
function Blogs() {
  const [blog, setBlog] = useState();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogTitle, setBlogTitle] = useState("My Story Bank");
  const [blogimg, setBlogImage] = useState("");
  const router = useRouter();
  const { slug } = router.query;
  const [dataCount, setDataCount] = useState(0);
  // const [page, setPage] = useState(1);
  // const itemsPerPage = 6; // Adjust as needed
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };
  const [Data, setData] = useState([]);
  const [data_count, setCount] = useState();
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(data_count / PER_PAGE);
  const _DATA = usePagination(Data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleCategoryClick = (index, title, url) => {
    setBlogImage(url);
    setBlogTitle(title);
    setSelectedCategory(index);
    const path =
      index === "all"
        ? `/story/all`
        : index === "my-saved-story"
          ? `/story/my-saved-story`
          : `/story/${category[index].slug}`;
    router.push(path);
  };
  console.log(slug, "slug");
  useEffect(() => {
    if (slug === "my-saved-story") {
      AipromtHistoryApi(storedValue)
        .then((res) => {
          setBlog(res?.data?.data);
          console.log(res, "res==saved story");
        })
        .catch((e) => {
          console.log(e, "e===");
        });
    } else {
      BlogByCategoryApi(slug, PER_PAGE, page)
        .then((res) => {
          setBlog(res?.data?.data?.rows);
          setCount(res?.data?.data?.count);
          // setDataCount(res.data?.data?.length || 0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [slug, page, PER_PAGE]);
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
  // const paginatedBlog = blog?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
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
  console.log(blog,"blog")
  return (
    <>
      <Banner
        title={blogTitle}
        uri={blogimg}
        desc={isClient && blogTitle === "My Story Bank" ? null : blogTitle}
      />
      <Container>
        <div className={styles.filter_icon} onClick={handleShow}>
          <FaFilter size={30} />
          Filter
        </div>
        <Offcanvas
          show={show}
          onHide={handleClose}
          style={{ width: offcanvasWidth }}
        >
          <Offcanvas.Body style={{ padding: "0px" }}>
            <ListGroup className={styles.category_list}>
              <h4 className={styles.categoryText}>Categories</h4>

              <ListGroup.Item
                style={{
                  cursor: "pointer",
                }}
                className={`${styles.category_item} ${selectedCategory === "all" ? styles.selectedCategory : ""
                  }`}
                onClick={() => {
                  handleCategoryClick("all");
                  handleClose();
                }}
              >
                All Category
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  cursor: "pointer",
                }}
              // className={`${styles.category_item} ${selectedCategory === index ? styles.selectedCategory : ''}`}
              // key={index}
              // onClick={() => { handleCategoryClick(index); handleClose() }}
              >
                My Saved Story
              </ListGroup.Item>
              {category.map((item, index) => {
                return (
                  <ListGroup.Item
                    style={{
                      cursor: "pointer",
                    }}
                    className={`${styles.category_item} ${selectedCategory === index ? styles.selectedCategory : ""
                      }`}
                    key={index}
                    onClick={() => {
                      handleCategoryClick(index);
                      handleClose();
                    }}
                  >
                    {item.title}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>

        <div className={styles.container}>
          <div className={styles.sidebar}>
            <h4 className={styles.categoryText}>Categories</h4>
            <ListGroup className={styles.category_list}>
              <ListGroup.Item
                style={{
                  cursor: "pointer",
                }}
                className={`${styles.category_item} ${selectedCategory === "all" ? styles.selectedCategory : ""
                  }`}
                onClick={() => handleCategoryClick("all")}
              >
                All Category
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  cursor: "pointer",
                }}
                className={`${styles.category_item}`}
                // key={index}
                onClick={() => handleCategoryClick("my-saved-story")}
              >
                My Saved Story
              </ListGroup.Item>
              {category?.map((item, index) => {
                return (
                  <ListGroup.Item
                    style={{
                      cursor: "pointer",
                    }}
                    className={`${styles.category_item} ${selectedCategory === index ? styles.selectedCategory : ""
                      }`}
                    key={index}
                    onClick={() =>
                      handleCategoryClick(index, item.title, item.file_name)
                    }
                  >
                    {item.title}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
          <div className={styles.content}>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-2 g-4">
              {isClient && blog === undefined ? (
                <div
                  className="loader-container"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    height: "1000px",
                  }}
                >
                  <div className="loader-content">
                    <CircularProgress />
                    <p>Fetching Stories...</p>
                  </div>
                </div>
              ) : isClient && blog.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    height: "1000px",
                  }}
                >
                  <div className="loader-content">
                    <p>No Stories Available.... </p>
                  </div>
                </div>
              ) : (
                isClient &&
                blog?.map((item, index) => {
                  return (
                    <div
                      // className={`col ${styles.cardContainer}`}
                      key={index}
                    // style={{ margin: "40px 0px" }}
                    >
                      <div>
                        <CardComponent
                          title={item.heading}
                          text={item.description}
                          image={
                            item.blog_attachment
                              ? `${Image_URL}${item.blog_attachment[0]?.file_name}`
                              : dummyStory
                          }
                          path={item.id}
                          paid={item.type}
                          input={item.input}
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
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </div>
        <ChatWidget />
      </Container>
    </>
  );
}
export default Blogs;
