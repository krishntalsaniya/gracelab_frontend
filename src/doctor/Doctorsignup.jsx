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
  //       //console.log("Doctor Dropdownlist", location.data);
  //     } catch (error) {
  //       //console.log("Error : ", error);
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
     city: Yup.string().required('city are required'),
    OPD1StartTime: Yup.string().required('OPD start time is required'),
    OPD2StartTime: Yup.string().required('OPD start time is required'),
    OPD3StartTime: Yup.string().required('OPD start time is required'),
    OPD1EndTime: Yup.string().required('OPD end time is required'),
    OPD2EndTime: Yup.string().required('OPD end time is required'),
    OPD3EndTime: Yup.string().required('OPD end time is required'),
    DaysDoctor1: Yup.string().required('Days are required'),
    DaysDoctor2: Yup.string().required('Days are required'),
    DaysDoctor3: Yup.string().required('Days are required'),
    area: Yup.string().required('area are required'),
    Speciality: Yup.string().required('Speciality are required'),
    DiseasesSymptoms: Yup.string().required('Diseases Symptoms are required'),
    DoctorRegistrationDate: Yup.date().required('DoctorRegistrationDate are required'),
    DoctorLicenseDate: Yup.date().required('DoctorLicenseDate are required'),
    photo: Yup.string().required('File are required'),
    pdfFile: Yup.string().required('Licence are required'),
   
    ReferralCode: Yup.string(),

  });


  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
    const [daysData, setDaysData] = useState([]);
     const [speciality, setspeciality] = useState([]);
const [loc, setLoc] = useState([]);
 const [symptomwise, setsymptomwise] = useState(null);
     const listDay = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/Days`);
      return response.data;
    } catch (error) {
      console.error('Error fetching days data:', error);
      return [];
    }
  };
listDay();

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
      const speciality = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/getAllDoctorSpeciality`);
     
      setspeciality(speciality.data)
    } catch (error) {
      console.error('Error fetching days data:', error);
    
    }
  };
listspeciality();

 const Doctorsymtoms = async () => {
      try {
        const Doctorsymtoms = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/DiseasesSymptoms`
        );

        const specilityisactive = Doctorsymtoms.data.filter(
          (specialityisactive) => specialityisactive.IsActive
        );
        setsymptomwise(specilityisactive);
      
      } catch (error) {
        console.log("doctor symtoms  :", error);
      }
    };
    Doctorsymtoms();

    fetchDays();
  }, []);


  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };


  const handlePdfChange = (event) => {
    setPdf(event.currentTarget.files[0]);
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
      `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/getDoctorCount`
    );
    const count = response.data.count;

  

    const sequenceNumber = String(count + 1).padStart(6, "0"); // Add 1 to the count to get the next sequence number

    return `DOC${year}${month}${day}${hours}${sequenceNumber}`;
  } catch (error) {
    console.error('Error fetching lab count:', error);
    // Handle error appropriately, e.g., throw an error or return a default value
    throw new Error('Failed to generate unique reference number');
  }
};
  const handleSubmit = async (values,{setSubmitting}) => {
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
      formData.append('OPD1StartTime', values.OPD1StartTime);
      formData.append('OPD2StartTime', values.OPD2StartTime);
      formData.append('OPD3StartTime', values.OPD3StartTime);
      formData.append('OPD1EndTime', values.OPD1EndTime);
      formData.append('OPD2EndTime', values.OPD2EndTime);
      formData.append('OPD3EndTime', values.OPD3EndTime);
      formData.append('DaysDoctor1', values.DaysDoctor1);
      formData.append('DaysDoctor2', values.DaysDoctor2);
      formData.append('DaysDoctor3', values.DaysDoctor3);
      formData.append('area', values.area);
      formData.append('Speciality', values.Speciality);
      formData.append('DoctorRegistrationDate', values.DoctorRegistrationDate);
      formData.append('DoctorLicenseDate', values.DoctorLicenseDate);
      formData.append('DiseasesSymptoms', values.DiseasesSymptoms);
       if (values.ReferralCode) {
        formData.append('ReferralCode', values.ReferralCode);
        formData.append('city', values.city);
      }
      formData.append('photo', file);
      formData.append('pdfFile', pdf);
      formData.append('isActive', false); 

      const uniqueReferenceNo = await generateUniqueReferenceNo();
    formData.append('DoctorReferenceNo', uniqueReferenceNo);


      const response = await axios.post(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/createDoctor`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    

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
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to create Doctor',
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
                          city: '',
                          OPD1StartTime:'',
                          OPD2StartTime:'',
                          OPD3StartTime:'',
                          OPD1EndTime:'',
                          OPD2EndTime:'',
                          OPD3EndTime:'',
                          DaysDoctor1:'',
                          DaysDoctor2:'',
                          DaysDoctor3:'',
                          area:'',
                          Speciality:'',
                          DoctorRegistrationDate:'',
                          DoctorLicenseDate:'',
                          photo:'',
                          pdfFile:'',
                          ReferralCode: '',
                          DiseasesSymptoms: '',
                          
                          
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
                          <Form className="signin-form row" onSubmit={handleSubmit} >
                            <div className="step-1 d-block">
                              <Row className="justify-content-center">
                              <Col lg={6} className="form-group mb-3">
                              <Form.Label>Doctors Name <span style={{ color: 'red' }}>*</span></Form.Label>
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
                              <Form.Label>Hospital Name <span style={{ color: 'red' }}>*</span></Form.Label>
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
                              <Form.Label>Email Address <span style={{ color: 'red' }}>*</span></Form.Label>
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
                              <Form.Label>Contact No. <span style={{ color: 'red' }}>*</span></Form.Label>
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
                              <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
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
                              <Form.Label>Confirm password <span style={{ color: 'red' }}>*</span></Form.Label>
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


                       


                              <Col lg={6} className="form-group mb-3">
                              <Form.Label>Education <span style={{ color: 'red' }}>*</span></Form.Label>
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
                              <Form.Label>Pincode <span style={{ color: 'red' }}>*</span></Form.Label>
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

                            <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD Start Time 1 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="OPD1StartTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.OPD1StartTime}
                              isInvalid={touched.OPD1StartTime && errors.OPD1StartTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.OPD1StartTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD End Time 1 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="OPD1EndTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.OPD1EndTime}
                              isInvalid={touched.OPD1EndTime && errors.OPD1EndTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.OPD1EndTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysDoctor1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysDoctor1}
                              isInvalid={touched.DaysDoctor1 && errors.DaysDoctor1}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysDoctor1}</Form.Control.Feedback>
                          </Col>





                            <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD Start Time 2 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="OPD2StartTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.OPD2StartTime}
                              isInvalid={touched.OPD2StartTime && errors.OPD2StartTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.OPD2StartTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD End Time 2 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="OPD2EndTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.OPD2EndTime}
                              isInvalid={touched.OPD2EndTime && errors.OPD2EndTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.OPD2EndTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysDoctor2"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysDoctor2}
                              isInvalid={touched.DaysDoctor2 && errors.DaysDoctor2}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysDoctor2}</Form.Control.Feedback>
                          </Col>



                            <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD Start Time 3 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="OPD3StartTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.OPD3StartTime}
                              isInvalid={touched.OPD3StartTime && errors.OPD3StartTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.OPD3StartTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>OPD End Time 3 <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="time"
                              name="OPD3EndTime"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.OPD3EndTime}
                              isInvalid={touched.OPD3EndTime && errors.OPD3EndTime}
                            />
                            <Form.Control.Feedback type="invalid">{errors.OPD3EndTime}</Form.Control.Feedback>
                          </Col>

                          <Col lg={4} className="form-group mb-3">
                            <Form.Label>Days <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DaysDoctor3"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DaysDoctor3}
                              isInvalid={touched.DaysDoctor3 && errors.DaysDoctor3}
                            >
                              <option value="">Select Days</option>
                              {daysData.map((day) => (
                                <option key={day._id} value={day._id}>
                                  {day.Days}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DaysDoctor3}</Form.Control.Feedback>
                          </Col>

                             <Col lg={6} className="form-group mb-3">
                              <Form.Label>Area <span style={{ color: 'red' }}>*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name="area"
                                placeholder='area'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.area}
                                isInvalid={touched.area && errors.area}
                              />
                              <Form.Control.Feedback type="invalid">{errors.area}</Form.Control.Feedback>
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
                              <Form.Label>Doctor Registration Date <span style={{ color: 'red' }}>*</span></Form.Label>
                              <Form.Control
                                type="date"
                                name="DoctorRegistrationDate"
                                placeholder='DoctorRegistrationDate'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.DoctorRegistrationDate}
                                isInvalid={touched.DoctorRegistrationDate && errors.DoctorRegistrationDate}
                              />
                              <Form.Control.Feedback type="invalid">{errors.DoctorRegistrationDate}</Form.Control.Feedback>
                            </Col>

                             <Col lg={6} className="form-group mb-3">
                              <Form.Label>Doctor Licence Date <span style={{ color: 'red' }}>*</span></Form.Label>
                              <Form.Control
                                type="date"
                                name="DoctorLicenseDate"
                                placeholder='DoctorLicenseDate'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.DoctorLicenseDate}
                                isInvalid={touched.DoctorLicenseDate && errors.DoctorLicenseDate}
                              />
                              <Form.Control.Feedback type="invalid">{errors.DoctorLicenseDate}</Form.Control.Feedback>
                            </Col>


                          

                          

 <Col lg={6} className="form-group mb-3">
                            <Form.Label>Upload Image <span style={{ color: 'red' }}>*</span></Form.Label>
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
                            <Col lg={6} className="form-group mb-3">
                            <Form.Label>Upload  Licence Image <span style={{ color: 'red' }}>*</span></Form.Label>
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

                             <Col lg={6} className="form-group mb-3">
                            <Form.Label>Diseases Symptoms <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="select"
                              name="DiseasesSymptoms"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.DiseasesSymptoms}
                              isInvalid={touched.DiseasesSymptoms && errors.DiseasesSymptoms}
                            >
                              <option value="">Select Diseases Symptoms</option>
                              {symptomwise?.map((symptom) => (
                                <option key={symptom._id} value={symptom._id}>
                                  {symptom.Symptom}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.DiseasesSymptoms}</Form.Control.Feedback>
                          </Col>

                           <Col lg={12} className="form-group mb-3">
                              <Form.Label>Address <span style={{ color: 'red' }}>*</span></Form.Label>
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


                           

<Col lg={12} className="form-group d-md-flex mb-4">
                            <div className="w-100 text-start">
                              <label className="checkbox-wrap checkbox-primary mb-0">
                                <input type="checkbox" required />
                                <span className="checkmark"></span> I agree to all statements in <Link to="/terms-condition" className="d-inline-block">Terms of service</Link>
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
