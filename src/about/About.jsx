import React, { useEffect, useState} from 'react';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { MdArrowForwardIos } from "react-icons/md";
import about1 from '../img/image1.jpg';
import about2 from '../img/image2.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function About() {
  const { _ID } = useParams();
  const [bout, setBout] = useState({ blogDesc: "" }); // Initialize with a default structure

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/blogs/${_ID}`
        );
        console.log("About", res.data); // Log the response to verify structure
        setBout(res.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAbout();
  }, [_ID]); // Ensure _ID is included as a dependency

  return (
    <>
      <Modalnavigationbar navigatelink="/sign-up" />
      <div className="page-title-area">
        <Pagetitle
          heading="About Us"
          pagetitlelink="/"
          title1="Home"
          title2="About"
          IconComponent={MdArrowForwardIos}
        />
      </div>

      <section className="about-our-company ptb-120 pb-0">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <div className="about-content">
                <span>About Company</span>
                <h2>Welcome to Grace Labs</h2>
                <div dangerouslySetInnerHTML={{ __html: bout.blogDesc }} />
                <p>
                  Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
                  Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
                </p>
                <ul className="about-features-list">
          
                </ul>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className="about-company-image">
                <img src={about2} alt="About Company" />
              </div>
            </Col>
          </Row>
        </Container>

        <div className="about-our-company-inner">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} md={12}>
                <div className="about-inner-company-image">
                  <img src={about1} alt="About Company Inner" />
                </div>
              </Col>
              <Col lg={6} md={12}>
                <div className="about-inner-company-content">
                  <h2>We Discoveries We Give Your Solution</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}

export default About;
