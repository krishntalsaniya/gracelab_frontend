import React, { useState, useEffect } from "react";
import { FaMapMarker } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { Link } from "react-router-dom";
import { Card, Col, Image, Row, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import ReactStars from "react-rating-stars-component";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import labplaceholder from "../img/labplaceholder.jpg";
import { useNavigate } from "react-router-dom";

function Labsec(props) {
  const [dayName, setDayName] = useState("");
  const [dayName2, setDayName2] = useState("");
  const [dayName3, setDayName3] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ratingshowModal, setRatingShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    Description: "",
    myFile: null,
  });
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDayName = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab1}`
        );
        setDayName(response.data.Days);
      } catch (error) {
        console.error("Error fetching day name:", error);
      }
    };

    const fetchDayName2 = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab2}`
        );
        setDayName2(response.data.Days);
      } catch (error) {
        console.error("Error fetching day name:", error);
      }
    };

    const fetchDayName3 = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab3}`
        );
        setDayName3(response.data.Days);
      } catch (error) {
        console.error("Error fetching day name:", error);
      }
    };

    fetchDayName();
    fetchDayName2();
    fetchDayName3();
  }, [props.dayslab1, props.dayslab2, props.dayslab3]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file && validTypes.includes(file.type)) {
      setFormData({ ...formData, myFile: file });
    } else {
      // Provide feedback if the file type is not supported
      alert("Only JPG, JPEG, and PNG files are supported.");
      e.target.value = null; // Clear the input
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contactNumber: Yup.string()
      .matches(/^\d+$/, "Contact No. must contain only digits")
      .length(10, "Contact No. must be exactly 10 digits")
      .required("Contact No. is required"),
    myFile: Yup.mixed().required("File is required"),
    Description: Yup.string().required("Description is required"),
  });

  const validationSchemaRating = Yup.object().shape({
    name: Yup.string().required("required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", values.name);
      formDataToSend.append("email", values.email);
      formDataToSend.append("contactNumber", values.contactNumber);
      formDataToSend.append("Description", values.Description);
      formDataToSend.append("myFile", values.myFile);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/Contactlaboratory/${props.Labid}`,
        formDataToSend
      );

      console.log("Form submitted successfully:", response.data);

      Swal.fire({
        icon: "success",
        title: "Form Submitted!",
        text: "Your form has been submitted successfully.",
        confirmButtonText: "Ok",
      }).then(() => {
        setShowModal(false);
        resetForm();
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
        confirmButtonText: "Ok",
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
          Laboratory: props.Labid,
        }
      );

      console.log("Rating submitted successfully:", response.data);

      Swal.fire({
        icon: "success",
        title: "Rating Submitted!",
        text: "Your rating has been submitted successfully.",
        confirmButtonText: "Ok",
      }).then(() => {
        resetForm();
        setRatingShowModal(false);
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleChat = () => {
    navigate(`/chat/${props.Labid}`);
  };
  console.log("Average Rating", props.averageRating);

  return (
    <>
      <Card className="single-research-box">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="research-image">
              <Link to={props.imagelink} target="_blank">
                <Image
                  src={props.hospitalimage}
                  alt="Laboratory Image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = labplaceholder;
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
                  <IoMdTimer className="map-color" /> {props.starttime1} -{" "}
                  {props.endtime1} - {dayName}
                  <br /> <br />
                  <IoMdTimer className="map-color" /> {props.starttime2} -{" "}
                  {props.endtime2} - {dayName2}
                  <br /> <br />
                  <IoMdTimer className="map-color" /> {props.starttime3} -{" "}
                  {props.endtime3} - {dayName3}
                </h5>
              </div>
              <ReactStars
                count={5}
                size={24}
                activeColor="#ffd700"
                value={
                  props.averageRating ? parseFloat(props.averageRating) : 0
                }
                edit={false}
                //  isHalf={true} // Enable half stars
              />
              <Button
                variant="primary"
                className="mt-3 float-end contact-sec"
                style={{ borderRadius: 10 }}
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

              <Button className="mt-3 float-end chat-sec" onClick={handleChat}>
                Chat
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Contact Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-centered">
            Contact {props.mainheading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
              email: "",
              contactNumber: "",
              myFile: null,
              Description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>
                    Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Field
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.name && errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>
                    Email address <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Field
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.email && errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContactNumber">
                  <Form.Label>
                    Contact Number <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Field
                    type="text"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.contactNumber && errors.contactNumber
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter your contact number"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>
                    Upload File <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="myFile"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(event) => {
                      setFieldValue("myFile", event.currentTarget.files[0]);
                    }}
                    isInvalid={!!errors.myFile}
                  />
                  <ErrorMessage
                    name="myFile"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>
                    Description <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Field
                    type="text"
                    name="Description"
                    value={values.Description}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.Description && errors.Description
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter your Description"
                  />
                  <ErrorMessage
                    name="Description"
                    component="div"
                    className="text-danger"
                  />
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
              name: "",
            }}
            validationSchema={validationSchemaRating}
            onSubmit={handleRatingSubmit}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formRating">
                  <Form.Label className="modal-title-centered">
                    Rate Us
                  </Form.Label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ReactStars
                      count={5}
                      size={48}
                      activeColor="#ffd700"
                      value={rating}
                      onChange={handleRatingChange}
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRatingDescription">
                  <Form.Label>Description</Form.Label>
                  <Field
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.name && errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
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

export default Labsec;
