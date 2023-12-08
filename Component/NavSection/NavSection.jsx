import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./NavSection.module.scss";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  AllCategoryAPI,
  SearchAPI,
  UserLogOutAPI,
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/Constants/Api/Api";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { getClinetProfile } from "@/redux/getClientProfileSlice";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
function NavSection() {
  const router = useRouter();
  const [profile, setProfile] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openlist, setOepnlist] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [show, setShow] = useState(false);
  const handleClosesidebar = () => setShow(false);
  const handleShowsidebar = () => setShow(true);
  const storedValue = getLocalStorageItem("UserLoginToken");

  // console.log(storedValue,"storedValue in navsection")
  useEffect(() => {
    setIsClient(true);
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [offcanvasWidth, setOffcanvasWidth] = useState("");

  const handleLogout = () => {
    removeLocalStorageItem("UserLoginToken");
    if (storedValue) {

      UserLogOutAPI()
        .then((res) => {
          router.replace("/");
        })
        .catch((error) => {
          router.replace("/");
          console.log(error);
        });
    }

  };
  // useEffect(() => {

  // }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth >= 1200 ? "50%" : "80%";
      setOffcanvasWidth(width);
    }

    if (storedValue) {
      dispatch(getClinetProfile(storedValue))
        .then((res) => {
          setProfile(res?.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, storedValue]);
  const handleSearchApi = () => {
    setOepnlist(false);
    callAPI();
  };
  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      callAPI();
    }
  };
  const callAPI = () => {
    setOepnlist(false);
    SearchAPI(searchQuery).then((res) => {
      setOepnlist(true);
      setSearchResults(res.data);
    });
  };
  const handleRedirect = (id) => {
    const path = `/story-detail/${id}`;
    router.push(path);
    setSearchQuery("")
  };

  return (
    <Navbar expand="lg" className={styles.NavbarSection} sticky="top" >
      <Container>
        <Navbar.Brand
          onClick={() => {
            const path = "/";
            router.push(path);
          }}
        >
          <h4 style={{ cursor: "pointer", color: "#C8232C", fontWeight: "bold" }} >MyStoryBank</h4>
        </Navbar.Brand>
        {isClient && router.asPath === "/forgotpassword" ? <Button className="button_theme"
          style={{
            fontSize: "large"
          }}
          onClick={() => {
            const path = "/signin";
            router.push(path);
            handleClosesidebar()
          }}
        >
          Login
        </Button> :
          isClient && router.asPath === "/signin" ? null :
            <>
              {isClient && storedValue && router.asPath !== "/" &&
                <div className="search-container">
                  <InputGroup>
                    <Form.Control
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={keyPressHandler}
                      placeholder="Search here..."
                    />
                    <InputGroup.Text
                      id="basic-addon2"
                      style={{ cursor: "pointer" }}
                      onClick={handleSearchApi}
                    >
                      <BiSearch />
                      Search
                    </InputGroup.Text>
                  </InputGroup>
                  {searchQuery && openlist && (
                    <ListGroup style={{ width: "100%", position: "absolute" }}>
                      {searchResults.length === 0 ? (
                        <ListGroup.Item>No data found</ListGroup.Item>
                      ) : (
                        searchResults.map((item, index) => (
                          <ListGroup.Item
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleRedirect(item.id); setOepnlist(false)
                            }
                            }
                          >
                            {item?.heading}
                          </ListGroup.Item>
                        ))
                      )}
                    </ListGroup>
                  )}
                </div>
              }
              <Navbar.Toggle
                onClick={handleShowsidebar}
              />
              <Navbar.Offcanvas
                placement="end"
                style={{ width: offcanvasWidth }}
                show={show} onHide={handleClosesidebar}
              >
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1">
                    <Nav.Link
                      onClick={() => {
                        const path = "/";
                        router.push(path); handleClosesidebar()
                      }}
                    >
                      Home
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        const path = "/story/all";
                        router.push(path); handleClosesidebar()
                      }}
                    >
                      Stories
                    </Nav.Link>
                  </Nav>
                  <div>
                    {isClient && storedValue &&
                      <>
                        <Tooltip title="Account settings">
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            p
                            style={{ margin: 0 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                          >
                            <Avatar sx={{ width: 32, height: 32 }} style={{ background: "#C8232C" }}>
                              {profile?.name.charAt(0)}
                            </Avatar>
                          </IconButton>
                        </Tooltip>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                          transformOrigin={{ horizontal: "right", vertical: "top" }}
                          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                          <MenuItem
                            onClick={() => {
                              handleClose;
                              const path = "/profile";
                              router.push(path);
                              handleClosesidebar()
                            }}
                          >
                            <ListItemIcon>
                              <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            Profile
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              handleLogout();
                              handleClosesidebar()
                            }}
                          >
                            <ListItemIcon>
                              <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                          </MenuItem>
                        </Menu>
                      </>
                    }
                    {isClient && !storedValue &&
                      <Button className="button_theme"
                        style={{
                          fontSize: "large"
                        }}
                        onClick={() => {
                          const path = "/signin";
                          router.push(path);
                          handleClosesidebar()
                        }}
                      >
                        Login
                      </Button>
                    }
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </>
        }
      </Container>
    </Navbar>
  );
}
export default NavSection;
