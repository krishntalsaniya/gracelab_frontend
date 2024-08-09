import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/responsive.css";
import "../css/style.css";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import { Card } from "react-bootstrap";
import Pagetitle from "../patients/Pagetitle";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import placeholderimage from "../img/placeholder-testimonials.jpg";


function Testimonial() {
  const [center, setcenter] = useState([]);

  useEffect(() => {
    const Maincenter = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/Testimonial`
        );
        console.log("Testimonial list :", response.data);

        if (Array.isArray(response.data)) {
          setcenter(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setcenter([]);
        }
      } catch (error) {
        console.error("Error fetching CMS content:", error);
        setcenter([]);
      }
    };
    Maincenter();
  }, []);

  const handleCardClick = (url) => {
    window.location.href = url; // Redirect to the YouTube video URL
  };

  return (
    <>
      <Modalnavigationbar />
      <div className="page-title-area">
        <Pagetitle
          heading="Testimonial"
          pagetitlelink="/"
          title1="Home"
          title2="Testimonial"
          IconComponent={MdArrowForwardIos}
        />
      </div>
      <section className="services-area ptb-120">
        <div className="container">
          <div className="row">
            {center.map((item) => (
              <div className="col-lg-4 col-md-6 col-sm-6" key={item._id}>
                <div
                  className="single-services-box"
                  onClick={() => handleCardClick(item.URL)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.URL.split("v=")[1].split("&")[0]}/0.jpg`}
                    alt={item.Tittle}
                     onError={(e) => {
                      e.target.src = placeholderimage;
                    }}
                    
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      margin: 0,
                      padding: 0,
                    }}
                  />
                  <h3>{item.Tittle}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonial;
