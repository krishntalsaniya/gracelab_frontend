import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarker } from "react-icons/fa";
import { Col, Row } from 'react-bootstrap';
import { IoMdTimer } from "react-icons/io";

function Doctorsec(props) {
  return (
    <>
     <div className="single-research-box">
        <Row>
          <Col lg={6}>
          <div className="research-image">
          <Link to="/"><img src={props.drimage} alt="image" /></Link>
        </div>
          </Col>

          <Col lg={6}>
           <div className="research-content">
          {/*<span>Pathology</span>*/}
          <h3><Link to="/">{props.drname}</Link></h3>
          <p>{props.drlocation}</p>
          <div className="location-marker-section">
            <h5 className="mt-1 d-inline-block me-2"><FaMapMarker className='map-color' />{props.location}</h5>
          </div>

          <div className="location-marker-section">
    <h5 className="mt-3 d-inline-block me-2"><IoMdTimer className='map-color' /> Start Time : {props.starttime1}  End Time :  {props.endtime1} <br /> <br />
    <IoMdTimer className='map-color' /> Start Time : {props.starttime2}  End Time :  {props.endtime2} <br /> <br />
    <IoMdTimer className='map-color' /> Start Time : {props.starttime3}  End Time :  {props.endtime3}</h5>
</div>
        </div>
          </Col>
        </Row>
       
      </div>
    
    </>
  )
}

export default Doctorsec