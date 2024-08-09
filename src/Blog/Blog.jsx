import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import axios from "axios";
import placeholderimage from "../img/Blog-Placeholder.png";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import Pagetitle from "../patients/Pagetitle";
import { MdArrowForwardIos } from "react-icons/md";

function Blog() {
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
          heading="Blog"
          pagetitlelink="/"
          title1="Home"
          title2="Blog"
          IconComponent={MdArrowForwardIos}
        />
      </div>
      <div className="container">
        <div className="row">
          {blog.map((camping) => {
            console.log("gbngfngn", camping._id); // Debugging statement moved here
            return (
              <Col key={camping._id} lg={4} className="mb-4 mt-5">
                <Link to={`/blogdetails/${camping._id}`}>
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
                      {/* <Card.Text>{stripHtml(camping.Description)}</Card.Text> */}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </div>
      </div>
      {/* news section */}
      {/* 
      <div className="container">
        <div className="row">
          {upcomingcamps.map((camping) => (
            <Col key={camping.id} lg={4} className="mb-4">
              <Link>
                <Card
                  style={{ width: "100%", maxHeight: "450", minHeight: "450" }}
                  className="camping-card"
                >
                  <Card.Img
                    className="card-image-camping"
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL_GRACELAB}/${camping.Photo}`}
                    alt={camping.title}
                    onError={(e) => {
                      e.target.src = placeholderimage;
                    }}
                  />
                  <Card.Body className="card-body-camping">
                     <p>
      <strong style={{ fontSize: 'bold' }}>Camp Venue: </strong>
 {camping.CampVenueDetails?.Society || ""}
</p>
                     <Card.Text>Camp Desc: {camping.Descreption}</Card.Text>
                    <Card.Text>
                     <p>
  <strong>Date</strong>{` : ${camping.Date ? new Date(camping.Date).toISOString().split('T')[0] : ""}`}
</p>
                    </Card.Text>
                   <Card.Text>
                    <small style={{ fontWeight: 'bold', fontSize: '13px' }}>{`No Of Patient: ${camping.NoOfPatients}`}</small>
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Doctors:</small>
                      <div className="row">
                        {camping.DoctorsDetails &&
                          camping.DoctorsDetails.map((doctor, index) => (
                            <div className="col-12 col-lg-6" key={index}>
                              <li>{doctor.DoctorName}</li>
                            </div>
                          ))}
                      </div>
                    </Card.Text>
                  </Card.Body>
                 
                </Card>
              </Link>
            </Col>
          ))}
        </div>
      </div> 
      */}
    </>
  );
}

export default Blog;
