import React from 'react'
import Modalnavigationbar from '../navbar/Modalnavigationbar'
import Pagetitle from '../patients/Pagetitle'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Login from '../hospital/Login';
import doctorlogin from '../img/doctor-login.jpg'
import { RxSlash } from "react-icons/rx";

function Doctorlogin() {
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

<section class="services-area ptb-70 pb-5">
<Container>

      {/* Login Panel */}
      <Row className="justify-content-center" id="loginPanel">
      <Login 
      loginimage={doctorlogin}
      username="Username / Email Address"
      password="Password"
      forgetpassword="/forgotpassword"
      register="/doctor-signup"
      />
      </Row>
    </Container>
</section>


    
    </>
  )
}

export default Doctorlogin