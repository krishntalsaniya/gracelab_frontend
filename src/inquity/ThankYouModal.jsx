import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'reactstrap';
import Scaneer from "../img/qr.png"
import ThankYou from "../img/thankYouImg.avif"

const ThankYouModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <React.Fragment>
          {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Button type="submit" onClick={handleShow} variant="primary"  style={{ marginTop: "30px" }}>
        Submit Inquiry
      </Button>

      <Modal size='md' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
            <Row className='thankYouRow'>
                <Col lg={6}>
                    <div>
                        <img src={Scaneer} className='scannerimg' alt='img' />
                    </div>
                </Col>
                <Col lg={6}>
                    <div>
                        <img className='scannerimg' src={ThankYou} alt='img' />
                    </div>
                </Col>
            </Row>
        </Modal.Body>

      </Modal>
    </React.Fragment>
  )
}

export default ThankYouModal