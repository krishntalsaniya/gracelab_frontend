import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const getLinkClass = (path) => {
    return activeLink === path ? "mobile-link active-link" : "mobile-link";
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
                id={`offcanvasNavbar-expand-lg`}
                aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-lg`}
                  ></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link
                      to="/"
                      className={getLinkClass("/")}
                      onClick={() => setActiveLink("/")}
                    >
                      Home
                    </Link>
                    <NavDropdown
                      className={getLinkClass("/network")}
                      title="About"
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                      <Link
                        to="/cms/667e52387a043e58372e16ce"
                        className={getLinkClass(
                          "/cms/667e52387a043e58372e16ce"
                        )}
                      >
                        About Gracelab
                      </Link>
                      <Link
                        to="/Directors"
                        className={getLinkClass("/Directors")}
                      >
                        Directors
                      </Link>
                      <Link
                        to="/Testimonial"
                        className={getLinkClass("/Testimonial")}
                      >
                        Testimonial
                      </Link>
                      <Link to="/awards" className={getLinkClass("/awards")}>
                        Awards and certificate
                      </Link>
                    </NavDropdown>
                    <Link
                      to="/camping"
                      className={getLinkClass("/camping")}
                      onClick={() => setActiveLink("/camping")}
                    >
                      Campaign
                    </Link>
                    <NavDropdown
                      className={getLinkClass("/network")}
                      title="Network"
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                      <Link
                        to="/laboratory"
                        onClick={() => {
                          handleLinkClick("Laboratory");
                          setActiveLink("/laboratory");
                        }}
                        className={getLinkClass("/laboratory")}
                      >
                        Laboratory
                      </Link>
                      <Link
                        to="/pharmacy"
                        onClick={() => {
                          handleLinkClick("Pharmacy");
                          setActiveLink("/pharmacy");
                        }}
                        className={getLinkClass("/pharmacy")}
                      >
                        Pharmacy
                      </Link>
                      <Link
                        to="/doctor"
                        onClick={() => {
                          handleLinkClick("Doctors");
                          setActiveLink("/doctor");
                        }}
                        className={getLinkClass("/doctor")}
                      >
                        Doctors
                      </Link>
                      <Link
                        to="/hospital"
                        onClick={() => {
                          handleLinkClick("Hospital");
                          setActiveLink("/hospital");
                        }}
                        className={getLinkClass("/hospital")}
                      >
                        Hospital
                      </Link>
                      <Link
                        to="/patient-login"
                        onClick={() => {
                          handleLinkClick("Patients");
                          setActiveLink("/patient-login");
                        }}
                        className={getLinkClass("/patient-login")}
                      >
                        Patients
                      </Link>
                    </NavDropdown>

                    <NavDropdown
                      className={getLinkClass("/network")}
                      title="Media"
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                      <Link to="/news" className={getLinkClass("/news")}>
                        News and media
                      </Link>
                      <Link to="/blog" className={getLinkClass("/blog")}>
                        Blog
                      </Link>
                    </NavDropdown>

                    <NavDropdown
                      className={getLinkClass("/network")}
                      title="Package"
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                      <Link
                        to="/pregnancy-blood-test"
                        className={getLinkClass("/pregnancy-blood-test")}
                      >
                        Pregnancy Blood Test
                      </Link>
                      <Link
                        to="/blood-test-kids"
                        className={getLinkClass("/blood-test-kids")}
                      >
                        Blood Test For Kids
                      </Link>
                      <Link
                        to="/full-body-checkup"
                        className={getLinkClass("/full-body-checkup")}
                      >
                        Full Body Checkup
                      </Link>
                      <Link
                        to="/senior-citizen-male"
                        className={getLinkClass("/senior-citizen-male")}
                      >
                        Health checkup for senior citizen (male)
                      </Link>
                      <Link
                        to="/senior-citizen-female"
                        className={getLinkClass("/senior-citizen-female")}
                      >
                        Health checkup for senior citizen (Female)
                      </Link>
                      <Link
                        to="/swine-flue"
                        className={getLinkClass("/swine-flue")}
                      >
                        Swine Flue Test In vadodara
                      </Link>
                      <Link
                        to="/serology-blood-test"
                        className={getLinkClass("/serology-blood-test")}
                      >
                        Serology Blood Test
                      </Link>
                      <Link
                        to="/ige-test"
                        className={getLinkClass("/ige-test")}
                      >
                        Blood Ige Test in vadodara
                      </Link>
                      <Link
                        to="/PCOD-pofile-blood-test"
                        className={getLinkClass("/ige-test")}
                      >
                        PCOD Profile Blood Test
                      </Link>
                    </NavDropdown>

                    <NavDropdown
                      className={getLinkClass("/network")}
                      title="Contact"
                      id={`offcanvasNavbarDropdown-expand-lg`}
                    >
                      <Link to="/contact" className={getLinkClass("/contact")}>
                        Contact Us
                      </Link>
                      <Link
                        to="/Feedback"
                        className={getLinkClass("/Feedback")}
                      >
                        Feedback
                      </Link>
                      <Link
                        to="/cms/66878d3413d429f45685f7e7"
                        className={getLinkClass(
                          "/cms/66878d3413d429f45685f7e7"
                        )}
                      >
                        Terms and condition
                      </Link>
                      <Link
                        to="/cms/66878d5913d429f45685f7ea"
                        className={getLinkClass(
                          "/cms/66878d5913d429f45685f7ea"
                        )}
                      >
                        Refund Policy
                      </Link>
                      <Link to="/cms/66b5dfea9f6f866057e3073b" className={getLinkClass("/cms/66b5dfea9f6f866057e3073b")}>
                        Privacy Policy
                      </Link>
                      <Link to="/center" className={getLinkClass("/center")}>
                        Center
                      </Link>
                      <Link
                        to="/join-handwith-us"
                        className={getLinkClass("/join-handwith-us")}
                      >
                        Join hand with us
                      </Link>
                    </NavDropdown>

                    <Link
                      to={props.navigatelink}
                      className="btn btn-secondary ms-3 btn-login"
                      onClick={(e) =>
                        e.currentTarget.getAttribute("href") === "/" ||
                        e.currentTarget.getAttribute("href") === "/Registration"
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
                    <Link to="/camping" className="nav-link">
                      Campaign
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      About Us <FaAngleDown />
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          to="/cms/667e52387a043e58372e16ce"
                          className="nav-link"
                        >
                          About Gracelab
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Directors" className="nav-link">
                          Directors
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Testimonial" className="nav-link">
                          Testimonial
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/awards" className="nav-link">
                          Awards and Certificate
                        </Link>
                      </li>
                    </ul>
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

                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Media <FaAngleDown />
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/news" className="nav-link">
                          News and Media
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/blog" className="nav-link">
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Package <FaAngleDown />
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/pregnancy-blood-test" className="nav-link">
                          Pregnancy Blood Test
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/blood-test-kids" className="nav-link">
                          Blood Test For Kids
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/full-body-checkup" className="nav-link">
                          Full Body Checkup
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/senior-citizen-male" className="nav-link">
                          Health checkup for senior citizen (male)
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/senior-citizen-female" className="nav-link">
                          Health checkup for senior citizen (Female)
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/swine-flue" className="nav-link">
                          Swine Flue Test In vadodara
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/serology-blood-test" className="nav-link">
                          Serology Blood Test
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ige-test" className="nav-link">
                          Blood Ige Test in vadodara
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/PCOD-pofile-blood-test" className="nav-link">
                          PCOD Profile Blood Test
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Contact <FaAngleDown />
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/contact" className="nav-link">
                          Contact Us
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Feedback" className="nav-link">
                          Feedback
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/cms/66878d3413d429f45685f7e7"
                          className="nav-link"
                        >
                          Terms and condition
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/cms/66878d5913d429f45685f7ea"
                          className="nav-link"
                        >
                          Refund Policy
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/cms/66b5dfea9f6f866057e3073b"
                          className="nav-link"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/center" className="nav-link">
                          Center
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/join-handwith-us" className="nav-link">
                          Join hand with us
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
