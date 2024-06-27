import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import placeholderimage from '../img/placeholder.jpeg';
import Modalnavigationbar from '../navbar/Modalnavigationbar';

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
        console.log("Camping data:", response.data[0].data);
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

  return (
    <>
    <Modalnavigationbar />
      {/* <h2 className="text-center">Upcoming Camps</h2> */}
      <div className="container">
        <div className="row">
          {camp.map((camping) => (
            <Col key={camping.id} lg={4} className="mb-4">
              <Link to="/camping">
                <Card style={{ width: '100%',maxHeight:'450',minHeight:'450' }}>
                  <Card.Img className='card-image-camping'
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL_GRACELAB}/${camping.Photo}`}
                    alt={camping.title}
                    onError={(e) => { e.target.src = placeholderimage }}
                  />
                  <Card.Body>
                    <Card.Title>{camping.title}</Card.Title>
                    <Card.Text>
                      Description: {camping.Descreption}
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">{`No Of Patients: ${camping.NoOfPatients}`}</small>
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Doctors:</small>
                      <ul>
                        {camping.DoctorsDetails && camping.DoctorsDetails.map((doctor, index) => (
                          <li key={index}>{doctor.DoctorName}</li>
                        ))}
                      </ul>
                    </Card.Text>
        
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </div>
      </div>




      <h1>upcoming camping </h1>

       <div className="container">
        <div className="row">
          {upcomingcamps.map((camping) => (
            <Col key={camping.id} lg={4} className="mb-4">
              <Link to="/camping">
                <Card style={{ width: '100%',maxHeight:'450',minHeight:'450' }}>
                  <Card.Img className='card-image-camping'
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL_GRACELAB}/${camping.Photo}`}
                    alt={camping.title}
                    onError={(e) => { e.target.src = placeholderimage }}
                  />
                  <Card.Body>
                    <Card.Title>{camping.title}</Card.Title>
                    <Card.Text>
                      Description: {camping.Descreption}
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">{`No Of Patients: ${camping.NoOfPatients}`}</small>
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Doctors:</small>
                      <ul>
                        {camping.DoctorsDetails && camping.DoctorsDetails.map((doctor, index) => (
                          <li key={index}>{doctor.DoctorName}</li>
                        ))}
                      </ul>
                    </Card.Text>
        
                  </Card.Body>
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
