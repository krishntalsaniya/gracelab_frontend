import React from 'react'
import Modalnavigationbar from '../navbar/Modalnavigationbar'
import Pagetitle from '../patients/Pagetitle'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Signup from '../hospital/Signup';
import pharmacylogin from '../img/pharmacy-login.jpg'
import { RxSlash } from "react-icons/rx";

function Pharmacysignup() {
  return (
    <>
     <Modalnavigationbar />

<div className="page-title-area">
<Pagetitle 
heading="JOIN OUR PHARMACY NETWORK"
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
          signupimage={pharmacylogin}
          name="Pharmacy Name"
          namep="Pharmacy Name"
          ownername="Owner Name"
          email="Email Address / Username"
          contact="Contact No."
          password="Password"
          confirmpass="confirm password"
          licenceno="Pharmacy Licence No."
          licencep="Pharmacy Licence No."
          licencedate="Pharmacy Licence Date."
          pincode="Pincode"
          address="Registered Address"
          signup='/pharmacy-login'
          />
        </Row>
      </Container>
    </section>
    
    </>
  )
}

export default Pharmacysignup