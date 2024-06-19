import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { Container, Row, Col, Form, Button ,Label} from 'react-bootstrap';
import laboratoryimage from '../img/laboratory-login.jpg';
import { RxSlash } from "react-icons/rx";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
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
  labStartTime1: Yup.string().required('Time Slot is required'), // Adding validation for time slot
  pincode: Yup.string().required('Pincode is required'),
  address: Yup.string().required('Address is required'),
});

function Laboratorysignup() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [DaysLab1, setDaysLab1] = useState("");
  const [daysData, setDaysData] = useState("");

  const listDay = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/Days`);
      return response.data; // Assuming response.data is an array of days objects
    } catch (error) {
      console.error('Error fetching days data:', error);
      return []; // Return empty array or handle error as per your application's requirements
    }
  };

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const days = await listDay();
        setDaysData(days);
      } catch (error) {
        console.error('Error setting days data:', error);
        // Handle error as per your application's requirements
      }
    };

    fetchDays();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const [_id, set_Id] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('LabName', values.name);
      formData.append('EmailLab', values.email);
      formData.append('mobileNumber', values.contact);
      formData.append('Password', values.password);
      formData.append('LabLicenseNumber', values.licenceno);
      formData.append('LabLicenseDate', values.licencedate);
      formData.append('LabStartTime1', values.labStartTime1); // Appending the time slot
      formData.append('Pincode', values.pincode);
      formData.append("DaysLab1", values.DaysLab1);
      formData.append('address', values.address);
      formData.append('photo', file); // Append the file
      formData.append('isActive', true); 

      const response = await axios.post(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/createLaboratery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Laboratory created successfully:', response.data);

      Swal.fire({
        title: "Success!",
        text: "Laboratory registered successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate('/laboratory-login');
      });
    } catch (error) {
      console.error('Error creating laboratory:', error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while registering the laboratory",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };


  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);
  return (
    <>
      <Modalnavigationbar />

      <div className="page-title-area">
        <Pagetitle
          heading="JOIN OUR LABORATORY NETWORK"
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
              <div className="img" style={{ backgroundImage: `url(${laboratoryimage})` }}></div>
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
                    email: '',
                    contact: '',
                    password: '',
                    confirmpass: '',
                    licenceno: '',
                    licencedate: '',
                    labStartTime1: '',
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
                            <Form.Label>Laboratory Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Laboratory Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                          </Col>
                          {/* <Col lg={6} className="form-group mb-3">
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
                          </Col> */}

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
                            <Form.Label>Laboratory Licence No.</Form.Label>
                            <Form.Control
                              type="text"
                              name="licenceno"
                              placeholder="Laboratory Licence No."
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.licenceno}
                              isInvalid={touched.licenceno && errors.licenceno}
                            />
                            <Form.Control.Feedback type="invalid">{errors.licenceno}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Laboratory Licence Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="licencedate"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.licencedate}
                              isInvalid={touched.licencedate && errors.licencedate}
                            />
                            <Form.Control.Feedback type="invalid">{errors.licencedate}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <select
                                        key={"DaysLab1" + _id}
                                        type="text"
                                        // className={validClassBT}
                                        placeholder="Enter blog title"
                                        required
                                        name="DaysLab1"
                                        value={values.DaysLab1}
                                        onChange={(e) => {
                                          setDaysLab1(e.target.value);
                                        }}
                                      >
                                        <option value="">Select Days</option>
                                        {daysData &&
                                          daysData.map((user) => (
                                            <option
                                              key={user._id}
                                              value={user._id}
                                            >
                                              {user.Days}
                                            </option>
                                          ))}
                                      </select>
                                     
                                        Days{" "}
                                        <span className="text-danger">*</span>
                                      
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.DaysLab1}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Lab Start time 1</Form.Label>
                            <Form.Control
                              type="time"
                              name="labStartTime1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.labStartTime1}
                              isInvalid={touched.labStartTime1 && errors.labStartTime1}
                            />
                            <Form.Control.Feedback type="invalid">{errors.labStartTime1}</Form.Control.Feedback>
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
                              as="textarea"
                              rows={3}
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
                            <Form.Label>Upload Photo</Form.Label>
                            <Form.Control
                              type='file'
                              name="photo"
                              onChange={(event) => {
                                handleFileChange(event);
                                handleChange(event);
                              }}
                              onBlur={handleBlur}
                              isInvalid={touched.photo && errors.photo}
                            />
                            <Form.Control.Feedback type="invalid">{errors.photo}</Form.Control.Feedback>
                          </Col>
                          
                          <Col lg={12} className="form-group d-md-flex mb-4">
                            <div className="w-100 text-start">
                              <label className="checkbox-wrap checkbox-primary mb-0">
                                <input type="checkbox" />
                                <span className="checkmark"></span> I agree to all statements in <a href="#" className="d-inline-block">Terms of service</a>
                              </label>
                            </div>
                          </Col>
                          <Col lg={6} className="form-group">
                            <Button type="submit" className="form-control btn btn-sign-in rounded submit px-3">Submit Now</Button>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  )}
                </Formik>
                <p className="text-center">Already have an account? <Link to='/laboratory-login' className="d-inline-block">Sign In</Link></p>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Laboratorysignup;
