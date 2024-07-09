import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Button, Image } from "react-bootstrap";
import axios from "axios";
import placeholderimage from "../img/placeholder.jpeg";
import Modalnavigationbar from "../navbar/Modalnavigationbar";

function Camping() {
  const [camp, setCamp] = useState([]);
  const [upcomingcamps, setupcomingcapms] = useState([]);

  useEffect(() => {
    const fetchcompletedcamps = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listCompletedCampsByParams`,
          {
            skip: 0,
            per_page: 1000,
            sorton: "Date",
            sortdir: "desc",
            match: "",
            IsActive: true,
          }
        );
        console.log("Camping data:", response);
        setCamp(response.data[0].data);
      } catch (error) {
        console.error("Error fetching camping data:", error);
      }
    };

    fetchcompletedcamps();

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
        console.log("Camping data:", response.data[0].data);
        setupcomingcapms(response.data[0].data);
      } catch (error) {
        console.error("Error fetching camping data:", error);
      }
    };

    fetchupcomingcamps();
  }, []);

  const handleRedirect = () => {
    window.open(
      "https://gracelab.barodaweb.org/patient-inquiry",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Modalnavigationbar />
      {/* <h2 className="text-center">Upcoming Camps</h2> */}
      <h1 className="caming-sec">Completed Camping </h1>
      <div className="container">
        <div className="row">
          {camp.map((camping) => (
            <Col key={camping.id} lg={4} className="mb-4">
              <Link to="/camping">
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
                  <Card.Body className="card-body-camping" >
                    <p>
      <strong style={{ fontSize: 'bold' }}>Camp Venue: </strong>
 {camping.CampVenueDetails?.Society || ""}
</p>

 <p>
  <strong>Date</strong>{` : ${camping.Date ? new Date(camping.Date).toISOString().split('T')[0] : ""}`}
</p>
                    <Card.Text>Camp Desc: {camping.Descreption}</Card.Text>
                    <Card.Text>
                    <small style={{ fontWeight: 'bold', fontSize: '13px' }}>{`No Of Patient: ${camping.NoOfPatients}`}</small>
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Doctors:</small>
                      <ul>
                        {camping.DoctorsDetails &&
                          camping.DoctorsDetails.map((doctor, index) => (
                            <li key={index}>{doctor.DoctorName}</li>
                          ))}
                      </ul>
                    </Card.Text>
                  </Card.Body>
                  <div className="register-camping">
                    <Link
                      onClick={handleRedirect}
                      className="btn btn-secondary ms-3 btn-login"
                    >
                      Register
                    </Link>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </div>
      </div>

      <h1 className="caming-sec">Upcoming Camping </h1>

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
                  <div className="register-camping">
                    <Link
                      onClick={handleRedirect}
                      className="btn btn-secondary ms-3 btn-login"
                    >
                      Register
                    </Link>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </div>
      </div>
    </>
  );
}

export default Camping;
