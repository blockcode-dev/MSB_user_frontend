import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Container, Offcanvas, ListGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFilter } from "react-icons/fa6";
import { TbMessageChatbot } from "react-icons/tb";
import { CircularProgress, Pagination } from "@mui/material";

import { BlogByCategoryApi, AllCategoryAPI, getLocalStorageItem } from "@/Constants/Api/Api";
import { Image_URL } from "@/Constants/host";
import dummyStory from "../../public/assets/dummystory.png";

import Banner from "../Banner/Banner";
import CardComponent from "../CardComponent/CardComponent";
import usePagination from "../Pagination";
import ChatWidget from "../ChatBox/ChatWidget";

import styles from "./Blogs.module.scss";
import { fetchStoryHistory } from "@/redux/storyHistorySlice";

function Blogs() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogTitle, setBlogTitle] = useState("My Story Bank");
  const [blogImage, setBlogImage] = useState("");
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(dataCount / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const [showFilter, setShowFilter] = useState(false);
  const [offcanvasWidth, setOffcanvasWidth] = useState("");
  const [isClient, setIsClient] = useState(false);

  const storedValue = getLocalStorageItem("UserLoginToken");

  const savedStories = useSelector((state) => state?.rootReducer?.storyHistory?.history); // Adjust according to your slice

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleCategoryClick = (index, title = "My Story Bank", url = "") => {
    setBlogImage(url);
    setBlogTitle(title);
    setSelectedCategory(index);
    const path =
      index === "all"
        ? `/story/all`
        : index === "my-saved-story"
        ? `/story/my-saved-story`
        : `/story/${categories[index]?.slug}`;

    router.push(path);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOffcanvasWidth(window.innerWidth >= 1200 ? "50%" : "80%");
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (slug === "my-saved-story") {
      dispatch(fetchStoryHistory(storedValue));
    } else {
      BlogByCategoryApi(slug, PER_PAGE, page)
        .then((res) => {
          setData(res?.data?.data?.rows || []);
          setDataCount(res?.data?.data?.count || 0);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [slug, page, dispatch]);

  useEffect(() => {
    AllCategoryAPI()
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (slug === "my-saved-story" && savedStories?.length > 0) {
      setData(savedStories);
    }
  }, [savedStories, slug]);

  const renderBlogs = () => {
    if (!isClient) return null;

    if (!data) {
      return (
        <div className="loader-container" style={{ textAlign: "center", height: "500px" }}>
          <CircularProgress />
          <p>Fetching Stories...</p>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="loader-container" style={{ textAlign: "center", height: "500px" }}>
          <p>No Stories Available....</p>
        </div>
      );
    }

    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-2 g-4">
        {data.map((item, index) => (
          <div key={index}>
            <CardComponent
              title={item.heading}
              text={item.description}
              image={item.blog_attachment?.[0]?.file_name ? `${Image_URL}${item.blog_attachment[0]?.file_name}` : dummyStory}
              path={item.id}
              paid={item.type}
              input={item.input}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Banner title={blogTitle} uri={blogImage} desc={isClient && blogTitle === "My Story Bank" ? null : blogTitle} />

      <Container>
        {/* Filter Icon for Mobile */}
        <div className={styles.filter_icon} onClick={() => setShowFilter(true)}>
          <FaFilter size={30} />
          Filter
        </div>

        {/* Sidebar Offcanvas */}
        <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} style={{ width: offcanvasWidth }}>
          <Offcanvas.Body style={{ padding: 0 }}>
            <ListGroup className={styles.category_list}>
              <h4 className={styles.categoryText}>Categories</h4>
              <ListGroup.Item
                className={`${styles.category_item} ${selectedCategory === "all" ? styles.selectedCategory : ""}`}
                onClick={() => { handleCategoryClick("all"); setShowFilter(false); }}
                style={{ cursor: "pointer" }}
              >
                All Category
              </ListGroup.Item>

              <ListGroup.Item
                className={`${styles.category_item} ${selectedCategory === "my-saved-story" ? styles.selectedCategory : ""}`}
                onClick={() => { handleCategoryClick("my-saved-story"); setShowFilter(false); }}
                style={{ cursor: "pointer" }}
              >
                My Saved Story
              </ListGroup.Item>

              {categories.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className={`${styles.category_item} ${selectedCategory === index ? styles.selectedCategory : ""}`}
                  onClick={() => { handleCategoryClick(index, item.title, item.file_name); setShowFilter(false); }}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Sidebar and Content */}
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <h4 className={styles.categoryText}>Categories</h4>
            <ListGroup className={styles.category_list}>
              <ListGroup.Item
                className={`${styles.category_item} ${selectedCategory === "all" ? styles.selectedCategory : ""}`}
                onClick={() => handleCategoryClick("all")}
                style={{ cursor: "pointer" }}
              >
                All Category
              </ListGroup.Item>

              <ListGroup.Item
                className={`${styles.category_item} ${selectedCategory === "my-saved-story" ? styles.selectedCategory : ""}`}
                onClick={() => handleCategoryClick("my-saved-story")}
                style={{ cursor: "pointer" }}
              >
                My Saved Story
              </ListGroup.Item>

              {categories.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className={`${styles.category_item} ${selectedCategory === index ? styles.selectedCategory : ""}`}
                  onClick={() => handleCategoryClick(index, item.title, item.file_name)}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          <div className={styles.content}>
            {renderBlogs()}
          </div>
        </div>

        {/* Pagination */}
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

        {/* Chat Widget */}
        <ChatWidget />
      </Container>
    </>
  );
}

export default Blogs;
