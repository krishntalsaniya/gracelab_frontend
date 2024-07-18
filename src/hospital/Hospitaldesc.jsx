import React, { useState, useEffect } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { IoMdTimer } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Card, Col, Image, Row, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactStars from 'react-rating-stars-component';
import hospitalplaceholder from '../img/Hospitalplaceholder.jpg';

function Hospitaldesc(props) {
  const [dayName, setDayName] = useState('');
  const [dayName2, setDayName2] = useState('');
  const [dayName3, setDayName3] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    Description: '',
    file: null,
  });
  const [rating, setRating] = useState(0);
  const [ratingshowModal, setRatingShowModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    const fetchDayName = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab1}`
        );
        setDayName(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName();

    const fetchDayName2 = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab2}`
        );
        setDayName2(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName2();

    const fetchDayName3 = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab3}`
        );
        setDayName3(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName3();
  }, [props.dayslab1, props.dayslab2, props.dayslab3]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    contactNumber: Yup.string()
      .matches(/^\d+$/, 'Contact No. must contain only digits')
      .length(10, 'Contact No. must be exactly 10 digits')
      .required('Contact No. is required'),
    Description: Yup.string().required('Description is required'),
    file: Yup.mixed().required('File is required'),
  });

  const validationSchemaRating = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', values.name);
      formDataToSend.append('email', values.email);
      formDataToSend.append('contactNumber', values.contactNumber);
      formDataToSend.append('Description', values.Description);
      formDataToSend.append('myFile', values.file);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/Contacthospital/${props.Labid}`,
        formDataToSend
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
          Hospital: props.Labid,
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
                  alt="Hospital Image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = hospitalplaceholder;
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
                    <div className="heading-container">
      <FaMapMarker className="map-color" />
      <div className="heading-text">{props.headings}</div>
    </div>
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
                  value={props.averageRating ? props.averageRating : 0}
                  edit={false}
                />
              </div>
              <Button
                variant="primary"
                className="mt-3 float-end contact-sec"
                 style={{borderRadius:10}}
                onClick={() => setShowModal(true)}
              >
                Contact
              </Button>
              <Button className="mt-3 float-end rating-sec" onClick={() => setRatingShowModal(true)}>
                Rate Us
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Contact Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='modal-title-centered'>Contact {props.mainheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              email: '',
              contactNumber: '',
              Description: '',
              file: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name <span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address <span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContactNumber">
                  <Form.Label>Contact Number <span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your contact number"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                    isInvalid={touched.contactNumber && !!errors.contactNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contactNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                  <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload File <span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control
                    type="file"
                     accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => {
                      setFieldValue('file', e.currentTarget.files[0]);
                    }}
                    isInvalid={touched.file && !!errors.file}
                  />
                  <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description <span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your message"
                    name="Description"
                    value={values.Description}
                    onChange={handleChange}
                    isInvalid={touched.Description && !!errors.Description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Description}</Form.Control.Feedback>
                </Form.Group>
              
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Rating Modal */}
        <Modal show={ratingshowModal} onHide={() => setRatingShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating {props.mainheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={validationSchemaRating}
            onSubmit={handleRatingSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formRating">
                  <Form.Label className='modal-title-centered '>Rate Us</Form.Label>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ReactStars
                      count={5}
                      size={48}
                      activeColor="#ffd700"
                      value={rating}
                      onChange={handleRatingChange}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRatingName">
                  <Form.Label>Description</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="form-control"
                    isInvalid={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Hospitaldesc;
