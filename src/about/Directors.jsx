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
              <h3>Agaton Ronald</h3>
              <p>MBBS, M.D of Medicine</p>
              <span>BDS, FCPS (Hons), PhD (USA)</span>
            </div>
          </div>
          <div className="social-box">
            <h3>Social</h3>
            <ul>
              <li><a href="https://twitter.com/i/flow/login" target="_blank"><i className="fab fa-twitter" /></a></li>
              <li><a href="https://www.youtube.com/?app=desktop&gl=SG&hl=en-GB" target="_blank"><i className="fab fa-youtube" /></a></li>
              <li><a href="https://www.facebook.com/login/" target="_blank"><i className="fab fa-facebook-f" /></a></li>
              <li><a href="https://www.linkedin.com/login" target="_blank"><i className="fab fa-linkedin-in" /></a></li>
              <li><a href="https://www.instagram.com/accounts/login/" target="_blank"><i className="fab fa-instagram" /></a></li>
            </ul>
          </div>
          <div className="call-to-action-box">
            <a href="#">
              <i className="fas fa-headset" />
              <h3>Emergency Cases</h3>
              <span>+2 888 555 5555</span>
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-8 col-md-12">
        <div className="team-details-desc">
          <h3>About Me</h3>
          <p>Efficiently myocardinate market-driven innovation via open-source alignments. Dramatically engage  high-Phosfluorescently expedite impactful supply chains via focused results. Holistically . Compellingly supply just in time catalysts for change through.</p>
          <ul className="team-info">
            <li>
              <span>Speciality</span>
              <ul>
                <li>Endocrinology</li>
                <li>Paediatric Medicine</li>
                <li>Urology</li>
              </ul>
            </li>
            <li>
              <span>Education</span>
              <ul>
                <li>Doctor of Medicine, University of Texas, USA (1990)</li>
                <li>Medical Orientation Program, St. Louis University (St. Louis, Missouri 1996)</li>
              </ul>
            </li>
            <li>
              <span>Experience</span>
              <ul>
                <li>25 years of Experience in Medicine</li>
              </ul>
            </li>
            <li>
              <span>Education</span>
              <ul>
                <li>Vice President and Chief Medical Officer, Kessler Institute for Rehabilitation</li>
                <li>Medical Corporation Professor, Institute Of Coast Private Hospital Campus</li>
              </ul>
            </li>
            <li>
              <span>Address</span>
              <ul>
                <li>Suite 27, Medical Centre, The Sunshine Coast Private Hospital, QLD 4556</li>
              </ul>
            </li>
            <li>
              <span>Phone</span>
              <ul>
                <li><a href="#">+1-23-345-6789</a></li>
              </ul>
            </li>
            <li>
              <span>Email</span>
              <ul>
                <li><a href="#"><span className="__cf_email__" data-cfemail="3b56425e565a52577b42544e495f54565a525515585456">[email&nbsp;protected]</span></a></li>
              </ul>
            </li>
            <li>
              <span>Website</span>
              <ul>
                <li><a href="#">www.agatonronald.com</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div></div></div></section>
    </>
  );
}

export default Directors;
