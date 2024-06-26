import React, { useState, useEffect } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { IoMdTimer } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Card, Col, Image, Row, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

function Doctordes(props) {
  const [dayName, setDayName] = useState('');
  const [dayName2, setDayName2] = useState('');
  const [dayName3, setDayName3] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    file: null,
  });

  useEffect(() => {
    const fetchDayName = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab1}`);
        setDayName(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName();

    const fetchDayName2 = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab2}`);
        setDayName2(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName2();

    const fetchDayName3 = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab3}`);
        setDayName3(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName3();
  }, [props.dayslab1, props.dayslab2, props.dayslab3]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('myFile', formData.file); // Ensure 'myFile' matches your backend field name

      // Adjust the API endpoint to match your backend route for submitting contact form
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/Contactdoctor/${props.Labid}`,
        formDataToSend
      );
      console.log('Form submitted successfully:', response.data);

      // Show SweetAlert popup upon successful submission
      Swal.fire({
        icon: 'success',
        title: 'Form Submitted!',
        text: 'Your form has been submitted successfully.',
        confirmButtonText: 'Ok',
      }).then(() => {
        setShowModal(false);
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          file: null,
        });
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error state or display error message to user
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <>
      <Card className="single-research-box">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="research-image">
              <Link to={props.imagelink} target="_blank">
                <Image src={props.hospitalimage} alt="image" />
              </Link>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Card.Body className="research-content">
              <h3>
                <Link to="#">{props.mainheading}</Link>
              </h3>
              <div className="location-marker-section">
                <Link to={props.locationmap} target="_blank">
                  <h5 className="mt-3 d-inline-block me-2">
                    <FaMapMarker className="map-color" /> {props.headings}
                  </h5>
                </Link>
              </div>
              <div className="location-marker-section">
                <h5 className="mt-3 d-inline-block me-2">
                  <IoMdTimer className="map-color" /> {props.starttime1} - {props.endtime1} - {dayName}
                  <br /> <br />
                  <IoMdTimer className="map-color" /> {props.starttime2} - {props.endtime2} - {dayName2}
                  <br /> <br />
                  <IoMdTimer className="map-color" /> {props.starttime3} - {props.endtime3} - {dayName3}
                </h5>
              </div>
              <Button
                variant="primary"
                className="rounded-pill mt-3 float-end"
                style={{ borderRadius: '10px' }}
                onClick={() => setShowModal(true)}
              >
                Contact
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Contact Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contact {props.mainheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your contact number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" name="myFile" onChange={handleFileChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Doctordes;
