import React from 'react'
import { FaMapMarker } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Card, Col, Image, Row } from 'react-bootstrap';

function Hospitaldesc(props) {
  return (
    <>

<Card className="single-research-box">
  <Row>
    <Col lg={6} md={6} sm={12}>
    <div className="research-image">
        <Link to={props.passedimage}><Image src={props.hospitalimage} alt="image" /></Link>
      </div>
    </Col>
    <Col lg={6} md={6} sm={12}>
          
    <Card.Body className="research-content">
        {/*<span>Pathology</span>*/}
        <h3><Link to="#">{props.mainheading}</Link></h3>
        
        <div className="location-marker-section">
    <h5 className="mt-3 d-inline-block me-2"><FaMapMarker className='map-color' /> {props.headings}</h5>
</div>
<div className="location-marker-section">
    <h5 className="mt-3 d-inline-block me-2"><IoMdTimer className='map-color' /> Start Time : {props.starttime1}  End Time :  {props.endtime1} <br /> <br />
    <IoMdTimer className='map-color' /> Start Time : {props.starttime2}  End Time :  {props.endtime2} <br /> <br />
    <IoMdTimer className='map-color' /> Start Time : {props.starttime3}  End Time :  {props.endtime3}</h5>
</div>
      </Card.Body>
    </Col>
  </Row>

    </Card>
    
    </>
  )
}

export default Hospitaldesc