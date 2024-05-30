import React from 'react'
import Modalnavigationbar from '../navbar/Modalnavigationbar'
import Pagetitle from '../patients/Pagetitle'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Signup from '../hospital/Signup';
import laboratory from '../img/laboratory-login.jpg'
import { RxSlash } from "react-icons/rx";

function Laboratorysignup() {
  return (
    <>

<Modalnavigationbar/>

<div className="page-title-area">
<Pagetitle 
heading="JOIN OUR LABORATORY NETWORK"
pagetitlelink="/"
title1="Login"
title2="Signup"
IconComponent={RxSlash}
/>
</div>



<section className="services-area ptb-70 pb-5">
      <Container>
        <Row className="justify-content-center" id="signupPanel">
          <Signup
          signupimage={laboratory}
          name="Laboratory Name"
          namep="Laboratory Name"
          ownername="Owner Name"
          email="Email Address"
          contact="Contact No."
          password="Password"
          confirmpass="confirm password"
          licenceno="Laboratory Licence No."
          licencep="Laboratory Licence No."
          licencedate="Laboratory Licence Date."
          pincode="Pincode"
          address="Registered Address"
          signup='/laboratory-login'
          />
        </Row>
      </Container>
    </section>
    
    
    </>
  )
}

export default Laboratorysignup