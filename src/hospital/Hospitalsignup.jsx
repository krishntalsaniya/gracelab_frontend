// import React from 'react'
// import Modalnavigationbar from '../navbar/Modalnavigationbar'
// import Pagetitle from '../patients/Pagetitle'
// import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
// import Signup from './Signup';
// import hospitallogin from '../img/hospital-login.jpg'

// function Hospitalsignup() {
//   return (
//    <>
//    <Modalnavigationbar/>

// <div className="page-title-area">
// <Pagetitle 
// heading="JOIN OUR HOSPITAL NETWORKK"
// pagetitlelink="/"
// title1="Login"
// title2="Signup"
// />
// </div>


// <section className="services-area ptb-70 pb-5">
//       <Container>
//         <Row className="justify-content-center" id="signupPanel">
//           <Signup
//           signupimage={hospitallogin}
//           name="Hospital Name"
//           namep="Hospital Name"
//           ownername="Owner Name"
//           email="Email Address / Username"
//           contact="Contact No."
//           password="Password"
//           confirmpass="confirm password"
//           licenceno="Hospital Licence No."
//           licencep="Hospital Licence No."
//           licencedate="Hospital Licence Date."
//           pincode="Pincode"
//           address="Registered Address"
//           signup='/hospital-login'
//           />
//         </Row>
//       </Container>
//     </section>
   
//    </>
//   )
// }

// export default Hospitalsignup

// binding


import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Signup from '../hospital/Signup';
import hospitallogin from '../img/hospital-login.jpg'
import { RxSlash } from "react-icons/rx";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';


const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  // ownername: Yup.string().required('Owner Name is required'),
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
  HospitalRegistrationDate: Yup.date().required('HospitalRegistration  Date is required'),  
  city: Yup.string().required('city  Date is required'),  
  opd1StartTime: Yup.string().required('time slote is required'),  
  opd2StartTime: Yup.string().required('time slote is required'),  
  opd3StartTime: Yup.string().required('time slote is required'),  
  opd1EndTime: Yup.string().required('end time slote is required'),  
  opd2EndTime: Yup.string().required('end time slote is required'),  
  opd3EndTime: Yup.string().required('end time slote is required'),  
  DaysHospital1: Yup.string().required('days selected required'),  
  DaysHospital2: Yup.string().required('days selected required'),  
  DaysHospital3: Yup.string().required('days selected required'),  
  pincode: Yup.string().required('Pincode is required'),
  address: Yup.string().required('Address is required'),
  Speciality: Yup.string().required('Speciality is required'),
  area: Yup.string().required('Area is required'),
  photo: Yup.string().required('File are required'),
  pdfFile: Yup.string().required('Licence are required'),
  ReferralCode: Yup.string(),
});

function Hospitalsignup() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [pdf, setpdf] = useState(null);
  const [daysData, setDaysData] = useState([]);
  const [speciality, setspeciality] = useState([]);
  const [loc, setLoc] = useState([]);

  const listDay = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/Days`);
      return response.data;
    } catch (error) {
      console.error('Error fetching days data:', error);
      return [];
    }
  };




  useEffect(() => {
    const fetchDays = async () => {
      try {
        const days = await listDay();
        setDaysData(days);
      } catch (error) {
        console.error('Error setting days data:', error);
      }
    };

     const city = async () =>{

    try {
        const city = await axios.get(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/location/city`
      )
      setLoc(city.data)
    } catch (error) {
       console.error("Error fetching laboratory list:", error);
    }
    }
    city();
    const listspeciality = async () => {
    try {
      const speciality = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/getAllHospitalSpeciality`);
      console.log("specccc",speciality)
      setspeciality(speciality.data)
    } catch (error) {
      console.error('Error fetching days data:', error);
    
    }
  };
listspeciality();
    fetchDays();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };
  const handlePdfChange = (event) => {
    setpdf(event.currentTarget.files[0]);
  };

   const generateUniqueReferenceNo = async () => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // JS months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");

    // Fetch the count of entries in the database
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/getHospitalCount`
    );
    const count = response.data.count;

    console.log("count", count);

    const sequenceNumber = String(count + 1).padStart(6, "0"); // Add 1 to the count to get the next sequence number

    return `HOS${year}${month}${day}${hours}${sequenceNumber}`;
  } catch (error) {
    console.error('Error fetching lab count:', error);
    // Handle error appropriately, e.g., throw an error or return a default value
    throw new Error('Failed to generate unique reference number');
  }
};
  const handleSubmit = async (values,{setSubmitting}) => {
    try {

      const formData = new FormData();
      formData.append('HospitalName', values.name);
      // formData.append('PharmacyOwnerName', values.ownername);
      formData.append('EmailHospital', values.email);
      formData.append('mobileNumber', values.contact);
      formData.append( 'Password', values.password);
      formData.append('HospitalLicenseNumber', values.licenceno);
      formData.append('HospitalLicenseDate', values.licencedate);
      formData.append('HospitalRegistrationDate', values.HospitalRegistrationDate);
      formData.append('city', values.city);
      formData.append('OPD1StartTime', values.opd1StartTime);
      formData.append('OPD2StartTime', values.opd2StartTime);
      formData.append('OPD3StartTime', values.opd3StartTime);
      formData.append('OPD1EndTime', values.opd1EndTime);
      formData.append('OPD2EndTime', values.opd2EndTime);
      formData.append('OPD3EndTime', values.opd3EndTime);
      formData.append('DaysHospital1', values.DaysHospital1);
      formData.append('DaysHospital2', values.DaysHospital2);
      formData.append('DaysHospital3', values.DaysHospital3);
      formData.append('Speciality', values.Speciality);
      formData.append('area', values.area);
      formData.append('Pincode', values.pincode);
      formData.append('address', values.address);
       if (values.ReferralCode) {
        formData.append('ReferralCode', values.ReferralCode);
      }
      formData.append('isActive', false);
      formData.append('photo', file);
      formData.append('pdfFile', pdf);

       const uniqueReferenceNo = await generateUniqueReferenceNo();
    formData.append('HospitalReferenceNo', uniqueReferenceNo);

    
      const response = await axios.post(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/createHospital`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Pharmacy created successfully:', response.data);

      Swal.fire({
        title: "Success!",
        text: "Hospital registered successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        // Redirect to '/laboratory-login' using useHistory hook
        navigate('/hospital-login');
      });
      // Redirect or show success message here
    } catch (error) {
      console.error('Error creating laboratory:', error);
      // Show error message here
       Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to create Pharmcay',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setSubmitting(false); // Reset form submission state
    }
  };

  return (
    <>
      <Modalnavigationbar />

      <div className="page-title-area">
        <Pagetitle
          heading="JOIN OUR HOSPITAL NETWORK"
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
              <div className="img" style={{ backgroundImage: `url(${hospitallogin})` }}></div>
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
                    HospitalRegistrationDate:'',
                    city:'',
                    opd1StartTime: '',
                    opd2StartTime: '',
                    opd3StartTime: '',
                    opd1EndTime: '',
                    opd2EndTime: '',
                    opd3EndTime: '',
                    pincode: '',
                    address: '',
                    DaysHospital1: '',
                    DaysHospital2: '',
                    DaysHospital3: '',
                    Speciality:'',
                    area:'',
                    photo:'',
                    pdfFile:'',
                      ReferralCode: '',
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
                    isSubmitting,
                  }) => (
                    <Form className="signin-form row" onSubmit={handleSubmit}>
                      <div className="step-1 d-block">
                        <Row className="justify-content-center">
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Hospital Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Hospital Name"
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
                            <Form.Label>Hospital Email Address <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Hospital Licence No. <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="licenceno"
                              placeholder="Hospital Licence No."
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.licenceno}
                              isInvalid={touched.licenceno && errors.licenceno}
                            />
                            <Form.Control.Feedback type="invalid">{errors.licenceno}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Hospital Licence Date <span style={{ color: 'red' }}>*</span></Form.Label>
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

                            <Col lg={6} className="form-group mb-3">
                            <Form.Label>Hospital Registration Date <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="date"
                              name="HospitalRegistrationDate"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.HospitalRegistrationDate}
                              isInvalid={touched.HospitalRegistrationDate && errors.HospitalRegistrationDate}
                            />
                            <Form.Control.Feedback type="invalid">{errors.HospitalRegistrationDate}</Form.Control.Feedback>
                          </Col>

                           <Col lg={6} className="form-group mb-3">
                            <Form.Label>City <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="city"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.city}
                              isInvalid={touched.city && errors.city}
                            >
                              <option value="">Select City</option>
                              {loc.map((city) => (
                                <option key={city._id} value={city._id}>
                                  {city.Name}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Upload License Image <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="file"
                              name="photo"
                              accept=".jpg,.jpeg,.png"
                               onChange={(event) => {
                                handleFileChange(event);
                                handleChange(event);
                              }}
                               onBlur={handleBlur}
                              isInvalid={touched.photo && errors.photo}
                            />
                            <Form.Control.Feedback type="invalid">{errors.photo}</Form.Control.Feedback>
                          </Col>


                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Upload License Image <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="file"
                              name="pdfFile"
                              accept=".pdf,.docx,.excel"
                              onChange={(event) => {
                                handlePdfChange(event);
                                handleChange(event);
                              }}
                               onBlur={handleBlur}
                              isInvalid={touched.pdfFile && errors.pdfFile}
                            />
                            <Form.Control.Feedback type="invalid">{errors.pdfFile}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
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
                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD Start Time 1 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="opd1StartTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.opd1StartTime}
                              isInvalid={touched.opd1StartTime && errors.opd1StartTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.opd1StartTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD End Time 1 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="opd1EndTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.opd1EndTime}
                              isInvalid={touched.opd1EndTime && errors.opd1EndTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.opd1EndTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysHospital1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysHospital1}
                              isInvalid={touched.DaysHospital1 && errors.DaysHospital1}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysHospital1}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD Start Time 2 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="opd2StartTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.opd2StartTime}
                              isInvalid={touched.opd2StartTime && errors.opd2StartTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.opd2StartTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD End Time 2 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="opd2EndTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.opd2EndTime}
                              isInvalid={touched.opd2EndTime && errors.opd2EndTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.opd2EndTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysHospital2"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysHospital2}
                              isInvalid={touched.DaysHospital2 && errors.DaysHospital2}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysHospital2}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD Start Time 3 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="opd3StartTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.opd3StartTime}
                              isInvalid={touched.opd3StartTime && errors.opd3StartTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.opd3StartTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD End Time 3 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="opd3EndTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.opd3EndTime}
                              isInvalid={touched.opd3EndTime && errors.opd3EndTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.opd3EndTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysHospital3"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysHospital3}
                              isInvalid={touched.DaysHospital3 && errors.DaysHospital3}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysHospital3}</Form.Control.Feedback>
                          </Col>

                           <Col lg={6} className="form-group mb-3">
                            <Form.Label>Speciality <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="Speciality"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.Speciality}
                              isInvalid={touched.Speciality && errors.Speciality}
                            >
                              <option value="">Select Speciality</option>
                               {Array.isArray(speciality) && speciality.map((item) => (
          <option key={item._id} value={item._id}>
            {item.Speciality}
          </option>
        ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.Speciality}</Form.Control.Feedback>
                          </Col>

                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Area <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="area"
                              placeholder="Area."
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.area}
                              isInvalid={touched.area && errors.area}
                            />
                            <Form.Control.Feedback type="invalid">{errors.area}</Form.Control.Feedback>
                          </Col>
                          <Col lg={6} className="form-group mb-3">
                            <Form.Label>Pincode <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Form.Label>Address <span style={{ color: 'red' }}>*</span></Form.Label>
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
                        
                          
                          <Col lg={12} className="form-group d-md-flex mb-4">
                      <div className="w-100 text-start">
                      <label class="checkbox-wrap checkbox-primary mb-0">
                      <input type="checkbox" required/>
                         <span class="checkmark"></span> I agree all statements in <Link to='/terms-condition' class="d-inline-block">Terms of service</Link>
                                                    </label>
                      </div>
                    </Col>
                       <Form.Group className='mb-3'>
                          <Form.Label>Any Referral code ? (optional)</Form.Label>
                          <Form.Control
                            type="text"
                            name="ReferralCode"
                            placeholder="Referral Code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ReferralCode}
                            isInvalid={touched.ReferralCode && !!errors.ReferralCode}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.ReferralCode}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                          type="submit"
                          className="form-control btn btn-sign-in rounded submit px-3"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Now'}
                        </Button>
                        </Row>
                      </div>
                    </Form>
                  )}
                </Formik>
                <p className="text-center">Already have an account? <Link to='/hospital-login' className="d-inline-block">Sign In</Link></p>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Hospitalsignup;