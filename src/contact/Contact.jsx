import React from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { FaTwitter,FaYoutube ,FaFacebook ,FaLinkedin ,FaInstagramSquare  } from "react-icons/fa";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


function Contact() {

  const navigate = useNavigate();
    const SignupSchema = Yup.object().shape({
      name: Yup.string().required('Please enter your name'),
      email:  Yup.string()
        .email('Invalid email')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must be valid and end with .com')
        .test('endsWithCom', 'Email must end with .com', value => {
          if (value && !value.endsWith('.com')) {
            return false;
          }
          return true;
        })
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
          });
    
     
    
          Swal.fire({
            title: "Success!",
            text: "Contact Details submit successfully",
            icon: "success",
            confirmButtonText: "OK"
          })
          // Redirect or show success message here
        } catch (error) {
          console.error('Error creating laboratory:', error);
          // Show error message here
        }
      };

  return (
    <>
    <Modalnavigationbar 
    
    navigatelink="/sign-up" />
    <div className="page-title-area">
    <Pagetitle heading="Contact Us" pagetitlelink="/" title1="Home" title2="Contact" IconComponent={MdArrowForwardIos} />
</div>
    

    {/* contact start */}

    <section className="contact-area ptb-120">
      <Container>
        <div className="section-title text-center">
          <span className="bg-ff5d24">Message Us</span>
          <h2>Drop us a message for any query</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra.</p>
        </div>

        <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    contactno: '',
                    message: '',
                    textarea:'',

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
        <Form  onSubmit={handleSubmit} id="contactForm">
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
          <Form.Group controlId="formName">
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
          <Form.Group controlId="formName">
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
          <Form.Group controlId="formName">
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
          <Form.Group controlId="formName">
          <Button  type="button" onClick={handleSubmit}>Send Message</Button>
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
              <li><a href="https://twitter.com/i/flow/login" target="_blank"><FaTwitter /></a></li>
              <li><a href="https://www.youtube.com/?app=desktop&gl=SG&hl=en-GB" target="_blank"><FaYoutube /></a></li>
              <li><a href="https://www.facebook.com/login/" target="_blank"><FaFacebook /></a></li>
              <li><a href="https://www.linkedin.com/login" target="_blank"><FaLinkedin /></a></li>
              <li><a href="https://www.instagram.com/accounts/login/" target="_blank"><FaInstagramSquare /></a></li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
    </>
  )
}

export default Contact