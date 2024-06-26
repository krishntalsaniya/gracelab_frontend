import React, { useEffect, useState } from 'react';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import doctorlogin from '../img/doctor-login.jpg';
import { RxSlash } from 'react-icons/rx';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';



function Doctorsignup() {

  // const [specialties, setSpecialties] = useState([]);

  // useEffect(() => {
  //   const Doctorlocation = async () => {
  //     try {
  //       const location = await axios.get(
  //         `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/DoctorSpeciality`
  //       );
  //       setSpecialties(location.data);
  //       console.log("Doctor Dropdownlist", location.data);
  //     } catch (error) {
  //       console.log("Error : ", error);
  //     }
  //   };
  //   Doctorlocation();
  
    
  // }, [])

  
  
 


  const SignupSchema = Yup.object().shape({
    doctorsName: Yup.string().required('Name is required'),
    hospitalName: Yup.string().required('Hospital name is required'),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Invalid email address'
      )
      .required('Email is required'),
    contactNo: Yup.string()
      .matches(/^\d+$/, 'Contact No. must contain only digits')
      .length(10, 'Contact No. must be exactly 10 digits')
      .required('Contact No. is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
      education: Yup.string().required('Education is required'),
    pincode: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Pincode is required'),
    address: Yup.string().required('Address is required'),
    // agreeTerms: Yup.boolean()
    //   .oneOf([true], 'Must agree to terms')
    //   .required('Terms and Condition'),
  });


  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('DoctorName', values.doctorsName);
      formData.append('HospitalName', values.hospitalName);
      formData.append('EmailClinic', values.email);
      formData.append('mobileNumber', values.contactNo);
      formData.append('Password',values.password);
      formData.append('Confirmpassword', values.confirmPassword);
      formData.append('Education', values.education);
      formData.append('Pincode', values.pincode);
      formData.append('address', values.address);
      formData.append('photo', file);
      formData.append('isActive', false); 
      const response = await axios.post(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/createDoctor`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Pharmacy created successfully:', response.data);

      Swal.fire({
        title: "Success!",
        text: "Doctor registered successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        // Redirect to '/laboratory-login' using useHistory hook
        navigate('/doctor-login');
      });
      // Redirect or show success message here
    } catch (error) {
      console.error('Error creating laboratory:', error);
      // Show error message here
    }
  };

  return (
    <>
     
          <Modalnavigationbar />

          <div className="page-title-area">
            <Pagetitle
              heading="JOIN OUR DOCTORS NETWORK"
              pagetitlelink="/"
              title1="Login"
              title2="Signup"
              IconComponent={RxSlash}
            />
          </div>
          <section className="services-area ptb-70 pb-5">
            <Container>
              <Row className="justify-content-center" id="signupPanel">
                <Col md={12} lg={12}>
                  <div className="wrap d-md-flex">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${doctorlogin})`,
                      }}
                    ></div>
                    <div className="login-wrap p-4 p-md-5">
                      <div className="d-block">
                        <div className="w-100 text-center">
                          <h3 className="mb-2 h5 fw-bold">
                            We are The Grace Lab Team
                          </h3>
                          <p className="mb-4">
                            Please sign up to your account
                          </p>
                        </div>
                      </div>
                      <Formik
                        initialValues={{
                          doctorsName: '',
                          hospitalName: '',
                          email: '',
                          contactNo: '',
                          password: '',
                          confirmPassword: '',
                          education: '',
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
                          <Form className="signin-form row" onSubmit={handleSubmit} >
                            <div className="step-1 d-block">
                              <Row className="justify-content-center">
                              <Col lg={6} className="form-group mb-3">
                              <Form.Label>Doctors Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="doctorsName"
                                placeholder='Doctor Name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.doctorsName}
                                isInvalid={touched.doctorsName && errors.doctorsName}
                              />
                              <Form.Control.Feedback type="invalid">{errors.doctorsName}</Form.Control.Feedback>
                            </Col>

                            <Col lg={6} className="form-group mb-3">
                              <Form.Label>Hospital Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="hospitalName"
                                placeholder='Hospital Name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.hospitalName}
                                isInvalid={touched.hospitalName && errors.hospitalName}
                              />
                              <Form.Control.Feedback type="invalid">{errors.hospitalName}</Form.Control.Feedback>
                            </Col>

                            <Col lg={6} className="form-group mb-3">
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control
                                type="text"
                                name="email"
                                placeholder='Email Address'
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
                                name="contactNo"
                                placeholder='Contact No.'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contactNo}
                                isInvalid={touched.contactNo && errors.contactNo}
                              />
                              <Form.Control.Feedback type="invalid">{errors.contactNo}</Form.Control.Feedback>
                            </Col>


                            <Col lg={6} className="form-group mb-3">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type="password"
                                name="password"
                                placeholder='Password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                isInvalid={touched.password && errors.password}
                              />
                              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Col>


                            <Col lg={6} className="form-group mb-3">
                              <Form.Label>Confirm password</Form.Label>
                              <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                isInvalid={touched.confirmPassword && errors.confirmPassword}
                              />
                              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                            </Col>


                            {/* <Col lg={6} className="form-group mb-3">
                              <Form.Label>Specialty</Form.Label>
                              <Form.Control
                                  as="select"
                                  name="specialty"
                                  placeholder="Specialty"
                                  onChange={handleChange}
                                  value={specialties}
      >
        <option value="" disabled hidden>Select an option</option>
        {specialties.map(specialty => (
          <option key={specialty.id} value={specialty.id}>{specialty.Details
          }</option>
        ))}
      </Form.Control>
                              <Form.Control.Feedback type="invalid">{errors.specialty}</Form.Control.Feedback>
                              </Col> */}


                              <Col lg={6} className="form-group mb-3">
                              <Form.Label>Education</Form.Label>
                              <Form.Control
                                type="text"
                                name="education"
                                placeholder='Education'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.education}
                                isInvalid={touched.education && errors.education}
                              />
                              <Form.Control.Feedback type="invalid">{errors.education}</Form.Control.Feedback>
                            </Col>


                            <Col lg={6} className="form-group mb-3">
                              <Form.Label>Pincode</Form.Label>
                              <Form.Control
                                type="text"
                                name="pincode"
                                placeholder='Pincode'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pincode}
                                isInvalid={touched.pincode && errors.pincode}
                              />
                              <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
                            </Col>


                            <Col lg={12} className="form-group mb-3">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                type="text"
                                name="address"
                                placeholder='Address'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                isInvalid={touched.address && errors.address}
                              />
                              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                            </Col>

                            <Col lg={6} className="form-group mb-3">
                            <Form.Label>Upload Doctor Image</Form.Label>
                            <Form.Control
                              type="file"
                              name="photo"
                              onChange={handleFileChange}
                              isInvalid={touched.photo && errors.photo}
                            />
                            <Form.Control.Feedback type="invalid">{errors.photo}</Form.Control.Feedback>
                          </Col>

<Col lg={12} className="form-group d-md-flex mb-4">
                            <div className="w-100 text-start">
                              <label className="checkbox-wrap checkbox-primary mb-0">
                                <input type="checkbox" />
                                <span className="checkmark"></span> I agree to all statements in <Link to="/terms-condition" className="d-inline-block">Terms of service</Link>
                              </label>
                            </div>
                          </Col>
                      <Col lg={6} className="form-group">
                      <Button type="submit"  className="form-control btn btn-sign-in rounded submit px-3">Submit Now</Button>
                      </Col>


                              </Row>
                            </div>
                          </Form>
                        )}
                      </Formik>
                      <p className="text-center">
                        Already have an account?{' '}
                        <Link
                          data-toggle="tab"
                          to="/doctor-login"
                          className="d-inline-block"
                        >
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}
   

export default Doctorsignup;
