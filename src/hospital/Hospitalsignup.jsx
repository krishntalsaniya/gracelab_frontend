import React from 'react'
import Modalnavigationbar from '../navbar/Modalnavigationbar'
import Pagetitle from '../patients/Pagetitle'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Signup from './Signup';
import hospitallogin from '../img/hospital-login.jpg'

function Hospitalsignup() {
  return (
   <>
   <Modalnavigationbar/>

<div className="page-title-area">
<Pagetitle 
heading="JOIN OUR HOSPITAL NETWORKK"
pagetitlelink="/"
title1="Login"
title2="Signup"
/>
</div>


<section className="services-area ptb-70 pb-5">
      <Container>
        <Row className="justify-content-center" id="signupPanel">
          <Signup
          signupimage={hospitallogin}
          name="Hospital Name"
          namep="Hospital Name"
          ownername="Owner Name"
          email="Email Address / Username"
          contact="Contact No."
          password="Password"
          confirmpass="confirm password"
          licenceno="Hospital Licence No."
          licencep="Hospital Licence No."
          licencedate="Hospital Licence Date."
          pincode="Pincode"
          address="Registered Address"
          signup='/hospital-login'
          />
        </Row>
      </Container>
    </section>
   
   </>
  )
}

export default Hospitalsignup