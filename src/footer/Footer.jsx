import React,{useEffect,useState} from 'react'
import { Container, Row,Col ,Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoCheckmarkDoneSharp,IoLocationSharp  ,IoCall  } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import logo from '../img/logo.jpg';
import axios from 'axios';

function Footer() {
  const [cmsdesc, setcmsdesc] = useState([])
  useEffect(() => {
    localStorage.clear()
    
    const CMScontent = async() =>
      {
       try {
        const HomeCMScontent = await axios.get
        (
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/blogs`
        );
        console.log("show CMS content:", HomeCMScontent.data);

              
        setcmsdesc(HomeCMScontent.data)
        console.log("cms data in about us ",HomeCMScontent.data);
       } catch (error) {
        console.log("cms data   :", error)
       }
        
      }
      CMScontent();
  }, [])


   function handleLinkClick(item) {
  localStorage.setItem('selectedNavItem', item);
}
  
  return (
    <>
    <footer className="footer-area" style={{ boxShadow:'0 2px 28px 0 rgba(0, 0, 0, 0.06)'}}>
      <Container>
        <Row>
          <Col lg={2} md={6} sm={6}>
            <div className="single-footer-widget">
              <div className="logo">
                <Link to="/"><Image src={logo} alt="Logo" className='logoimage' /></Link>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
          <div className="single-footer-widget ms-5">
      <h3>Useful Links</h3>
      <ul className="useful-links-list">
        {cmsdesc.map((link, index) => (
          <li key={index}>
            <Link to={`/cms/${link._id}`}>{link.blogTitle}</Link>
          </li>
        ))}
      </ul>
    </div>
          </Col>
          <Col lg={3} md={6} sm={6}>
            <div className="single-footer-widget">
              <h3>Our Network</h3>
              <ul className="widget-services-list">
                <li><Link to="/laboratory" onClick={() => handleLinkClick('Laboratory')}>Laboratory</Link></li>
                <li><Link to="/pharmacy" onClick={() => handleLinkClick('Pharmacy')}>Pharmacy</Link></li>
                <li><Link to="/doctor" onClick={() => handleLinkClick('Doctors')}>Doctors</Link></li>
                <li><Link to="/hospital" onClick={() => handleLinkClick('Hospital')}>Hospital</Link></li>
                <li><Link to="/patient-login" onClick={() => handleLinkClick('Patients')}>Patient</Link></li>
              </ul>
            </div>
          </Col>
          <Col lg={4} md={6} sm={6}>
            <div className="single-footer-widget">
              <h3>Contact Info</h3>
              <ul className="footer-contact-info">
                <li><IoLocationSharp className='location' /> <span>FF - 8, Silvercoin Complex, Nr. Bhavan's School, Makarpura, Vadodara - 10</span></li>
                <li><IoCall className='location' /> <a href="tel:+919016950768">+91 90169 50768</a></li>
                <li><IoIosMail className='location' /> <a href="mailto:info@gracelaboratory.com">info@gracelaboratory.com</a></li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="copyright-area" style={{ backgroundColor: "#131313" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={6} sm={6}>
              <p className="text-white">© 2024 <a href="#">Grace Laboratory</a> All Rights Reserved</p>
            </Col>
            <Col lg={6} md={6} sm={6} className="text-end">
              <p className="text-white footer-section">Powered By : <a href="https://www.barodaweb.com/" target="_blank">BarodaWeb | The E-Catalogue Designer</a></p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
    
    
    </>
  )
}

export default Footer