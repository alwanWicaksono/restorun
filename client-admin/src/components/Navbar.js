import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";

function NavBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function logoutHandler(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }
  return (
    <Navbar bg="light" expand="lg" className="px-4 fixed-top">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Taco_Bell_2016.svg/640px-Taco_Bell_2016.svg.png" class="img-fluid" style={{height: "50px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Link style={{ color: "#702082" }} className="nav-link" to="/">Item</Link>
            <Link style={{ color: "#702082" }} className="nav-link" to="/categories">Categories</Link>
            <Button style={{backgroundColor: "transparent",  color: "#702082", border: "none"}}  onClick={handleShow}>
              Register Admin
            </Button>
            <Register show={show} onHide={handleClose}/>
            <Nav.Link style={{ color: "#702082" }} onClick={(e) => logoutHandler(e)}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
