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
import Pagetitle from "../patients/Pagetitle";
import { MdArrowForwardIos } from "react-icons/md";

function Directors() {
  return (
    <>
      <Modalnavigationbar />
      <div className="page-title-area">
        <Pagetitle
          heading="Directors"
          pagetitlelink="/"
          title1="Home"
          title2="Directors"
          IconComponent={MdArrowForwardIos}
        />
      </div>

      <section className="team-details-area ptb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="team-details-sidebar">
                <div className="team-profile">
                  <img src="assets/img/team-img1.jpg" alt="image" />
                  <div className="team-content">
                    <h3>Bhavin Patel</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="team-details-desc">
                <h3>About Me</h3>
                <p>
                  Mr. Bhavin Patel, an exceptional individual adored by everyone
                  in the community, frequently appears as a motivational and
                  inspirational figure. He shines as a dazzling luminary given
                  the renowned Best Laboratory Award by esteemed media outlets.
                  With the cutting-edge Grace Laboratory, he has revolutionized
                  the industry with his creative passion and uncompromising
                  vision. With his in-depth knowledge of technology, he has
                  effectively combined automation with genuine concern, ensuring
                  the delivery of precise reports with a human touch. Above all,
                  Mr. Bhavin Patel embodies the very best of charity by devoting
                  himself to bringing a significant change in the lives of
                  countless people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Directors;
