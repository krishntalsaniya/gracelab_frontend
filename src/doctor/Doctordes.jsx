import React, { useState, useEffect } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { IoMdTimer } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Card, Col, Image, Row, Button, Modal, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactStars from 'react-rating-stars-component';
import doctorplaceholder from '../img/doctorplaceholder.png';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  contactNumber: Yup.string()
    .matches(/^\d+$/, 'Contact No. must contain only digits')
    .length(10, 'Contact No. must be exactly 10 digits')
    .required('Contact No. is required'),
  description: Yup.string().required('Description is required'),
  file: Yup.mixed().required('File is required'),
});

const ratingValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const Doctordes = (props) => {
  const [dayName, setDayName] = useState('');
  const [dayName2, setDayName2] = useState('');
  const [dayName3, setDayName3] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ratingShowModal, setRatingShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(props.averageRating);
  }, [props.averageRating]);

  useEffect(() => {
    const fetchDayNames = async () => {
      try {
        const response1 = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab1}`);
        setDayName(response1.data.Days);

        const response2 = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab2}`);
        setDayName2(response2.data.Days);

        const response3 = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab3}`);
        setDayName3(response3.data.Days);
      } catch (error) {
        console.error('Error fetching day names:', error);
      }
    };
    fetchDayNames();
  }, [props.dayslab1, props.dayslab2, props.dayslab3]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('contactNumber', values.contactNumber);
      formData.append('Description', values.description);
      formData.append('myFile', values.file);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/Contactdoctor/${props.Labid}`,
        formData
      );

      Swal.fire({
        icon: 'success',
        title: 'Form Submitted!',
        text: 'Your form has been submitted successfully.',
        confirmButtonText: 'Ok',
      }).then(() => {
        setShowModal(false);
        resetForm();
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleRatingSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/ContactRating`,
        {
          name: values.name,
          rating: rating,
          Doctor: props.Labid,
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Rating Submitted!',
        text: 'Your rating has been submitted successfully.',
        confirmButtonText: 'Ok',
      }).then(() => {
        resetForm();
        setRatingShowModal(false);
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
        confirmButtonText: 'Ok',
      });
    }
    setRatingShowModal(false);
  };

  return (
    <>
      <Card className="single-research-box">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="research-image">
              <Link to={props.imagelink} target="_blank">
                <Image
                  src={props.hospitalimage}
                  alt="Doctor Image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = doctorplaceholder;
                  }}
                />
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

              <div>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  value={props.averageRating ? props.averageRating : 4}
                  edit={false}
                />
              </div>

              <Button
                variant="primary"
                className="rounded-pill mt-3 float-end contact-sec"
                onClick={() => setShowModal(true)}
              >
                Contact
              </Button>
              <Button
                className="mt-3 float-end rating-sec"
                onClick={() => setRatingShowModal(true)}
              >
                Rate Us
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
          <Formik
            initialValues={{
              name: '',
              email: '',
              contactNumber: '',
              description: '',
              file: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, errors, touched }) => (
              <FormikForm>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Field
                    name="contactNumber"
                    type="text"
                    placeholder="Enter your contact number"
                    className={`form-control ${errors.contactNumber && touched.contactNumber ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="contactNumber" component="div" className="invalid-feedback" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Upload File</Form.Label>
                  <input
                    name="file"
                    type="file"
                    className={`form-control ${errors.file && touched.file ? 'is-invalid' : ''}`}
                    onChange={(event) => {
                      setFieldValue('file', event.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage name="file" component="div" className="invalid-feedback" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Field
                    name="description"
                    type="text"
                    placeholder="Enter your Description"
                    className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="description" component="div" className="invalid-feedback" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Rating Modal */}
      <Modal show={ratingShowModal} onHide={() => setRatingShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-centered">Rating {props.mainheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={ratingValidationSchema}
            onSubmit={handleRatingSubmit}
          >
            {({ setFieldValue, errors, touched }) => (
              <FormikForm>
                <Form.Group className="mb-3" controlId="formRating">
                  <Form.Label className="modal-title-centered">Rate Us</Form.Label>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ReactStars
                      count={5}
                      size={48}
                      activeColor="#ffd700"
                      onChange={handleRatingChange}
                      value={rating}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Doctordes;
