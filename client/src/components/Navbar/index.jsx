import React from "react";
import logo from "../../assets/images/logo.png";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import {
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import "./styles.css";

const NavigationBar = () => {
  const badgeValue = 2;
  const menuList = [
    { name: "HOW IT WORKS", href: "howitworks" },
    { name: "REPAIR & SERVICES", href: "services" },
    { name: "CREATE YOUR OWN JEWELRY", href: "customjewelry" },
    { name: "REGISTER", href: "register" },
    { name: "CONTACT", href: "contact" },
  ];

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
                <span class="position-absolute top-10 start-10 translate-middle badge rounded-pill cart-badge">
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
              <Nav.Link href="#user">
                <AiOutlineUser fontSize={24} />
              </Nav.Link>
              <Nav.Link eventKey={2} href="#cart">
                <AiOutlineShopping fontSize={24} />
                {badgeValue === 0 ? null : (
                  <span class="position-absolute top-10 start-10 translate-middle badge rounded-pill cart-badge">
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
          {menuList.map((menu) => (
            <Nav.Link href={`/${menu.href}`} className="menu-link">
              {menu.name}
            </Nav.Link>
          ))}
        </Col>
      </Container>
    </>
  );
};

export default NavigationBar;
