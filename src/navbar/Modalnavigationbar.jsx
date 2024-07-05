import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { Col, Modal, Row, Card, Image } from "react-bootstrap";

import logo from "../img/logo.jpg";
import icon1 from "../img/icon1.png";
import icon2 from "../img/icon2.png";
import icon3 from "../img/icon3.png";
import icon4 from "../img/icon4.png";
import icon5 from "../img/icon5.png";
import Modalpopup from "../home/Modalpopup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function Modalnavigationbar(props) {
  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setOpen] = useState(false); // State for hamburger menu
  // const expand = false;

  const [expand, setExpand] = useState(false);
  const [toggleWidth, setToggleWidth] = useState("100px");

  const handleToggleWidth = () => {
    if (toggleWidth === "100px") {
      setToggleWidth("50px");
    } else {
      setToggleWidth("100px");
    }
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLinkClick(item) {
    localStorage.setItem("selectedNavItem", item);
  }

  function handleLinkClicktellusmore(item) {
    localStorage.setItem("selectedtellusmore", item);
  }
  return (
    <>
      <div className={`navbar-area ${isSticky ? "is-sticky" : ""}`}>
        <div className="labto-mobile-nav">
          <div className="logo">
            <Link to="/" className="logoimage">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {/* Hamburger menu */}
          {/* <Hamburger toggled={isOpen} toggle={setOpen}
          
          /> */}

          {/* this is responsive sidebar */}
          <Navbar key={expand} expand={expand ? "sm" : ""}>
            <Container fluid>
              {/* Conditional rendering based on toggleWidth */}
              {toggleWidth === "50px" ? (
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  onClick={handleToggleWidth}
                  style={{ width: "50px", left: "auto", right: "15px" }} // Position to right side
                />
              ) : (
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
              )}
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-${expand}`}
                  ></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link to="/" className="mobile-link">
                      Home
                    </Link>
                    <Link
                      to="/about/667e52387a043e58372e16ce"
                      className="mobile-link"
                    >
                      About us
                    </Link>

                    <Link
                      to="/camping"
                      className="mobile-link"
                    >
                      Campaign
                    </Link>
                    <NavDropdown
                      className="mobile-link"
                      title="Network"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <Link
                        to="/laboratory"
                        onClick={() => handleLinkClick("Laboratory")}
                        className="mobile-link"
                      >
                        Laboratory
                      </Link>
                      <Link
                        to="/pharmacy"
                        onClick={() => handleLinkClick("Pharmacy")}
                        className="mobile-link"
                      >
                        Pharmacy
                      </Link>
                      <Link
                        to="/doctor"
                        onClick={() => handleLinkClick("Doctors")}
                        className="mobile-link"
                      >
                        Doctors
                      </Link>
                      <Link
                        to="/hospital"
                        onClick={() => handleLinkClick("Hospital")}
                        className="mobile-link"
                      >
                        Hospital
                      </Link>
                      <Link
                        to="/patient-login"
                        onClick={() => handleLinkClick("Patients")}
                        className="mobile-link"
                      >
                        Patients
                      </Link>
                    </NavDropdown>
                    {/* <Link to="/Registration" className='mobile-link'>Registration</Link> */}
                    {/* <Link to="/contact" className="mobile-link">
                      Contact
                    </Link> */}
                    <Link
                      to={props.navigatelink}
                      className="btn btn-secondary ms-3 btn-login"
                      onClick={(e) =>
                        e.currentTarget.getAttribute("href") === "/" ||
                        "/Registration"
                          ? handleShow()
                          : handleClose()
                      }
                    >
                      Login / Sign Up
                    </Link>

                    <Modal
                      show={showModal}
                      onHide={handleClose}
                      centered
                      size="lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="fw-bold mobile-link">
                          Login to our Network
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Row className="justify-content-center" id="industry">
                          <Col lg={3} md={4} sm={6}>
                            <Link
                              to="/laboratory"
                              onClick={() => handleLinkClick("Laboratory")}
                            >
                              <Card className="single-services-box-modalpopup text-center">
                                <Card.Body>
                                  <div className="icon">
                                    <Image src={icon1} alt="Service Icon" />
                                  </div>
                                  <Card.Title className="networktitle">
                                    Laboratory
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                          <Col lg={3} md={4} sm={6}>
                            <Link
                              to="/pharmacy"
                              onClick={() => handleLinkClick("Pharmacy")}
                            >
                              <Card className="single-services-box-modalpopup text-center">
                                <Card.Body>
                                  <div className="icon">
                                    <Image src={icon2} alt="Service Icon" />
                                  </div>
                                  <Card.Title className="networktitle">
                                    Pharmacy
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                          <Col lg={3} md={4} sm={6}>
                            <Link
                              to="/doctor"
                              onClick={() => handleLinkClick("Doctors")}
                            >
                              <Card className="single-services-box-modalpopup text-center">
                                <Card.Body>
                                  <div className="icon">
                                    <Image src={icon3} alt="Service Icon" />
                                  </div>
                                  <Card.Title className="networktitle">
                                    Doctors
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                          <Col lg={3} md={4} sm={6}>
                            <Link
                              to="/hospital"
                              onClick={() => handleLinkClick("Hospital")}
                            >
                              <Card className="single-services-box-modalpopup text-center">
                                <Card.Body>
                                  <div className="icon">
                                    <Image src={icon4} alt="Service Icon" />
                                  </div>
                                  <Card.Title className="networktitle">
                                    Hospital
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                          <Col lg={3} md={4} sm={6}>
                            <Link
                              to="/patient"
                              onClick={() => handleLinkClick("Patients")}
                            >
                              <Card className="single-services-box-modalpopup text-center">
                                <Card.Body>
                                  <div className="icon">
                                    <Image src={icon5} alt="Service Icon" />
                                  </div>
                                  <Card.Title className="networktitle">
                                    Patient
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                        </Row>
                      </Modal.Body>
                    </Modal>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>



        
        {/* this is main screen sidebar */}
        <div className={`labto-nav ${isOpen ? "active" : ""}`}>
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link className="navbar-brand logoimage" to="/">
                <img src={logo} alt="logo" />
              </Link>
              <div
                className="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/cms/667e52387a043e58372e16ce"
                      className="nav-link"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/camping" className="nav-link">
                      Campaign
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Network <FaAngleDown />
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          to="/laboratory"
                          className="nav-link"
                          onClick={() => handleLinkClick("Laboratory")}
                        >
                          Laboratory
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/pharmacy"
                          className="nav-link"
                          onClick={() => handleLinkClick("Pharmacy")}
                        >
                          Pharmacy
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/doctor"
                          className="nav-link"
                          onClick={() => handleLinkClick("Doctors")}
                        >
                          Doctors
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/hospital"
                          className="nav-link"
                          onClick={() => handleLinkClick("Hospital")}
                        >
                          Hospital
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/patient-login"
                          className="nav-link"
                          onClick={() => handleLinkClick("Patients")}
                        >
                          Patients
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* <li className="nav-item"><Link to="/sterling-hospital" className="nav-link">hospital</Link></li> */}
                  {/* <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                      Contact
                    </Link>
                  </li> */}
                </ul>
                <Link
                  to={props.navigatelink}
                  className="btn btn-secondary ms-3 btn-login"
                  onClick={(e) =>
                    e.currentTarget.getAttribute("href") === "/"
                      ? handleShow()
                      : handleClose()
                  }
                >
                  Login / Sign Up
                </Link>

                <Modal show={showModal} onHide={handleClose} centered size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">
                      Login to our Network
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row className="justify-content-center" id="industry">
                      <Col lg={3} md={4} sm={6}>
                        <Link
                          to="/laboratory"
                          onClick={() => handleLinkClick("Laboratory")}
                        >
                          <Card className="single-services-box-modalpopup text-center">
                            <Card.Body>
                              <div className="icon">
                                <Image src={icon1} alt="Service Icon" />
                              </div>
                              <Card.Title className="networktitle">
                                Laboratory
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                      <Col lg={3} md={4} sm={6}>
                        <Link
                          to="/pharmacy"
                          onClick={() => handleLinkClick("Pharmacy")}
                        >
                          <Card className="single-services-box-modalpopup text-center">
                            <Card.Body>
                              <div className="icon">
                                <Image src={icon2} alt="Service Icon" />
                              </div>
                              <Card.Title className="networktitle">
                                Pharmacy
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                      <Col lg={3} md={4} sm={6}>
                        <Link
                          to="/doctor"
                          onClick={() => handleLinkClick("Doctors")}
                        >
                          <Card className="single-services-box-modalpopup text-center">
                            <Card.Body>
                              <div className="icon">
                                <Image src={icon3} alt="Service Icon" />
                              </div>
                              <Card.Title className="networktitle">
                                Doctors
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                      <Col lg={3} md={4} sm={6}>
                        <Link
                          to="/hospital"
                          onClick={() => handleLinkClick("Hospital")}
                        >
                          <Card className="single-services-box-modalpopup text-center">
                            <Card.Body>
                              <div className="icon">
                                <Image src={icon4} alt="Service Icon" />
                              </div>
                              <Card.Title className="networktitle">
                                Hospital
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                      <Col lg={3} md={4} sm={6}>
                        <Link
                          to="/patient-login"
                          onClick={() => handleLinkClick("Patients")}
                        >
                          <Card className="single-services-box-modalpopup text-center">
                            <Card.Body>
                              <div className="icon">
                                <Image src={icon5} alt="Service Icon" />
                              </div>
                              <Card.Title className="networktitle">
                                Patient
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modalnavigationbar;
