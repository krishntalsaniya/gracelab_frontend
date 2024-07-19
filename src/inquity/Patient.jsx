import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import logo from "../img/logo.jpg";
import axios from "axios";
import bg1 from "../img/logo.jpg";
import bg2 from "../img/logo.jpg";
import { Col, Label, Row } from "reactstrap";
import ThankYouModal from "./ThankYouModal";
function Patient() {
  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    Phone: "",
    Gender: "",
    DOB: "",
    Address: "",
    DocRef: "",
    Medical: "",
    Remark: "",
    IsActive: true,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    Phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    Gender: Yup.string().required("Gender is required"),
    DOB: Yup.date().required("Date of Birth is required"),
    Address: Yup.string().required("Address is required"),
    DocRef: Yup.string().required("Doctor Reference is required"),
    Medical: Yup.string().required("Medical condition is required"),
    Remark: Yup.string().required("Remark is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/Patient`,
        values
      );
      console.log(response);
      if (response) {
        alert("Inquiry Successful");
      } else {
        alert("Request failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Request failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <section className="container mb-5">
        <div className="auto-container">
          <div className="content-box p_relative d_block b_shadow_6 b_radius_5 pt_60 pr_50 pb_70 pl_50">
            <div className="shape">
              <div
                style={{ background: "#f7f7f7" }}
                className="shape-1 p_absolute w_170 h_170 b_radius_50 "
              />
              <div
                style={{ background: "#f7f7f7" }}
                className="shape-2 b_140 p_absolute w_170 h_170 b_radius_50 "
              />
              <div
                className="shape-3 p_absolute t_45 float-bob-y"
                style={{ backgroundImage: `url(${bg1})` }}
              />
              <div
                className="shape-4 p_absolute w_95 h_95 b_50 float-bob-y"
                style={{ backgroundImage: `url(${bg2})` }}
              />
            </div>
            <div
              style={{
                height: "130px",
                margin: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image src={logo} style={{maxWidth:200}} />
            </div>
            <div className="text p_relative d_block mb_25 mb-3">
              <h3
                className="d_block fs_30 lh_40 fw_bold mb_5"
                style={{ textAlign: "center" }}
              >
                Registration Form For Patient
              </h3>
              {/* <p className="d_block fs_16 color_black font_family_poppins">Already have an account? <Link to="/login" style={{color:'#fec20e'}}>Sign in</Link></p> */}
            </div>
            <div className="form-inner">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <Row>
                      <Col lg={6} md={6 }>
                      <div
                      className={`form-outline mb-4 ${
                        errors.firstName && touched.firstName
                          ? "has-danger"
                          : ""
                      }`}
                    
                    >
                      <div className="col-4">
                        <Label htmlFor="firstName" className="form-Label">
                          First Name:
                        </Label>
                      </div>
                      <Field
                        type="text"
                        className={`form-control form-control-lg ${
                          errors.firstName && touched.firstName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="firstName"
                        name="firstName"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6} >
                      <div
                      className={`form-outline mb-4 ${
                        errors.middleName && touched.middleName
                          ? "has-danger"
                          : ""
                      }`}
                     
                    >
                      <div className="col-4">
                        <Label htmlFor="middleName" className="form-Label">
                          Middle Name:
                        </Label>
                      </div>
                      <Field
                        type="text"
                        className={`form-control form-control-lg ${
                          errors.middleName && touched.middleName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="middleName"
                        name="middleName"
                      />
                      <ErrorMessage
                        name="middleName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6}>
                      <div
                      className={`form-outline mb-4 ${
                        errors.lastName && touched.lastName ? "has-danger" : ""
                      }`}
                      
                    >
                      <div className="col-4">
                        <Label htmlFor="lastName" className="form-Label">
                          Last Name:
                        </Label>
                      </div>
                      <Field
                        type="text"
                        className={`form-control form-control-lg ${
                          errors.lastName && touched.lastName
                            ? "is-invalid"
                            : ""
                        }`}
                        id="lastName"
                        name="lastName"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6} >

                      <div
                      className={`form-outline mb-4 ${
                        errors.email && touched.email ? "has-danger" : ""
                      }`}
                    
                    >
                      <div className="col-4">
                        <Label>Email:</Label>
                      </div>
                      <Field
                        type="email"
                        className={`form-control form-control-lg ${
                          errors.email && touched.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6}>
   
                      <div
                      className={`form-outline mb-4 ${
                        errors.Phone && touched.Phone ? "has-danger" : ""
                      }`}
                      
                    >
                      <div className="col-4">
                        <Label>Phone No:</Label>
                      </div>
                      <Field
                        type="number"
                        className={`form-control form-control-lg ${
                          errors.Phone && touched.Phone ? "is-invalid" : ""
                        }`}
                        id="Phone"
                        name="Phone"
                      />
                      <ErrorMessage
                        name="Phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6}>
                      <div
                      className={`form-outline mb-4 ${
                        errors.Gender && touched.Gender ? "has-danger" : ""
                      }`}
                    
                    >
                      <div className="col-4">
                        <Label>Gender:</Label>
                      </div>
                      <Field
                        as="select"
                        className={`form-select ${
                          errors.Gender && touched.Gender ? "is-invalid" : ""
                        }`}
                        id="Gender"
                        name="Gender"
                      >
                        <option value="">Choose...</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="Gender"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6}>
                      <div
                      className={`form-outline mb-4 ${
                        errors.DOB && touched.DOB ? "has-danger" : ""
                      }`}
                    
                    >
                      <div className="col-4">
                        <Label>Date of Birth:</Label>
                      </div>
                      <Field
                        type="date"
                        className={`form-control form-control-lg ${
                          errors.DOB && touched.DOB ? "is-invalid" : ""
                        }`}
                        id="DOB"
                        name="DOB"
                      />
                      <ErrorMessage
                        name="DOB"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6}>
  
                      <div
                      className={`form-outline mb-4 ${
                        errors.Address && touched.Address ? "has-danger" : ""
                      }`}
                     
                    >
                      <div className="col-4">
                        <Label>Address:</Label>
                      </div>
                      <Field
                        type="text"
                        className={`form-control form-control-lg ${
                          errors.Address && touched.Address ? "is-invalid" : ""
                        }`}
                        id="Address"
                        name="Address"
                      />
                      <ErrorMessage
                        name="Address"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6}>
                      <div
                      className={`form-outline mb-4 ${
                        errors.DocRef && touched.DocRef ? "has-danger" : ""
                      }`}
                  
                    >
                      <div className="col-4">
                        <Label>Reference:</Label>
                      </div>
                      <Field
                        type="text"
                        className={`form-control form-control-lg ${
                          errors.DocRef && touched.DocRef ? "is-invalid" : ""
                        }`}
                        id="DocRef"
                        name="DocRef"
                      />
                      <ErrorMessage
                        name="DocRef"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6}>
                      <div
                      className={`form-outline mb-4 ${
                        errors.Medical && touched.Medical ? "has-danger" : ""
                      }`}
                     
                    >
                      <div className="col-4">
                        <Label>Select Medical Condition:</Label>
                      </div>
                      <Field
                        as="select"
                        className={`form-select ${
                          errors.Medical && touched.Medical ? "is-invalid" : ""
                        }`}
                        id="Medical"
                        name="Medical"
                      >
                        <option value="">Choose...</option>
                        <option value="None">None</option>
                        <option value="Blood Pressure">Blood Pressure</option>
                        <option value="Cancer">Cancer</option>
                        <option value="TB">TB</option>
                      </Field>
                      <ErrorMessage
                        name="Medical"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                      <Col lg={6} md={6}>
  
                      <div
                      className={`form-outline mb-4 ${
                        errors.Remark && touched.Remark ? "has-danger" : ""
                      }`}
                    
                    >
                      <div className="col-4">
                        <Label>Any Remark:</Label>
                      </div>
                      <Field
                        type="text"
                        className={`form-control form-control-lg ${
                          errors.Remark && touched.Remark ? "is-invalid" : ""
                        }`}
                        id="Remark"
                        name="Remark"
                      />
                      <ErrorMessage
                        name="Remark"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                      </Col>
                    </Row>
                 
                  
           
                 
               
              
                
                    {/* <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      style={{ marginTop: "30px", backgroundColor: "#ea2691" }}
                    >
                      Submit Inquiry
                    </Button> */}
                    <ThankYouModal />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
}

export default Patient;
