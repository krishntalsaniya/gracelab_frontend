import React from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { FaTwitter,FaYoutube ,FaFacebook ,FaLinkedin ,FaInstagramSquare  } from "react-icons/fa";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Contact() {

    const validationSchema = Yup.object().shape({
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
        phone_number: Yup.string()
        .matches(/^\d+$/, 'Contact No. must contain only digits')
        .length(10, 'Contact No. must be exactly 10 digits')
        .required('Contact No. is required'),
        msg_subject: Yup.string().required('Please enter the subject'),
        message: Yup.string().required('Please enter your message'),
      });
    
      const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          phone_number: '',
          msg_subject: '',
          message: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
          // Handle form submission here
          console.log('Form submitted:', values);
        },
      });
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
        <Form onSubmit={formik.handleSubmit} id="contactForm">
          <Row>
            <Col lg={6} md={6}>
              <Form.Group className='form-group'>
                <Form.Control type="text" placeholder="Your Name" name="name" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                {formik.touched.name && formik.errors.name ? <div className="text-danger text-start">{formik.errors.name}</div> : null}
              </Form.Group>
            </Col>
            <Col lg={6} md={6}>
              <Form.Group className='form-group'>
                <Form.Control type="email" placeholder="Your Email Address" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <div className="text-danger text-start">{formik.errors.email}</div> : null}
              </Form.Group>
            </Col>
            <Col lg={6} md={6}>
              <Form.Group className='form-group'>
                <Form.Control type="text" placeholder="Phone Number" name="phone_number" id="phone_number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone_number} />
                {formik.touched.phone_number && formik.errors.phone_number ? <div className="text-danger text-start">{formik.errors.phone_number}</div> : null}
              </Form.Group>
            </Col>
            <Col lg={6} md={6}>
              <Form.Group className='form-group'>
                <Form.Control type="text" placeholder="Subject" name="msg_subject" id="msg_subject" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.msg_subject} />
                {formik.touched.msg_subject && formik.errors.msg_subject ? <div className="text-danger text-start">{formik.errors.msg_subject}</div> : null}
              </Form.Group>
            </Col>
            <Col lg={12} md={12}>
              <Form.Group className='form-group'>
                <Form.Control as="textarea" rows={10} placeholder="Type Your Message Here" name="message" id="message" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.message} />
                {formik.touched.message && formik.errors.message ? <div className="text-danger text-start">{formik.errors.message}</div> : null}
              </Form.Group>
            </Col>
            <Col lg={12} md={12}>
              <Button type="submit" variant="primary">Send Message</Button>
              <div id="msgSubmit" className="h3 text-center hidden" />
            </Col>
          </Row>
        </Form>
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