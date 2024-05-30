import React from 'react'
import Modalnavigationbar from '../navbar/Modalnavigationbar'
import Pagetitle from '../patients/Pagetitle'
import hospitallogin from '../img/hospital-login.jpg'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Login from './Login';
import { RxSlash } from "react-icons/rx";


function Hospitallogin() {
  return (
    <>
    <Modalnavigationbar/>

    <div className="page-title-area">
    <Pagetitle 
    heading="JOIN OUR HOSPITAL NETWORK"
    pagetitlelink="/"
    title1="Login"
    title2="Signup"
    IconComponent={RxSlash}
    />
</div>

{/* section start */}
<section class="services-area ptb-70 pb-5">
<Container>

      {/* Hospital  Login */}
      <Row className="justify-content-center" id="loginPanel">
      <Login 
      loginimage={hospitallogin}
      username="Username / Email Address"
      password="Password"
      forgetpassword="/forgotpassword"
      register="/hospital-signup"
      />
      </Row>
    </Container>
</section>

    
    </>
  )
}

export default Hospitallogin