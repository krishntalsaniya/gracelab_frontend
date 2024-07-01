import React, { useState,useEffect } from 'react';
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
  pharmacyStartTime1: Yup.string().required('time slote is required'),
  pharmacyStartTime2: Yup.string().required('time slote is required'),
  pharmacyStartTime3: Yup.string().required('time slote is required'),
  pharmacyEndTime1: Yup.string().required('time slote is required'),
  pharmacyEndTime2: Yup.string().required('time slote is required'),
  pharmacyEndTime3: Yup.string().required('time slote is required'),
  address: Yup.string().required('Address is required'),
  area: Yup.string().required('area is required'),
  DaysPharmacy1: Yup.string().required('Days selected is required'),
  DaysPharmacy2: Yup.string().required('Days selected is required'),
  DaysPharmacy3: Yup.string().required('Days selected is required'),
  photo: Yup.string().required('photo is required'),
  pdfFile: Yup.string().required('Licence is required'),
 
  
});

function Pharmacysignup() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [daysData, setDaysData] = useState([]);

  const listDay = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/Days`);
      return response.data;
    } catch (error) {
      console.error('Error fetching days data:', error);
      return [];
    }
  };


  const pharmacytermsandcondition = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/termsandconditionbynetwork/:network`);
      return response.data;
    } catch (error) {
      console.error('Error fetching days data:', error);
      return [];
    }
  };
  pharmacytermsandcondition();

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const days = await listDay();
        setDaysData(days);
      } catch (error) {
        console.error('Error setting days data:', error);
      }
    };

    fetchDays();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };
  const handlePdfChange = (event) => {
    setPdf(event.currentTarget.files[0]);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('PharmacyName', values.name);
     
      formData.append('EmailClinic', values.email);
      formData.append('mobileNumber', values.contact);
      formData.append('Password', values.password);
      formData.append('PharmacyLicenseNumber', values.licenceno);
      formData.append('PharmacyLicenseDate', values.licencedate);
      formData.append('PharmacyStartTime1', values.pharmacyStartTime1);
      formData.append('PharmacyStartTime2', values.pharmacyStartTime2);
      formData.append('PharmacyStartTime3', values.pharmacyStartTime3);
      formData.append('PharmacyEndTime1', values.pharmacyEndTime1);
      formData.append('PharmacyEndTime2', values.pharmacyEndTime2);
      formData.append('PharmacyEndTime3', values.pharmacyEndTime3);
      formData.append('DaysPharmacy1', values.DaysPharmacy1);
      formData.append('DaysPharmacy2', values.DaysPharmacy2);
      formData.append('DaysPharmacy3', values.DaysPharmacy3);
      formData.append('Pincode', values.pincode); // Include pincode
      formData.append('address', values.address);
      formData.append('area', values.area);
      formData.append('photo',file);
      formData.append('pdfFile',pdf);
     
      
      formData.append('isActive', false);

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
                   
                    email: '',
                    contact: '',
                    password: '',
                    confirmpass: '',
                    licenceno: '',
                    licencedate: '',
                    pharmacyStartTime1: '',
                    pharmacyStartTime2: '',
                    pharmacyStartTime3: '',
                    pharmacyEndTime1: '',
                    pharmacyEndTime2: '',
                    pharmacyEndTime3: '',
                    pincode: '',
                    address: '',
                    DaysPharmacy1: '',
                    DaysPharmacy2: '',
                    DaysPharmacy3: '',
                    photo: '',
                    pdfFile: '',
                    area: '',
                 
                  
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
                            <Form.Label>Pharmacy Name <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Pharmacy Email Address <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Confirm Password <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Pharmacy Licence No. <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Pharmacy Licence Date <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Pharmacy Image <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="file"
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

                            <Col lg={6} className="form-group mb-3">
                            <Form.Label>Pharmacy Licence Image <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="file"
                              name="pdfFile"
                               onChange={(event) => {
                                handlePdfChange(event);
                                handleChange(event);
                              }}
                              onBlur={handleBlur}
                              isInvalid={touched.pdfFile && errors.pdfFile}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pdfFile}</Form.Control.Feedback>
                          </Col>

                          

                         

                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Contact No. <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Area <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="area"
                              placeholder="Contact No."
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.area}
                              isInvalid={touched.area && errors.area}
                            />
                            <Form.Control.Feedback type="invalid">{errors.area}</Form.Control.Feedback>
                          </Col>


                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Pharmacy Start Time 1 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="pharmacyStartTime1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pharmacyStartTime1}
                              isInvalid={touched.pharmacyStartTime1 && errors.pharmacyStartTime1}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pharmacyStartTime1}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Pharmacy End Time 1 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="pharmacyEndTime1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pharmacyEndTime1}
                              isInvalid={touched.pharmacyEndTime1 && errors.pharmacyEndTime1}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pharmacyEndTime1}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysPharmacy1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysPharmacy1}
                              isInvalid={touched.DaysPharmacy1 && errors.DaysPharmacy1}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysPharmacy1}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Pharmacy Start Time 2 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="pharmacyStartTime2"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pharmacyStartTime2}
                              isInvalid={touched.pharmacyStartTime2 && errors.pharmacyStartTime2}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pharmacyStartTime2}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Pharmacy End Time 2 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="pharmacyEndTime2"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pharmacyEndTime2}
                              isInvalid={touched.pharmacyEndTime2 && errors.pharmacyEndTime2}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pharmacyEndTime2}</Form.Control.Feedback>
                          </Col>
                          
                          
                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysPharmacy2"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysPharmacy2}
                              isInvalid={touched.DaysPharmacy2 && errors.DaysPharmacy2}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysPharmacy2}</Form.Control.Feedback>
                          </Col>

                         
                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Pharmacy Start Time 3 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="pharmacyStartTime3"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pharmacyStartTime3}
                              isInvalid={touched.pharmacyStartTime3 && errors.pharmacyStartTime3}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pharmacyStartTime3}</Form.Control.Feedback>
                          </Col>
                          

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Pharmacy End Time 3 </Form.Label>
                            <Form.Control
                              type="time"
                              name="pharmacyEndTime3"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.pharmacyEndTime3}
                              isInvalid={touched.pharmacyEndTime3 && errors.pharmacyEndTime3}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pharmacyEndTime3}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days</Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysPharmacy3"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysPharmacy3}
                              isInvalid={touched.DaysPharmacy3 && errors.DaysPharmacy3}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysPharmacy3}</Form.Control.Feedback>
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
                         
                          <Col lg={12} className="form-group d-md-flex mb-4">
                            <div className="w-100 text-start">
                              <label className="checkbox-wrap checkbox-primary mb-0">
                                <input type="checkbox" required />
                                <span className="checkmark"></span> I agree to all statements in <Link to="/terms-condition" className="d-inline-block">Terms of service</Link>
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
                <div className="w-100 text-center mt-4">
                <p className="text-center">Already have an account? <Link to='/pharmacy-login' className="d-inline-block">Sign In</Link></p>
              
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
