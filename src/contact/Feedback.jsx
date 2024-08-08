import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { FaTwitter, FaYoutube, FaFacebook, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Feedback() {
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string()
      .email('Invalid email')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must be valid and end with .com')
      .test('endsWithCom', 'Email must end with .com', value => value.endsWith('.com'))
      .required('Please enter your email'),
    contactno: Yup.string()
      .matches(/^\d+$/, 'Contact No. must contain only digits')
      .length(10, 'Contact No. must be exactly 10 digits')
      .required('Contact No. is required'),
    message: Yup.string().required('Please enter the subject'),
    textarea: Yup.string().required('Please enter your message'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/contact`, {
        contactname: values.name,
        Email: values.email,
        ContactNo: values.contactno,
        message: values.message,
        textarea: values.textarea,
        feedback: values.feedback,
      });

      Swal.fire({
        title: "Success!",
        text: "Contact Details submitted successfully",
        icon: "success",
        confirmButtonText: "OK"
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
        <Pagetitle heading="Feedback" pagetitlelink="/" title1="Home" title2="Feedback" IconComponent={MdArrowForwardIos} />
      </div>

      <section className="contact-area ptb-120">
        <Container>
          <div className="section-title text-center">
            <span className="bg-ff5d24">Message Us</span>
            <h2>Feedback here</h2>
          </div>

          <Formik
            initialValues={{
              name: '',
              email: '',
              contactno: '',
              message: '',
              textarea: '',
              feedback: {
                service: '',
                quality: '',
                support: '',
                value: '',
                overall: '',
                website: '',
                delivery: '',
                experience: '',
              }
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
              <Form onSubmit={handleSubmit} id="contactForm">
                <Row>
                  <Col lg={6} md={6}>
                    <Form.Group className='form-group' controlId="formName">
                      <Form.Label className='text-start w-100'>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Your name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        isInvalid={touched.name && errors.name}
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6}>
                    <Form.Group controlId="formContactNo">
                      <Form.Label className='text-start w-100'>Contact no</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactno"
                        placeholder="Your Contact no"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contactno}
                        isInvalid={touched.contactno && errors.contactno}
                      />
                      <Form.Control.Feedback type="invalid">{errors.contactno}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label className='text-start w-100'>Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Your Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6}>
                    <Form.Group controlId="formMessage">
                      <Form.Label className='text-start w-100'>Message</Form.Label>
                      <Form.Control
                        type="text"
                        name="message"
                        placeholder="Your Message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                        isInvalid={touched.message && errors.message}
                      />
                      <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={12} md={12}>
                    <div className="feedback-questions">
                      <Form.Label>Did you get timely service? *</Form.Label>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          name="feedback.service"
                          value="Yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.service === 'Yes'}
                        />
                        <Form.Check
                          type="checkbox"
                          label="No"
                          name="feedback.service"
                          value="No"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.service === 'No'}
                        />
                      </Form.Group>

                      <Form.Label>Was the quality of the service satisfactory? *</Form.Label>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          name="feedback.quality"
                          value="Yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.quality === 'Yes'}
                        />
                        <Form.Check
                          type="checkbox"
                          label="No"
                          name="feedback.quality"
                          value="No"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.quality === 'No'}
                        />
                      </Form.Group>

                      <Form.Label>Was the support team helpful? *</Form.Label>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          name="feedback.support"
                          value="Yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.support === 'Yes'}
                        />
                        <Form.Check
                          type="checkbox"
                          label="No"
                          name="feedback.support"
                          value="No"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.support === 'No'}
                        />
                      </Form.Group>

                      <Form.Label>Was the service value for money? *</Form.Label>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          name="feedback.value"
                          value="Yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.value === 'Yes'}
                        />
                        <Form.Check
                          type="checkbox"
                          label="No"
                          name="feedback.value"
                          value="No"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.value === 'No'}
                        />
                      </Form.Group>

                      <Form.Label>Overall satisfaction with the service? *</Form.Label>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          name="feedback.overall"
                          value="Yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.overall === 'Yes'}
                        />
                        <Form.Check
                          type="checkbox"
                          label="No"
                          name="feedback.overall"
                          value="No"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.overall === 'No'}
                        />
                      </Form.Group>

                      <Form.Label>Was our website easy to use? *</Form.Label>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          name="feedback.website"
                          value="Yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.website === 'Yes'}
                        />
                        <Form.Check
                          type="checkbox"
                          label="No"
                          name="feedback.website"
                          value="No"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.website === 'No'}
                        />
                      </Form.Group>

                      <Form.Label>Was the delivery timely? *</Form.Label>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          name="feedback.delivery"
                          value="Yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.delivery === 'Yes'}
                        />
                        <Form.Check
                          type="checkbox"
                          label="No"
                          name="feedback.delivery"
                          value="No"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.delivery === 'No'}
                        />
                      </Form.Group>

                      <Form.Label>Overall experience with us? *</Form.Label>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Yes"
                          name="feedback.experience"
                          value="Yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.experience === 'Yes'}
                        />
                        <Form.Check
                          type="checkbox"
                          label="No"
                          name="feedback.experience"
                          value="No"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.feedback.experience === 'No'}
                        />
                      </Form.Group>
                    </div>
                  </Col>

                  <Col lg={12} md={12}>
                    <Form.Group controlId="formSubmit">
                      <Button type="submit">Send Message</Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>

          <div className="contact-info">
            <div className="section-title text-center">
              <h2>Don't Hesitate to contact with us</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra.</p>
            </div>
            <div className="contact-info-content">
              <h3>Call us for immediate support at this number</h3>
              <h2><a href="tel:+0881306298615">+91 90169 50768</a></h2>
              <ul className="social">
                <li><a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
                <li><a href="https://www.youtube.com/?app=desktop&gl=SG&hl=en-GB" target="_blank" rel="noopener noreferrer"><FaYoutube /></a></li>
                <li><a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
                <li><a href="https://www.linkedin.com/login" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
                <li><a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a></li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Feedback;
