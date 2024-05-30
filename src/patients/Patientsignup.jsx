import React, { useState } from 'react';
import Pagetitle from './Pagetitle';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import network from '../img/network.jpg';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import { RxSlash } from "react-icons/rx";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Patientsignup() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      contact: '',
      password: '',
      terms: false
    },
    validationSchema: Yup.object({
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
      terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
    }),
    onSubmit: values => {
      console.log(values);
      // Handle form submission
    }
  });


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
                  <Form className="signin-form" onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        {...formik.getFieldProps('name')}
                        isInvalid={formik.touched.name && formik.errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email id/username</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email Id/username"
                        {...formik.getFieldProps('email')}
                        isInvalid={formik.touched.email && formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formContact">
                      <Form.Label>Contact no</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Contact no"
                        {...formik.getFieldProps('contact')}
                        isInvalid={formik.touched.contact && formik.errors.contact}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.contact}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        {...formik.getFieldProps('password')}
                        isInvalid={formik.touched.password && formik.errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTerms">
                      <Form.Check
                        type="checkbox"
                        label={
                          <span>
                            I agree all statements in{' '}
                            <Link to="#" className="d-inline-block">
                              Terms of service
                            </Link>
                          </span>
                        }
                        {...formik.getFieldProps('terms')}
                        isInvalid={formik.touched.terms && formik.errors.terms}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.terms}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" className="form-control btn btn-sign-in rounded submit px-3">
                     Submit Now
                    </Button>
                  </Form>
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