import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Container, Navbar, Nav, Offcanvas, Col } from "react-bootstrap";
import {
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import "./styles.css";
import Login from "../Forms/Login";
import { logout } from "../../redux/actions/auth";

const NavigationBar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const badgeValue = 2;
  const menuList = [
    { name: "HOW IT WORKS", href: "howitworks" },
    { name: "REPAIR & SERVICES", href: "services" },
    { name: "CREATE YOUR OWN JEWELRY", href: "customjewelry" },
    { name: "CONTACT", href: "contact" },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <Container className="top-nav">
        <Navbar collapseOnSelect expand="lg" variant="light">
          <Container>
            <Navbar.Toggle
              className="mobile-toggle"
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="auto"
                height="30"
                className="d-inline-block align-top"
                alt="AMFM Logo"
              />
            </Navbar.Brand>

            <Nav.Link eventKey={2} href="#cart" className="d-lg-none ">
              <AiOutlineShopping fontSize={24} />
              {badgeValue === 0 ? null : (
                <span className="position-absolute top-10 start-10 translate-middle badge rounded-pill cart-badge">
                  {badgeValue}
                </span>
              )}
            </Nav.Link>
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="d-lg-none">Hello</Nav>
            </Navbar.Collapse>
            <Offcanvas
              show={show}
              onHide={handleClose}
              placement={"end"}
              name={"end"}
            >
              <img
                className="canvas-img"
                src={`https://images.unsplash.com/photo-1517857399767-a9dc28f5a734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`}
                alt="First slide"
              />
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>ACCOUNT</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Login />
              </Offcanvas.Body>
            </Offcanvas>
            <Nav className="d-none d-lg-flex">
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
              Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
              <Nav.Link href="#search">
                <AiOutlineSearch fontSize={24} />
              </Nav.Link>
              <Nav.Link href="#user" onClick={handleShow}>
                <AiOutlineUser fontSize={24} />
              </Nav.Link>
              <Nav.Link eventKey={2} href="#cart">
                <AiOutlineShopping fontSize={24} />
                {badgeValue === 0 ? null : (
                  <span className="position-absolute top-10 start-10 translate-middle badge rounded-pill cart-badge">
                    {badgeValue}
                  </span>
                )}
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Container>
      <Container>
        <Col xs={12} className="d-flex justify-content-center menu-link">
          {menuList.map((menu, key) => (
            <Nav.Link
              href={`/${menu.href}`}
              key={menu.href}
              className="menu-link"
            >
              {menu.name}
            </Nav.Link>
          ))}
          <Nav.Link
            href={`${currentUser ? "/" : "/register"}`}
            onClick={currentUser ? logOut : null}
            className="menu-link"
          >
            {currentUser ? "LOGOUT" : "REGISTER"}
          </Nav.Link>
          <div>
            {showModeratorBoard && (
              <li className="nav-item">
                <Nav.Link href={"/mod"} className="nav-link">
                  Moderator Board
                </Nav.Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Nav.Link href={"/admin"} className="nav-link">
                  Admin Board
                </Nav.Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Nav.Link href={"/user"} className="nav-link">
                  User
                </Nav.Link>
              </li>
            )}
          </div>
        </Col>
      </Container>
    </>
  );
};

export default NavigationBar;
