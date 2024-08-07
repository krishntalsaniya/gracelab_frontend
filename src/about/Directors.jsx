import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import { Container, Row, Col, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "../css/responsive.css";
import "../css/style.css";
import about from "../img/about.png";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import axios from "axios";

function Directors() {
  return (
    <>
      <Modalnavigationbar />

      <section className="about-area ptb-40">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <div className="about-image">
                <Image src={about} alt="image" />
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className="about-content">
                <h2>Bhavin Patel</h2>
                <p>
                  Dr Bhavin Patel Mr. Bhavin Patel, an exceptional individual
                  adored by everyone in the community, frequently appears as a
                  motivational and inspirational figure. He shines as a dazzling
                  luminary given the renowned Best Laboratory Award by esteemed
                  media outlets. With the cutting-edge Grace Laboratory, he has
                  revolutionized the industry with his creative passion and
                  uncompromising vision. With his in-depth knowledge of
                  technology, he has effectively combined automation with
                  genuine concern, ensuring the delivery of precise reports with
                  a human touch. Above all, Mr. Bhavin Patel embodies the very
                  best of charity by devoting himself to bringing a significant
                  change in the lives of countless people.
                </p>
             
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>

       <section className="about-area ptb-40">
        <Container>
          <Row className="align-items-center">
       
            <Col lg={6} md={12}>
              <div className="about-content">
                <h2>Gayatri Bhavin Patel</h2>
                <p>
                  Dr Bhavin Patel Mr. Bhavin Patel, an exceptional individual
                  adored by everyone in the community, frequently appears as a
                  motivational and inspirational figure. He shines as a dazzling
                  luminary given the renowned Best Laboratory Award by esteemed
                  media outlets. With the cutting-edge Grace Laboratory, he has
                  revolutionized the industry with his creative passion and
                  uncompromising vision. With his in-depth knowledge of
                  technology, he has effectively combined automation with
                  genuine concern, ensuring the delivery of precise reports with
                  a human touch. Above all, Mr. Bhavin Patel embodies the very
                  best of charity by devoting himself to bringing a significant
                  change in the lives of countless people.
                </p>
             
                
              </div>
            </Col>
                 <Col lg={6} md={12}>
              <div className="about-image">
                <Image src={about} alt="image" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Directors;
