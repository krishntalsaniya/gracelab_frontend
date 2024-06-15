import React,{useState} from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Button, Checkbox ,Modal,Alert} from 'react-bootstrap';
// import { Modal } from 'react-bootstrap';
import network from '../img/network.jpg';
import Pagetitle from './Pagetitle';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import { MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';





function Patientlogin() {

    const [showModal, setShowModal] = useState(false);
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)

    const handlechange = async(e) =>
      {
        e.preventDefault();
        setloading(true);
        seterror('');

        try {
          const patientlogin = await axios.post(
            `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/userLoginPatient`,
            {
                    email,
                    password,
            }
          )

          const patientresult = (patientlogin.data)

          if (patientresult.isOk) {
            window.open('http://PatientGracelab.barodaweb.in','_blank');
          } else {
            seterror(patientresult.message);
          }
          
        } catch (err) {
          console.error(err);
          seterror('An error occurred while logging in.');
        } finally {
          setloading(false);
        }
      };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
   <>
<Modalnavigationbar />

<div className="page-title-area">
    <Pagetitle  
    heading="PATIENTS"
    pagetitlelink="/"
    title1="Home"
    title2="Patients"
    IconComponent={MdArrowForwardIos}
    />
</div>

{/* section start */}
<section className="services-area ptb-70 pb-5">
      <Container>
        <Row className="justify-content-center" id="loginPanel">
          <Col md={12} lg={10}>
            <div className="wrap d-md-flex">
              <div className="login-wrap p-4 p-md-5">
                <div className="d-block">
                  <div className="w-100 text-center">
                    <h3 className="mb-2 h5 fw-bold">We are The Grace Lab Team</h3>
                    <p className="mb-4">Please login to your account</p>
                  </div>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="signin-form" onSubmit={handlechange}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                     placeholder="Username" 
                     required
                     value={email}
                     onChange={(e) => setemail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                     placeholder="Password"
                      required
                      value={password}
                      onChange={(e)=>setpassword(e.target.value)} />
                  </Form.Group>
                  <Row className="mb-4">
                    <Col className="text-start" xs={6}>
                    <Form.Check type="checkbox"  label="Remember Me"/>

                    </Col>
                    <Col className="text-end" xs={6}>
                      <Link to="/forgotpassword">Forgot Password?</Link>
                    </Col>
                  </Row>
                  <Button type="submit" className="form-control btn btn-sign-in rounded submit px-3" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </Form>
                <p className="text-center accounttop">Don't have an account? <Link to="/patient-signup" className="d-inline-block">Register here</Link></p>
                <p className="text-center fw-bold">
                <Link to="#" onClick={handleShow} style={{ color: "#eb268f" }}>Why Registered with us</Link>

                  <Modal show={showModal} onHide={handleClose} size='lg' centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Why Registered with us</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p><strong>Accurate Diagnosis:</strong> Laboratory tests provide precise results that help in diagnosing various medical conditions accurately. This allows healthcare providers to initiate appropriate treatment plans promptly.</p>
                    <p><strong>Early Detection:</strong> Many diseases can be detected early through laboratory tests, even before symptoms manifest. Early detection facilitates timely intervention, potentially improving patient outcomes.</p>
                    <p><strong>Monitoring Treatment Progress:</strong> Laboratory tests enable healthcare providers to monitor the effectiveness of treatments over time. By tracking changes in biomarkers or other indicators, they can adjust treatment plans as necessary.</p>
                    </Modal.Body>
                
                        </Modal>
                        </p>  
                    </div>
                    <div class="img" style={{backgroundImage:`url(${network})`}} >
                        </div>
                    </div>
                </Col>
                </Row>
            </Container>
    </section>
   
   
   
   </>
  )
}

export default Patientlogin