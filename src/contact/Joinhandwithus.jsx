import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import axios from "axios";
import placeholderimage from "../img/placeholder.jpeg";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import Pagetitle from "../patients/Pagetitle";
import { MdArrowForwardIos } from "react-icons/md";

function Joinhandwithus() {
  const [blog, setblog] = useState([]);
  const [upcomingcamps, setupcomingcapms] = useState([]);

  useEffect(() => {
    const CMScontent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/getallAboutUs`
        );
        console.log("API response:", response.data);

        if (Array.isArray(response.data)) {
          setblog(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setblog([]);
        }
      } catch (error) {
        console.error("Error fetching CMS content:", error);
        setblog([]);
      }
    };

    CMScontent();

    const fetchupcomingcamps = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listUpcomingCampsByParams`,
          {
            skip: 0,
            per_page: 1000,
            sorton: "Date",
            sortdir: "desc",
            match: "",
            IsActive: true,
          }
        );

        setupcomingcapms(response.data[0].data);
      } catch (error) {
        console.error("Error fetching camping data:", error);
      }
    };

    fetchupcomingcamps();
  }, []);

  const handleRedirect = () => {
    window.open(
      "https://frontgracelab.barodaweb.in/patient-inquiry",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid date" : date.toISOString().split('T')[0];
  };

  return (
    <>
      <Modalnavigationbar />
      <div className="page-title-area">
        <Pagetitle
          heading="Join hand with us"
          pagetitlelink="/"
          title1="Home"
          title2="Join hand with us"
          IconComponent={MdArrowForwardIos}
        />
      </div>
      <div className="container">
        <div className="row">
          {blog.map((camping) => {
            console.log("gbngfngn", camping._id); // Debugging statement moved here
            return (
              <Col key={camping._id} lg={4} className="mb-4 mt-5">
              
                  <Card className="camping-card">
                    <Card.Img
                      className="card-image-camping"
                      variant="top"
                      src={
                        camping.Images
                          ? `${process.env.REACT_APP_API_URL_GRACELAB}/${camping.Images}`
                          : placeholderimage
                      }
                      alt={camping.Images}
                      onError={(e) => {
                        e.target.src = placeholderimage;
                      }}
                    />
                    <Card.Body className="card-body-camping">
                      <Card.Title>{camping.Title}</Card.Title>
                      <Card.Title>{camping.Author}</Card.Title>
                      <small className="text-muted">
                        Date: {formatDate(camping.Date)}
                      </small>
                      <Card.Text>{stripHtml(camping.Description)}</Card.Text>
                    </Card.Body>
                  </Card>
         
              </Col>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Joinhandwithus;
