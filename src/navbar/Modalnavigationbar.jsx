//  import React, { useState,useEffect } from 'react';

// import logo from '../img/logo.jpg';
// import { Link } from "react-router-dom";  
// import { FaAngleDown } from "react-icons/fa6";
// import { Modal, Button,Row,Container } from 'react-bootstrap';

// import icon1 from '../img/icon1.png'
// import icon2 from '../img/icon2.png'
// import icon3 from '../img/icon3.png'
// import icon4 from '../img/icon4.png'
// import icon5 from '../img/icon5.png'
// import Modalpopup from '../home/Modalpopup';


// function Modalnavigationbar(props) {

//   const [isSticky, setIsSticky] = useState(false);

//     const [showModal, setShowModal] = useState(false);

//     const handleShow = () => {
//         setShowModal(true);
//       };
    
//       const handleClose = () => {
//         setShowModal(false);
//       };

//     useEffect(() => {
//       const handleScroll = () => {
//         if (window.scrollY > 100) {
//           setIsSticky(true);
//         } else {
//           setIsSticky(false);
//         }
//       };
  
//       window.addEventListener('scroll', handleScroll);
  
//       return () => {
//         window.removeEventListener('scroll', handleScroll);
//       };
//     }, []);

//   return (
//     <>
       
//          <div className={`navbar-area ${isSticky ? 'is-sticky' : ''}`}>
//     <div className="labto-mobile-nav">
//         <div className="logo">
//         <Link to="/" className='logoimage'><img src={logo}/></Link>
//         </div>
//     </div>
//     <div className="labto-nav">
//         <div className="container">
//         <nav className="navbar navbar-expand-md navbar-light">
//             <Link className="navbar-brand logoimage" to="/"><img src={logo}/></Link>
//             <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
//             <ul className="navbar-nav">
//                 <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
//                 <li className="nav-item"><Link to="/" className="nav-link">About Us </Link></li>
//                 <li className="nav-item"><Link to="/" className="nav-link">Network <FaAngleDown /></Link>
//                 <ul className="dropdown-menu">
//                     <li className="nav-item"><Link to="/laboratory" className="nav-link">Laboratory</Link></li>
//                     <li className="nav-item"><Link to="/pharmacy" className="nav-link">Pharmacy</Link></li>
//                     <li className="nav-item"><Link to="/" className="nav-link">Doctors</Link></li>
//                     <li className="nav-item"><Link to="/hospital" className="nav-link">Hospital</Link></li>
//                     <li className="nav-item"><Link to="/" className="nav-link">Patients</Link></li>
//                 </ul>
//                 </li>
//                 <li className="nav-item"><Link to="/" className="nav-link">Registration </Link> </li>
//                 <li className="nav-item"><Link to="/" className="nav-link">Contact </Link></li>
//             </ul>
//             <Link to={props.navigatelink} className="btn btn-secondary ms-3 btn-login" onClick={(e) => e.currentTarget.getAttribute('href') === '/' ? handleShow() : handleClose()}>Login / Sign Up </Link>
    

//      <Modal show={showModal} onHide={handleClose} centered size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title className="fw-bold">Login to our Network</Modal.Title>
        
//       </Modal.Header>
//       <Modal.Body>
//       <Row className="justify-content-center" id="industry">
//           <Modalpopup
//             networkimage={icon1}
//             networktitle="Laboratory"
//             modalpopuplink="/laboratry-login"
//             size="3"
//           />
//           <Modalpopup
//             networkimage={icon2}
//             networktitle="Pharmacy"
//             modalpopuplink="/pharmacy-login"
//             size="3"
//           />
//           <Modalpopup
//             networkimage={icon3}
//             networktitle="Doctors"
//             modalpopuplink="/doctor-login"
//             size="3"
//           />
//           <Modalpopup
//             networkimage={icon4}
//             networktitle="Hospitals"
//             modalpopuplink="/hospital-login"
//             size="3"
//           />
//           <Modalpopup
//             networkimage={icon5}
//             networktitle="Patients"
//             modalpopuplink="/patient-login"
//             size="3"
//           />
      
//         </Row>
    
//       </Modal.Body>
//       </Modal>
//             </div>
//         </nav>        
//         </div>
//     </div>
//     </div> 


    
//     </>
//   )
// }

// export default Modalnavigationbar


// hamgurug menu in 




import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { Modal, Row } from 'react-bootstrap';

import logo from '../img/logo.jpg';
import icon1 from '../img/icon1.png'
import icon2 from '../img/icon2.png'
import icon3 from '../img/icon3.png'
import icon4 from '../img/icon4.png'
import icon5 from '../img/icon5.png'
import Modalpopup from '../home/Modalpopup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Modalnavigationbar(props) {
  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setOpen] = useState(false); // State for hamburger menu
  // const expand = false;

  const [expand, setExpand] = useState(false);
  const [toggleWidth, setToggleWidth] = useState('100px');

  const handleToggleWidth = () => {
    if (toggleWidth === '100px') {
      setToggleWidth('50px');
    } else {
      setToggleWidth('100px');
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`navbar-area ${isSticky ? 'is-sticky' : ''}`}>
        <div className="labto-mobile-nav">
          <div className="logo">
            <Link to="/" className='logoimage'><img src={logo} alt="logo" /></Link>
          </div>
          {/* Hamburger menu */}
          {/* <Hamburger toggled={isOpen} toggle={setOpen}
          
          /> */}
 <Navbar key={expand} expand={expand ? 'sm' : ''} >
      <Container fluid>
        
        {/* Conditional rendering based on toggleWidth */}
        {toggleWidth === '50px' ? (
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            onClick={handleToggleWidth}
            style={{ width: '50px', left: 'auto', right: '15px' }} // Position to right side
          />
        ) : (
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        )}
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
             
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link to="/" className='mobile-link'>Home</Link>
              <Link to="/" className='mobile-link'>About us</Link>
              <NavDropdown className='mobile-link'
                title="Network"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <Link to="/laboratory" className='mobile-link'>Laboratory</Link>
                <Link to="/pharmacy" className='mobile-link'>Pharmacy</Link>
                <Link to="/doctor" className='mobile-link'>Doctors</Link>
                <Link to="/hospital" className='mobile-link'>Hospital</Link>
                <Link to="/patient-login" className='mobile-link'>Patients</Link>
              </NavDropdown>
              <Link to="/Registration" className='mobile-link'>Registration</Link>
              <Link to="/" className='mobile-link'>Contact</Link>
              <Link to={props.navigatelink} className="btn btn-secondary ms-3 btn-login" onClick={(e) => e.currentTarget.getAttribute('href') === '/' ? handleShow() : handleClose()}>Login / Sign Up</Link>

<Modal show={showModal} onHide={handleClose} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold mobile-link" >Login to our Network</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Row className="justify-content-center" id="industry">
      <Modalpopup
        networkimage={icon1}
        networktitle="Laboratory"
        modalpopuplink="/laboratory-login"
        size="3"
      />
      <Modalpopup
        networkimage={icon2}
        networktitle="Pharmacy"
        modalpopuplink="/pharmacy-login"
        size="3"
      />
      <Modalpopup
        networkimage={icon3}
        networktitle="Doctors"
        modalpopuplink="/doctor-login"
        size="3"
      />
      <Modalpopup
        networkimage={icon4}
        networktitle="Hospitals"
        modalpopuplink="/hospital-login"
        size="3"
      />
      <Modalpopup
        networkimage={icon5}
        networktitle="Patients"
        modalpopuplink="/patient-login"
        size="3"
      />
    </Row>
  </Modal.Body>
</Modal>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

        </div>
        {/* Sidebar */}
        <div className={`labto-nav ${isOpen ? 'active' : ''}`}>
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link className="navbar-brand logoimage" to="/"><img src={logo} alt="logo" /></Link>
              <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
                  <li className="nav-item"><Link to="/about" className="nav-link">About Us</Link></li>
                  <li className="nav-item"><Link to="/" className="nav-link">Network <FaAngleDown /></Link>
                    <ul className="dropdown-menu">
                      <li className="nav-item"><Link to="/laboratory" className="nav-link">Laboratory</Link></li>
                      <li className="nav-item"><Link to="/pharmacy" className="nav-link">Pharmacy</Link></li>
                      <li className="nav-item"><Link to="/doctor" className="nav-link">Doctors</Link></li>
                      <li className="nav-item"><Link to="/hospital" className="nav-link">Hospital</Link></li>
                      <li className="nav-item"><Link to="/patient-login" className="nav-link">Patients</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item"><Link to="/Registration" className="nav-link">Registration</Link></li>
                  <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
                </ul>
                <Link to={props.navigatelink} className="btn btn-secondary ms-3 btn-login" onClick={(e) => e.currentTarget.getAttribute('href') === '/' ? handleShow() : handleClose()}>Login / Sign Up</Link>

                <Modal show={showModal} onHide={handleClose} centered size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Login to our Network</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row className="justify-content-center" id="industry">
                      <Modalpopup
                        networkimage={icon1}
                        networktitle="Laboratory"
                        modalpopuplink="/laboratory-login"
                        size="3"
                      />
                      <Modalpopup
                        networkimage={icon2}
                        networktitle="Pharmacy"
                        modalpopuplink="/pharmacy-login"
                        size="3"
                      />
                      <Modalpopup
                        networkimage={icon3}
                        networktitle="Doctors"
                        modalpopuplink="/doctor-login"
                        size="3"
                      />
                      <Modalpopup
                        networkimage={icon4}
                        networktitle="Hospitals"
                        modalpopuplink="/hospital-login"
                        size="3"
                      />
                      <Modalpopup
                        networkimage={icon5}
                        networktitle="Patients"
                        modalpopuplink="/patient-login"
                        size="3"
                      />
                    </Row>
                  </Modal.Body>
                </Modal>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modalnavigationbar;
