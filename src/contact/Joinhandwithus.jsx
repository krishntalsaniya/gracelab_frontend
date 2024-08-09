import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Container, Row, Col, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "../css/responsive.css";
import "../css/style.css";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import axios from "axios";
import Pagetitle from "../patients/Pagetitle";
import { MdArrowForwardIos } from "react-icons/md";
import placeholderimage from "../img/join-us-placeholder.jpg";


function Joinhandwithus() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const CMScontent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/JoinHand`
        );
        console.log("Join hand with us :", response.data);

        if (Array.isArray(response.data)) {
          setBlog(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setBlog([]);
        }
      } catch (error) {
        console.error("Error fetching CMS content:", error);
        setBlog([]);
      }
    };

    CMScontent();
  }, []);

  return (
    <>
      <Modalnavigationbar />
      <div className="page-title-area">
        <Pagetitle
          heading="Join Hand With Us"
          pagetitlelink="/"
          title1="Home"
          title2="Join Hand With Us"
          IconComponent={MdArrowForwardIos}
        />
      </div>

      <section className="team-details-area ptb-120">
        <div className="container">
          <div className="row">
            {blog.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-12">
                <div className="team-details-sidebar">
                  <div className="team-profile">
                    <img src={
                        item.bannerImage
                          ? `${process.env.REACT_APP_API_URL_GRACELAB}/${item.bannerImage}`
                          : placeholderimage
                          
                      } onError={(e) => {
                        e.target.src = placeholderimage;
                      }} />
                    <div className="team-content text-center">
                      <h3>{item.Tittle || "Default Title"}</h3>
                      <p>{item.Description || "This is a dummy text"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Joinhandwithus;
