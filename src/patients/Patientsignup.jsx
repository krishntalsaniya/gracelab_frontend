import React, { useState } from 'react';
import Pagetitle from './Pagetitle';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import network from '../img/network.jpg';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import { RxSlash } from "react-icons/rx";
import Formik from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as Yup from 'yup';

function Patientsignup() {

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
  });
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/createPharmacy`, {
        PharmacyName: values.name,
        PharmacyOwnerName: values.ownername,
        Email: values.email,
        ContactNo: values.contact,
        Password: values.password,
        LicenseNo: values.licenceno,
        LicenseDate: values.licencedate,
        Pincode: values.pincode,
        Address: values.address,
        isActive: true,
      });

      console.log('Pharmacy created successfully:', response.data);

      Swal.fire({
        title: "Success!",
        text: "Pharmacy registered successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        // Redirect to '/laboratory-login' using useHistory hook
        navigate('/pharmacy-login');
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
          heading="PATIENTS"
          pagetitlelink="/"
          title1="Home"
          title2="Patients"
          IconComponent={RxSlash}
        />
      </div>

      <section className="services-area ptb-70 pb-5">
        <Container>
          <Row className="justify-content-center" id="loginPanel">
            <Col md={12} lg={10}>
              <div className="wrap d-md-flex">
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-block">
                    <div className="w-100 text-center">
                      <h3 className="mb-2 h5 fw-bold">We are The Grace Lab Team</h3>
                      <p className="mb-4">please sign up to your account</p>
                    </div>
                  </div>
                  <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    contact: '',
                    password: ''
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
                  <Form className="signin-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
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
</Form.Group>


                    <Form.Group className="mb-3" controlId="formEmail">
  <Form.Label>Email id/username</Form.Label>
  <Form.Control
                              type="text"
                              name="email"
                              placeholder="Laboratory Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
</Form.Group>



                    <Form.Group className="mb-3" controlId="formContact">
  <Form.Label>Contact no</Form.Label>
  <Form.Control
                              type="text"
                              name="contact"
                              placeholder="Laboratory Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.contact}
                              isInvalid={touched.contact && errors.contact}
                            />
                            <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
</Form.Group>



                    <Form.Group className="mb-3" controlId="formPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control
                              type="text"
                              name="password"
                              placeholder="Laboratory Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              isInvalid={touched.password && errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
</Form.Group>




<Button type="button" onClick={handleSubmit} className="form-control btn btn-sign-in rounded submit px-3">Submit Now</Button>
                  </Form>
                   )}
                   </Formik>
                  <p className="text-center accounttop">
                    Already have an account?{' '}
                    <Link to="/patient-login" className="d-inline-block">
                      Sign In
                    </Link>
                  </p>
                  <p className="text-center fw-bold">
                    <Link to="#" onClick={handleShow} style={{ color: "#eb268f" }}>
                      Why Registered with us
                    </Link>
                  </p>
                </div>
                <div className="img" style={{ backgroundImage: `url(${network})` }}></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Why Registered with us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Accurate Diagnosis:</strong> Laboratory tests provide precise results that help in diagnosing various medical conditions accurately. This allows healthcare providers to initiate appropriate treatment plans promptly.
          </p>
          <p>
            <strong>Early Detection:</strong> Many diseases can be detected early through laboratory tests, even before symptoms manifest. Early detection facilitates timely intervention, potentially improving patient outcomes.
          </p>
          <p>
            <strong>Monitoring Treatment Progress:</strong> Laboratory tests enable healthcare providers to monitor the effectiveness of treatments over time. By tracking changes in biomarkers or other indicators, they can adjust treatment plans as necessary.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Patientsignup;