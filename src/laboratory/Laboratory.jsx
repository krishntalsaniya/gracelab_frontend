import React from 'react'
import Modalnavigationbar from '../navbar/Modalnavigationbar'
import Pagetitle from '../patients/Pagetitle'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Login from '../hospital/Login';
import laboratory from '../img/laboratory-login.jpg'
import { RxSlash } from "react-icons/rx";

function Laboratory() {
  return (
    <>
    <Modalnavigationbar  navigatelink=""/>

    <div className="page-title-area">
    <Pagetitle 
    heading="JOIN OUR LABORATORY NETWORK"
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
      loginimage={laboratory}
      username="Username"
      password="Password"
      forgetpassword="/forgotpassword"
      register="/laboratory-signup"

      />
      </Row>
    </Container>
</section>

    
    
    </>
  )
}

export default Laboratory