import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from "../../public/assets/msb.png"
import Image from 'next/image';
import styles from "./NavSection.module.scss"
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import SupportIcon from '@mui/icons-material/Support';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { AllCategoryAPI, SearchAPI, UserLogOutAPI, getLocalStorageItem, removeLocalStorageItem } from '@/Constants/Api/Api';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaBars } from "react-icons/fa";
import { getClinetProfile } from '@/redux/getClientProfileSlice';
import { BiSearch } from "react-icons/bi"

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
function NavSection() {
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search");
  const router = useRouter();
  const [profile, setProfile] = useState()
  const [category, setCategory] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openlist, setOepnlist] = useState(true)
  const [searchResults, setSearchResults] = useState([]);
  const [isClient, setIsClient] = useState(false)

  console.log(router.asPath, "check path")
  useEffect(() => {
    setIsClient(true)
  }, [])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [offcanvasWidth, setOffcanvasWidth] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth >= 1200 ? '50%' : '80%';
      setOffcanvasWidth(width);
    }
  }, []);
  useEffect(() => {
    AllCategoryAPI().then((res) => {
      setCategory(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  const handleLogout = () => {
    removeLocalStorageItem("UserLoginToken");
    UserLogOutAPI().then((res) => {
    }).catch((error) => {
      router.replace("/")
      console.log(error)
    })
  }
  const storedValue = getLocalStorageItem("UserLoginToken");
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getClinetProfile(storedValue)).then((res) => {
      setProfile(res?.payload)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch,storedValue])
  const handleSearchApi = () => {
    callAPI();
  }
  const keyPressHandler = (e) => {
    if (e.key === 'Enter') { // Check if the pressed key is 'Enter'
      callAPI(); // Call your API function here
    }
  };
  const callAPI = () => {
    SearchAPI(searchQuery).then((res) => {
      setOepnlist(true)
      setSearchResults(res.data)
    })
  };
  return (
    <div className={styles.Navsection}>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand onClick={() => {
            const path = "/"
            router.push(path)
          }}>
            <Image src={Logo} width={50} height={50} style={{ cursor: "pointer" }} alt='' className={styles.logo} />
          </Navbar.Brand>
          {router.asPath === "/otp" || router.asPath === "/signin" || router.asPath === "/signup" || router.asPath === "/forgotpassword" ? null :

            <div className="search-container">
              <InputGroup >
                <Form.Control
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  type="text"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={keyPressHandler}
                  placeholder="Search here..."
                />
                <InputGroup.Text id="basic-addon2" style={{ cursor: "pointer" }} onClick={handleSearchApi}><BiSearch />Search</InputGroup.Text>
              </InputGroup>
              {searchQuery && openlist && (
                // <ul className="search-results">
                <ListGroup style={{ width: "100%" }}>
                  {searchResults.map((item, index) => (
                    <ListGroup.Item key={index} style={{ cursor: "pointer" }} onClick={() => {
                      const path = `/blogdetail/${item?.id}`
                      router.push(path); setOepnlist(false)
                    }}>{item?.heading}</ListGroup.Item>
                  ))}
                </ListGroup>
                // </ul>
              )}
            </div>}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
            style={{ width: offcanvasWidth }}
          >

            <Offcanvas.Body>


              <Nav className="justify-content-end flex-grow-1">
                {router.asPath === "/otp" || router.asPath === "/signin" || router.asPath === "/signup" || router.asPath === "/forgotpassword" ? null :
                  <>
                    <Nav.Link onClick={() => {
                      const path = "/"
                      router.push(path)
                    }}>Home</Nav.Link>
                    <NavDropdown
                      title="Categories"
                      id={`offcanvasNavbarDropdown-expand-md`}
                    >
                      <ul
                        className="list_name"
                      >
                        {category.map((item, index) => {
                          return (
                            <li style={{ cursor: "pointer", listStyle: "none", padding: "2px" }} key={index} onClick={() => {
                              const path = `/blogs/${item.slug}`
                              router.push(path)
                            }}>{item.title}</li>
                          )
                        })}
                      </ul>
                    </NavDropdown>
                    <Nav.Link onClick={() => {
                      const path = "/blogs/all"
                      router.push(path)
                    }}>Blogs</Nav.Link>
                  </>
                }
              </Nav>
              <div>
                {isClient &&
                  storedValue ?
                  <>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }} p
                        style={{ margin: 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      {/* <div style={{ margin: "10px", padding: "4px" }}>
                      <h5 style={{ textTransform: "capitalize" }}>{profile?.name}</h5>
                      <p>{profile?.email}</p>
                    </div> */}
                      {/* <Divider /> */}
                      <MenuItem onClick={() => {
                        handleClose;
                        const path = "/profile";
                        router.push(path);
                      }}>
                        <ListItemIcon>
                          <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                      {/* <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <SupportIcon fontSize="small" />
                        </ListItemIcon>
                        Help & Support
                      </MenuItem> */}
                      <MenuItem onClick={() => { handleClose(); handleLogout() }}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                  : isClient&&
                  router.asPath === "/forgotpassword" ?
                    <>
                      <Button style={{
                        borderRadius: "10px",
                        background: "#174F78", border: "none",margin:"20px"
                      }}
                        onClick={() => {
                          const path = "/signin"
                          router.push(path)
                        }}
                      >Log In</Button>
                       <Button style={{
                        borderRadius: "10px",
                        background: "#174F78", border: "none"
                      }}
                        onClick={() => {
                          const path = "/signup"
                          router.push(path)
                        }}
                      >Sign Up</Button>

                    </> 
                    : isClient&&
                    router.asPath === "/signin" ?
                    <Button style={{
                      borderRadius: "10px",
                      background: "#174F78", border: "none"
                    }}
                      onClick={() => {
                        const path = "/signup"
                        router.push(path)
                      }}
                    >Sigup</Button>:
                    <Button style={{
                      borderRadius: "10px",
                      background: "#174F78", border: "none"
                    }}
                      onClick={() => {
                        const path = "/signin"
                        router.push(path)
                      }}
                    >Login</Button>
                }
              </div>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </div>
  );
}
export default NavSection;