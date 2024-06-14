import React, { useState } from 'react';
import axios from 'axios';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import pharmacylogin from '../img/pharmacy-login.jpg';
import { RxSlash } from "react-icons/rx";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  ownername: Yup.string().required('Owner Name is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Invalid email address'
    )
    .required('Email is required'),
  contact: Yup.string()
    .matches(/^\d+$/, 'Contact No. must contain only digits')
    .length(10, 'Contact No. must be exactly 10 digits')
    .required('Contact No. is required'),
  password: Yup.string().required('Password is required'),
  confirmpass: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  licenceno: Yup.string().required('License No. is required'),
  licencedate: Yup.date().required('License Date is required'),
  pincode: Yup.string().required('Pincode is required'),
  address: Yup.string().required('Address is required'),
});

function Pharmacysignup() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('PharmacyName', values.name);
      formData.append('PharmacyOwnerName', values.ownername); // Include the owner name
      formData.append('EmailClinic', values.email);
      formData.append('mobileNumber', values.contact);
      formData.append('Password', values.password);
      formData.append('PharmacyLicenseNumber', values.licenceno);
      formData.append('PharmacyLicenseDate', values.licencedate);
      formData.append('Pincode', values.pincode); // Include pincode
      formData.append('address', values.address);
      formData.append('photo', file);
      formData.append('isActive', true); 

      const response = await axios.post(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/createPharmacy`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Pharmacy created successfully:', response.data);

      Swal.fire({
        title: "Success!",
        text: "Pharmacy registered successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate('/pharmacy-login');
      });
    } catch (error) {
      console.error('Error creating pharmacy:', error);
      Swal.fire({
        title: "Error!",
        text: "There was an error registering the pharmacy",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <>
      <Modalnavigationbar />

      <div className="page-title-area">
        <Pagetitle
          heading="JOIN OUR PHARMACY NETWORK"
          pagetitlelink="/"
          title1="Login"
          title2="Signup"
          IconComponent={RxSlash}
        />
      </div>

      <section className="services-area ptb-70 pb-5">
        <Container>
          <Row className="justify-content-center" id="signupPanel">
            <div className="wrap d-md-flex">
              <div className="img" style={{ backgroundImage: `url(${pharmacylogin})` }}></div>
              <div className="login-wrap p-4 p-md-5">
                <div className="d-block">
                  <div className="w-100 text-center">
                    <h3 className="mb-2 h5 fw-bold">We are The Grace Lab Team</h3>
                    <p className="mb-4">Please sign up to your account</p>
                  </div>
                </div>
                <Formik
                  initialValues={{
                    name: '',
                    ownername: '',
                    email: '',
                    contact: '',
                    password: '',
                    confirmpass: '',
                    licenceno: '',
                    licencedate: '',
                    pincode: '',
                    address: '',
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <Form className="signin-form row" onSubmit={handleSubmit}>
                      <div className="step-1 d-block">
                        <Row className="justify-content-center">
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Pharmacy Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Pharmacy Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="ownername"
                              placeholder="Owner Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ownername}
                              isInvalid={touched.ownername && errors.ownername}
                            />
                            <Form.Control.Feedback type="invalid">{errors.ownername}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="email"
                              placeholder="Email Address"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control
                              type="text"
                              name="contact"
                              placeholder="Contact No."
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.contact}
                              isInvalid={touched.contact && errors.contact}
                            />
                            <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              isInvalid={touched.password && errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmpass"
                              placeholder="Confirm Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmpass}
                              isInvalid={touched.confirmpass && errors.confirmpass}
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirmpass}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Pharmacy Licence No.</Form.Label>
                            <Form.Control
                              type="text"
                              name="licenceno"
                              placeholder="Pharmacy Licence No."
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.licenceno}
                              isInvalid={touched.licenceno && errors.licenceno}
                            />
                            <Form.Control.Feedback type="invalid">{errors.licenceno}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Pharmacy Licence Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="licencedate"
                              placeholder="Pharmacy Licence Date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.licencedate}
                              isInvalid={touched.licencedate && errors.licencedate}
                            />
                            <Form.Control.Feedback type="invalid">{errors.licencedate}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                              type="text"
                              name="pincode"
                              placeholder="Pincode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pincode}
                              isInvalid={touched.pincode && errors.pincode}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              placeholder="Address"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address}
                              isInvalid={touched.address && errors.address}
                            />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Upload License Image</Form.Label>
                            <Form.Control
                              type="file"
                              name="photo"
                              onChange={handleFileChange}
                              isInvalid={touched.photo && errors.photo}
                            />
                            <Form.Control.Feedback type="invalid">{errors.photo}</Form.Control.Feedback>
                          </Col>
                          <Col lg={12} className="form-group mb-3 text-center">
                            <Button type="submit" className="btn btn-primary">Signup</Button>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  )}
                </Formik>
                <div className="w-100 text-center mt-4">
                  <p className="mb-0">
                    <Link className="btn btn-link" to="/pharmacy-login">Already a member?</Link>
                  </p>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Pharmacysignup;
