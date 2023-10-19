import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from "../../public/assets/Logo.png"
import Image from 'next/image';
import styles from "./NavSection.module.scss"
import Avatar from '@mui/material/Avatar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import SupportIcon from '@mui/icons-material/Support';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
function NavSection() {
  const router = useRouter();
  const Categories = [
    {
      "id": 1,
      "name": "Arts"
    },
    {
      "id": 2,
      "name": "Books"
    },
    {
      "id": 3,
      "name": "Design"
    },
    {
      "id": 4,
      "name": "Fashion"
    },
    {
      "id": 5,
      "name": "Beauty"
    },
    {
      "id": 6,
      "name": "Food"
    },
    {
      "id": 7,
      "name": "Performing"
    },
    {
      "id": 8,
      "name": "Visual"
    },
    {
      "id": 9,
      "name": "Business"
    },
    {
      "id": 10,
      "name": "Careers"
    },
    {
      "id": 11,
      "name": "Entrepreneurship"
    },
    {
      "id": 12,
      "name": "Investing"
    },
    {
      "id": 13,
      "name": "Management"
    },
    {
      "id": 14,
      "name": "Marketing"
    },
    {
      "id": 15,
      "name": "Non-Profit"
    },
    {
      "id": 16,
      "name": "Comedy"
    },
    {
      "id": 17,
      "name": "Interviews"
    },
    {
      "id": 18,
      "name": "Improv"
    },
    {
      "id": 19,
      "name": "Stand-Up"
    },
    {
      "id": 20,
      "name": "Education"
    },
    {
      "id": 21,
      "name": "Courses"
    },
    {
      "id": 22,
      "name": "How-To"
    },
    {
      "id": 23,
      "name": "Language"
    },
    {
      "id": 24,
      "name": "Learning"
    },
    {
      "id": 25,
      "name": "Self-Improvement"
    },
    {
      "id": 26,
      "name": "Fiction"
    },
    {
      "id": 27,
      "name": "Drama"
    },
    {
      "id": 28,
      "name": "History"
    },
    {
      "id": 29,
      "name": "Health"
    },
    {
      "id": 30,
      "name": "Fitness"
    },
    {
      "id": 31,
      "name": "Alternative"
    },
    {
      "id": 32,
      "name": "Medicine"
    },
    {
      "id": 33,
      "name": "Mental"
    },
    {
      "id": 34,
      "name": "Nutrition"
    },
    {
      "id": 35,
      "name": "Sexuality"
    },
    {
      "id": 36,
      "name": "Kids"
    },
    {
      "id": 37,
      "name": "Family"
    },
    {
      "id": 38,
      "name": "Parenting"
    },
    {
      "id": 39,
      "name": "Pets"
    },
    {
      "id": 40,
      "name": "Animals"
    },
    {
      "id": 41,
      "name": "Stories"
    },
    {
      "id": 42,
      "name": "Leisure"
    },
    {
      "id": 43,
      "name": "Animation"
    },
    {
      "id": 44,
      "name": "Manga"
    },
    {
      "id": 45,
      "name": "Automotive"
    },
    {
      "id": 46,
      "name": "Aviation"
    },
    {
      "id": 47,
      "name": "Crafts"
    },
    {
      "id": 48,
      "name": "Games"
    },
    {
      "id": 49,
      "name": "Hobbies"
    },
    {
      "id": 50,
      "name": "Home"
    },
    {
      "id": 51,
      "name": "Garden"
    },
    {
      "id": 52,
      "name": "Video-Games"
    },
    {
      "id": 53,
      "name": "Music"
    },
    {
      "id": 54,
      "name": "Commentary"
    },
    {
      "id": 55,
      "name": "News"
    },
    {
      "id": 56,
      "name": "Daily"
    },
    {
      "id": 57,
      "name": "Entertainment"
    },
    {
      "id": 58,
      "name": "Government"
    },
    {
      "id": 59,
      "name": "Politics"
    },
    {
      "id": 60,
      "name": "Buddhism"
    },
    {
      "id": 61,
      "name": "Christianity"
    },
    {
      "id": 62,
      "name": "Hinduism"
    },
    {
      "id": 63,
      "name": "Islam"
    },
    {
      "id": 64,
      "name": "Judaism"
    },
    {
      "id": 65,
      "name": "Religion"
    },
    {
      "id": 66,
      "name": "Spirituality"
    },
    {
      "id": 67,
      "name": "Science"
    },
    {
      "id": 68,
      "name": "Astronomy"
    },
    {
      "id": 69,
      "name": "Chemistry"
    },
    {
      "id": 70,
      "name": "Earth"
    },
    {
      "id": 71,
      "name": "Life"
    },
    {
      "id": 72,
      "name": "Mathematics"
    },
    {
      "id": 73,
      "name": "Natural"
    },
    {
      "id": 74,
      "name": "Nature"
    },
    {
      "id": 75,
      "name": "Physics"
    },
    {
      "id": 76,
      "name": "Social"
    },
    {
      "id": 77,
      "name": "Society"
    },
    {
      "id": 78,
      "name": "Culture"
    },
    {
      "id": 79,
      "name": "Documentary"
    },
    {
      "id": 80,
      "name": "Personal"
    },
    {
      "id": 81,
      "name": "Journals"
    },
    {
      "id": 82,
      "name": "Philosophy"
    },
    {
      "id": 83,
      "name": "Places"
    },
    {
      "id": 84,
      "name": "Travel"
    },
    {
      "id": 85,
      "name": "Relationships"
    },
    {
      "id": 86,
      "name": "Sports"
    },
    {
      "id": 87,
      "name": "Baseball"
    },
    {
      "id": 88,
      "name": "Basketball"
    },
    {
      "id": 89,
      "name": "Cricket"
    },
    {
      "id": 90,
      "name": "Fantasy"
    },
    {
      "id": 91,
      "name": "Football"
    },
    {
      "id": 92,
      "name": "Golf"
    },
    {
      "id": 93,
      "name": "Hockey"
    },
    {
      "id": 94,
      "name": "Rugby"
    },
    {
      "id": 95,
      "name": "Running"
    },
    {
      "id": 96,
      "name": "Soccer"
    },
    {
      "id": 97,
      "name": "Swimming"
    },
    {
      "id": 98,
      "name": "Tennis"
    },
    {
      "id": 99,
      "name": "Volleyball"
    },
    {
      "id": 100,
      "name": "Wilderness"
    },
    {
      "id": 101,
      "name": "Wrestling"
    },
    {
      "id": 102,
      "name": "Technology"
    },
    {
      "id": 103,
      "name": "True Crime"
    },
    {
      "id": 104,
      "name": "TV"
    },
    {
      "id": 105,
      "name": "Film"
    },
    {
      "id": 106,
      "name": "After-Shows"
    },
    {
      "id": 107,
      "name": "Reviews"
    },
    {
      "id": 108,
      "name": "Climate"
    },
    {
      "id": 109,
      "name": "Weather"
    },
    {
      "id": 110,
      "name": "Tabletop"
    },
    {
      "id": 111,
      "name": "Role-Playing"
    },
    {
      "id": 112,
      "name": "Cryptocurrency"
    }
  ]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [offcanvasWidth, setOffcanvasWidth] = useState('');
  useEffect(() => {
    // Check if window is defined (client-side) before accessing it
    if (typeof window !== 'undefined') {
      const width = window.innerWidth >= 1200 ? '50%' : '80%';
      setOffcanvasWidth(width);
    }
  }, []);
  return (
    <div className={styles.Navsection}>
      {/* {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => ( */}
      <Navbar expand="md" className="bg-body-tertiary mb-3">
        <Container>
          <Navbar.Brand onClick={() => {
            const path = "/"
            router.push(path)
          }}>
            <Image src={Logo} width={100} height={40} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
            style={{ width: offcanvasWidth }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1">
                <Nav.Link onClick={() => {
            const path = "/home"
            router.push(path)}}>Home</Nav.Link>
                {/* <Nav.Link href="#action2">Categories</Nav.Link> */}
                <NavDropdown
                  title="Categories"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <ul
                    className={styles.list_name}
                  >
                    {Categories.map((item, index) => {
                      return (
                        <li key={index}>{item.name}</li>
                      )
                    })}
                  </ul>
                  {/* <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
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
                {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
                <div style={{ margin: "10px", padding: "4px" }}>
                  <h5>Bhavya Soni</h5>
                  <p>bhavyasoni8221@gmail.com</p>
                </div>
                <Divider />
                {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
      */}
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
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <SupportIcon fontSize="small" />
                  </ListItemIcon>
                  Help & Support
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* ))} */}
    </div>
  );
}
export default NavSection;