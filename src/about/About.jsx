import React, { useEffect, useState } from 'react';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import { MdArrowForwardIos } from "react-icons/md";
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function About() {
  const { _ID } = useParams();
  const [bout, setBout] = useState({ blogDesc: "", blogTitle: "" }); // Initialize with a default structure

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/blogs/${_ID}`
        );
        //console.log("About", res.data); // Log the response to verify structure
        setBout(res.data);
      } catch (error) {
        //console.log("Error fetching data:", error);
      }
    };
    fetchAbout();
  }, [_ID]); // Ensure _ID is included as a dependency

  return (
    <>
      <Modalnavigationbar />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h2>{bout.blogTitle || 'Loading...'}</h2>
            <ul>
              <li>
                <MdArrowForwardIos className='arrowright' />
                <Link to='/'>Home</Link>
              </li>
             <li>{bout.blogTitle || 'Loading...'}</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="about-our-company ptb-120 pb-0">
        <Container>
          <Row className="align-items-center">
            <Col lg={12} md={12}>
              <div className="about-content">
                <div dangerouslySetInnerHTML={{ __html: bout.blogDesc }} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default About;
